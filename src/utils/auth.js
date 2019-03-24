import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import db from './db';

const secret = process.env.SECRET;
const exp = process.env.EXP;

/**
 * Creates a JSON web token from the given id.
 * @param {string} id
 * @returns {string}
 */
export const makeToken = id => jwt.sign({ id }, secret, { expiresIn: exp });

/**
 * Checks if the given token is valid. If it is,
 * return the payload.
 * @param {string} token
 * @returns {Promise<string>}
 */
export const verifyToken = token =>
  new Promise((resolve, reject) => {
    jwt.verify(token, secret, (error, payload) => {
      if (error) return reject(error);
      resolve(payload.id);
    });
  });

/**
 * Checks if the given password matches the hashed
 * password.
 * @param {string} hashed
 * @param {string} password
 */
export const compare = (hashed, password) =>
  new Promise((resolve, reject) => {
    bcrypt.compare(password, hashed, (err, same) => {
      if (err) return reject(err);
      resolve(same);
    });
  });

export const registerHandler = (req, res) => {
  const { email, password, name, type } = req.body;
  if (!email || !password || !name || !type) {
    return res
      .status(400)
      .json({ error: 'Email, password, name and type are required' });
  }
  bcrypt
    .hash(password, 8)
    .then(hashed => {
      db.one(
        'insert into usertest (name, email, password) values ($1, $2, $3) returning id',
        [name, email, hashed]
      )
        .then(({ id }) => res.status(201).json({ token: makeToken(id) }))
        .catch(error => {
          console.error(error);
          res.status(500).json({ error });
        });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error });
    });
};

export const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password is required' });
  }

  try {
    const user = await db.oneOrNone(
      'select id, password from usertest where email = $1',
      [email]
    );
    if (!user) {
      return res.status(404).json({ error: 'That email does not exist' });
    }

    const hashed = user.password.trim();
    const authorized = await compare(hashed, password);
    if (!authorized) {
      return res.status(401).json({ error: 'Incorrect password' });
    }

    res.status(200).json({ token: makeToken(user.id) });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const protectRoutesHandler = async (req, res, next) => {
  const error = 'NOT AUTHORIZED';

  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    return res.status(401).send({ error });
  }

  const token = auth.split('Bearer ')[1];
  try {
    const id = await verifyToken(token);
    const artist = await db.oneOrNone(
      'select bio, num_followers from artisttest where uid = $1',
      [Number(id)]
    );
    const user = await db.one(
      'select id, name, email from usertest where id = $1',
      [Number(id)]
    );
    req.user = { ...user, ...artist, bio: artist.bio.trim() };
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error });
  }
};
