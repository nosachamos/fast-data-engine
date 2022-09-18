

# Benchmarks

Here we test the Fast Data Engine against a variety of scenarios.

All tests have been performed in:

- Chrome/105.0.5173.0
- linux - x64 - 5.15.0-46-generic
- AMD Ryzen Threadripper 3970X 32-Core Processor [[object Object], 64 threads] CPUs, 125.67 GB of memory


## Benchmarks

Time in milliseconds to filter 500000 rows of generated test data.

```json
{
    " And expression filter - 2 terms": [
        17.3
    ],
    " And expression filter - 8 terms": [
        136.6
    ],
    " Or expression filter - 2 terms": [
        67.9
    ],
    " Or expression filter - 8 terms": [
        101.1
    ],
    " Xor expression filter - 2 terms": [
        69.2
    ],
    " Xor expression filter - 8 terms": [
        186.9
    ],
    " Not expression filter": [
        30.7
    ],
    " Single equals string filter": [
        30.5
    ],
    " Single equals numeric filter": [
        21.6
    ],
    " Single equals boolean filter": [
        29.8
    ],
    " Single equals null filter": [
        14.9
    ],
    " Single starts with filter": [
        28.2
    ],
    " Single ends with filter": [
        30.4
    ],
    " Single includes string filter": [
        34.3
    ],
    " Single matches filter": [
        33.6
    ],
    " In list string filter - 5 items": [
        33.7
    ],
    " In list string filter - case insensitive - 5 items": [
        72.7
    ],
    " In list numeric filter - 10 items": [
        40
    ],
    " Greater than filter": [
        38.3
    ],
    " Greater than or equals filter": [
        38.2
    ],
    " Less than filter": [
        39.2
    ],
    " Less than or equals filter": [
        37.3
    ],
    " isTrue filter": [
        27.1
    ],
    " isFalse filter": [
        28
    ],
    " isDefined filter": [
        16.8
    ]
}
```
