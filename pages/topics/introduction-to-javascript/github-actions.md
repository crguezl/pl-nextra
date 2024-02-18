---
title:  "GitHub Actions: An Introduction"
---


Github Actions enables you to create custom software development lifecycle workflows directly in your Github repository. These workflows are made out of different tasks so-called actions that can be run automatically on certain events.

This enables you to include Continues Integration (CI) and continuous deployment (CD) capabilities and many other features directly in your repository.

For instance, at any time during this course each student  has two active automatic kanban project boards: 
1. one we call *global* where you insert an issue per lab assignment and 
2. another for the *current lab* with moving issues corresponding to the items in the published requirements/signature. 
3. Once the teacher has reviewed your work for the current lab you have to close not only the lab issue but all the issues in the current board. 

This is an example of workflow.

We can conceive a GitHub Action to automate the last part of this workflow such that when you close the issue in your student board all the issues in the repo board are automatically closed.

Here is a brief glossary of terms (for more see [Core concepts for GitHub Actions](https://help.github.com/en/actions/getting-started-with-github-actions/core-concepts-for-github-actions)):

## Workflow

A **Workflow** is an automated process that is made up of one or multiple **jobs** and can be triggered by an **event**. 

Workflows are defined using a YAML file in the `.github/workflows` directory.
Workflows can be created inside the `.github/workflows` directory by adding a `.yml` workflow file. 
Here in the terminal we do:

```
$ mkdir -p .github/workflows
$ touch .github/workflows/nodejs.yml
```

and use our favourite editor.

Example:

```yml
name: Node.js Package
on:
  release:
    types: [created]
jobs:
  build:
    ...
  publish-npm:
    ...
  publish-gpr:
    needs: build
    ...
```


## Editing Github Actions

To manage GitHub Actions from Visual Studio we can install the extension [GitHub Actions](https://marketplace.visualstudio.com/items?itemName=cschleiden.vscode-github-actions)

![](/assets/images/github-actions-vscode-extension.png)

To use it, you have to [authorize the VsCode extension to access your GitHub acount](https://github.com/cschleiden/vscode-github-actions/issues/66)

![](/assets/images/authorizing-vscode-extensions.jpg)


We can also use the online GitHub Interface. 

The Github Actions Editor is quite clever:  Auto-complete can be triggered with **Ctrl+Space** almost anywhere. 

![](https://i2.wp.com/user-images.githubusercontent.com/50486/65709573-66239b00-e091-11e9-8d8b-339e30b85072.gif?resize=623%2C430&ssl=1)

Auto-complete works even inside [expressions](https://help.github.com/en/articles/contexts-and-expression-syntax-for-github-actions)

![](https://i1.wp.com/user-images.githubusercontent.com/50486/65709600-76d41100-e091-11e9-9396-d75e08d6744e.png?resize=1028%2C510&ssl=1)

## Job

A **job** is made up of multiple **steps** and runs in an instance of the virtual environment. Jobs can 

- run independently of each other or 
- sequential if the current job depends on the previous job to be successful.

Example:

```yml
name: Node.js Package

on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 12
      - run: npm ci
      - run: npm test

  publish-npm:
    needs: build
    runs-on: ubuntu-latest
    steps:
      ...
  publish-gpr:
    needs: build
    runs-on: ubuntu-latest
    steps:
      ...
```

The `needs` attribute inside the `publish-npm` job tell us that this job 
can not start until the `build` step has finished

## Step

A **step** is an individual task that can run commands in a job. A step can be either 
* an action or 
* a shell command. 

Each step in a job executes on the same runner, allowing the actions in that job to share data with each other.

Example:

```yml
name: Node.js Package
on:
  release:
    types: [created]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2  # An action
      - uses: actions/setup-node@v1
        with:
          node-version: 12
      - run: npm ci      # A command
      - run: npm test
 ``` 

The `run` keyword tells the job to execute a command on the [runner](#runner). In this case, you are using `run: npm test` to run  the tests in your package

## Actions

**Actions** are the smallest portable building block of a workflow and can be combined as **steps** to create a **job**. 

Here is another example:

```yaml
name: learn-github-actions
on: [push]
jobs:
  check-bats-version:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
      - run: npm install -g bats
      - run: bats -v
```

* The `uses: actions/checkout@v2`  tells the job to retrieve `v2` of the community action named `actions/checkout@v2`. 
  - This is an action that checks out your repository and downloads it to the runner, allowing you to run actions against your code (such as testing tools). 
  - You must use the `checkout` action any time your workflow will run against the repository's code
* The `uses: actions/setup-node@v1`  installs the node software package on the runner, giving you access to the `npm` command.
* You can create your own Actions 
* or use publicly [shared Actions from the Marketplace](https://github.com/marketplace?type=actions)

### Types of Actions

There are two types of actions:

1. Docker container and 
2. JavaScript actions

Docker **container actions** allow the environment to be packaged with the GitHub Actions code and can only execute in the GitHub-Hosted Linux environment.

**JavaScript actions** decouple the GitHub Actions code from the environment allowing faster execution but accepting greater dependency management responsibility.

Actions require a metadata file to define the 

1. inputs, 
2. outputs and 
3. main entrypoint 

for your action. 

The metadata filename must be either `action.yml` or `action.yaml`.

<table>
<thead>
<tr>
<th>Type</th>
<th>Operating system</th>
</tr>
</thead>
<tbody>
<tr>
<td>Docker container</td>
<td>Linux</td>
</tr>
<tr>
<td>JavaScript</td>
<td>Linux, MacOS, Windows</td>
</tr>
</tbody>
</table>


* Here you can find instructions [if you want to develop an action for other people to use](https://help.github.com/en/actions/building-actions/about-actions)

* Here is an example of an action: [actions/create-release](https://github.com/actions/create-release)

## Event

**Events** are specific activities that trigger a workflow run. For example, a workflow is triggered when somebody pushes to the repository or when a pull request is created. Events can also be configured to listen to external events using [Webhooks](https://docs.github.com/en/developers/webhooks-and-events/about-webhooks).

Example of Webhook: When you install Travis in your repo a webhook is installed on push so that Travis will know when you push to your repo. 

See also [Git Hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)


### The `release` event

* See [GitHub Releases](/assets/topics/introduction-to-javascript/releases)

## Runner

A **runner** is a machine with the [Github Actions `runner` application](https://github.com/actions/runner) installed. 

1. A `runner` waits for available **jobs** it can then execute. 
2. After picking up a job they run the job's **actions** and report the progress and results back to Github. 
3. Runners can [be hosted on Github](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners) or self-hosted on your own machines/servers.

## Syntax of the .yml File

Github Actions files are written using YAML syntax and have either a `.yml` or `.yaml` file extension. Here are the most important concepts for the workflow file.

### Name:

The name of your workflow that is displayed on the Github actions page. If you omit this field, it is set to the file name.

```
name: CI for scapegoat module
```

### On:

The `on` keyword defines the Github events that trigger the workflow. You can provide a single event, array or events or a configuration map that schedules a workflow.

```
on: push
```

or

```
on: [pull_request, issues]
```

You can set up the workflow to only run on certain branches, paths, or tags. 
For syntax examples including or excluding branches, paths, or tags, see [Workflow syntax for GitHub Actions](https://docs.github.com/actions/reference/workflow-syntax-for-github-actions#onpushpull_requestpaths)

For instance, the example below runs anytime the `push` event includes a file in the `sub-project` directory or its subdirectories, unless the file is in the `sub-project/docs` directory. 

```yaml
on:
  push:
    paths:
    - 'sub-project/**'
    - '!sub-project/docs/**'
```


For example, a `push` that changed `sub-project/index.js` or `sub-project/src/index.js` will trigger a workflow run, but a `push` changing only `sub-project/docs/readme.md` will not.

### Jobs:

A workflow run is made up of one or more jobs. Jobs define the functionality that will be run in the workflow and run in parallel by default.  

```yml
jobs: 
    ci-scapegoat:
    # Define the OS our workflow should run on
    runs-on: ubuntu-latest

    strategy:
        # To test across multiple language versions
        matrix:
        node-version: [12.x]

    steps: # Clone the repo. See https://github.com/actions/checkout
    - uses: actions/checkout@v2
    # Example of using an environment variable
    - name: Use Node.js ${{ matrix.node-version }} # Will be: "Use Node.js 12.x"
        uses: actions/setup-node@v1 # Install node. See https://github.com/actions/setup-node
        with:
        node-version: ${{ "{{ matrix.node-version" }} }}
    # Install a project with a clean slate
    - run: npm ci
    - run: npm test
        # Environment variables
        env:
          CI: true
```

### Env:

**Env** defines a map of environment variables that are available to all jobs and steps in the workflow. You can also set environment variables that are only available to a job or step. Here is a simple example taken from the [GitHub docs on Environment Variables](https://docs.github.com/es/actions/reference/environment-variables)

```yaml
jobs:
  weekday_job:
    runs-on: ubuntu-latest
    env:
      DAY_OF_WEEK: Mon
    steps:
      - name: "Hello world when it's Monday"
        if: env.DAY_OF_WEEK == 'Mon'
        run: echo "Hello $FIRST_NAME $middle_name $Last_Name, today is Monday!"
        env:
          FIRST_NAME: Mona
          middle_name: The
          Last_Name: Octocat
  CI: true
```

There are [lots of default environment variables set by GitHub](https://docs.github.com/es/actions/reference/environment-variables#default-environment-variables)

### steps.with

A map of the `input` parameters defined by the action. 
Each `input` parameter is a `key/value` pair. 

Input parameters are set as environment variables. 

The variable is prefixed with `INPUT_` and converted to upper case.

**Example**

Defines the three input parameters (`first_name`, `middle_name`, and `last_name`) 
defined by the `hello_world` action. 

These input variables will be accessible to the `hello-world` action as `INPUT_FIRST_NAME`, `INPUT_MIDDLE_NAME`, and `INPUT_LAST_NAME` environment variables.

```yml
jobs:
  my_first_job:
    steps:
      - name: My first step
        uses: actions/hello_world@master
        with:
          first_name: Mona
          middle_name: The
          last_name: Octocat    
```

## Expression Syntax

You can use expressions to programmatically set variables in workflow files and access contexts. 

```
${{ "{{ <expression>" }} }}
```

You can combine literals, context references, and functions using **operators**.

An expression can be any combination of 

### literal values, 

```
env:
    myNull: ${{ null }}
    myBoolean: ${{ false }}
    myIntegerNumber: ${{ 711 }}
    myFloatNumber: ${{ -9.2 }}
    myHexNumber: ${{ 0xff }}
    myExponentialNumber: ${{ -2.99-e2 }}
    myString: ${{ 'Mona the Octocat' }}
    myEscapedString: ${{ 'It''s open source!' }}
```


### Operators

<table>
    <thead>
    <tr>
    <th>Operator</th>
    <th>Description</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td><code>( )</code></td>
    <td>Logical grouping</td>
    </tr>
    <tr>
    <td><code>[ ]</code></td>
    <td>Index</td>
    </tr>
    <tr>
    <td><code>.</code></td>
    <td>Property dereference</td>
    </tr>
    <tr>
    <td><code>!</code></td>
    <td>Not</td>
    </tr>
    <tr>
    <td><code>&lt;</code></td>
    <td>Less than</td>
    </tr>
    <tr>
    <td><code>&lt;=</code></td>
    <td>Less than or equal</td>
    </tr>
    <tr>
    <td><code>&gt;</code></td>
    <td>Greater than</td>
    </tr>
    <tr>
    <td><code>&gt;=</code></td>
    <td>Greater than or equal</td>
    </tr>
    <tr>
    <td><code>==</code></td>
    <td>Equal</td>
    </tr>
    <tr>
    <td><code>!=</code></td>
    <td>Not equal</td>
    </tr>
    <tr>
    <td><code>&amp;&amp;</code></td>
    <td>And</td>
    </tr>
    <tr>
    <td><code>||</code></td>
    <td>Or</td>
    </tr>
    </tbody>
</table>

### functions 

[GitHub offers a set of built-in functions](https://help.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#functions)

Example:

```
format('Hello {0} {1} {2}', 'Mona', 'the', 'Octocat')
```

Returns `'Hello Mona the Octocat'`

`contains('Hello world', 'llo')` returns `true`

### The if Keyword and Functions to Check Job Status

Expressions are commonly used with the conditional **if** keyword 
in a workflow file to determine whether a step should run. 


When you use expressions in an `if` conditional, 
you do not need to use the expression syntax (<span v-pre>`${{ }}`</span>) 
because GitHub automatically evaluates the `if` conditional as an expression.
 
For more information about if conditionals, see "[Workflow syntax for GitHub Actions](https://help.github.com/en/articles/workflow-syntax-for-github-actions/#jobsjob_idif)."

Example expression in an `if` conditional

```yml
steps:
  - name: Git checkout
    if: github.event.check_suite.app.name == 'Netlify' && github.event.check_suite.conclusion == 'success'
    uses: actions/checkout@master

  - name: Install Node
    if: success()
    uses: actions/setup-node@v1
    with:
      node-version: 10.x

  - name: Install npm dependencies
    if: success()
    run: npm install

  - name: Run Audit
    if: success()
    uses: ./.github/actions/run-audit
```

`success()` returns `true` when none of the previous steps have failed or been canceled.

See [Job status check functions](https://help.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#job-status-check-functions)

### Object Filters

You can use the `*` syntax to apply a filter and select matching items in a collection:


```js
[
  { "name": "apple", "quantity": 1 },
  { "name": "orange", "quantity": 2 },
  { "name": "pear", "quantity": 1 }
]
```

The filter `fruits.*.name` returns the array `[ "apple", "orange", "pear" ]`

Here is another example:

```
contains(github.event.issue.labels.*.name, 'bug')
```

will be `true` if the attribute `name` of one of the labels of the issue that 
has triggered the event is `'bug'`

## Contexts 

**Contexts** are a way to access information about workflow runs, runner environments, jobs, and steps. Contexts use the **expression syntax**. See [Context and expression syntax for GitHub Actions](https://help.github.com/en/actions/reference/context-and-expression-syntax-for-github-actions#contexts) at the GitHub Actions Reference.

```
${{ "{{ <context>" }} }}
```

### Matrix Context

The **matrix context** enables access to the matrix parameters you configured for the current job. 

For example, if you configure a matrix build with the os and node versions, the matrix context object includes the os and node versions of the current job.

### GitHub Context

The **github context**  contains information about 

* the workflow run and 
* the event that triggered the run. 

You can read most of the github context data in environment variables.

for example, `github.ref`contains the branch or tag ref that triggered the workflow run

### Env Context

The **env context** contains environment variables that have been set in a workflow, job, or step. 

This context changes for each step in a job. 
You can access this context from any step in a job.


### Steps Context

The **steps context** contains information about the steps in the current job that have already run.

Here is a more complex [example using step information and functions](https://github.com/rusnasonov/vscode-hugo/blob/master/.github/workflows/build.yml)

```yml
...
- name: save vsix
      uses: actions/upload-artifact@master
      with:
        name: ${{ format('vscode-hugo-{0}-{1}.vsix', steps.build_package.outputs.version, github.sha) }}
        path: ${{ format('vscode-hugo-{0}.vsix', steps.build_package.outputs.version) }}
```

### The Runner Context

The **runner context** contains information about the runner that is executing the current job.

Examples are `runner.os` for the Operating System or `runner.temp` for the path of the temporary directory for the runner. This directory is guaranteed to be empty at the start of each job, even on self-hosted runners.

See an [example of runner context](/assets/topics/introduction-to-javascript/action-files/debug-action-log#runner_context)

### The Strategy Context

The **strategy context** enables access to the configured strategy parameters and information about the current job.

Here is a more complex [example](https://github.community/t5/GitHub-Actions/Create-matrix-with-multiple-OS-and-env-for-each-one/td-p/38339) of strategy:

```yml
jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix:
        include:
          os: macos-latest
            env:
              - TARGET: x86_64-apple-darwin
              - COMPILER: clang
              - LINKER: clang

          os: ubuntu-latest
            env:
              - TARGET: armv7-unknown-linux-musleabihf
              - COMPILER: arm-linux-gnueabihf-gcc-5
              - LINKER: gcc-5-arm-linux-gnueabihf

          os: ubuntu-latest
            env:
              - TARGET: x86_64-unknown-linux-musl
              - COMPILER: gcc
              - LINKER: gcc
```

Strategy parameters include fail-fast, job-index, job-total, and max-parallel. [Here is the output for the](/assets/topics/introduction-to-javascript/action-files/debug-action-log#strategy_context)
[Debugging Context to the log](#debugging-context-to-the-log-file) example

### The Secrets Context

The **secrets context** access to secrets set in a repository. See [Creating and storing encrypted secrets](https://help.github.com/en/actions/configuring-and-managing-workflows/creating-and-storing-encrypted-secrets). 

#### Creating a Secret

To create a secret:

*   On GitHub, navigate to the main page of the repository.
    
*   Under your repository name, click **Settings**.
    
    ![Repository settings button](https://help.github.com/assets/images/help/repository/repo-actions-settings.png)
    
*   In the left sidebar, click **Secrets**.
    
*   Type a name for your secret in the "Name" input box.
    
*   Type the value for your secret.
    
*   Click **Add secret**.

#### Using a Secret

To use a secret:

```yml
steps:
  - name: Hello world action
    with: # Set the secret as an input
      super_secret: {{ "${{ secrets.SuperSecret" }} }}
    env: # Or as an environment variable
      super_secret: {{ "${{ secrets.SuperSecret" }} }}
```

#### Creating a secret with gh 

```
➜ git:(master) gh help secret
Secrets can be set at the repository, or organization level for use in
GitHub Actions or Dependabot. User secrets can be set for use in GitHub Codespaces.
Environment secrets can be set for use in GitHub Actions.
Run "gh help secret set" to learn how to get started.


USAGE
  gh secret <command> [flags]

CORE COMMANDS
  list:        List secrets
  remove:      Remove secrets
  set:         Create or update secrets

FLAGS
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
``` 

```
➜  egg-interpreter-daniel-hernandez-de_leon-alu0101331720 git:(master) ✗ gh secret set --help
Set a value for a secret on one of the following levels:
- repository (default): available to Actions runs or Dependabot in a repository
- environment: available to Actions runs for a deployment environment in a repository
- organization: available to Actions runs or Dependabot within an organization
- user: available to Codespaces for your user

Organization and user secrets can optionally be restricted to only be available to
specific repositories.

Secret values are locally encrypted before being sent to GitHub.


USAGE
  gh secret set <secret-name> [flags]

FLAGS
  -a, --app string           Set the application for a secret: {actions|codespaces|dependabot}
  -b, --body string          The value for the secret (reads from standard input if not specified)
  -e, --env environment      Set deployment environment secret
  -f, --env-file file        Load secret names and values from a dotenv-formatted file
      --no-store             Print the encrypted, base64-encoded value instead of storing it on Github
  -o, --org organization     Set organization secret
  -r, --repos repositories   List of repositories that can access an organization or user secret
  -u, --user                 Set a secret for your user
  -v, --visibility string    Set visibility for an organization secret: {all|private|selected} (default "private")

INHERITED FLAGS
      --help                     Show help for command
  -R, --repo [HOST/]OWNER/REPO   Select another repository using the [HOST/]OWNER/REPO format
```

##### EXAMPLES

```
  # Paste secret value for the current repository in an interactive prompt
  $ gh secret set MYSECRET

  # Read secret value from an environment variable
  $ gh secret set MYSECRET --body "$ENV_VALUE"

  # Read secret value from a file
  $ gh secret set MYSECRET < myfile.txt

  # Set secret for a deployment environment in the current repository
  $ gh secret set MYSECRET --env myenvironment

  # Set organization-level secret visible to both public and private repositories
  $ gh secret set MYSECRET --org myOrg --visibility all

  # Set organization-level secret visible to specific repositories
  $ gh secret set MYSECRET --org myOrg --repos repo1,repo2,repo3

  # Set user-level secret for Codespaces
  $ gh secret set MYSECRET --user

  # Set repository-level secret for Dependabot
  $ gh secret set MYSECRET --app dependabot

  # Set multiple secrets imported from the ".env" file
  $ gh secret set -f .env
```

#### Example: A GitHub Action to Publish a npm Package

For example, to write a github action to publish a npm package in the npm registry
I surely need to give GitHub a token so that it can work on my name and publish 
the package. Thus, the procedure will be:


* You create a token for npm with [npm token create](https://docs.npmjs.com/creating-and-viewing-authentication-tokens) with read and publish permits:
   
   ```
    [~/.../lexer-generator(master)]$ npm token create
    npm password:
    ┌────────────────┬──────────────────────────────────────┐
    │ token          │ blah-blah-blah-blah-blahblahblah     │
    ├────────────────┼──────────────────────────────────────┤
    │ cidr_whitelist │                                      │
    ├────────────────┼──────────────────────────────────────┤
    │ readonly       │ false                                │
    ├────────────────┼──────────────────────────────────────┤
    │ created        │ 2020-03-30T15:39:01.799Z             │
    │ created        │ 2020-03-30T15:39:01.799Z             │
    └────────────────┴──────────────────────────────────────┘
  ```


* Then you set the secret token in the secrets section of your repo with name for example `NPM_TOKEN`

Finally, make the secret accessible to the GitHub Action via the `secrets` context:


```yml
name: Node.js Package
on:
  release:
    types: [created]
jobs:
  build:
    ...
  publish-npm:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 12
          registry-url: https://registry.npmjs.org/
      - run: npm ci
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{ "{{secrets.NPM_TOKEN" }} }}
```

This example stores the `NPM_TOKEN` secret in the `NODE_AUTH_TOKEN` environment variable. 

When the `setup-node` action creates an `.npmrc` file, it references the token from the `NODE_AUTH_TOKEN` environment variable.  See [actions/setup-node/README](https://github.com/actions/setup-node/blob/main/README.md#usage)

In the example above, 
the `setup-node` 
action creates an `.npmrc` file on the *runner* with the following contents:

```ini
//registry.npmjs.org/:_authToken=${NODE_AUTH_TOKEN}
registry=https://registry.npmjs.org/
always-auth=true
```

For more details, see also [Publishing packages to the npm registry](https://docs.github.com/en/actions/guides/publishing-nodejs-packages#publishing-packages-to-the-npm-registry)

### Exercise

Extend the lab [npm-module](https://ull-esit-gradoii-pl.github.io/practicas/npm-module) with an action inside the repo `testing-addlogging-aluXXX` to publish the npm package in npmjs after the production tests 
run correctly in several operating systems (for example, `windows-latest`, `mac-os-latest`, `ubuntu-latest`) and different node versions

```yml
jobs: # jobs are made of steps
  build:
    # Define the OS our workflow should run on
    runs-on: ${{ matrix.os }}
    strategy:
      # To test across multiple language versions
      matrix:
        os: [macos-latest, ubuntu-latest, windows-latest ]
        node-version: [12.x, 14.x]
    ...
  ...
```

Here is another example

```yml
jobs:
  build:
    runs-on: ${{ matrix.os }}
    strategy:
      matrix: # A job matrix can generate a maximum of 256 jobs per workflow run
        os:
          - ubuntu-latest
          - macos-latest
          - windows-latest
        node_version:
          - 10
          - 12
          - 14
        architecture:
          - x64
        # an extra windows-x86 run:
        include:
          - os: windows-2016
            node_version: 12
            architecture: x86
    name: Node ${{ matrix.node_version }} - ${{ matrix.architecture }} on ${{ matrix.os }} # The name of the job displayed on GitHub.
    steps:
      - uses: actions/checkout@v2
      - name: Setup node
        uses: actions/setup-node@v2
        with:
          node-version: ${{ matrix.node_version }}
          architecture: ${{ matrix.architecture }}
      - run: npm install
      - run: npm test
  ...
```

See the docs for [jobs.\<job_id\>.strategy.matrix](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions#jobsjob_idstrategymatrix)

### Debugging Context to the log file

To inspect the information that is accessible in each context, you can use this workflow file example.

```
[~/.../scapegoat(master)]$ cat .github/workflows/debug.yml
```

```yml
name: Debugging contexts
on: push

jobs:
  one:
    runs-on: ubuntu-16.04
    steps:
      - name: Dump GitHub context
        env:
          GITHUB_CONTEXT: ${{ toJson(github) }}
        run: echo "$GITHUB_CONTEXT"
      - name: Dump job context
        env:
          JOB_CONTEXT: ${{ toJson(job) }}
        run: echo "$JOB_CONTEXT"
      - name: Dump steps context
        env:
          STEPS_CONTEXT: ${{ toJson(steps) }}
        run: echo "$STEPS_CONTEXT"
      - name: Dump runner context
        env:
          RUNNER_CONTEXT: ${{ toJson(runner) }}
        run: echo "$RUNNER_CONTEXT"
      - name: Dump strategy context
        env:
          STRATEGY_CONTEXT: ${{ toJson(strategy) }}
        run: echo "$STRATEGY_CONTEXT"
      - name: Dump matrix context
        env:
          MATRIX_CONTEXT: ${{ toJson(matrix) }}
        run: echo "$MATRIX_CONTEXT"
```

The  calls `toJSON(value)` return a pretty-print JSON representation of `value`. You can use this function to debug the information provided in contexts.

Here is [an example of output](/assets/topics/introduction-to-javascript/action-files/debug-action-log) of the action above.

#### Exercise

Install and check the former workflow.
Add another step to the former workflow to see the `SECRETS` context. What do you see?

## GITHUB_TOKEN

GitHub automatically creates a **GITHUB_TOKEN** secret to use in your workflow. You can use the `GITHUB_TOKEN` to authenticate in a workflow run.

When you enable GitHub Actions, GitHub installs a [GitHub App](https://docs.github.com/es/github-ae@latest/developers/apps/getting-started-with-apps) on your repository. 

The `GITHUB_TOKEN` secret is a GitHub App installation access token. 

You can use the installation access token to authenticate on behalf of the GitHub App installed on your repository. 

**The token's permissions are limited to the repository that contains your workflow**.

Before each job begins:

1. GitHub fetches an installation access token for the job. 
2. The token expires when the job is finished.

For more see [Authenticating with the GITHUB_TOKEN](https://help.github.com/en/actions/configuring-and-managing-workflows/authenticating-with-the-github_token)

For example, when the repo contains and npm module and 
we want to write a github action to publish the npm package in the GitHub Package Registry
it is enough to use the `GITHUB_TOKEN`. There is no need [to create a new secret](#creating-a-secret)

Thus, this is enough to do the job:

```yml
steps:
- uses: actions/checkout@v2
- uses: actions/setup-node@v2
  with:
    node-version: '14.x'
    registry-url: 'https://registry.npmjs.org'
- run: npm install
- run: npm publish
  env:
    NODE_AUTH_TOKEN: ${{ secrets.NPN_TOKEN }}
- uses: actions/setup-node@v2
  with:
    registry-url: 'https://npm.pkg.github.com'
- run: npm publish
  env:
    NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

The `setup-node` action creates an `.npmrc` file on the *runner*. 

When you use the `scope` input to the `setup-node` action, the `.npmrc` file includes the `scope` prefix. 

By default, the `setup-node` action sets the `scope` in the `.npmrc` file to the account that contains that workflow file.

```ini
//npm.pkg.github.com/:_authToken=${NODE_AUTH_TOKEN}
@ULL-ESIT-PL-2021:registry=https://npm.pkg.github.com
always-auth=true
```

See [Publishing packages to GitHub Packages](https://docs.github.com/en/actions/guides/publishing-nodejs-packages#publishing-packages-to-github-packages)

## Creating a Packaged JavaScript Action


* [Writing a "Hello World!" JavaScript Action](creating-javascript-action)

## Running Manually GitHub Workflows with gh

* [Running Manually GitHub Workflows with gh](gh-workflows)

## References

* [A quick demo showing how to use GitHub Actions to build, package, and publish Node.js modules to the NPM and GitHub package registries](/assets/topics/introduction-to-javascript/github-action-npm-publish) 
* [An Introduction to Github Actions](https://gabrieltanner.org/blog/an-introduction-to-github-actions)
* [Using GitHub Actions](/https://youtu.be/9O2sLm1Boxc) Youtube video explainig how to test and publish an npm module to both GH Registry and npm Registry
* [About the editor for GitHub Actions](https://github.blog/2019-10-01-new-workflow-editor-for-github-actions/)
* Install [VSCode extension providing Github Actions YAML support](https://github.com/Lona/vscode-github-actions)
* [Getting Started with GitHub Actions in Visual Studio](https://devblogs.microsoft.com/visualstudio/getting-started-with-github-actions-in-visual-studio/)

* [Advanced GitHub Actions: workflows for production grade CI/CD - GitHub Universe 2019](https://youtu.be/0ahRkhrOePo)
  -  A short primer on advanced features, 
  -  How to deploy to GitHub Packages, 
  -  Auto-merge dependabot pull requests, and 
  -  Deploy a web service 
  
## Videos about GitHub Actions

* [A quick demo showing how to use GitHub Actions to build, package, and publish Node.js modules to the NPM and GitHub package registries](https://www.youtube.com/watch?v=9O2sLm1Boxc) by Brian Cross
* [DevOps CI/CD Explained in 100 Seconds](https://youtu.be/scEDHsr3APg) Using GitHub Actions for CI. Youtube Video. Fireship
* [BxJS - (Custom) Github Actions for Node.js projects](https://youtu.be/uLu5g76tDWw)
* [GitHub Actions: Open Source Workflow Automation by Bas Peters](https://youtu.be/Tl4mbL45PKU) YoutTube video
* [Introduction to GitHub Actions : my website build & deployment](https://youtu.be/rgxbeIvQj0Q)



