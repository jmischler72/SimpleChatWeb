# SimpleChatWeb

## What is it ?
This application is a simple messaging app using Vue Js and Firebase
. 

The two main functionality are : 
- Connect with a name as guest or with a Google account
- Send messages to everyone on the chat room

## Packages and tools used

- <strong>Tailwind CSS</strong> - Allow for quicker CSS writing
- <strong>Flowbite</strong> - Provide useful and reusable components
- [v0.dev](https://v0.dev/) - AI for HTML/CSS components
  - Some components were generated and tweaked to make them functional

## Firebase Services

The app uses two services from Firebase :

- <strong>Realtime Database </strong>: To store the messages along with user infos from the poster
-  <strong>Hosting </strong>: To deploy the website publicly

## Tenor API

In order to show and allow users to send GIFs from the _GifPicker_, this app uses the tenor API

The documentation is available at :
- https://developers.google.com/tenor/guides/quickstart?hl=fr

---
# Vue Readme
This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin) to make the TypeScript language service aware of `.vue` types.

If the standalone TypeScript plugin doesn't feel fast enough to you, Volar has also implemented a [Take Over Mode](https://github.com/johnsoncodehk/volar/discussions/471#discussioncomment-1361669) that is more performant. You can enable it by the following steps:

1. Disable the built-in TypeScript Extension
    1) Run `Extensions: Show Built-in Extensions` from VSCode's command palette
    2) Find `TypeScript and JavaScript Language Features`, right click and select `Disable (Workspace)`
2. Reload the VSCode window by running `Developer: Reload Window` from the command palette.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
