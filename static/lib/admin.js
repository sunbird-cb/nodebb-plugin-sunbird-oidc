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
						message: 'Please restart your NodeBB to apply these settings',
						clickfn: function () {
							socket.emit('admin.reload');
						},
					});
				});
			});
		},
	};
});
