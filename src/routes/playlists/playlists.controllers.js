import db from '../../utils/db';

const getOne = async (req, res) => {
  const { id } = req.user;
  const { name } = req.params;
  try {
    const playlist = await db.one(
      'select playlist_name, no_of_songs, genre from playlist where playlist_name = $1 and user_id = $2',
      [name, id]
    );

    // TODO: change query to selecting all songs in playlist name
    const songs = await db.any('select * from inPlaylist');

    return res.status(200).json({ data: { ...playlist, songs } });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const getMany = async (req, res) => {
  const { id } = req.user;
  try {
    const data = await db.any(
      'select playlist_name, no_of_songs, genre from playlist where user_id = $1',
      [id]
    );
    return res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const createOne = async (req, res) => {
  const { id } = req.user;
  const { name } = req.body;
  try {
    const data = await db.one(
      'insert into playlist (playlist_name, user_id) values($1, $2) returning id',
      [name, id]
    );
    return res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.user;
  const { name } = req.body;
  try {
    const data = await db.one(
      'update playlist set playlist_name = $1 where user_id = $2 returning id',
      [name, id]
    );
    return res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.user;
  try {
    const data = await db.one(
      'delete from playlist where user_id = $1 returning id',
      [id]
    );
    return res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default { getOne, getMany, createOne, updateOne, deleteOne };
