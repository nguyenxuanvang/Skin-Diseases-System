const { Questions } = require("../database/sequelize");
const { v4: uuidv4 } = require("uuid");

const createQuestion = async (req, res, next) => {
  try {
    const { Content } = req.body;
    const Question_id = uuidv4();
    const { User_id, Doctor_id } = req.user;
    const newQuestion = await Questions.create({
      Question_id,
      Content,
      User_id,
      Doctor_id,
    });
    return res.status(200).json({
      status: 200,
      data: {
        newQuestion,
      },
      message: "Create Questions Successfully !",
    });
  } catch (error) {
    return next(error);
  }
};

const updateQuestion = async (req, res, next) => {
  try {
    let existingQuestion;
    const { Content } = req.body;
    const { id } = req.params;
    const { User_id, Doctor_id } = req.user;
    if (User_id) {
      existingQuestion = await Questions.findOne({
        where: {
          Question_id: id,
          User_id,
        },
      });
    } else {
      existingQuestion = await Questions.findOne({
        where: {
          Question_id: id,
          Doctor_id,
        },
      });
    }

    if (!existingQuestion) {
      return res.status(403).json({
        status: 403,
        message: "Unauthorized - You are not the creator of this question!",
      });
    }
    let updateQuestion;
    if (User_id) {
      updateQuestion = await Questions.update(
        {
          Content,
        },
        {
          where: {
            Question_id: id,
            User_id,
          },
        }
      );
    } else {
      updateQuestion = await Questions.update(
        {
          Content,
        },
        {
          where: {
            Question_id: id,
            Doctor_id,
          },
        }
      );
    }
    updateQuestionNew = await Questions.findOne({
      where: {
        Question_id: id,
      },
    });
    return res.status(200).json({
      status: 200,
      data: {
        updateQuestionNew,
      },
      message: "Update Questions Successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteQuestion = async (req, res, next) => {
  try {
    let deleteItemquestion;
    const { id } = req.params;
    const { User_id, Doctor_id } = req.user;
    if (User_id) {
      deleteItemquestion = await Questions.destroy({
        where: {
          Question_id: id,
          User_id,
        },
      });
    } else {
      deleteItemquestion = await Questions.destroy({
        where: {
          Question_id: id,
          Doctor_id,
        },
      });
    }
    if (!deleteItemquestion) {
      return res.status(403).json({
        status: 403,
        message: "Unauthorized - You are not the creator of this question!",
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
    let listAllQuestions;
    const { User_id, Doctor_id } = req.user;
    if (User_id) {
      listAllQuestions = await Questions.findAll({
        where: {
          User_id,
        },
      });
    } else {
      listAllQuestions = await Questions.findAll({
        where: {
          Doctor_id,
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

const getQuestion = async (req, res, next) => {
  try {
    let listOneQuestion;
    const { User_id, Doctor_id } = req.user;
    if (User_id) {
      listOneQuestion = await Questions.findOne({
        where: {
          User_id,
        },
      });
    } else {
      listOneQuestion = await Questions.findOne({
        where: {
          Doctor_id,
        },
      });
    }
    return res.status(200).json({
      status: 200,
      data: {
        listOneQuestion,
      },
      message: "Get Questions Successfully",
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
  getQuestion,
};
