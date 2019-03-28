import db from '../../utils/db';

const getMany = async (req, res) => {
  const { id, by: uid } = req.query;
  try {
    let data;
    if (uid) {
      data = await db.any(
        `
        select c.user_id, c.playlist_name, c.num_songs
        from playlist p, (
          select user_id, playlist_name, count(song_id) as num_songs
          from inplaylist
          group by user_id, playlist_name
        ) as c
        where p.user_id = c.user_id
        and p.playlist_name = c.playlist_name
        and p.isprivate = false
        and p.user_id = $1
      `,
        [uid]
      );
    } else {
      data = await db.any(
        `
        select c.user_id, c.playlist_name, c.num_songs
        from playlist p, (
          select user_id, playlist_name, count(song_id) as num_songs
          from inplaylist
          group by user_id, playlist_name
        ) as c
        where p.user_id = c.user_id
        and p.playlist_name = c.playlist_name
        and p.user_id = $1
        `,
        [id]
      );
    }
    if (!data) {
      return res
        .status(404)
        .json({ error: 'Playlist does not exist or is private' });
    }
    res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const getOne = async (req, res) => {
  const { id } = req.query;
  const { name } = req.params;
  try {
    const data = await db.any(
      `
      select s.song_id, s.song_name, s.album_name, 
             u.name, u.user_id, s.duration_seconds
      from inplaylist ip, song s, artist a, user_1 u
      where s.artist_id = a.user_id 
        and a.user_id = u.user_id
        and ip.song_id = s.song_id
        and ip.user_id = $1
        and ip.playlist_name = $2
      `,
      [id, name]
    );
    res.status(200).json({ data });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const createOne = async (req, res) => {
  const { id } = req.query;
  const { name } = req.body;
  try {
    await db.none(
      `
      insert into playlist (user_id, playlist_name) 
      values ($1, $2)
      `,
      [id, name]
    );
    res.status(201).end();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const updateOne = async (req, res) => {
  const { id } = req.query;
  const { name } = req.params;
  const { name: newName, isPrivate } = req.body;
  try {
    await db.none(
      `
      update playlist
      set playlist_name = $1,
          isPrivate = $2
      where user_id = $3
      and playlist_name = $4
      `,
      [newName, isPrivate, id, name]
    );
    res.status(200).end();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error });
  }
};

const deleteOne = async (req, res) => {
  const { id } = req.query;
  const { name } = req.params;
  try {
    await db.none(
      `
      delete from playlist
      where user_id = $1
      and playlist_name = $2
      `,
      [id, name]
    );
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const addSong = async (req, res) => {
  const { id } = req.query;
  const { name, sid } = req.params;
  try {
    await db.none(
      `
      insert into inplaylist
      values ($1, $2, $3)
      `,
      [id, sid, name]
    );
    return res.status(201).end();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const deleteSong = async (req, res) => {
  const { id } = req.query;
  const { name, sid } = req.params;
  try {
    await db.none(
      `
      delete from inplaylist ip
      where ip.user_id = $1
      and ip.song_id = $2
      and ip.playlist_name = $3
      `,
      [id, sid, name]
    );
    return res.status(200).end();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export default {
  getMany,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  addSong,
  deleteSong
};
