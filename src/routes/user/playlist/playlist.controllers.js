import db from '../../../utils/db';

// TODO: Return all public playlists made by this user.
// If the id matches the user, return all playlists.
const getMany = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.any();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// TODO: Given ID and name, return playlist made by
// this user. If playlist is private and user did not
// make the playlist, reject the request.
const getOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.any();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// TODO: Given playlist name, create a new playlist.
const createOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.any();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// TODO: Given changes to playlist, update playlist
// information in database.
const updateOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.any();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateSong = async (req, res) => {
  const { id, name } = req.params;
  const { sid, action } = req.body;
  try {
    if (action === 'add') {
      // TODO: Add song to playlist
    } else {
      // TODO: Remove song from playlist
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// TODO: Delete playlist
const deleteOne = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await db.any();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default {
  getMany,
  getOne,
  createOne,
  updateOne,
  updateSong,
  deleteOne
};
