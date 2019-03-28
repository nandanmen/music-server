import db from '../../utils/db';

const getSelf = async (req, res) => {
  const { id } = req.user;
  try {
    const self = await db.one(
      `
        select u1.user_id, username, name
        from user_1 u1, user_2 u2
        where u1.user_id = u2.user_id and u1.user_id = $1
      `,
      [id]
    );
    const likedSongs = await db.any(
      `
      select s.song_id, s.song_name, s.album_name, u.name, u.user_id, s.duration_seconds
      from song s, artist a, user_1 u
      where s.artist_id = a.user_id and a.user_id = u.user_id
        and s.song_id in (
          select l.song_id from likes l where l.user_id = $1
        )
      order by s.album_name
      `,
      [id]
    );
    const playlists = await db.any(
      `
      select p.user_id, p.playlist_name, p.genre
      from playlist p
      where p.user_id = $1 
      `,
      [id]
    );
    const follows = await db.any(
      `
      select u2.user_id, name, username
      from follows f, user_1 u1, user_2 u2
      where f.user_id_1 = $1 and f.user_id_2 = u1.user_id 
        and u1.user_id = u2.user_id
      `,
      [id]
    );
    res.status(200).send({ data: { self, likedSongs, playlists, follows } });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default {
  getSelf
};
