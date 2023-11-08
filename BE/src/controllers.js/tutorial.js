const { Op } = require("sequelize");
const { faker } = require("@faker-js/faker");
const { Tutorial, User } = require("../database/sequelize");
const { getUserFromToken } = require("../middlewares/check-login.middleware");

const pagination = async (req, res, next) => {
  try {
    const { page, perPage } = req.query;
    const offset = (+page - 1) * +perPage;
    const limit = +perPage;

    const allTutorials = await Tutorial.findAndCountAll({
      where: {},
      offset,
      limit,
    });

    const { count } = allTutorials;
    const totalPage = Math.ceil(count / perPage);

    return res.json({
      data: {
        totalPage,
        page,
        perPage,
        total: count,
        allTutorials: allTutorials.rows,
      },
    });
  } catch (error) {}
};

const getAll = async (req, res, next) => {
  try {
    const allTutorials = await Tutorial.findAll({
      order: [["createdAt", /*"DESC"*/ "ASC"]],
    });

    return res.json({
      data: {
        allTutorials,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const search = async (req, res, next) => {
  console.log(
    "🚀 ~ file: tutorial.controller.js:18 ~ search ~ req:",
    req.query.title
  );
  try {
    const allTutorials = await Tutorial.findAll({
      where: {
        title: {
          [Op.like]: `%${req.query.title}%`,
        },
      },
    });

    return res.json({
      data: {
        allTutorials,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const currTutorial = await Tutorial.findOne({
      where: {
        id: id,
      },
      raw: true,
    });

    if (!currTutorial) {
      throw Error("This tutorial is not found");
    }

    return res.json({
      data: {
        currTutorial,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { title, description, publishedStatus } = req.body;
    const currUser = await getUserFromToken(req, res, next);
    const newTutorial = await Tutorial.create({
      title,
      description,
      publishedStatus,
      UserId: currUser.id,
    });
    await addTagToTutorial(newTutorial.id);
    return res.json({
      data: {
        newTutorial,
      },
      message: "Create tutorial success",
    });
  } catch (error) {
    return next(error);
  }
};

// const addTagToTutorial = async (tutorialId, tagId) => {
//   const currentTag = await Tag.findOne({ where: { id: tagId } });
//   currentTag.addTutorial(tutorialId);
// };

const updateOne = async (req, res, next) => {
  try {
    const { title, description, publishedStatus } = req.body;
    const { id } = req.params;
    console.log("🚀 ~ file: tutorial.controller.js:67 ~ updateOne ~ id:", id);

    const updateTutorial = await Tutorial.update(
      {
        title,
        description,
        publishedStatus,
      },
      {
        where: {
          id: id,
        },
      }
    );

    return res.json({
      data: {
        updateTutorial,
      },
      message: "Update tutorial success",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteOne = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTutorial = await Tutorial.destroy({
      where: { id },
    });

    return res.json({
      data: {
        deletedTutorial,
      },
      message: "Delete tutorial success",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteAll = async (req, res, next) => {
  try {
    await Tutorial.destroy({
      where: {},
    });

    return res.json({
      message: "Delete all tutorial success",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  updateOne,
  deleteOne,
  deleteAll,
  search,
  pagination,
};
