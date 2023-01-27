

# Benchmarks

Here we test the Fast Data Engine against a variety of scenarios.

All tests have been performed in:

- Chrome/105.0.5173.0
- linux - x64 - 5.15.0-58-generic
- AMD Ryzen Threadripper 3970X 32-Core Processor [2.2 GHz, 64 threads], 125.67 GB of memory


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
{
    "ning benchmarks... please waitLoading json data from disk...Loading json took 3310.100msLoaded 500000 data rows,187.100\n====== STARTING RUN #0 ======>> And expression filter - 2 terms": [
        {
            "duration": 14.4,
            "expression": {
                "and": [
                    {
                        "equals": {
                            "field": "firstName",
                            "value": "Zion"
                        }
                    },
                    {
                        "includes": {
                            "field": "firstName",
                            "value": "i"
                        }
                    }
                ]
            }
        }
    ],
    "And expression filter - 8 terms": [
        {
            "duration": 132.7,
            "expression": {
                "and": [
                    {
                        "includes": {
                            "field": "firstName",
                            "value": "a",
                            "ignoreCase": true
                        }
                    },
                    {
                        "greaterThanOrEquals": {
                            "field": "gpa",
                            "value": 0.5
                        }
                    },
                    {
                        "lessThanOrEquals": {
                            "field": "gpa",
                            "value": 4.5
                        }
                    },
                    {
                        "lessThan": {
                            "field": "age",
                            "value": 95
                        }
                    },
                    {
                        "greaterThan": {
                            "field": "age",
                            "value": 5
                        }
                    },
                    {
                        "equals": {
                            "field": "optionalCode",
                            "value": null
                        }
                    },
                    {
                        "equals": {
                            "field": "eligible",
                            "value": true
                        }
                    }
                ]
            }
        }
    ],
    "Or expression filter - 2 terms": [
        {
            "duration": 64.5,
            "expression": {
                "or": [
                    {
                        "equals": {
                            "field": "firstName",
                            "value": "Zion"
                        }
                    },
                    {
                        "includes": {
                            "field": "firstName",
                            "value": "i"
                        }
                    }
                ]
            }
        }
    ],
    "Or expression filter - 8 terms": [
        {
            "duration": 103.6,
            "expression": {
                "or": [
                    {
                        "includes": {
                            "field": "firstName",
                            "value": "a",
                            "ignoreCase": true
                        }
                    },
                    {
                        "greaterThanOrEquals": {
                            "field": "gpa",
                            "value": 4.5
                        }
                    },
                    {
                        "lessThanOrEquals": {
                            "field": "gpa",
                            "value": 0.5
                        }
                    },
                    {
                        "lessThan": {
                            "field": "age",
                            "value": 2
                        }
                    },
                    {
                        "greaterThan": {
                            "field": "age",
                            "value": 98
                        }
                    },
                    {
                        "equals": {
                            "field": "optionalCode",
                            "value": null
                        }
                    },
                    {
                        "equals": {
                            "field": "eligible",
                            "value": true
                        }
                    }
                ]
            }
        }
    ],
    "Xor expression filter - 2 terms": [
        {
            "duration": 62.8,
            "expression": {
                "xor": [
                    {
                        "equals": {
                            "field": "firstName",
                            "value": "Zion"
                        }
                    },
                    {
                        "includes": {
                            "field": "firstName",
                            "value": "i"
                        }
                    }
                ]
            }
        }
    ],
    "Xor expression filter - 8 terms": [
        {
            "duration": 191.4,
            "expression": {
                "xor": [
                    {
                        "includes": {
                            "field": "firstName",
                            "value": "a",
                            "ignoreCase": true
                        }
                    },
                    {
                        "greaterThanOrEquals": {
                            "field": "gpa",
                            "value": 4.95
                        }
                    },
                    {
                        "lessThanOrEquals": {
                            "field": "gpa",
                            "value": 0.1
                        }
                    },
                    {
                        "lessThan": {
                            "field": "age",
                            "value": 1
                        }
                    },
                    {
                        "greaterThan": {
                            "field": "age",
                            "value": 98
                        }
                    },
                    {
                        "equals": {
                            "field": "optionalCode",
                            "value": null
                        }
                    },
                    {
                        "equals": {
                            "field": "eligible",
                            "value": true
                        }
                    }
                ]
            }
        }
    ],
    "Not expression filter": [
        {
            "duration": 24.4,
            "expression": {
                "not": {
                    "equals": {
                        "field": "firstName",
                        "value": "Zion"
                    }
                }
            }
        }
    ],
    "Single equals string filter": [
        {
            "duration": 25.3,
            "expression": {
                "equals": {
                    "field": "firstName",
                    "value": "Zion"
                }
            }
        }
    ],
    "Single equals numeric filter": [
        {
            "duration": 18.9,
            "expression": {
                "equals": {
                    "field": "age",
                    "value": 20
                }
            }
        }
    ],
    "Single equals boolean filter": [
        {
            "duration": 29.3,
            "expression": {
                "equals": {
                    "field": "eligible",
                    "value": true
                }
            }
        }
    ],
    "Single equals null filter": [
        {
            "duration": 14.7,
            "expression": {
                "equals": {
                    "field": "optionalCode",
                    "value": null
                }
            }
        }
    ],
    "Single starts with filter": [
        {
            "duration": 27.1,
            "expression": {
                "startsWith": {
                    "field": "firstName",
                    "value": "A"
                }
            }
        }
    ],
    "Single ends with filter": [
        {
            "duration": 30,
            "expression": {
                "endsWith": {
                    "field": "firstName",
                    "value": "n"
                }
            }
        }
    ],
    "Single includes string filter": [
        {
            "duration": 26.9,
            "expression": {
                "includes": {
                    "field": "firstName",
                    "value": "A"
                }
            }
        }
    ],
    "Single matches filter": [
        {
            "duration": 30.8,
            "expression": {
                "matches": {
                    "field": "firstName",
                    "value": "^a.*[a-z]$",
                    "ignoreCase": true
                }
            }
        }
    ],
    "In list string filter - 5 items": [
        {
            "duration": 33.1,
            "expression": {
                "inList": {
                    "field": "firstName",
                    "value": [
                        "John",
                        "Mary",
                        "Albert",
                        "Michelle",
                        "Karen"
                    ]
                }
            }
        }
    ],
    "In list string filter - case insensitive - 5 items": [
        {
            "duration": 71.2,
            "expression": {
                "inList": {
                    "field": "firstName",
                    "value": [
                        "john",
                        "mary",
                        "albert",
                        "michelle",
                        "karen"
                    ],
                    "ignoreCase": true
                }
            }
        }
    ],
    "In list numeric filter - 10 items": [
        {
            "duration": 39.6,
            "expression": {
                "inList": {
                    "field": "age",
                    "value": [
                        1,
                        4,
                        2,
                        8,
                        3,
                        10,
                        40,
                        45,
                        47,
                        50
                    ]
                }
            }
        }
    ],
    "Greater than filter": [
        {
            "duration": 38.9,
            "expression": {
                "greaterThan": {
                    "field": "gpa",
                    "value": 3
                }
            }
        }
    ],
    "Greater than or equals filter": [
        {
            "duration": 38,
            "expression": {
                "greaterThanOrEquals": {
                    "field": "gpa",
                    "value": 3
                }
            }
        }
    ],
    "Less than filter": [
        {
            "duration": 38.2,
            "expression": {
                "lessThan": {
                    "field": "gpa",
                    "value": 2
                }
            }
        }
    ],
    "Less than or equals filter": [
        {
            "duration": 37.1,
            "expression": {
                "lessThanOrEquals": {
                    "field": "gpa",
                    "value": 2
                }
            }
        }
    ],
    "isTrue filter": [
        {
            "duration": 26.9,
            "expression": {
                "isTrue": "eligible"
            }
        }
    ],
    "isFalse filter": [
        {
            "duration": 21.3,
            "expression": {
                "isFalse": "eligible"
            }
        }
    ],
    "isDefined filter": [
        {
            "duration": 16.4,
            "expression": {
                "isDefined": "optionalCode"
            }
        }
    ]
}
```
