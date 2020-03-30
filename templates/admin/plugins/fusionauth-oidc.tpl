<div class="row">
	<div class="col-xs-12">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h2 class="panel-title" style="font-size: 22px; text-transform: capitalize;">OpenID Connect Configuration</h2>
			</div>
			<div class="panel-body">
				<div style="font-size: smaller;">Configure NodeBB to authenticate usign an OpenID Connect
					identity provider. See the GitHub project <a
							href="https://github.com/FusionAuth/nodebb-plugin-fusionauth-oidc">README</a> for additional information.
					<a
							href="https://github.com/FusionAuth/nodebb-plugin-fusionauth-oidc">https://github.com/FusionAuth/nodebb-plugin-fusionauth-oidc</a>
				</div>
				<form class="mt-3" id="fusionauth-oidc-settings" role="form" style="margin-top: 15px;">
					<div class="form-group">
						<label for="client_id">Client ID</label>
						<input class="form-control" data-trim="true" id="client_id" name="clientId" type="text">
					</div>
					<div class="form-group">
						<label for="client_secret">Client secret</label>
						<input class="form-control" data-trim="true" id="client_secret" name="clientSecret" type="text">
					</div>
					<div class="form-group">
						<label for="discovery_base_url">Discovery URL</label>
						<input class="form-control" data-trim="true" id="discovery_base_url" name="discoveryBaseURL" type="text">
					</div>
					<div class="form-group">
						<label for="authorization_endpoint">Authorization endpoint</label>
						<input class="form-control" data-trim="true" id="authorization_endpoint" name="authorizationEndpoint"
						       type="text">
					</div>
					<div class="form-group">
						<label for="token_endpoint">Token endpoint</label>
						<input class="form-control" data-trim="true" id="token_endpoint" name="tokenEndpoint" type="text">
					</div>
					<div class="form-group">
						<label for="user_info_endpoint">Userinfo endpoint</label>
						<input class="form-control" data-trim="true" id="user_info_endpoint" name="userInfoEndpoint" type="text">
					</div>
					<div class="form-group">
						<label for="user_info_endpoint">Logout endpoint</label>
						<input class="form-control" data-trim="true" id="logout_endpoint" name="logoutEndpoint" type="text">
					</div>
					<div class="form-group">
						<label for="email_claim">Email claim</label>
						<input class="form-control" data-trim="true" id="email_claim" name="emailClaim" type="text" value="email">
					</div>
					<div class="form-group">
						<label for="email_claim">Roles claim</label>
						<input class="form-control" data-trim="true" id="roles_claim" name="rolesClaim" type="text">
					</div>
				</form>
				<div style="font-size: smaller; display: flex; margin-top: 30px;">
					<div style="width: 48px; margin-right: 10px;">
						<img src="https://fusionauth.io/assets/img/favicon-96x96.png" style="width: 100%;"></div>
					<div>
						Maintained by <a href="https://fusionauth.io">FusionAuth</a> <br> <a
							href="https://github.com/FusionAuth/nodebb-plugin-fusionauth-oidc">https://github.com/FusionAuth/nodebb-plugin-fusionauth-oidc</a>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<button class="floating-button mdl-button mdl-button--fab mdl-button--colored" id="save">
	<i class="material-icons">save</i>
</button>
