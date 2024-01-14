/**
 * @database [InnoDB] User
 * This database is made of Tablef related user.
 * This database is only for user. Never use in another service.
 * Only Read. but Only write in User Service.
*/
CREATE DATABASE UserDatabase DEFAULT CHARACTER SET = 'utf8' COLLATE= 'utf8_general_ci';
