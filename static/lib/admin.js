'use strict';

/* globals $, app, socket, define */
define('admin/plugins/fusionauth-oidc', ['settings'], function (settings) {
	return {
		init: function () {
			settings.load('fusionauth-oidc', $('#fusionauth-oidc-settings'));

			$('#save').on('click', function () {
				const form = $('#fusionauth-oidc-settings');

				// Trim the fields
				form.find('input[data-trim="true"]').each(function () {
					$(this).val($.trim($(this).val()));
				});

				settings.save('fusionauth-oidc', form, function () {
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
