const { Questions, Doctor, User, Comment, Replies } = require("../database/sequelize");
const { v4: uuidv4 } = require("uuid");

const updateNumComment = async (id) => {
  let num_comment = 0;
  const question = await Questions.findOne({
    where: {
      Question_id: id
    }
  });
  const comments = await Comment.findAll({
    where: {
      Question_id: id
    },
    raw: true
  });
  for(let i = 0; i < comments.length; i += 1) {
    const replies = await Replies.findAll({
      where: {
        Comment_id: comments[i].Comment_id
      },
      raw: true
    });
    num_comment = num_comment + 1 + replies.length;
  }
  question.num_comments = num_comment;
  await question.save();
}
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
    newQuestion = newQuestion.get({ plain: true });
    newQuestion = { ...newQuestion, avatar: req.user.avatar, approved: req.user.approved };
    return res.status(200).json({
      status: 200,
      data: newQuestion,
      message: "Đăng Bài Viết Thành Công !",
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
        message: "Unauthorized - Bạn Không Phải Là Tác Giả Của Bài Viết Này !",
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
      message: "Cập Nhật Thành Công !",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteQuestion = async (req, res, next) => {
  try {

    const { id } = req.params;
    const { User_id, Doctor_id, role } = req.user;
    let check = true;

    const question = await Questions.findOne({
      where: {
        Question_id: id
      },
      raw: true
    });
    if(!question) {
      return res.status(404).json({
        status: 404,
        message: 'Bài Viết Không Tồn Tại !'
      })
    }
    if(role !== 'admin') {
      if(question.User_id) {
        if (User_id !== question.User_id) {
          check = false;
        }
      } else {
        if(Doctor_id !== question.Doctor_id) {
          check = false;
        }
      }
    }
    if(!check) {
      return res.status(403).json({
        status: 403,
        message: 'Không Có Quyền Truy Cập Vào Tài Nguyên Này !'
      })
    }
    const comments = await Comment.findAll({
      where: {
        Question_id: id
      },
      raw: true
    });
    for (let i = 0; i < comments.length; i += 1) {
      await Replies.destroy({
        where: {
          Comment_id: comments[i].Comment_id
        }
      })
    }
    await Comment.destroy({
      where: {
        Question_id: id
      },
    });

    await Questions.destroy({
      where: {
        Question_id: id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Xóa Thành Công !",
    });

  } catch (error) {
    return next(error);
  }
};

const getSearchQuestions = async (req, res, next) => {
  try {
    const { content } = req.query;
    const searchQuestions = await Questions.findAll({
      raw: true
    });
    const list = searchQuestions.filter(item => item.Content.toLowerCase().includes(content.toLowerCase()));
    let newList = [];
    for (let i = 0; i < list.length; i++) {
      if (list[i].User_id) {
        const user = await User.findOne({
          where: {
            User_id: list[i].User_id,
          },
          raw: true
        });
        const obj = {
          ...list[i],
          name: user.name
        }
        newList.push(obj);
      } else {
        const doctor = await Doctor.findOne({
          where: {
            Doctor_id: list[i].Doctor_id,
          },
          raw: true
        });
        const obj = {
          ...list[i],
          name: doctor.name
        }
        newList.push(obj);
      }
    }
    return res.status(200).json({
      status: 200,
      data: newList,
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
    questions.forEach(async (item) => {
      await updateNumComment(item.Question_id);
    })
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
          name: user.name
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
          approved: doctor.approved
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
        message: "Bài Viết Không Tồn Tại !"
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
      question = { ...question, name: questionOwner.name, avatar: questionOwner.avatar, approved: questionOwner.approved }
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
          avatar: commentOnwer.avatar,
          approved: commentOnwer.approved
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
          replies[j] = { ...replies[j], name: replyOwner.name, avatar: replyOwner.avatar, approved: replyOwner.approved }
        }
      }
      comments[i] = { ...comments[i], replies }
    }
    const detailQuestion = { ...question, comments }
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
    let { Doctor_id, User_id } = req.user;
    Doctor_id = Doctor_id || null;
    User_id = User_id || null;

    const questions = await Questions.findAll({
      where: {
        Doctor_id,
        User_id
      },
      raw: true
    });

    return res.status(200).json({
      status: 200,
      data: questions,
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
  getSearchQuestions,
  getPublicQuestions,
  getQuestion,
  getOwnQuetion,
};
