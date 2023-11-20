const { News } = require("../database/sequelize");
const { v4: uuidv4 } = require("uuid");

const createNew = async (req, res, next) => {
  try {
    const { Title, Content } = req.body;
    const News_id = uuidv4();
    const newNews = await News.create({
      News_id,
      Title,
      Content,
    });
    return res.status(200).json({
      status: 200,
      data: {
        newNews,
      },
      message: "Create News Successfully !",
    });
  } catch (error) {
    return next(error);
  }
};

const getNews = async (req, res, next) => {
  try {
    
    const news = await News.findAll({
      order: [["createdAt", /*"DESC"*/ "ASC"]],
    });
    return res.status(200).json({
      status: 200,
      data: {
        news,
      },
      message: "Get News Successfully !",
    });
  } catch (error) {
    return next(error);
  }
};

const getNew = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findNew = await News.findOne({
      where: {
        News_id: id,
      },
    });
    if (!findNew) {
      return res.status(400).json({
        status: 400,
        message: "News Is Not Exist !",
      });
    }
    return res.status(200).json({
      status: 200,
      data: {
        news: findNew,
      },
    });
  } catch (error) {
    return next(error);
  }
};

const updateNew = async (req, res, next) => {
  try {
    const { Title, Content } = req.body;
    const { id } = req.params;
    await News.update(
      {
        Title,
        Content,
      },
      {
        where: {
          News_id: id,
        },
      }
    );
    const updateNews = await News.findOne({
      where: {
        News_id: id
      }
    })
    return res.status(200).json({
      status: 200,
      data: {
        updateNews,
      },
      message: "Update News Successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteNew = async (req, res, next) => {
  try {
    const { id } = req.params;

    await News.destroy({
      where: {
        News_id: id,
      },
    });

    return res.status(200).json({
      status: 200,
      message: "Deleted News Successfully !",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createNew,
  getNews,
  getNew,
  updateNew,
  deleteNew,
};
