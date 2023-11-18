const { Replies, Comment } = require("../database/sequelize");
const { v4: uuidv4 } = require("uuid");

const createReplies = async (req, res, next) => {
  try {
    const { Content } = req.body;
    const { id } = req.params;
    const { User_id, Doctor_id } = req.user;

    const comment = await Comment.findOne({
      where: {
        Comment_id: id,
      },
    });

    if (!comment) {
      return res.status(404).json({
        status: 404,
        message: "Comment not found!",
      });
    }

    const Replies_id = uuidv4();
    const newReplies = await Replies.create({
      Replies_id,
      Content,
      User_id,
      Doctor_id,
      Comment_id: id,
    });
    return res.status(200).json({
      status: 200,
      data: {
        newReplies,
      },
      message: "Replies added successfully!",
    });
  } catch (error) {
    return next(error);
  }
};

const updateReplies = async (req, res, next) => {
  try {
    const { Content } = req.body;
    const { id } = req.params;
    let { User_id, Doctor_id } = req.user;
    User_id = User_id || null;
    Doctor_id = Doctor_id || null;

    const replies = await Replies.findOne({
      where: {
        Replies_id: id,
      },
    });
    if (!replies) {
      return res.status(404).json({
        status: 404,
        message: "Replies not found !",
      });
    }
    replies.Content = Content;
    await replies.save();

    return res.status(200).json({
      status: 200,
      data: {
        updatedReplies: replies,
      },
      message: "Replies updated successfully!",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteReplies = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { User_id, Doctor_id } = req.user;

    User_id = User_id || null;
    Doctor_id = Doctor_id || null;

    const replies = await Replies.findOne({
      where: {
        Replies_id: id,
        User_id,
        Doctor_id,
      },
    });
    if (!replies) {
      return res.status(404).json({
        status: 404,
        message: "Replies not found for this comment!",
      });
    }

    await replies.destroy();

    return res.status(200).json({
      status: 200,
      message: "Replies deleted successfully!",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createReplies,
  updateReplies,
  deleteReplies,
};
