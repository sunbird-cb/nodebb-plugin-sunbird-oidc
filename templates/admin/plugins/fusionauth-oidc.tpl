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
						<input class="form-control" data-trim="true" id="client_id" name="clientId" type="text">
					</div>
					<div class="form-group">
						<label for="client_secret">Client Secret</label>
						<input class="form-control" data-trim="true" id="client_secret" name="clientSecret" type="text">
					</div>
					<div class="form-group">
						<label for="discovery_base_url">Discovery base url</label>
						<input class="form-control" data-trim="true" id="discovery_base_url" name="discoveryBaseURL" type="text">
					</div>
					<div class="form-group">
						<label for="authorization_endpoint">Authorization Endpoint</label>
						<input class="form-control" data-trim="true" id="authorization_endpoint" name="authorizationEndpoint"
						       type="text">
					</div>
					<div class="form-group">
						<label for="token_endpoint">Token Endpoint</label>
						<input class="form-control" data-trim="true" id="token_endpoint" name="tokenEndpoint" type="text">
					</div>
					<div class="form-group">
						<label for="user_info_endpoint">User Info Endpoint</label>
						<input class="form-control" data-trim="true" id="user_info_endpoint" name="userInfoEndpoint" type="text">
					</div>
					<div class="form-group">
						<label for="email_claim">Email Claim</label>
						<input class="form-control" data-trim="true" id="email_claim" name="emailClaim" type="text">
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<button class="floating-button mdl-button mdl-button--fab mdl-button--colored" id="save">
	<i class="material-icons">save</i>
</button>
