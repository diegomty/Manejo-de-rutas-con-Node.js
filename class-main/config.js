import pg  from "pg";
const {Client} = pg;

const clientConfig = new Client({
  database: "sac_db",
  password: "example_db",
  user: "postgres",
  host: "localhost",
  port: 5432
})

export default clientConfig; 