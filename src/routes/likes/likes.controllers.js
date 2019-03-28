import db from '../../utils/db';

export const getLiked = async (req, res) => {
  const { id } = req.query;
  try {
    const data = await db.any(
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
    res.status(200).json({ data });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const like = async (req, res) => {
  const { id: uid } = req.query;
  const { id: sid } = req.body;
  try {
    await db.none('insert into likes values ($1, $2)', [uid, sid]);
    res.status(201).end();
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

export const unlike = async (req, res) => {
  const { id: uid } = req.query;
  const { id: sid } = req.params;
  try {
    await db.none('delete from likes where song_id = $1 and user_id = $2', [
      sid,
      uid
    ]);
    res.status(201).end();
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
