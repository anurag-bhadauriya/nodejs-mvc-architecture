# nodejs-mvc-architecture
This is a node.js project with advanced MVC architecture

https://sequelize.org/docs/v6/other-topics/migrations/

sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
[UP] sequelize db:migrate
[DOWN] sequelize db:migrate:undo:all

sequelize seed:generate --name user-seed
[UP] sequelize db:seed:all
[DOWN] sequelize db:seed:undo


User mailtrap for mailing


1. Creating Server & Router
2. Database sequelize & user model
3. Authentication 
4. Exception
5. Repositories 
6. Services
7. Middlewares
8. Validations
9. Sending emails
10. Scheduler & Logger
<!-- 11. Uploading files -->
12. Web sockets