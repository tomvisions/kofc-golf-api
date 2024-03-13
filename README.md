# TomVisions API

In this repository is the code for the MambleoFC APi. It serves as the backend REST API code for the MamboleoFC Website.

In order to set this up to work on it, there are a few steps that need to be done.

1) Cloning the repository
```sh
    git clone https://github.com/tomvisions/tomvisions-api.git && cd tomvisions-api
 ```
2) Create an .env file and place the following variables
```sh
TOKEN_SECRET=<TOKEN_SECRET> - for authentication
LOCAL=true
DATABASE=simpleplay
USERNAME=<username for your database> 
PASSWORD=<passowrd for the database>
```
3) Import the SQL dump file from the repo and import it into the simpleplay database (coming soon!)
4) npm ci
5) npm run start

And enjoy running the API locally
