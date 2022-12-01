# nosql-injection-defense

Installed dependencies:
npm install mongodb@4.12
npm install express --save
npm install --save body-parser multer


How to Run (might need to set up your own MongoDB first):
In terminal, go into the server folder, do
node index.js
and go to http://localhost:3000/


How to set up your own MongoDB (2 ways):
1. Follow https://www.mongodb.com/docs/drivers/node/current/quick-start/
and change const uri (line 16 in index.js) to your connection string
2. Set up mongodb locally and modify index.js accordingly
