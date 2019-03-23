import { Pool } from 'pg';

const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'api',
  password: 'password',
  port: 5432
});

export const get = (_, res) => {
  pool.query(`select * from test`, (error, results) => {
    if (error) {
      res.status(400).json({ error });
    }
    res.status(200).json({ data: results.rows });
  });
};
