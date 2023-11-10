const { News } = require("../database/sequelize");
const { getUserFromToken } = require("../middlewares/check-login.middleware");
const { v4: uuidv4 } = require("uuid");

const createNew = async (req, res, next) => {
  try {
    const { Title, Content } = req.body;
    const News_id = uuidv4();
    const currUser = await getUserFromToken(req, res, next);
    const newPageUser = await News.create({
      News_id,
      Title,
      Content,
      User_id: currUser.User_id,
    });
    return res.json({
      data: {
        newPageUser,
      },
      message: "Create news success",
    });
  } catch (error) {
    return next(error);
  }
};

const updateNew = async (req, res, next) => {
  try {
    const { Title, Content } = req.body;
    const { News_id } = req.params;
    const updateNews = await News.update(
      {
        Title,
        Content,
      },
      {
        where: {
          News_id: News_id,
        },
      }
    );

    return res.json({
      data: {
        updateNews,
      },
      message: "Update new success",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteNew = async (req, res, next) => {
  try {
    const { News_id } = req.params;

    const deleteNew = await News.destroy({
      where: { News_id },
    });

    return res.json({
      data: {
        deleteNew,
      },
      message: "Delete New success",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createNew,
  updateNew,
  deleteNew,
};
