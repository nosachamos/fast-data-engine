[![codecov](https://codecov.io/gh/nosachamos/fast-data-engine/branch/master/graph/badge.svg)](https://codecov.io/gh/nosachamos/fast-data-engine)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
![npm](https://img.shields.io/npm/v/fast-data-engine.svg)
![Snyk Vulnerabilities for GitHub Repo](https://img.shields.io/snyk/vulnerabilities/github/nosachamos/fast-data-engine.svg)
![GitHub](https://img.shields.io/github/license/nosachamos/fast-data-engine.svg)

Fast Data Engine is a blazing fast data filtering engine.

It's also:
 - [fully tested](https://codecov.io/gh/nosachamos/fast-data-engine) and [benchmarked](./benchmarks.md)
 - dependency and vulnerability free (scanned by Snyk)
 - less than 2Kb gzipped
 - simple and easy to use

<p align="center">
<img width="200px" src="https://github.com/nosachamos/fast-data-engine/raw/master/docs/logo_transparent.png" alt="fast-data-engine" style="max-width:100%;">
</p>
<p align="center">Fast, simple, tiny, intuitive, documented, fully tested, magical.</p>
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
    { firstName: 'John', age: 20 },
    { firstName: 'John', age: 30 }
]

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


# In a Nutshell

Make sure your data is in `json` format, and you're all set.

Import `FastDataEngine` and call the [filter](filters.md) function to filter your data.

The result can be accessed through the `result` property of the returned object, which can also be used for chaining multiple filter operations.


# Contributing

Contributions are very welcome!

We follow the "fork-and-pull" Git workflow. See more [details here](https://github.com/nosachamos/fast-data-engine/blob/master/CONTRIBUTING.md).


## License

MIT

---

Created by **[`Eduardo Born`](http://github.com/nosachamos)** with ❤ and coffee.
