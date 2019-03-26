import db from './db';

export const registerHandler = async (req, res) => {
  const { id, username, password, name, type } = req.body;
  if (!id || !username || !password || !name || !type) {
    return res
      .status(400)
      .json({ error: 'ID, username, password, name and type are required' });
  }
  try {
    await db.none('insert into user_2 (user_id, username) values ($1, $2)', [
      id,
      username
    ]);
    await db.none(
      'insert into user_1 (user_id, name, password) values ($1, $2, $3)',
      [id, name, password]
    );
    if (type === 'artist') {
      await db.none('insert into artist (user_id) values ($1)', [id]);
    }
    res.status(201).json({ id });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const loginHandler = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password is required' });
  }

  try {
    const user = await db.oneOrNone(
      'select u1.user_id, password from user_1 u1, user_2 u2 where u1.user_id = u2.user_id and u2.username = $1',
      [username]
    );
    if (!user) {
      return res.status(404).json({ error: 'That username does not exist' });
    }
    if (!(user.password === password)) {
      return res.status(401).json({ error: 'Incorrect password' });
    }
    res.status(200).json({ id: user.user_id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const protectRoutesHandler = async (req, res, next) => {
  const error = 'NOT AUTHORIZED';

  const { id } = req.query;
  if (!id) {
    return res.status(401).send({ error });
  }
  try {
    const user = await db.oneOrNone('select * from user_1 where user_id = $1', [
      Number(id)
    ]);
    if (!user) return res.status(404).send({ error: 'User does not exist' });
    req.user = { id };
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
};

export const authorizeArtist = async (req, res, next) => {
  const { id } = req.query;
  try {
    const data = await db.oneOrNone('select * from artist where user_id = $1', [
      id
    ]);
    if (!data) return res.status(401).json({ error: 'NOT AUTHORIZED' });
    next();
  } catch (error) {
    res.status(500).json({ error });
  }
};
