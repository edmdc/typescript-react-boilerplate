# React Typescript App Boilerplate

A slightly opinionated React app boilerplate. It includes SASS and TypeScript support. The following is a
a brief look at the steps undertaken to create this boilerplate for those curious to see the behind the scenes
of common CLI tools provided by various frameworks. I use React here, but the concepts should easily translate to other
frameworks after some research of required packages. **This is still a work in progress.**

## Abstract

Webpack is at the core of how many different frameworks starter boilerplates are bundled together. Webpack is extremely
configurable with sensible defaults, but can be an intimidating tool to begin to understand. The following just begins
to scratch the surface of the possibilites. The front-end ecosystem is constantly changing, so I believe it is important 
to understand the abstractions created by frameworks to quickly adapt to different frameworks, utilize them to their 
full-potential, and know when/how to depart from them. 


## Process

1. Create project directory & initialize project

```zsh
$ take ts-react-boilerplate && yarn init
```

`take <project-name>` is a helpful command available in some terminals. It combines
the following commands `mkdir <project-name> && cd <project-name>`. Try these commands
with your project's name if `take` does not work.

`yarn init` initializes your project and will prompt you for general information
like name, author, repository url, etc. Add these, if you have them or want to
explore the options.  Optionally, add a `-y` flag after `init` to accept project
default values.  This command will create a `package.json` file in the root directory
to keep track of project dependencies. This file is also where project cli
commands will be defined.

**Note:** *I'm using `yarn` here, but `npm` can also be used if that's your
prefered package manager. Generally, `yarn add` equates to `npm install`
(shorthand: `npm i`).*

Before we move on let's begin to track our progress with git. For now, just run `git init`
on your terminal. More steps on attaching a new repo later.

2. Add Webpack & Typescript dependencies.

```zsh
$ yarn add -D typescript ts-node webpack webpack-cli webpack-dev-server @types/webpack @types/webpack-dev-server
```

- Typescript is gaining popularity for it's ability to help developers scale projects
by adding static types to vanilla Javascript. More information
<a href="https://www.typescriptlang.org/" target="_blank">here</a>.

- Despite the initial learning curve, typescript is a nice add on as built-in tooling
enhances auto-completion in most editors.

- `ts-node` allows for TS execution and REPLs in node.js environments i.e. terminals.
With this package installed, webpack configuration files can be created using
`.ts` extension and the Typescript compiler will be able to help where this
tutorial fails to do so.

- `webpack`: Webpack is one of the most popular bundling tools in the modern
Javascript environment, and its at the core of CRA projects. Diving into Webpack
can be a daunting task, but <a href="https://webpack.js.org/concepts/" target="_blank">
here's</a> some high-level concepts that are worth glancing over. This article
will begin to work with some of these concepts.

- `webpack-cli`: This package adds the scripts that will compile our code to our
project.

- `webpack-dev-server`: A development server configured to live reload and write
our assets in-memory for faster development.

- <a href="https://github.com/DefinitelyTyped/DefinitelyTyped"
target="_blank">DefinitelyTyped</a> is a community project that aims to provide
types for popular npm packages. These packages are preceded by `@types`. To
check if a type package exist for a package visit <a href="https://www.typescriptlang.org/dt/search?search="
target="_blank">TypeSearch</a>.

3. Define TS compiler options/configuration

    - Create a `tsconfig.json` file in your root directory, and add the following

    ```json
        {
          "compilerOptions": {
            "lib": ["dom", "esnext"],
            "allowJs": true,
            "skipLibCheck": true,
            "esModuleInterop": true,
            "strict": true,
            "forceConsistentCasingInFileNames": true,
            "moduleResolution": "node",
            "resolveJsonModule": true,
            "isolatedModules": true,
            "noEmit": true,
            "jsx": "react"
          },
          "include": ["src"],
          "exclude": ["node_modules", "dist"]
        }
    ```

    - This is a basic and opinionated configuration that should allow for an
    easier transition into Typescript. Here are some quick explanations:

      - `lib`: Allows use of `document.<DOM property/method>` and JS latests
      features.
      - `allowJs`: Allows use of good ol' JS files. Maybe helpful if transitioning
      an old project to typescript or just getting started with it.
      - `skipLibCheck`: Skips type checking of dependencies; Sacrifices type safety
      for development speed.
      - `esModuleInterop`: Allows for straigthforward imports when no default export
      exists. Helpful with third party libraries, but more a personal preference.
      Ex:

          ```typescript
          // default
          import * as React from 'react'
          // when true
          import React from 'react'
          ```

      - `strict`: Stronger type guarantees. Not required.
      - `forceConsistentCasingInFileNames`: More helpful if working in bigger teams.

      The following are helpful in configuring the project with TS and using Webpack
      to compile our code.

      - `moduleResolution`: Mimics Node.js module resolution mechanism at runtime.
      - `resolveJsonModule`: Allows importing JSON files as modules.
      - `isolatedModules`: Better type checking when using other transpilers, like
      Babel.
      - `noEmit`: TS compiler wont emit any build files. Webpack will do this
      instead.
      - `jsx`: Allows use of JSX syntax in React.
      - `include` & `exclude`: Directs compiler on where/what to type check or avoid,
      respectively.

4. Add React dependencies.

      ```zsh
      yarn add react react-dom
      ```

    - You'll notice that the `-D` was not included, this is because our
    production build will still require access to React, where as Webpack and
    Typescript are only needed by the developer. This is a common practice to keep
    production bundles small and therefore more performant.

    ```zsh
    yarn add -D @types/react @types/react-dom
    ```

    - As previously seen typed packages are development dependencies since type checking
    is only required during development.

5. JavaScript is still maturing and the newest features are not always supported
  by browsers. We can avoid troubles by adding Babel as our JavaScript compiler.
  It essentially translates our code into backwards compatible code that browsers
  can understand. Here's the [Babel documentation](https://babeljs.io/docs/en/)
  for more information. For now, run these commands:

  ```zsh
  yarn add -D @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript babel-loader @babel/plugin-proposal-class-properties @babel/plugin-proposal-object-rest-spread
  ```

- `@babel/core` is the base package from which we will build our compiler
to translate our code to a backward-compatible version.
- `@babel/preset-env` simplifies our lives by processing the environment in
which our code is running and compiling the code accordingly. No need to
micro-manage different browser environments :).
- `@babel/preset-react`, along with further configurations, will inform Babel
that it's executing within a React environment, and transpile our jsx expression
into browser compatible JS functions.
- `@babel/preset-typescript`, without this preset Babel would not recognize TS syntax.
- `@babel/plugin-proposal-class-properties` is a babel plug in that allows to
declare class methods with arrow functions. Simplifies the use of `this` in classes.
- `@babel/plugin-proposal-object-rest-spread` Allows us to use spread and rest operators
with objects, a newer JS feature that's quite handy.
- `babel-loader`: Webpack uses loaders to pre-process files as they are "loaded"
(a.k.a. imported). This will allow Webpack to load and transpile code using Babel.

In order for Babel to use the presets and plugins, it must be configured using
a `.babelrc`. Create the file in the root directory with the following:

```
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react",
    "@babel/preset-typescript"
  ],
  "plugins": ["@babel/plugin-proposal-class-properties"]
}
```

**Note:** *The order in which presets are entered matters, because they run last to first,
mostly to ensure backward compatibility.*

6. Next up is our ESlint, a JS linter that helps developers write consistent,
  bug-free code. Here's a more in-depth [explanation](https://eslint.org/docs/about/).
  Just like babel requires additional plugins to work inside a React environment,
  we'll need to install a number of packages for ESlint to work. Thankfully, we
  can find all the required packages [here](https://www.npmjs.com/package/eslint-config-react-app).
  Here are the commands:

        yarn add -D @typescript-eslint/eslint-plugin @typescript-eslint/parser babel-eslint eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks
