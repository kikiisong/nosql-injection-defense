# nosql-injection-defense


## How to set up your own MongoDB (3 ways):
1. I've sent out invitations to your jhu emails, so you should have access to the cloud MongoDB database. Lmk if you have not received it or are having issues using it.
2. Follow https://www.mongodb.com/docs/drivers/node/current/quick-start/ to create your own cloud database and change const uri (line 16 in index.js) to your connection string
3. Set up mongodb locally and modify index.js accordingly

## How to Run (might need to set up your own MongoDB first):
In terminal, go into the server folder

Make sure you have installed dependencies:
1. npm install mongodb@4.12
2. npm install express --save
3. npm install --save body-parser multer

Then do node index.js and go to http://localhost:3000/

URLs:
1. http://localhost:3000/
- Homepage, not important, you can submit something and go to MongoDB > Database > Find Collections > Look for a collection called "testing.test_data", check if your input is there
2. http://localhost:3000/users
- print entries in side the collection called "testing.users", you can check username and password. You can add entries using the database website
3. http://localhost:3000/login
- Login page
- Note that the inputs get converted to string so the injection does not work well here.
- However, we can use REST APIs (I use Postman https://www.postman.com/) to send JSON directly to make the injection work. E.g.
```
{
    "username": "aa",
    "password": { "$ne": null }
}
```




