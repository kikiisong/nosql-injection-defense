const { MongoClient } = require("mongodb");
var express = require("express");
var app = express();
var port = 3000;
 
app.get("/", (req, res) => {
    res.send("Hello World");
});
 
app.listen(port, () => {
  console.log("Server listening on port " + port);
});

// Replace the uri string with your connection string.
// you might want to follow https://www.mongodb.com/docs/drivers/node/current/quick-start/
// to set up your own database or let me (Karine) know we can figure it out together
const uri =
  "mongodb+srv://nosqldefenseteam:websecurityfall22@cluster0.d5ckhrl.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri);
async function run() {
  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);