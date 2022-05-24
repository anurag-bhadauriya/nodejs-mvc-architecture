# nodejs-mvc-architecture
This is a node.js project with advanced MVC architecture

https://sequelize.org/docs/v6/other-topics/migrations/

sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
[UP] sequelize db:migrate
[DOWN] sequelize db:migrate:undo

sequelize seed:generate --name user-seed
[UP] sequelize db:seed:all
[DOWN] sequelize db:seed:undo