import db from '../../utils/db';

export const followOne = async (req, res) => {
  const { id: self } = req.query;
  const { id: uid } = req.params;
  try {
    await db.none(
      `
      insert into follows
      values ($1, $2)
      `,
      [self, uid]
    );
    res.status(201).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export const unfollowOne = async (req, res) => {
  const { id: self } = req.query;
  const { id: uid } = req.params;
  try {
    await db.none(
      `
      delete from follows
      where user_id_1 = $1
      and user_id_2 = $2
      `,
      [self, uid]
    );
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};
