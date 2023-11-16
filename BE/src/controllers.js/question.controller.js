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
    const { Content } = req.body;
    const { id } = req.params;
    let { User_id, Doctor_id } = req.user;

    User_id = User_id || null;
    Doctor_id = Doctor_id || null;

    const existingQuestion = await Questions.findOne({
      where: {
        Question_id: id,
        User_id,
        Doctor_id,
      },
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
          Doctor_id,
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
    let { User_id, Doctor_id } = req.user;

    User_id = User_id || null;
    Doctor_id = Doctor_id || null;

    const deleteItemquestion = await Questions.destroy({
      where: {
        Question_id: id,
        User_id,
      },
    });

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
    const { id } = req.params;
    const question = await Questions.findOne({
      where: {
        Question_id: id,
      },
    });
    if (!question) {
      return res.status(404).json({
        status: 404,
        message: "Question Is Not Found !",
      });
    }
    return res.status(200).json({
      status: 200,
      data: {
        question,
      },
      message: "Get Questions Successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const getPublicQuestions = async (req, res, next) => {
  try {
    const questions = await Questions.findAll({});
    return res.status(200).json({
      status: 200,
      data: {
        questions,
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
  getPublicQuestions,
};
