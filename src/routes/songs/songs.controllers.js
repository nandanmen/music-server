import db from '../../utils/db';

const getMany = async (req, res) => {
  const { by } = req.query;
  try {
    let data;
    if (!by) {
      data = await db.any(
        `
        select s.song_id, s.song_name, s.album_name, 
             u.name, u.user_id, s.duration_seconds
        from song s, artist a, user_1 u
        where s.artist_id = a.user_id 
          and a.user_id = u.user_id
        order by s.no_of_plays desc
        `
      );
    } else {
      data = await db.any(
        `
        select s.song_id, s.song_name, s.album_name, 
             u.name, u.user_id, s.duration_seconds
        from song s, artist a, user_1 u
        where s.artist_id = a.user_id 
          and a.user_id = u.user_id
          and a.user_id = $1
        order by s.no_of_plays desc
        `,
        [by]
      );
    }
    return res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default {
  getMany
};
