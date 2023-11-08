const { News } = require("../database/sequelize");

const createNew = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const currUser = await getUserFromToken(req, res, next);
    const newPageUser = await News.createNew({
      title,
      content,
      UserId: currUser.id,
    });
    await addTagToTutorial(newPageUser.id);
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
    const { title, content } = req.body;
    const { id } = req.params;
    const updateNews = await News.update(
      {
        title,
        content,
      },
      {
        where: {
          id: id,
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
    const { id } = req.params;

    const deleteNew = await News.destroy({
      where: { id },
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
