

# Benchmarks

Here we test the Fast Data Engine against a variety of scenarios.

All tests have been performed in:

- %CHROME_VERSION%
- %OS_DETAILS%
- %MACHINE_DETAILS%


## Benchmarks

Time in milliseconds to filter 500 thousand rows of generated test data. 

Each row of data looks like this:

```json
[
    {
        "id": "1564e3ac-9ba4-573a-8a1b-d493be3b7981",
        "index": 0,
        "firstName": "Zion",
        "lastName": "Borash",
        "eligible": false,
        "age": 37,
        "gpa": 4.874178835645975,
        "heightCm": 194.26,
        "weight": 244.61,
        "marital_status": "Divorced",
        "tld": "DTV",
        "subscribers": 530,
        "notificationsEnabled": true,
        "itemsReported": 234,
        "averageScore": 90.66820271427576,
        "countryName": "Bouvet Island",
        "countryCode": "BV",
        "stateName": "Kentucky",
        "stateAbbreviation": "KY",
        "width": 1335.32,
        "height": 4973.04,
        "zipCode": 41602,
        "place": "Auxier",
        "province": "Floyd",
        "provinceCode": "071",
        "community": "",
        "communityCode": "",
        "latitude": 37.737,
        "longitude": -82.7582,
        "testCode": 0,
        "processingStatus": "Error",
        "optionalCode": "100"
    },
    ...
]
```

The data is seeded, so that benchmarks can be used to track speed regressions and improvements across versions.

```json
%BENCHMARKS%
```
