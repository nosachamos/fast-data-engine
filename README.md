[![fast-data-engine](https://github.com/nosachamos/fast-data-engine/actions/workflows/master.yml/badge.svg)
[![codecov](https://codecov.io/gh/nosachamos/fast-data-engine/branch/master/graph/badge.svg)](https://codecov.io/gh/nosachamos/fast-data-engine)

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
![npm](https://img.shields.io/npm/v/fast-data-engine.svg)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/nosachamos/fast-data-engine.svg)
![GitHub](https://img.shields.io/github/license/nosachamos/fast-data-engine.svg)

Fast Data Engine is a blazing fast data engine with support to grouping and filtering.

<p align="center">
<img width="200px" src="https://github.com/nosachamos/fast-data-engine/raw/master/docs/logo_transparent.png" alt="fast-data-engine" style="max-width:100%;">
</p>
<p align="center">Fast, simple, tiny, extensible, intuitive, documented, fully tested, magical.</p>

<br/>


# Installation

```sh
yarn add fast-data-engine
```

or

```sh
npm install fast-data-engine --save
```

# Sample Usage

```jsx
import { FastDataEngine } from 'fast-data-engine';

//...

```


# In a Nutshell

Import the `FastDataEngine` service to access the API. 

Provide your data in `json` format, and you're all set.

Now call the `group()` and `filter()` functions to configure how you want your data.


# Contributing

Contributions are very welcome!

We follow the "fork-and-pull" Git workflow.

1. **Create a Fork and clone it**

   Simply click on the “fork” button of the repository page on GitHub.

   The standard clone command creates a local git repository from your remote fork on GitHub.

2. **Modify the Code**

   In your local clone, modify the code and commit them to your local clone using the git commit command.

   Run `yarn test` and make sure all tests still pass.

   Run `eslint --project .` and make sure you get no warnings.

3. **Push your Changes**

   Make sure to update affected tests and/or add tests to any new features you may have created.

   We are very careful to make sure coverage does not drop.

4. **Create a Pull Request**

   We will review your changes and possibly start a discussion.

   If changes are required, you can simply push these changes into your fork by repeating steps #3 and #4 and the pull request is updated automatically.

## License

Free for personal and open source projects.

Details for commercial projects coming soon.

---

Created and maintained by **[`Eduardo Born`](http://github.com/nosachamos)** with ❤ and coffee
