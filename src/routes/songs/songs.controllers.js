import db from '../../utils/db';

const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    // TODO: Update this query to get song info
    const data = await db.one('', []);
    return res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getLiked = async (req, res) => {
  const { id } = req.user;
  const { album } = req.query;
  try {
    let data;
    if (!album) {
      // TODO: Query all songs liked by this user
      data = await db.any('', []);
    } else {
      // TODO: Query all albums liked by this user
      data = await db.any('');
    }
    return res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getMany = async (req, res) => {
  const { id } = req.user;
  try {
    // TODO: Query all songs made by this artist
    const data = await db.any('', []);
    return res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createOne = async (req, res) => {
  const { id } = req.user;
  try {
    // TODO: Create new song with given parameters
    const data = await db.one('', []);
    return res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    // TODO: Update song with given parameters
    const data = await db.one('', []);
    return res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    // TODO: Delete song with given id
    const data = await db.one('', []);
    return res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default {
  getOne,
  getLiked,
  authorize,
  getMany,
  createOne,
  updateOne,
  deleteOne
};
