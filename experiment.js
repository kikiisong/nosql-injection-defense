var natural = require('natural');
var fs = require('fs');
var trainTestSplit = require("train-test-split");

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
var lr = new natural.LogisticRegressionClassifier();
const [train, test] = trainTestSplit(data, 0.8);

for (i in train){
	nb.addDocument(train[i][0], train[i][1]);
}

for (i in train){
	lr.addDocument(train[i][0], train[i][1]);
}

//lr.train();
nb.train();
console.log("done training");

var results = new Array;
for (x in test){
	results.push(nb.classify(test[x][0]));
}

var correct = 0;
var incorrect = 0;

for (y in results){
	if (results[y] == test[y][1]){
		correct ++;
	}
	else{
		incorrect++;
	}
}

console.log("Correct predictions: ", correct);
console.log("Incorrect predicitions: ", incorrect);

