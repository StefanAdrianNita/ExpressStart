# ExpressStart

![image](https://img.shields.io/badge/NodeJS-18.15.0-brightgreen/?style=for-the-badge&logo=node.js)

A boilerplate that aims for simplicity but at the same time efficency.

## Install

To start, you simply have to clone this repo and replace any part that references ExpressStart with your project.

```bash
git clone https://github.com/StefanAdrianNita/ExpressStart
```

Disclaimer: A npm script for installation is work in progress at the moment.

## Usage

ExpressStart is an already prepared express project running typescript, dotenv, nodemon and concurrency.

To start create .env file with a PORT variable.

```bash
# .env file on root

PORT=3001
```

If you don't set up this file the server will fallback on the default port which is 2999

## Documentation (The ExpressStart Architecture)

Everything you need is in the src folder.

```bash
src # This will contain the versioning of your api
|__ v1
    |__ app.ts # API entry point
    |__ products
    |__ users
    |__ ...
        # contains the declaration of the routes
        |__ routes.ts
        # contains the extractor of data from the request and calls the service
        |__ controller.ts
        |__ data.ts
        |__ services
            |__ allProducts.ts
        # For every endpoint you have a .ts file in services that does the business logic and calls the data layer using the data.ts file under the entity folder.
```
