## Description

Api APROVA-MAIL, to simulate basic of communication by mails.

## Requirements

This api uses a mongodb database to store data, to do this, a docker container was used, so you need the docker installed, if you don't already have it, install it [here](https://docs.docker.com/get-docker/).

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

After execute the api access the [docs](http://localhost:3000/docs)

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
[create_user](http://localhost:3000/docs/#/user/UserController_create)


After you choose an user (default or created) you must be authenticated (to grant you really are a user of APROVA-MAIL), you can do this [here](http://localhost:3000/docs/#/auth/AuthController_auth)
The endpoint will return a token that must be sent on Authorization Header (Bearer token) in all other requests. If not, an error will occur

Above a list of endpoints and if is needed the token:

### User:
  * [Create user](http://localhost:3000/docs/#/user/UserController_create) : Not need the token
  *  [List users in your city](http://localhost:3000/docs/#/user/UserController_listByCity): Need the token

### Mail
  * [Create new email](http://localhost:3000/docs/#/mail/MailController_create): Need the token
  * [List mails received by you](http://localhost:3000/docs/#/mail/MailController_listMyReceived): Need the token
  * [List mails sent by you](http://localhost:3000/docs/#/mail/MailController_listMySent): Need the token
  * [Filter all your mails by body](http://localhost:3000/docs/#/mail/MailController_filterBody): Need the token
    ``` javascript
    Types of mail body filters:
    
    {
      1: 'Contains'
      2: 'Exactly the same',
      3: 'Start with',
      4: 'End with'
    }
    ```
  
### Auth
  * [Login on api](http://localhost:3000/docs/#/auth/AuthController_auth): Not need the token
  * [Reset Password](http://localhost:3000/docs/#/auth/AuthController_forgetPassword): Not need the token
  