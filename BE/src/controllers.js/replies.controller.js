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
        message: "Comment Not Found !",
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
    newReplies = {...newReplies, name: req.user.name, avatar: req.user.avatar};

    return res.status(200).json({
      status: 200,
      data: newReplies,
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
        User_id,
        Doctor_id
      },
    });
    if (!replies) {
      return res.status(404).json({
        status: 404,
        message: "Replies Not Found!",
      });
    }
    replies.Content = Content;
    await replies.save();

    return res.status(200).json({
      status: 200,
      data: {
        updatedReplies: replies,
      },
      message: "Updated Replies Successfully!",
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
        message: "Replies Not Found !",
      });
    }

    await replies.destroy();

    return res.status(200).json({
      status: 200,
      message: "Deleted Replies Successfully!",
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
