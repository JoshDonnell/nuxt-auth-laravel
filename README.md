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
// other config options listed below

or

nuxt.config.ts
laravel {
    baseUrl: 'http://localhost:8000'
    // other config options listed below
}
```

That's it! You can now use Nuxt Laravel Auth in your Nuxt app ✨

See below for a full list of config setting that are acepted by Nuxt Laravel auth

## Using the Module

Here is a list of all of the built in composeables for this module:

### useLaravelAuth

Login with email method

```ts
const { handleLoginWithEmail } = useLaravelAuth();
const handleFormSubmit = () => {
  handleLoginWithEmail({
    email: "hello@world.com",
    password: "mypassword",
    remember: false,
  });
};
```

Register with email method

```ts
const { handleRegisterWithEmail } = useLaravelAuth();
const handleFormSubmit = () => {
  handleRegisterWithEmail({
    name: "John Doe",
    email: "hello@world.com",
    password: "mypassword",
    password_confirmation: "mypassword",
  });
};
```

Logout from account method

```ts
const { handleLogout } = useLaravelAuth();
const handleLogoutButtonClick = () => {
  handleLogout();
};
```

Forgot Password method

```ts
const { handleForgotPassword } = useLaravelAuth();
const handleFormSubmit = () => {
  handleRegisterWithEmail({
    email: "hello@world.com",
  });
};
```

Reset Password Method

```ts
const { handleResetPassword } = useLaravelAuth();
const handleFormSubmit = () => {
  handleResetPassword({
    token: route.params.token,
    email: route.query.email,
    password: "mypassword",
    password_confirmation: "mypassword",
  });
};
```

Social Login

```ts
const { handleSocialAuth } = useLaravelAuth();
const handleFormSubmit = () => {
  handleSocialAuth("google");
};
```

### useLaravelUser

Get the current user

```ts
const user = useLaravelUser<T>(); // We can pass T as a custom user type when retuning extra data from Laravel
```

### useLaravelRequest && useAsyncLaravelRequest

Basic Laravel request example

```ts
const { data } = await useLaravelRequest<LaravelResponse<Team[]>>(
  "/api/teams", // endpoint
  {} // fetch options
);
```

Async Laravel request example - using useAsyncData under the hood

```ts
const { data, laravelErrors, laravelMessage, error, status, refresh } =
  await useAsyncLaravelRequest<LaravelResponse<Team[]>>(
    "/api/teams", // endpoint
    "test", // key
    {} // fetch options
  );
```

### useLaravelPagination

```ts
const pages = useLaravelPagination(total: number, perPage: number, currentPage: number)
```

## Configuring the module

Here is a list of all the options that can be passed into the Nuxt Config or via the .env file.

| Nuxt Config                    | env                              | type   | default              | Required |
| ------------------------------ | -------------------------------- | ------ | -------------------- | -------- |
| baseUrl                        | LARAVEL_URL                      | string |                      | yes      |
| CSRFurl                        | LARAVEL_CSRF_URL                 | string | /sanctum/csrf-cookie | no       |
| cookieToken                    | LARAVEL_COOKIE_TOKEN             | string | XSRF-TOKEN           | no       |
| requestToken                   | LARAVEL_REQUEST_TOKEN            | string | X-XSRF-TOKEN         | no       |
| authBaseUrl                    | LARAVEL_AUTH_URL                 | string | baseUrl              | no       |
| authCSRFurl                    | LARAVEL_AUTH_CSRF_URL            | string | CSRFurl              | no       |
| authCookieToken                | LARAVEL_AUTH_COOKIE_TOKEN        | string | cookieToken          | no       |
| authRequestToken               | LARAVEL_AUTH_REQUEST_TOKEN       | string | requestToken         | no       |
| authLoginUrl                   | LARAVEL_AUTH_LOGIN_URL           | string | /login               | no       |
| authRegisterUrl                | LARAVEL_AUTH_REGISTER_URL        | string | /register            | no       |
| authLogoutUrl                  | LARAVEL_AUTH_LOGOUT_URL          | string | /logout              | no       |
| authForgotPasswordUrl          | LARAVEL_AUTH_FORGOT_PASSWORD_URL | string | /forgot-password     | no       |
| authResetPasswordUrl           | LARAVEL_AUTH_RESET_PASSWORD_URL  | string | /reset-password      | no       |
| authVerifyUrl                  | LARAVEL_AUTH_VERIFY_URL          | string | /email/verify        | no       |
| authProviders.authGoogleUrl    | LARAVEL_AUTH_GOOGLE_URL          | string |                      | no       |
| authProviders.authAppleUrl     | LARAVEL_AUTH_APPLE_URL           | string |                      | no       |
| authProviders.authFacebookUrl  | LARAVEL_AUTH_FACEBOOK_URL        | string |                      | no       |
| authProviders.authTwitterUrl   | LARAVEL_AUTH_TWITTER_URL         | string |                      | no       |
| authProviders.authLinkedinUrl  | LARAVEL_AUTH_LINKEDIN_URL        | string |                      | no       |
| authProviders.authGithubUrl    | LARAVEL_AUTH_GITHUB_URL          | string |                      | no       |
| authProviders.authGitlabUrl    | LARAVEL_AUTH_GITLAB_URL          | string |                      | no       |
| authProviders.authBitbucketUrl | LARAVEL_AUTH_BITBUCKET_URL       | string |                      | no       |
| authProviders.authSlackUrl     | LARAVEL_AUTH_SLACK_URL           | string |                      | no       |

## Contribution

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

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/nuxt-auth-laravel/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-auth-laravel
[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-auth-laravel.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-auth-laravel
[license-src]: https://img.shields.io/npm/l/nuxt-auth-laravel.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-auth-laravel
[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
