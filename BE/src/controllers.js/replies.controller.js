const { Replies, Comment, Questions } = require("../database/sequelize");
const { v4: uuidv4 } = require("uuid");

const createReplies = async (req, res, next) => {
  try {
    const { Content } = req.body;
    const { id } = req.params;
    let { User_id, Doctor_id } = req.user;

    User_id = User_id || null;
    Doctor_id = Doctor_id || null;

    const comment = await Comment.findOne({
      where: {
        Comment_id: id,
      },
    });

    if (!comment) {
      return res.status(404).json({
        status: 404,
        message: "Bình Luận Không Tồn Tại !",
      });
    }
    
    const Replies_id = uuidv4();
    let newReplies = await Replies.create({
      Replies_id,
      Content,
      User_id,
      Doctor_id,
      Comment_id: id,
    });

    const question = await Questions.findOne({
      where: {
        Question_id: comment.Question_id,
      },
    });

    question.num_comments += 1;
    await question.save();

    newReplies = newReplies.get({plain: true});
    newReplies = {...newReplies, name: req.user.name, avatar: req.user.avatar, approved: req.user.approved};

    return res.status(200).json({
      status: 200,
      data: newReplies,
      message: "Thêm Thành Công !",
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
        User_id,
        Doctor_id
      },
    });
    if (!replies) {
      return res.status(404).json({
        status: 404,
        message: "Câu Trả Lời Không Tồn Tại !",
      });
    }
    replies.Content = Content;
    await replies.save();

    return res.status(200).json({
      status: 200,
      data: replies,
      message: "Cập Nhật Thành Công !",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteReplies = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { User_id, Doctor_id, Admin_id } = req.user;

    User_id = User_id || null;
    Doctor_id = Doctor_id || null;
    Admin_id = Admin_id || null;

    let replies;
    if (Admin_id) {
      replies = await Replies.findOne({
        where: {
          Replies_id: id,
        },
      })
    } else {
      replies = await Replies.findOne({
        where: {
          Replies_id: id,
          User_id,
          Doctor_id,
        },
      });
    }

    if (!replies) {
      return res.status(404).json({
        status: 404,
        message: "Câu Trả Lời Không Tồn Tại !",
      });
    }
    const comment = await Comment.findOne({
      where: {
        Comment_id: replies.Comment_id,
      },
    });
    const question = await Questions.findOne({
      where: {
        Question_id: comment.Question_id,
      },
    });
    await replies.destroy();
    question.num_comments -= 1;
    await question.save();

    return res.status(200).json({
      status: 200,
      message: "Xóa Thành Công !",
    });
  } catch (error) {
    return next(error);
  }
};

const getReplies = async (req, res) => {
  try {
    const { id } = req.params;
    const replies = await Replies.findAll({
      where: {
        Comment_id: id,
      },
    });
    return res.status(200).json({
      status: 200,
      data: replies
    });
  } catch(error) {
    return next(error);
  }
}

module.exports = {
  createReplies,
  updateReplies,
  deleteReplies,
  getReplies
};
