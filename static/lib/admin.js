'use strict';

/* globals $, app, socket, define */
define('admin/plugins/fusionauth-oidc', ['settings'], function (settings) {
	return {
		init: function () {
			settings.load('fusionauth-oidc', $('#fusionauth-oidc-settings'));

			$('#save').on('click', function () {
				settings.save('fusionauth-oidc', $('#fusionauth-oidc-settings'), function () {
					app.alert({
						type: 'success',
						alert_id: 'sso-oidc-saved',
						title: 'Settings Saved',
						message: 'If you changed the email claim, you will need to restart before it will be applied.',
						clickfn: function () {
							socket.emit('admin.reload');
						},
					});
				});
			});
		},
	};
});
