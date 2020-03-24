# NodeBB FusionAuth OpenID Connect

This plugin allows you to connect to FusionAuth or any OpenID Connect provider.

## Installation

1. Launch nodebb
1. Go to the admin portal
1. Click plugins
1. Click find plugins
1. Search for `fusionauth-oidc`
![Search](./readme-images/search.png)
1. Click install on `nodebb-plugin-fusionauth-oidc`
1. Go to the installed plugin page
1. Find `nodebb-plugin-fusionauth-oidc` and click `Activate`
1. Restart nodebb
1. Refresh the page to regenerate the menu
1. Click Plugins > OpenID Connect
![Settings](./readme-images/plugin-settings.png)
1. You can now enter your OpenID credentials

## Configuring

From the OpenID Connect page you can configure this plugin. You will need your client id and secret from your provider as well as that providers base URL.

1. Fill in the client id/client secret fields (Example: https://fusionauth.io/docs/v1/tech/core-concepts/applications#oauth)
1. Type in the base url for your provider (in most cases this will be the domain + protocol) (Ex: https://local.fusionauth.io)
1. Fill in the email claim with `email` (this should be default but may be missing)
1. Click save
1. You should see values show up in the authorization, token, and user info fields and a success dialog
1. You will need to restart nodebb again (this is because the email claim is bound by nodebb on startup and will be missing if you don't restart)

(Optional)

If you want to skip the login page and always use OpenID for authentication you will need to disable local login and local registration.

To disable local login:
1. Goto Manage > Privileges
1. Uncheck all boxes under `local login`
![Local login](./readme-images/logal-login.png)

To disable local registration:
1. Goto Settings > User
1. Find `registration type` and set it to `no registration`
![Local registration](./readme-images/local-registration.png)
1. Save

Once both of these are disabled, the login button will skip to the OpenID login page. If you ever need to login via the local login page you can manually type in the url and go to `/login?local=1`

## Features

* OpenID Connect Authentication using the Authorization Code grant.
* Partial hot reloading of the authentication strategy. (Everything but the email claim name can be loaded without restarting nodebb)

## How develop

1. Run `npm link` in this directory
1. Go to your nodebb directory and run `npm link nodebb-plugin-fusionauth-oidc`
1. Run `./nodebb build`
1. Run `./nodebb dev`

If you make changes to the plugin you will need to rebuild and reload. You can do this manually or via the UI.
