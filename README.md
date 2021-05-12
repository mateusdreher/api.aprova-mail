## Description

Api APROVA-MAIL, to simulate basic of communication by mails.

## Requirements

This api uses a mongodb database to store data, to do this, a docker container was used, so you need the **docker** installed, if you don't already have it, install it [here](https://docs.docker.com/get-docker/).
And, to config database enviroment, it is used **docker-compose,** so if you don't already have it, install [here](https://docs.docker.com/compose/install/)

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

After execute the api access the [docs](http://localhost:3000/docs).
**All the endpoints and respective payloads are described in the docs**

## Using Api

To use this api is needed an user, you can use the default user:

``` javascript
    {
      "nickname": "aprova-user"
      "city": "cascavel",
      "password": "aprova-admin"
    }
```

Or you can create your own user by the endpoint:
[create\_user](http://localhost:3000/docs/#/user/UserController_create)

After you choose an user (default or created) you must be authenticated (to grant you really are a user of APROVA-MAIL), you can do this using this [endpoint](http://localhost:3000/docs/#/auth/AuthController_auth).
The endpoint will return a accessToken that must be sent on `Authorization Header` (Bearer token) in all other requests. If not, an error will occur.

### Example

Supose the following token has been returned
`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDliMzU5ODNkMDdiODg1NmE2M2Q5YTUiLCJpYXQiOjE2MjA3OTEzNDMsImV4cCI6MTYyMDc5NDk0M30.wM3hzzvNoYco53bdT2v56C9VNyiN6TGJQBwivge8F-0`
The authorization header to be:

``` javascript
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDliMzU5ODNkMDdiODg1NmE2M2Q5YTUiLCJpYXQiOjE2MjA3OTEzNDMsImV4cCI6MTYyMDc5NDk0M30.wM3hzzvNoYco53bdT2v56C9VNyiN6TGJQBwivge8F-0'
```

Above a list of endpoints and if is needed the token:

### User:

* [Create user](http://localhost:3000/docs/#/user/UserController_create) : **Not need the token**
* [List users in your city](http://localhost:3000/docs/#/user/UserController_listByCity): **Need the token**

### Mail

* [Create new email](http://localhost:3000/docs/#/mail/MailController_create): **Need the token**
* [List mails received by you](http://localhost:3000/docs/#/mail/MailController_listMyReceived): **Need the token**
* [List mails sent by you](http://localhost:3000/docs/#/mail/MailController_listMySent): **Need the token**
* [Filter all your mails by body](http://localhost:3000/docs/#/mail/MailController_filterBody): **Need the token**

``` javascript
//Types of mail body filters:

  1: 'Contains'
  2: 'Exactly the same',
  3: 'Start with',
  4: 'End with'
```

### Auth

* [Login on api](http://localhost:3000/docs/#/auth/AuthController_auth): **Not need the token**
* [Reset Password](http://localhost:3000/docs/#/auth/AuthController_forgetPassword): **Not need the token**

## Contact

If you have any questions, please contact me at:
[Linkedin](https://www.linkedin.com/in/mateus-dreher-3bab65140/)

or by email: mateusdreher88@gmail.com