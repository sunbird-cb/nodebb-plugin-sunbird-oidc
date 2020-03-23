'use strict';

((module) => {
	const User = require.main.require('./src/user');
	const Groups = require.main.require('./src/groups');
	const db = require.main.require('./src/database');
	const authenticationController = require.main.require('./src/controllers/authentication');
	const Settings = require.main.require('./src/settings');

	const async = require('async');
	const { PassportOIDC } = require('./src/passport-fusionauth-oidc');
	// const PassportOIDC = require('passport-openid-oauth20');

	const passport = module.parent.require('passport');
	const nconf = module.parent.require('nconf');
	const winston = module.parent.require('winston');

	const constants = {
		name: 'fusionauth-oidc',
		callbackURL: '/auth/fusionauth-oidc/callback',
		pluginSettingsURL: '/admin/plugins/fusionauth-oidc',
		pluginSettings: new Settings('fusionauth-oidc', '1.0.0', {
			// Default settings
			clientId: null,
			clientSecret: null,
			emailClaim: 'email',
			issuer: null,
			authorizationEndpoint: null,
			tokenEndpoint: null,
			userInfoEndpoint: null,
		}, false, false),
	};

	const Oidc = {};

	/**
	 * Sets up the router bindings for the settings page
	 * @param params
	 * @param callback
	 */
	Oidc.init = function (params, callback) {
		winston.verbose('Setting up FusionAuth OIDC bindings/routes');

		function render(req, res) {
			res.render('admin/plugins/fusionauth-oidc', {
				baseUrl: nconf.get('url'),
			});
		}

		params.router.get(constants.pluginSettingsURL, params.middleware.admin.buildHeader, render);
		params.router.get('/api/admin/plugins/fusionauth-oidc', render);

		callback();
	};

	/**
	 * Binds the passport strategy to the global passport object
	 * @param strategies The global list of strategies
	 * @param callback
	 */
	Oidc.bindStrategy = function (strategies, callback) {
		winston.verbose('Setting up openid connect');

		callback = callback || function () {
		};

		constants.pluginSettings.sync(function (err) {
			if (err) {
				return callback(err);
			}

			const settings = constants.pluginSettings.getWrapper();

			// If we are missing any settings
			if (!settings.clientId ||
				!settings.clientSecret ||
				!settings.emailClaim ||
				(!settings.issuer &&
					(!settings.authorizationEndpoint ||
						!settings.tokenEndpoint ||
						!settings.userInfoEndpoint))) {
				winston.info('OpenID Connect will not be available until it is configured!');
				return callback();
			}

			settings.callbackURL = nconf.get('url') + constants.callbackURL;

			// If you call this twice it will overwrite the first.
			passport.use(constants.name, new PassportOIDC(settings, (req, token, secret, profile, done) => {
				const email = profile[constants.pluginSettings.getWrapper().emailClaim || 'email'];
				Oidc.login({
					oAuthid: profile.sub,
					username: profile.preferred_username || email.split('@')[0],
					email: email,
					// isAdmin: profile.isAdmin,
				}, (err, user) => {
					if (err) {
						return done(err);
					}

					authenticationController.onSuccessfulLogin(req, user.uid);
					done(null, user);
				});
			}));

			// If we are doing the update, strategies won't be the right object so
			if (strategies.push) {
				strategies.push({
					name: constants.name,
					url: '/auth/' + constants.name,
					callbackURL: '/auth/' + constants.name + '/callback',
					icon: 'fa-openid',
					scope: ['openid', settings.emailClaim],
				});
			}

			callback(null, strategies);
		});
	};

	Oidc.login = function (payload, callback) {
		Oidc.getUidByOAuthid(payload.oAuthid, (err, uid) => {
			if (err) {
				return callback(err);
			}

			if (uid !== null) {
				// Existing User
				callback(null, {
					uid: uid,
				});
			} else {
				// New User
				const success = (uid) => {
					// Save provider-specific information to the user
					User.setUserField(uid, constants.name + 'Id', payload.oAuthid);
					db.setObjectField(constants.name + 'Id:uid', payload.oAuthid, uid);

					if (payload.isAdmin) {
						Groups.join('administrators', uid, (err) => {
							callback(err, {
								uid: uid,
							});
						});
					} else {
						callback(null, {
							uid: uid,
						});
					}
				};

				if (!payload.email) {
					return callback(new Error('The email was missing from the user, we cannot log them in.'));
				}

				User.getUidByEmail(payload.email, (err, uid) => {
					if (err) {
						return callback(err);
					}

					if (!uid) {
						User.create({
							username: payload.username,
							email: payload.email,
						}, (err, uid) => {
							if (err) {
								return callback(err);
							}

							success(uid);
						});
					} else {
						success(uid); // Existing account -- merge
					}
				});
			}
		});
	};

	Oidc.getUidByOAuthid = function (oAuthid, callback) {
		db.getObjectField(constants.name + 'Id:uid', oAuthid, (err, uid) => {
			if (err) {
				return callback(err);
			}
			callback(null, uid);
		});
	};

	Oidc.deleteUserData = function (data, callback) {
		async.waterfall([
			async.apply(User.getUserField, data.uid, constants.name + 'Id'),
			(oAuthIdToDelete, next) => {
				db.deleteObjectField(constants.name + 'Id:uid', oAuthIdToDelete, next);
			},
		], (err) => {
			if (err) {
				winston.error('[sso-oauth] Could not remove OAuthId data for uid ' + data.uid + '. Error: ' + err);
				return callback(err);
			}

			callback(null, data);
		});
	};

	// If this filter is not there, the deleteUserData function will fail when getting the oauthId for deletion.
	Oidc.whitelistFields = function (params, callback) {
		params.whitelist.push(constants.name + 'Id');
		callback(null, params);
	};

	Oidc.bindMenuOption = function (header, callback) {
		winston.verbose('Binding menu option');
		header.authentication.push({
			route: constants.pluginSettingsURL.replace('/admin', ''), // They will add the /admin for us
			name: 'OpenID Connect',
		});

		callback(null, header);
	};

	module.exports = Oidc;
})(module);
