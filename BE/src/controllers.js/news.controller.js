const { News } = require("../database/sequelize");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

const storage = multer.diskStorage({
  destination: "./src/Images/News",
  filename: async (req, file, cb) => {
    const {action} = req;
    let newFileName;
    if(action === 'create') {
      const randomStr = uuidv4();
      const originalExtension = path.extname(file.originalname);
      newFileName = randomStr + originalExtension;
      req.newFile = newFileName;
      
    } else {
      const findNews = await News.findOne({
        where: {
          News_id: req.params.id,
        },
      });
      const randomStr = uuidv4();
      const listImage = fs.readdirSync("./src/Images/News");
      const findImage = listImage.find(item => item === findNews.image);
      if (findImage) {
        fs.unlinkSync(`./src/Images/News/${findImage}`);
      }
      const originalExtension = path.extname(file.originalname);
      newFileName = randomStr + originalExtension;
      req.newFile = newFileName;
    }
    cb(null, newFileName);
  },
});

const upload = multer({ storage: storage });

const createNew = async (req, res, next) => {
  try {
    const { Title, Content } = req.body;
    const News_id = uuidv4();
    const newNews = await News.create({
      News_id,
      Title,
      Content,
      image: req.newFile
    });
    return res.status(200).json({
      status: 200,
      data: newNews,
      message: "Tạo Tin Tức Thành Công !",
    });
  } catch (error) {
    const listNews = fs.readdirSync("./src/Images/News");
    const findImage = listNews.find(item => item === req.newFile);
    if (findImage) {
      fs.unlinkSync(`./src/Images/News/${findImage}`);
    }
    return next(error);
  }
};


const getNews = async (req, res, next) => {
  try {
    const news = await News.findAll({
      order: [["createdAt", "DESC" /*"ASC"*/]],
    });
    return res.status(200).json({
      status: 200,
      data: news,
      message: "Get News Successfully !",
    });
  } catch (error) {
    return next(error);
  }
};

const getSearchNews = async (req, res, next) => {
  try {
    const { title } = req.query;
    const listNews = await News.findAll({
      raw: true
    });
    const list = listNews.filter(item => item.Title.toLowerCase().includes(title.toLowerCase()));
    return res.status(200).json({
      status: 200,
      data: list,
      message: "Get Search News Successfully",
    });
  } catch (error) {
    return next(error);
  }
};

const getNewsRelated = async (req,res,next) => {
  try{
    const { name } = req.params;
    const listNews = await News.findAll({
      order: [["createdAt", "DESC" /*"ASC"*/]],
      raw: true
    });
    const newsRelated = listNews.filter(item => item.Title.toLowerCase().includes(name.toLowerCase()));
    return res.status(200).json({
      status: 200,
      data: newsRelated
    })
  } catch(error) {
    return next(error);
  }
}

const getNew = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findNew = await News.findOne({
      where: {
        News_id: id,
      },
    });
    if (!findNew) {
      return res.status(404).json({
        status: 404,
        message: "Tin Tức Không Tồn Tại !",
      });
    }
    return res.status(200).json({
      status: 200,
      data: findNew
    });
  } catch (error) {
    return next(error);
  }
};

const getImageNews = async (req,res,next) => {
  try {
    const { id } = req.params;

    let findImage = await News.findOne({
      where: {
        image: id,
      },
    });
    if (!findImage) {
      return res.status(404).json({
        status: 404,
        message: 'Ảnh Không Tồn Tại !'
      })
    }
    return res.sendFile(path.join(__dirname, "../Images/News", id));
  } catch(error) {
    return next(error);
  }
}

const updateNew = async (req, res, next) => {
  try {
    const { Title, Content } = req.body;
    const { id } = req.params;
    const update = await News.update(
      {
        Title,
        Content,
        image: req.newFile
      },
      {
        where: {
          News_id: id,
        },
      }
    );
    if (update[0] === 0) {
      return res.status(400).json({
        status: 400,
        message: 'Cập Nhật Thất Bại !'
      });
    }
    const updateNews = await News.findOne({
      where: {
        News_id: id
      }
    })
    return res.status(200).json({
      status: 200,
      data: updateNews,
      message: "Cập Nhật Tin Tức Thành Công !",
    });
  } catch (error) {
    return next(error);
  }
};

const deleteNew = async (req, res, next) => {
  try {
    const { id } = req.params;

    const findNews = await News.findOne({
      where: {
        News_id: id,
      },
    });

    await findNews.destroy();

    const listImage = fs.readdirSync("./src/Images/News");
    const findImage = listImage.find(item => item === findNews.image);
    if (findImage) {
      fs.unlinkSync(`./src/Images/News/${findImage}`);
    }
    return res.status(200).json({
      status: 200,
      message: "Xóa Tin Tức Thành Công !",
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  createNew,
  upload,
  getNews,
  getSearchNews,
  getNewsRelated,
  getNew,
  getImageNews,
  updateNew,
  deleteNew,
};
