'use strict';

((module) => {
	const User = require.main.require('./src/user');
	const Groups = require.main.require('./src/groups');
	const db = require.main.require('./src/database');
	const authenticationController = require.main.require('./src/controllers/authentication');

	const async = require('async');
	const passportOIDC = require('passport-openid-oauth20');

	const passport = module.parent.require('passport');
	const nconf = module.parent.require('nconf');
	const winston = module.parent.require('winston');

	const constants = {
		name: 'fusionauthoidc',
		settings: {
			clientId: null,
			clientSecret: null,
			emailClaim: null, // Which field on user info contains the email
			discoveryEndpoint: null,
			authenticationEndpoint: null,
			tokenEndpoint: null,
			userInfoEndpoint: null,
		},
	};

	const Oidc = {};
	Oidc.getStrategy = (strategies, callback) => {
		// OAuth options
		// eslint-disable-next-line prefer-const
		const opts = constants.settings;
		opts.callbackURL = nconf.get('url') + '/auth/foidc/callback';

		passportOIDC.Strategy.prototype.userProfile = function (token, secret, params, done) {
			this._oauth.get(constants.userRoute, token, secret, (err, body/* , res */) => {
				if (err) {
					return done(err);
				}

				try {
					const json = JSON.parse(body);
					Oidc.parseUserReturn(json, (err, profile) => {
						if (err) return done(err);
						profile.provider = constants.name;

						done(null, profile);
					});
				} catch (e) {
					done(e);
				}
			});
		};


		opts.passReqToCallback = true;

		passport.use(constants.name, new passportOIDC(opts, (req, token, secret, profile, done) => {
			Oidc.login({
				oAuthid: profile.id,
				handle: profile.displayName,
				email: profile.emails[0].value,
				isAdmin: profile.isAdmin,
			}, (err, user) => {
				if (err) {
					return done(err);
				}

				authenticationController.onSuccessfulLogin(req, user.uid);
				done(null, user);
			});
		}));

		strategies.push({
			name: constants.name,
			url: '/auth/' + constants.name,
			callbackURL: '/auth/' + constants.name + '/callback',
			icon: 'fa-check-square',
			scope: (constants.scope || '').split(','),
		});

		callback(null, strategies);
	};

	Oidc.parseUserReturn = (data, callback) => {
		// Alter this section to include whatever data is necessary
		// NodeBB *requires* the following: id, displayName, emails.
		// Everything else is optional.

		// Find out what is available by uncommenting this line:
		// console.log(data);

		const profile = {
			id: data.id,
			displayName: data.name,
			emails: [{value: data.email}],
		};

		// Do you want to automatically make somebody an admin? This line might help you do that...
		// profile.isAdmin = data.isAdmin ? true : false;

		// Delete or comment out the next TWO (2) lines when you are ready to proceed
		process.stdout.write('===\nAt this point, you\'ll need to customise the above section to id, displayName, and emails into the "profile" object.\n===');
		return callback(new Error('Congrats! So far so good -- please see server log for details'));

		// eslint-disable-next-line
		callback(null, profile);
	};

	Oidc.login = (payload, callback) => {
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

				User.getUidByEmail(payload.email, (err, uid) => {
					if (err) {
						return callback(err);
					}

					if (!uid) {
						User.create({
							username: payload.handle,
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

	Oidc.getUidByOAuthid = (oAuthid, callback) => {
		db.getObjectField(constants.name + 'Id:uid', oAuthid, (err, uid) => {
			if (err) {
				return callback(err);
			}
			callback(null, uid);
		});
	};

	Oidc.deleteUserData = (data, callback) => {
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
	Oidc.whitelistFields = (params, callback) => {
		params.whitelist.push(constants.name + 'Id');
		callback(null, params);
	};

	module.exports = Oidc;
})(module);
