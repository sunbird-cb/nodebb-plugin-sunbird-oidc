# NodeBB FusionAuth OpenID Connect

This plugin allows you to connect to and OpenID provider (not just FusionAuth).

## Installation

To install it go to your nodebb instance and search for `OpenID Connect`

## Features

* OpenID Authentication
* Partial hot reloading of the authentication strategy. (Everything but the email claim name can be loaded without restarting nodebb)

## How develop

1. Run `npm link` in this directory
1. Go to your nodebb directory and run `npm ink nodebb-plugin-fusionauth-oidc`
1. Run `./nodebb build`
1. Run `./nodebb dev`

If you make changes to the plugin you will need to rebuild and reload. You can do this manually or via the UI.
