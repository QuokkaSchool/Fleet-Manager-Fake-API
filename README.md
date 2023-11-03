# Fleet Manager (Fake API)

This project provides a hands-on experience for frontend developers eager to learn the ropes of working with APIs. Designed as a self-contained application, our simulator doesn't rely on external databases but instead operates with local variables.

## Introduction

### Features

- **Local Data Management:** No need for external databases; all data is managed locally.
- **CRUD Operations:** Full support for Create, Read, Update, and Delete operations for vehicles, drivers, and orders.
- **Pagination and Sorting:** Practice pagination, sorting, and filtering with ease.
- **Realistic Data:** Simulated data mimics real-world scenarios, offering practical experience.
- **Perfect for Learning:** Ideal for frontend projects, coding exercises, and educational purposes.

## Documentation

👩🏻‍💻 Start template is based on a [node-typescript-boilerplate](https://github.com/jsynowiec/node-typescript-boilerplate).

🏃🏽 Instant Value: All basic tools included and configured:

- [TypeScript][typescript] [5.1][typescript-5-1]
- [ESM][esm]
- [ESLint][eslint] with some initial rules recommendation
- [Jest][jest] for fast unit testing and code coverage
- Type definitions for Node.js and Jest
- [Prettier][prettier] to enforce consistent code style
- NPM [scripts](#available-scripts) for common operations
- [EditorConfig][editorconfig] for consistent coding style
- Reproducible environments thanks to [Volta][volta]
- Example configuration for [GitHub Actions][gh-actions]
- Simple example of TypeScript code and unit test

### Clone repository

To clone the repository, use the following commands:

```sh
git clone https://github.com/QuokkaSchool/Fleet-Manager-Fake-API.git
cd Fleet-Manager-Fake-API
npm install
```

### Available Scripts

- `clean` - remove coverage data, Jest cache and transpiled files,
- `prebuild` - lint source files and tests before building,
- `build` - transpile TypeScript to ES6,
- `build:watch` - interactive watch mode to automatically transpile source files,
- `lint` - lint source files and tests,
- `prettier` - reformat files,
- `test` - run tests,
- `test:watch` - interactive watch mode to automatically re-run tests

## Endpoints

### Root URL

```sh
  http://localhost:8080
```

### Vehicles

#### GET [Vehicles/List] Get Vehicles List

```sh
  /vehicles
```

Query Params

| Key  | Description | Value |
| ------------- | ------------- | ------------- |
| page  | active page  | number |
| limit  | limit of items per page | number |
| sort  | specifies the property by which you want to sort the data | id \| brand \| model \| year \| registrationNumber \| type \| status |
| order  | defines the sorting order for the specified property | asc \| desc |

Response Types

```
{
  "items": [
    {
      "brand": string,
      "model": string,
      "year": number,
      "registrationNumber": string,
      "type": 'Ciężarówka' | 'Furgonetka',
      "status": 'Dostępny' | 'W użyciu' | 'Podczas prac technicznych',
      "driverId": string
    },
    {
      "brand": string,
      "model": string,
      "year": number,
      "registrationNumber": string,
      "type": 'Ciężarówka' | 'Furgonetka',
      "status": 'Dostępny' | 'W użyciu' | 'Podczas prac technicznych',
      "driverId": string
    }
  ],
  "info": [
    "page": number,
    "limit": number,
    "totalResults": number,
  ]
}
```

Response Example

```json
{
  "items": [
    {
      "id": "687b8675-2e45-47f8-a3b9-31ee52bccc74",
      "brand": "Volvo",
      "model": "FH16",
      "year": 2022,
      "registrationNumber": "ABC123",
      "type": "Ciężarówka",
      "status": "Dostępny",
      "driverId": "16dae322-a651-49a2-8c5f-02b029a03aad"
    },
    {
      "id": "fb61663d-f80a-45bb-82c1-8b0a4ea9f8bc",
      "brand": "Mercedes-Benz",
      "model": "Sprinter",
      "year": 2021,
      "registrationNumber": "DEF456",
      "type": "Furgonetka",
      "status": "W użyciu",
      "driverId": "1195798b-cbd3-4707-a07d-f00487c25577"
    },
  ],
  "info": [
    "page": 1,
    "limit": 2,
    "totalResults": 10,
  ]
}
```

