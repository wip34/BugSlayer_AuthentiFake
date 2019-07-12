// api file
import express from 'express';
import bodyParser from 'body-parser';
const port = 3001;

const app = express();

// configure app to use bodyParser()
const urlencodedParser = bodyParser.urlencoded({ extended: true });
const jsonParser = bodyParser.json();

// get an instance of the express Router
const routerV1 = express.Router();

routerV1.post('/uploadPic', jsonParser, function(req, res) {
  const data = req.body;
  //const imageEncoded = data.imageEncoded;
  //decode image
  //const image = Buffer.from(imageEncoded, 'base64').toString('binary');

  // then send image to AI
  // if AI says its fake, add to blockchain and will need to send isFake: true back to client
  // otherwise, not fake, so will send isFake: false to client

  //console.log(image);
  const isFake = true;
  res.json({ imageEncoded: imageEncoded, isFake: isFake });
});

// api context: /api/v1
app.use('/api/v1', routerV1); // you can access through http://localhost:3001/api/v1

app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// start the server
app.listen(port);
console.log('Server running on port ' + port);
