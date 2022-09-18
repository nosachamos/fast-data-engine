[![codecov](https://codecov.io/gh/nosachamos/fast-data-engine/branch/master/graph/badge.svg)](https://codecov.io/gh/nosachamos/fast-data-engine)

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
![npm](https://img.shields.io/npm/v/fast-data-engine.svg)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/nosachamos/fast-data-engine.svg)
![GitHub](https://img.shields.io/github/license/nosachamos/fast-data-engine.svg)

Fast Data Engine is a blazing fast filtering engine.

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

```ts
import { FastDataEngine } from 'fast-data-engine';

// the data you want to filter, group, etc
const data = [
    { firstName: 'Mary', age: 10 },
    { firstName: 'John', age: 20 },
    { firstName: 'John', age: 30 },
];

// filter by first name
const condition = {
    and: [
        {equals: {field: 'firstName', value: 'John'}},
        {greaterThan: {field: 'age', value: 25}}
    ]
};
const { result } = FastDataEngine.filter(data, condition);

console.log(result);

// prints:
// [{ firstName: 'John', age: 30 }]
```

[See the complete documentation here.](https://nosachamos.github.io/fast-data-engine)


# In a Nutshell

Import the `FastDataEngine` service to access the API. 

Provide your data in `json` format, and you're all set.

Now call the `filter()` function to get it filtered.

# Dev

Generate test data

```sh
yarn benchmark:generate:data
```

Run benchmarks

```sh
yarn build:benchmarks && node -e 'require("./build/benchmarks/benchmark-runner.min.js")'
```

Start documentation site locally

```sh
docsify serve docs
```


# Benchmarking

To add a new version to the set of benchmarks, create and push a new git tag:

```bash
git tag 1.0.4
git push origin 1.0.4
```

Then add the new tag to the list of benchmark versions inside the `run_benchmarks.sh` file:

```bash
#!/bin/bash

BENCHMARK_VERSIONS="0.0.1-alpha-1 0.0.1-alpha-2 1.0.4"
```


# Contributing

Contributions are very welcome!

We follow the "fork-and-pull" Git workflow. See the details [here](./CONTRIBUTING.md).


## License

MIT

---

Created by **[`Eduardo Born`](http://github.com/nosachamos)** with ❤ and coffee
