const express = require('express')
const app = express()
const connectToDatabase = require('./db');
const port = 5000
const upload = require('./middleware/multer.middleware.js');
const User = require('./models/userModel');
const path = require('path');
var cors = require('cors');
connectToDatabase();

const uploadsPath = path.join(__dirname,'uploads');

app.use(express.json());
app.use(cors());

app.use('/uploads',express.static(uploadsPath));

app.get('/getusers', async (req, res) => {
    const users = await User.find({});
    res.send(users);
})

app.post('/createuser', upload.single('userImage'), async (req, res) => {
    console.log("sddg",req.body);
    const {name,job_title,description,company_name} = req.body;
    const imageFile = req.file;
    console.log(imageFile);
    const newUser = await User.create({name,job_title,description,company_name,userImage: imageFile.filename});
    res.send(newUser);
})

app.delete('/deleteuser/:id', async (req,res) => {
  const id = req.params.id;
  console.log(id);
  // const response = await User.deleteOne({_id: id});
  const response = await User.findByIdAndDelete(id);
  res.json(response);
})

app.get('/getuser/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const user = await User.findById(id);
  res.json(user);
})

app.put('/updateuser/:id', upload.single('userImage'), async (req, res) => {
  const { name, job_title, description, company_name } = req.body;
  console.log(req.body);
  let userImage = req.file ? req.file.filename : null; // Check if user uploaded a new image
  try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
          name,
          job_title,
          description,
          company_name,
          userImage // Update userImage with the new value
      }, { new: true });
      res.status(200).json(updatedUser);
  } catch (err) {
      res.status(500).send(err.message);
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})