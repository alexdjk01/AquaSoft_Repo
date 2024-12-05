import  {Sequelize}  from 'sequelize';
import * as dotenv from "dotenv";

dotenv.config();
const DB_NAME:string = process.env.DB_NAME as string;
const DB_USER:string = process.env.DB_USER as string;
const DB_PASSWORD:string = process.env.DB_PASSWORD as string;
const DB_HOST:string = process.env.DB_HOST as string;
const DB_DIALECT = process.env.DB_DIALECT as "mysql";
const DB_PORT:number = Number(process.env.DB_PORT);

const sequelize = new Sequelize( DB_NAME,DB_USER,DB_PASSWORD , {
  host: DB_HOST,
  dialect:DB_DIALECT,
  port:DB_PORT
});

export default sequelize;