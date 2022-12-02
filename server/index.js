const { MongoClient } = require("mongodb");
var express = require("express");
var bodyParser = require('body-parser');
var multer = require('multer');
var app = express();
var port = 3000;
// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

var natural = require('natural');
var fs = require('fs');

var data = fs.readFileSync('sqli_v4.csv')
    .toString() // convert Buffer to string
    .split('\n') // split string to lines
    .map(e => e.trim()) // remove white spaces for each line
    .map(e => e.split('::::').map(e => e.trim())); // split each line to array

//data = data.copyOf(data, data.length-2);
console.log(data.length);

for (item in data){
	if (item < data.length){
		var val = data[item][1].charAt(0);
		data[item][1] = val;
	}

	else {
		console.log('done');
		break;
	}
}

var nb = new natural.BayesClassifier();
//const [train, test] = trainTestSplit(data, 0.8);

for (i in data){
	nb.addDocument(data[i][0], data[i][1]);
}

nb.train();

// Replace the uri string with your connection string.
// you might want to follow https://www.mongodb.com/docs/drivers/node/current/quick-start/
// to set up your own database or let me (Karine) know we can figure it out together
const uri =
  "mongodb+srv://nosqldefenseteam:websecurityfall22@cluster0.d5ckhrl.mongodb.net/?retryWrites=true&w=majority";

async function writeToDatabase(user_input) {
    const client = new MongoClient(uri);
    try {
      const database = client.db('testing');
      const testData = database.collection('test_data');
      // Query
      const query = { data: user_input };
      const result = await testData.insertOne(query);
      console.log(result);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  writeToDatabase().catch(console.dir);
 
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/adddata", (req, res) => {
    console.log(req.body);
    writeToDatabase(req.body);
    res.send("recieved");
});

async function getUsers() {
  const client = new MongoClient(uri);
  try {
    const database = client.db('testing');
    const testData = database.collection('users');
    
    const cursor = testData.find({});
    //const allValues = await cursor.toArray();
    return await cursor.toArray();
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
getUsers().catch(console.dir);

app.get('/users', async (req, res, next) => {
  res.send(await getUsers());
});

async function checkLogin(user_input) {
  const client = new MongoClient(uri);
  try {
    const database = client.db('testing');
    const testData = database.collection('users');
    
    const classfied = nb.classify(JSON.stringify(user_input));
    if(parseInt(classfied)) 
    {
      console.log(user_input);
      console.log("malicious");
      return false;
    }
    const query = { username: user_input.username, password: user_input.password };
    const cursor = testData.find(query);
    const allValues = await cursor.toArray();
    if (!allValues.length) return false;
    else return true;
    //return await cursor.toArray();
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
getUsers().catch(console.dir);

app.get('/login', async (req, res, next) => {
  res.sendFile(__dirname + "/login.html");
});

app.post('/loginresult', async (req, res, next) => {
  console.log(req.body.password);
    const success = await checkLogin(req.body);
    res.send(success);
});

app.listen(port, () => {
  console.log("Server listening on port " + port);
});