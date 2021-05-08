## Description

APROVA-MAIL

## Requirements

This api uses a mongodb database to storage data, to do this, we use a docker container, so do you need him intalled, if you don't, install [here](https://docs.docker.com/get-docker/).

## Installing dependencies

To install default dependecies
``` bash
$npm install
```
or

``` bash
$npm i
```

## Create the docker enviroment 

``` bash
$npm run config
```
or
``` bash
$docker-compose up -d
```

## Initializing the api

``` bash
# dev
$ npm run start

# dev in watch mode
$ npm run start:dev

# prod
$ npm run start:prod
```

## Docs

After execute the api access http://localhost:3000/docs.