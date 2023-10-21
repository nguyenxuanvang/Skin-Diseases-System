const express = require('express');
const cors = require('cors');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const storage = multer.diskStorage({
    destination: 'predictImage',
    filename: (req, file, cb) => {
      const originalExtension = path.extname(file.originalname);
  
      const newFileName = file.fieldname + originalExtension;
  
      cb(null, newFileName);
    },
  });

const upload = multer({ storage: storage });

app.get('/',(req,res) => {
    res.json('Server Connected');
});

app.post('/scan',upload.single('image'),(req,res) => {
    const pythonProcess = spawn('python', ['./python/predict.py']);
    pythonProcess.stdout.setEncoding('utf-8');
    pythonProcess.stdout.on('data', (data) => {
        res.json(data.trim())
    });
})

const port = 3700;
app.listen(port,() => {
    console.log(`Server is listening on port ${port}`);
})