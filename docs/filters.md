

# Filters

Filters allow you narrow the data in an extremely efficient way. By utilizing Web Workers, Fast Data Engine will
automatically divide up the work and utilize all available cores.


## Basic usage

To start filtering your data, just create an instance of FastDataService passing in the data you wish to filter,
and call the `filter` method.

```ts
import { FastDataEngine } from 'fast-data-engine';

// the data you want to filter, group, etc
const data = [
    { firstName: 'Albert', lastName: 'Roberts', age: 10 },
    { firstName: 'Alice', lastName: 'Wondergirl', age: 20 },
    { firstName: 'John', lastName: 'Smith', age: 30 }
]

const engine = new FastDataEngine(data);

// filter by first name
const condition = and(startsWith('firstName', 'Al'), greaterThan('age', 15));
const result = engine.filter(condition);

// result is:
// [{ firstName: 'Alice', lastName: 'Wondergirl', age: 20 }]
```

## Supported operators

You can use the following comparison operators when filtering:

| Operator          | Description                                                             | Supported data types                  |
|-------------------|-------------------------------------------------------------------------|---------------------------------------|
| `equals`          | Field must match exactly.                                               | `string`, `number`, `boolean`, `null` |
| `matches`         | Match a given regular expression.                                       | `string`                              |
| `isDefined`       | Includes element if the given field is not `null` or missing.           | `string`, `number`, `boolean`, `null` |
 | `includes`        | Field must include the given value anywhere in its value.               | `string`                              |
| `startsWith`      | Field must start with the given value.                                  | `string`                              |
| `endsWith`        | Field must start with the given value.                                  | `string`                              |
| `greaterThan`     | Field value must be greater than the given filter value.                | `number`                              |
| `greaterOrEquals` | Field value must be greater than or operators to the given filter value. | `number`                              |
| `lessThan`        | Field value must be less than the given filter value.                   | `number`                              |
| `lessOrEquals`    | Field value must be less than or operators to the given filter value.   | `number`                              |
| `isTrue`          | Field value must be operators to `true`.                                | `boolean`                             |
| `isFalse`         | Field value must be operators to `false`.                               | `boolean`                             |
| `inList`              | Field value must match exactly any of the items in the given list.  | `string`, `number`, `boolean`, `null` |

You can also combine them using the following logical operators:

- `and`
- `or`
- `xor`

As well as negate any expression using the `not` operator.

### Examples

```ts
const condition = and(startsWith('firstName', 'Al'), not(equals('lastName', 'Roberts')));
```

Will return only records whose first name starts with `Al` and last name is not operators to `Roberts`.

```ts
const condition = not(isDefined('lastName'));
```

Will return only records whose last name is `null` or is not present at all.


## Alternative Syntax

We realize not everyone wants to write nested functions when configuring filters. Sometimes it is convenient to use a 
plain JavaScript object instead, such as when filters are dynamically built. You can express filters using the function
notation as presented in the examples in this page, or an object notation where function names become keys in an object. 

For example, instead of:

```ts
const condition = and(startsWith('firstName', 'Al'), greaterThan('age', 15));
```

You may write:

```ts
const condition = {
    and: [
        {
            startsWith: {
                field: 'firstName',
                value: 'John'
            },
        },
        {
            greaterThan: {
                field: 'age',
                value: 15
            }
        }
    ]
}
```

These two syntaxes are equivalent.

