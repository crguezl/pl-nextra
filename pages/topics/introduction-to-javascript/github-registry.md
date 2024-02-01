
## About GitHub Packages

* [About GitHub Packages](https://help.github.com/en/packages/publishing-and-managing-packages/about-github-packages)


## Configuring npm for use with GitHub Packages

* [Configuring npm for use with GitHub Packages](https://help.github.com/en/packages/using-github-packages-with-your-projects-ecosystem/configuring-npm-for-use-with-github-packages)

### Authenticating with a personal access token

To authenticate by adding your personal access token to your `~/.npmrc file`, edit the `~/.npmrc` file for your project to include the following line, replacing `TOKEN` with your personal access token. Create a new `~/.npmrc` file if one doesn't exist.

```
//npm.pkg.github.com/:_authToken=TOKEN
```

To authenticate by logging in to npm, use the `npm login` command, replacing _USERNAME_ with your GitHub username, _TOKEN_ with your personal access token, and _PUBLIC-EMAIL-ADDRESS_ with your email address.

```
$ npm login --registry=https://npm.pkg.github.com
> Username: USERNAME
> Password: TOKEN
> Email: PUBLIC-EMAIL-ADDRESS
```

It stores the token in the file `~/.npmrc`

If you are using a GitHub Actions workflow, you can use a `GITHUB_TOKEN` to publish and consume packages in GitHub Packages without needing to store and manage a personal access token. For more information, see:

* [Authenticating with the GITHUB_TOKEN](https://help.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token)

### Publishing a Package

By default, GitHub Packages publishes a package in the GitHub repository you specify in the `name` field of the _package.json_ file. For example, you would publish a package named 

`"name": "@my-org/test"` 

to the 

`my-org/test` GitHub repository. 

You can add a summary for the package listing page by including a _README.md_ file in your package directory. For more information, see 

* "[Working with package.json](https://docs.npmjs.com/getting-started/using-a-package.json)" and 
* "[How to create Node.js Modules](https://docs.npmjs.com/getting-started/creating-node-modules)" 
  
in the npm documentation.