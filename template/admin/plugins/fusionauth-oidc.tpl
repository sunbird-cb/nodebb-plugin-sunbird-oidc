<div class="row">
	<div class="col-xs-12">
		<div class="panel panel-default">
			<div class="panel-heading">
				<h3 class="panel-title">OpenID Connect Authentication</h3>
			</div>
			<div class="panel-body">
				<form id="fusionauth-oidc-settings" role="form">
					<div class="form-group">

					</div>
					<div class="form-group">
						<label for="client_id">Client ID</label>
						<input class="form-control" id="client_id" name="client_id" type="text">
					</div>
					<div class="form-group">
						<label for="client_secret">Client Secret</label>
						<input class="form-control" id="client_secret" name="client_secret" type="text">
					</div>
					<div class="form-group">
						<label for="issuer">Issuer</label>
						<input class="form-control" id="issuer" name="issuer" type="text">
					</div>
					<div class="form-group">
						<label for="authorization_endpoint">Authorization Endpoint</label>
						<input class="form-control" id="authorization_endpoint" name="authorization_endpoint" type="text">
					</div>
					<div class="form-group">
						<label for="token_endpoint">Token Endpoint</label>
						<input class="form-control" id="token_endpoint" name="token_endpoint" type="text">
					</div>
					<div class="form-group">
						<label for="user_info_endpoint">User Info Endpoint</label>
						<input class="form-control" id="user_info_endpoint" name="user_info_endpoint" type="text">
					</div>
					<div class="form-group">
						<label for="email_claim">Email Claim</label>
						<input class="form-control" id="email_claim" name="email_claim" type="text">
					</div>
				</form>
			</div>
		</div>
	</div>
</div>

<button class="floating-button mdl-button mdl-button--fab mdl-button--colored" id="save">
	<i class="material-icons">save</i>
</button>