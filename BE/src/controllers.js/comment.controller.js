const { Questions, Comment } = require("../database/sequelize");
const { v4: uuidv4 } = require("uuid");

const createComment = async (req, res, next) => {
  try {
    const { Content } = req.body;
    const { id } = req.params;
    const { User_id, Doctor_id } = req.user;

    const question = await Questions.findOne({
      where: {
        Question_id: id,
      },
    });

    if (!question) {
      return res.status(404).json({
        status: 404,
        message: "Question not found!",
      });
    }
    const Comment_id = uuidv4();
    const newComment = await Comment.create({
      Comment_id,
      Content,
      User_id,
      Doctor_id,
      Question_id: id,
    });

    return res.status(200).json({
      status: 200,
      data: {
        newComment,
      },
      message: "Comment added successfully!",
    });
  } catch (error) {
    return next(error);
  }
};

const updateCommentQuestion = async (req, res, next) => {
  try {
    const { Content } = req.body;
    const { id } = req.params;
    const { User_id, Doctor_id } = req.user;

    const question = await Questions.findOne({
      where: {
        Question_id: id,
      },
    });

    if (!question) {
      return res.status(404).json({
        status: 404,
        message: "Question not found!",
      });
    }
  } catch (error) {
    return next(error);
  }
};

const deleteCommentQuestion = async (req, res, next) => {
  try {
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  createComment,
  updateCommentQuestion,
  deleteCommentQuestion,
};
