import db from './utils/db';

export const get = (_, res) => {
  db.any('select * from test')
    .then(data => {
      res.status(200).json({ data });
    })
    .catch(error => {
      res.status(400).json({ error });
    });
};
