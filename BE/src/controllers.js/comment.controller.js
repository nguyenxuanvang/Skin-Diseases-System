const { Comment,Questions,Doctor,User, Replies } = require("../database/sequelize");
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
        message: "Bài Viết Không Tồn Tại !",
      });
    }
    const Comment_id = uuidv4();
    let newComment = await Comment.create({
      Comment_id,
      Content,
      User_id,
      Doctor_id,
      Question_id: id
    });
    newComment = newComment.get({plain: true});
    newComment = {...newComment, name: req.user.name, avatar: req.user.avatar, approved: req.user.approved, replies: []};
    question.num_comments += 1;
    await question.save();

    return res.status(200).json({
      status: 200,
      data: newComment,
      message: "Thêm Thành Công !",
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
        message: "Bình Luận Không Tồn Tại !",
      });
    }

    comment.Content = Content;
    await comment.save();

    return res.status(200).json({
      status: 200,
      data: comment,
      message: "Cập Nhật Thành Công !",
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
        message: "Bình Luận Không Tồn Tại !",
      });
    }
    const question = await Questions.findOne({
      where: {
        Question_id: comment.Question_id,
      },
    });
    const replies = await Replies.findAll({
      where: {
        Comment_id: comment.Comment_id
      },
      raw: true
    });
    await Replies.destroy({
      where: {
        Comment_id: comment.Comment_id
      }
    })
    await comment.destroy();
    question.num_comments -= replies.length + 1;
    await question.save();

    return res.status(200).json({
      status: 200,
      message: "Xóa Thành Công !",
    });
  } catch (error) {
    return next(error);
  }
};
const getComments = async(req,res) => {
  try {
    const { id } = req.params;

    const comments = await Comment.findAll({
      order: [["createdAt", "DESC" /*"ASC"*/]],
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
const getOwnComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await Comment.findOne({
      where: {
        Comment_id: id
      },
    });
    if(!comment) {
      return res.status(404).json({
        status: 404,
        message: "Bài Viết Không Tồn Tại !"
      })
    }
    let owner;
    if(comment.Doctor_id) {
      owner = await Doctor.findOne({
      where: {
        Doctor_id: comment.Doctor_id
      },
    });
    }else {
      owner = await User.findOne({
        where: {
          User_id: comment.User_id
        },
      });
    }
    return res.status(200).json({
      status: 200,
      data: owner,
      message: "Truy Vấn Bình Luận Cá Nhân Thành Công !",
    });
  } catch (error) {
    return next(error);
  }
};
module.exports = {
  createComment,
  updateCommentQuestion,
  deleteCommentQuestion,
  getComments,
  getOwnComment
};
