const { Questions, Doctor, User, Comment, Replies } = require("../database/sequelize");
const { v4: uuidv4 } = require("uuid");

const createQuestion = async (req, res, next) => {
  try {
    const { Content } = req.body;
    const Question_id = uuidv4();
    const { User_id, Doctor_id } = req.user;
    let newQuestion = await Questions.create({
      Question_id,
      Content,
      User_id,
      Doctor_id,
      num_comments: 0
    });
    newQuestion = newQuestion.get({plain: true});
    newQuestion = {...newQuestion, avatar: req.user.avatar};
    return res.status(200).json({
      status: 200,
      data: newQuestion,
      message: "Create Questions Successfully !",
    });
  } catch (error) {
    return next(error);
  }
};

const updateQuestion = async (req, res, next) => {
  try {
    const { Content } = req.body;
    const { id } = req.params;
    let { User_id, Doctor_id } = req.user;
    User_id = User_id || null;
    Doctor_id = Doctor_id || null;

    const existingQuestion = await Questions.findOne({
      where: {
        Question_id: id,
        User_id,
        Doctor_id
      }

    });

    if (!existingQuestion) {
      return res.status(403).json({
        status: 403,
        message: "Unauthorized - You are not the creator of this question!",
      });
    }

    await Questions.update(
      {
        Content,
      },
      {
        where: {
          Question_id: id,
          User_id,
          Doctor_id
        },
      }
    );
    const updateQuestion = await Questions.findOne({
      where: {
        Question_id: id,
      },
    });
    return res.status(200).json({
      status: 200,
      data: {
        updateQuestion,
      },
      message: "Update Questions Successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    let { User_id, Doctor_id, Admin_id } = req.user;

    User_id = User_id || null;
    Doctor_id = Doctor_id || null;

    let deleteItemquestion;
    if (Admin_id) {
      deleteItemquestion = await Questions.destroy({
        where: {
          Question_id: id
        },
      });
    } else {
      deleteItemquestion = await Questions.destroy({
        where: {
          Question_id: id,
          User_id,
          Doctor_id
        },
      });
    }
    if (!deleteItemquestion) {
      return res.status(404).json({
        status: 404,
        message: "Question Not Found !",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Deleted Question Successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const getQuestions = async (req, res, next) => {
  try {
    let { User_id, Doctor_id, Admin_id } = req.user;
    User_id = User_id || null;
    Doctor_id = Doctor_id || null;

    let listAllQuestions;
    if (Admin_id) {
      listAllQuestions = await Questions.findAll({});
    } else {
      listAllQuestions = await Questions.findAll({
        where: {
          User_id,
          Doctor_id
        },
      });
    }

    return res.status(200).json({
      status: 200,
      data: {
        listAllQuestions,
      },
      message: "Get Questions Successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const getPublicQuestions = async (req, res, next) => {
  try {
    const questions = await Questions.findAll({
      order: [["createdAt", "DESC" /*"ASC"*/]],
      raw: true
    });
    let questionList = [];
    for (let i = 0; i < questions.length; i++) {
      if (questions[i].User_id) {
        const user = await User.findOne({
          where: {
            User_id: questions[i].User_id,
          },
          raw: true
        });
        const newUser = {
          ...questions[i],
          avatar: user.avatar,
        }
        questionList.push(newUser);
      } else {
        const doctor = await Doctor.findOne({
          where: {
            Doctor_id: questions[i].Doctor_id,
          },
          raw: true
        });
        const newDoctor = {
          ...questions[i],
          avatar: doctor.avatar,
        }
        questionList.push(newDoctor);
      }
    }
    return res.status(200).json({
      status: 200,
      data: questionList,
      message: "Get Questions Successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const getQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    let question = await Questions.findOne({
      where: {
        Question_id: id
      },
      raw: true
    });
    if (!question) {
      return res.status(404).json({
        status: 404,
        message: "Question Is Not Found !"
      })
    }
    if (question.User_id) {
      const questionOwner = await User.findOne({
        where: {
          User_id: question.User_id
        },
        raw: true
      });
      question = { ...question, name: questionOwner.name, avatar: questionOwner.avatar }
    } else {
      const questionOwner = await Doctor.findOne({
        where: {
          Doctor_id: question.Doctor_id
        },
        raw: true
      });
      question = { ...question, name: questionOwner.name, avatar: questionOwner.avatar }
    }
    const comments = await Comment.findAll({
      where: {
        Question_id: question.Question_id
      },
      order: [["createdAt", "DESC" /*"ASC"*/]],
      raw: true
    });
    for (let i = 0; i < comments.length; i++) {
      if (comments[i].User_id) {
        const commentOnwer = await User.findOne({
          where: {
            User_id: comments[i].User_id
          },
          raw: true
        });

        comments[i] = {
          ...comments[i],
          name: commentOnwer.name,
          avatar: commentOnwer.avatar
        }
      } else {
        const commentOnwer = await Doctor.findOne({
          where: {
            Doctor_id: comments[i].Doctor_id
          },
          raw: true
        });
        comments[i] = {
          ...comments[i],
          name: commentOnwer.name,
          avatar: commentOnwer.avatar
        }
      }
    }
    for (let i = 0; i < comments.length; i++) {
      const replies = await Replies.findAll({
        where: {
          Comment_id: comments[i].Comment_id,
        },
        order: [["createdAt", "DESC" /*"ASC"*/]],
        raw: true
      });
      for (let j = 0; j < replies.length; j++) {
        if (replies[j].User_id) {
          const replyOwner = await User.findOne({
            where: {
              User_id: replies[j].User_id
            },
            raw: true
          });
          replies[j] = { ...replies[j], name: replyOwner.name, avatar: replyOwner.avatar }
        } else {
          const replyOwner = await Doctor.findOne({
            where: {
              Doctor_id: replies[j].Doctor_id
            },
            raw: true
          });
          replies[j] = { ...replies[j], name: replyOwner.name, avatar: replyOwner.avatar }
        }
      }
      comments[i] = { ...comments[i], replies }
    }
    const detailQuestion = {...question,comments}
    return res.status(200).json({
      status: 200,
      data: detailQuestion,
      message: "Get Questions Successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const getOwnQuetion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await Questions.findOne({
      where: {
        Question_id: id
      },
    });
    if (!question) {
      return res.status(404).json({
        status: 404,
        message: "Question Is Not Found !"
      })
    }
    let owner;
    if (question.Doctor_id) {
      owner = await Doctor.findOne({
        where: {
          Doctor_id: question.Doctor_id
        },
      });
    } else {
      owner = await User.findOne({
        where: {
          User_id: question.User_id
        },
      });
    }
    return res.status(200).json({
      status: 200,
      data: owner,
      message: "Get Question Owner Successfully",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getQuestions,
  getPublicQuestions,
  getQuestion,
  getOwnQuetion,
  getPublicQuestions,
};
