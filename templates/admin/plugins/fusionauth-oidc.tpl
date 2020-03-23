<div class="row">
	<div class="col-xs-12">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">OpenID Connect Authentication</h3>
			</div>
			<div class="panel-body">
				<form id="fusionauth-oidc-settings" role="form">
					<div class="form-group">
						<label for="client_id">Client ID</label>
						<input class="form-control" id="client_id" name="clientId" data-key="clientId" data-trim="true" type="text">
					</div>
					<div class="form-group">
						<label for="client_secret">Client Secret</label>
						<input class="form-control" id="client_secret" name="clientSecret" data-key="clientSecret" data-trim="true" type="text">
					</div>
					<div class="form-group">
						<label for="issuer">Issuer</label>
						<input class="form-control" id="issuer" name="issuer" data-key="issuer" data-trim="true" type="text">
					</div>
					<div class="form-group">
						<label for="authorization_endpoint">Authorization Endpoint</label>
						<input class="form-control" id="authorization_endpoint" name="authorizationEndpoint" data-key="authorizationEndpoint" data-trim="true" type="text">
					</div>
					<div class="form-group">
						<label for="token_endpoint">Token Endpoint</label>
						<input class="form-control" id="token_endpoint" name="tokenEndpoint" data-key="tokenEndpoint" data-trim="true" type="text">
					</div>
					<div class="form-group">
						<label for="user_info_endpoint">User Info Endpoint</label>
						<input class="form-control" id="user_info_endpoint" name="userInfoEndpoint" data-key="userInfoEndpoint" data-trim="true" type="text">
					</div>
					<div class="form-group">
						<label for="email_claim">Email Claim</label>
						<input class="form-control" id="email_claim" name="emailClaim" data-key="emailClaim" data-trim="true" type="text">
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<button class="floating-button mdl-button mdl-button--fab mdl-button--colored" id="save">
	<i class="material-icons">save</i>
</button>
