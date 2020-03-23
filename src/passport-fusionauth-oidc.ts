import * as OAuth2Strategy from 'passport-oauth2'
import fetch from 'node-fetch'

export interface PassportOIDCSettings {
	clientId: string;
	clientSecret: string;
	emailClaim: string;
	authorizationEndpoint: string;
	tokenEndpoint: string;
	userInfoEndpoint: string;
	callbackURL: string;
}


export class PassportOIDC extends OAuth2Strategy {
	public name = "passport-oidc";

	constructor(private settings: PassportOIDCSettings, verifyFunction: OAuth2Strategy.VerifyFunction) {
		super({
			clientID: settings.clientId,
			clientSecret: settings.clientSecret,
			callbackURL: settings.callbackURL,
			authorizationURL: settings.authorizationEndpoint,
			tokenURL: settings.tokenEndpoint,
			scope: ['openid', settings.emailClaim],
		}, verifyFunction);
	}

	static async resolveEndpoints(issuer: string) {
		let response = await fetch({
			url: issuer + '/.well-known/openid-configuration',
			method: 'GET',
		});

		try {
			return response.json()
		} catch (e) {
			console.error(e);
			throw new Error(`Failed to parse the response body. Exception was previously logged.`)
		}
	}

	// Just to remember these exist
	// tokenParams(options: any): object {
	// 	return super.tokenParams(options);
	// }

	// Just to remember these exist
	// authorizationParams(options: any): object {
	// 	return super.authorizationParams(options);
	// }

	userProfile(accessToken: string, done: (err?: (Error | null), profile?: any) => void): void {
		if (!accessToken) {
			done(new Error('Missing token, cannot call the userinfo endpoint without it.'));
		}

		this._oauth2.useAuthorizationHeaderforGET(true);
		this._oauth2.get(this.settings.userInfoEndpoint, accessToken, (err, body, res) => {
			if (err) {
				console.error(err);
				return done(new Error(`Failed to get user info. Exception was previously logged.`));
			}

			if (res.statusCode > 299 || res.statusCode < 200) {
				return done(new Error(`Unexpected response from userInfo. [${res.statusCode}]`))
			}

			try {
				done(null, JSON.parse(body as string));
			} catch (e) {
				console.error(e);
				done(new Error(`Failed to parse the userinfo body. Exception was previously logged.`));
			}
		});
	}
}

export default PassportOIDC;
