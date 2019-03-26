import db from '../../utils/db';

// TODO: Get all followed users
// Filter by artist
const getMany = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error });
  }
};

// TODO: Get info about one user
const getOne = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error });
  }
};

// TODO: Get info about self
const getSelf = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error });
  }
};

// TODO: Follow user
const followOne = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error });
  }
};

// TODO: Unfollow user
const unfollowOne = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error });
  }
};

// TODO: Update self information
const updateSelf = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error });
  }
};

// TODO: Delete profile
const deleteSelf = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ error });
  }
};

export default {
  getMany,
  getOne,
  followOne,
  unfollowOne,
  getSelf,
  updateSelf,
  deleteSelf
};
