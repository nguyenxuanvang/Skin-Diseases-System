const { Comment,Questions } = require("../database/sequelize");
const { v4: uuidv4 } = require("uuid");

const createComment = async (req, res, next) => {
  try {
    const { Content } = req.body;
    const { id } = req.params;
    const {User_id, Doctor_id} = req.user;

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
      Question_id: id
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
    let { User_id, Doctor_id } = req.user;

    User_id = User_id || null;
    Doctor_id = Doctor_id || null;

    const comment = await Comment.findOne({
      where: {
        Comment_id: id,
        User_id,
        Doctor_id,
      },
    });

    if (!comment) {
      return res.status(404).json({
        status: 404,
        message: "Update Denied!",
      });
    }

    comment.Content = Content;
    await comment.save();

    return res.status(200).json({
      status: 200,
      data: {
        updatedComment: comment,
      },
      message: "Updated Comment Successfully!",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteCommentQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { User_id, Doctor_id, Admin_id } = req.user;

    User_id = User_id || null;
    Doctor_id = Doctor_id || null;
    Admin_id = Admin_id || null;

    let comment;
    if(Admin_id) {
      comment = await Comment.findOne({
        where: {
          Comment_id: id,
        },
      });
    } else {
      comment = await Comment.findOne({
        where: {
          Comment_id: id,
          User_id,
          Doctor_id,
        },
      });
    }

    if (!comment) {
      return res.status(404).json({
        status: 404,
        message: "Comment Not Found !",
      });
    }

    await comment.destroy();

    return res.status(200).json({
      status: 200,
      message: "Deleted Comment Successfully!",
    });
  } catch (error) {
    return next(error);
  }
};
const getComments = async(req,res) => {
  try {
    const { id } = req.params;

    const comments = await Comment.findAll({
      where: {
        Question_id: id,
      },
    });
    return res.status(200).json({
      status: 200,
      data: comments
    })
  } catch (error) {
    return next(error);
  }
}

module.exports = {
  createComment,
  updateCommentQuestion,
  deleteCommentQuestion,
  getComments
};