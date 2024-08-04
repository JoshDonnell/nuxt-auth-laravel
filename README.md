<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: Nuxt Laravel Auth
- Package name: nuxt-auth-laravel
- Description: My new Nuxt module
-->

# Nuxt Laravel Auth

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

A Nuxt module is used to manage authentication and data from Laravel. Features include full sanctum and passport support with support for separate auth and data apps which can be used when running a separate SSO application.

- [✨ &nbsp;Release Notes](/CHANGELOG.md)
  <!-- - [🏀 Online playground](https://stackblitz.com/github/your-org/nuxt-auth-laravel?file=playground%2Fapp.vue) -->
  <!-- - [📖 &nbsp;Documentation](https://example.com) -->

## Features

<!-- Highlight some of the features your module provide here -->

- Sanctum Auth support
- Socialite Social Auth support
- Supports seperate data and SSO apps
- Included pagination handler
- Laravel Error Handler
- SSR support
- Full Typescript support

## Quick Setup

1. Install the module to your Nuxt application with one command:

```bash
npx nuxi module add auth-laravel
```

2.Add variables to .env or nuxt.config

```bash
.env
LARAVEL_BASE_URL='http://localhost:8000'

nuxt.config.ts
laravel {
    baseUrl: 'http://localhost:8000'
}
```

That's it! You can now use Nuxt Laravel Auth in your Nuxt app ✨

See below for a full list of config setting that are acepted by Nuxt Laravel auth

## Coming Soon

A full feature guide and docs are coming very soon...

## Contribution

<details>
  <summary>Local development</summary>
  
  ```bash
  # Install dependencies
  npm install
  
  # Generate type stubs
  npm run dev:prepare
  
  # Develop with the playground
  npm run dev
  
  # Build the playground
  npm run dev:build
  
  # Run ESLint
  npm run lint
  
  # Run Vitest
  npm run test
  npm run test:watch
  
  # Release new version
  npm run release
  ```

</details>

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-auth-laravel/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-auth-laravel
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-auth-laravel.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-auth-laravel
[license-src]: https://img.shields.io/npm/l/nuxt-auth-laravel.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-auth-laravel
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
