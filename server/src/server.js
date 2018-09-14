//run `node index.js`
//get request gives a sample, post request parses your file

const express = require('express');
const fs = require("fs");
const fileUpload = require('express-fileupload');
const cors = require('cors');
const parser = require('./parser.js');
const app = express();
app.use(cors());
app.use(fileUpload());
var sample = require("../api/sample.json");

app.get('/api/sample', (req, res) => {
  var date = new Date();
  res.status(200).json({"data": sample,
                        "metadata": date})});


app.post("/api/parse", (req,res) => {
  var buffer = req.files.file.data.toString();
  console.log(buffer);
  if (!req.files)
    return res.status(400).send('No files were uploaded.');
  var file = buffer.split("\r\n");
  console.log(parser.parse(file));


  fs.writeFile('parsed-json/post.json', parser.parse(file), function (err) {
    if (err){
      return console.log(err);
    }
    res.send('Updated post.json');
  });
});


app.listen(4000, () => console.log('Server listening on port 4000!'));
