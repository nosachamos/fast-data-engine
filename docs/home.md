[![fast-data-engine](https://github.com/nosachamos/fast-data-engine/actions/workflows/master.yml/badge.svg)
[![codecov](https://codecov.io/gh/nosachamos/fast-data-engine/branch/master/graph/badge.svg)](https://codecov.io/gh/nosachamos/fast-data-engine)

[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
![npm](https://img.shields.io/npm/v/fast-data-engine.svg)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/nosachamos/fast-data-engine.svg)
![GitHub](https://img.shields.io/github/license/nosachamos/fast-data-engine.svg)

Fast Data Engine is a blazing fast data grouping and filtering engine.

<p align="center">
<img width="200px" src="https://github.com/nosachamos/fast-data-engine/raw/master/docs/logo_transparent.png" alt="fast-data-engine" style="max-width:100%;">
</p>
<p align="center">Fast, simple, tiny, extensible, intuitive, documented, fully tested, magical.</p>

<br/>


# Installation

```bash
yarn add fast-data-engine
```

or

```bash
npm install fast-data-engine --save
```

# Sample Usage

```ts
import { FastDataEngine } from 'fast-data-engine';

// the data you want to filter, group, etc
const data = [
    { firstName: 'Mary', age: 10 },
    { firstName: 'Alice', age: 20 },
    { firstName: 'John', age: 30 }
]

const engine = new FastDataEngine(data);

// filter by first name
const condition = operators('firstName', 'John');
const result = engine.filter(condition);

console.log(result);

// prints:
// [{ firstName: 'John', age: 30 }]
```


# In a Nutshell

Create a new instance of the `FastDataEngine` service to access the API.

Provide your data in `json` format, and you're all set.

Now call the [filter](filters.md) functions to configure how you want your data.

The service keeps a copy of the original data until disposed, so you can filter and group in multiple ways without
having to rebuild the service.


# Contributing

Contributions are very welcome!

We follow the "fork-and-pull" Git workflow. See more [details here](https://github.com/nosachamos/fast-data-engine/blob/master/CONTRIBUTING.md).


## License

MIT

---

Created and maintained by **[`Eduardo Born`](http://github.com/nosachamos)** with ❤ and coffee
