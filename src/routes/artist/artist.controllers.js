import db from '../../utils/db';

export const getMany = async (req, res) => {
  const { id, fav } = req.query;
  try {
    let data;
    if (!fav) {
      // Query all artists, sort by descending
      // total num of plays
      data = await db.any(
        `
        select u.user_id, name, num_plays
        from user_1 u, (
          select a.user_id, sum(no_of_plays) as num_plays
          from artist a, song s
          where a.user_id = s.artist_id
          group by a.user_id
        ) as a
        where u.user_id = a.user_id
        order by a.num_plays desc
        `
      );
    } else {
      // Query all artists who user has liked
      // all of their songs
      data = await db.any(
        `
        select u.user_id, u.name
        from user_1 u, artist a
        where u.user_id = a.user_id
        and not exists (
          select * from song s
          where s.artist_id = u.user_id
          and not exists (
            select * from likes l
            where l.song_id = s.song_id
            and l.user_id = $1
          )
        )
        `,
        [id]
      );
    }
    res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const getOne = async (req, res) => {
  const { id: aid } = req.params;
  try {
    // Query artist info
    const data = await db.oneOrNone(
      `
      select u.user_id, a.bio, name, num_plays
      from user_1 u, (
        select a.user_id, a.bio, sum(no_of_plays) as num_plays
        from artist a, song s
        where a.user_id = s.artist_id
        group by a.user_id
      ) as a
      where u.user_id = a.user_id
      and a.user_id = $1
      `,
      [aid]
    );
    if (!data) {
      return res.status(404).json({ error: 'Artist does not exist' });
    }
    return res.status(200).json({ data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};

export const getFollowed = async (req, res) => {
  const { id } = req.params;
  const { id: uid } = req.query;
  try {
    const data = await db.oneOrNone(
      `
      select * from follows
      where user_id_1 = $1
      and user_id_2 = $2
      `,
      [uid, id]
    );
    res.status(200).json({ follows: Boolean(data) });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err });
  }
};
