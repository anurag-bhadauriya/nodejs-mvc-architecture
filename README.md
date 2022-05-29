## Creating the MVC Architecture Using Nodejs.  
---
### Prerequisites

> 1. Nodejs and npm ( Core tech stack of project )
> 2. Postgres ( for Database interactions )
> 3. Postman ( To test out the API's )
> 4. Create a db named `node_mvc_arch` in postgres database.

---

### Setting up the project
> 1. Clone this repo.  
>   `git clone <repository_link>`
> 2. Install the node_modules in root directory of the project.   
>    `npm install`
> 3. Start the server in development mode using below command.   
>    `npm run dev`
> 4. Here it is... Your server will start successfully !

---

### Steps to do after application is up

> 1. Initialize the database tables (one time activity). ie. to be done if the tables are not present in database.   
>    `npm run init-db`

---

### Extra Commands

> 1. To reset the database schema ( Delete the current db schema & create the new one using sequelize).   
>    `npm run reset-db`
> 2. Start application in production mode.   
>    `npm run start`

---

- API's lists and their contents are available in file `postman-api.json`. This file can be used to import the collection in postman.
- Sequelize migration documentation can be found here for reference - https://sequelize.org/docs/v6/other-topics/migrations/
- Concepts covered as part of this architecture:
  - Creating Server & Router
  - Database sequelize & creating models
  - Authentication
  - Exception Handeling
  - Repositories classes
  - Service classes
  - Middlewares
  - Validations
  - Sending Emails
  - Schedulers
  - Loggers
  - Web Sockets