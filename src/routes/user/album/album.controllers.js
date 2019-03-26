import db from '../../../utils/db';

const checkArtist = async (req, res, next) => {
  const { id } = req.params;
  try {
    const data = await db.oneOrNone('select * from artist where user_id = $1', [
      id
    ]);
    if (!data) {
      return res.status(404).json({ error: 'This user is not an artist.' });
    }
    next();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// TODO: Returns all albums made by artist id
const getMany = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.any();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// TODO: Returns one album with given name made by artist id
const getOne = async (req, res) => {
  const { id, name } = req.params;
  try {
    const data = await db.oneOrNone();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// TODO: Creates a new album with given parameters
const createOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.one();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// TODO: Updates album info with given id
const updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.oneOrNone();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// TODO: Deletes album with given id + all songs
const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.oneOrNone();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default {
  checkArtist,
  getMany,
  getOne,
  createOne,
  updateOne,
  deleteOne
};
