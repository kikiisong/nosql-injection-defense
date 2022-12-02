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

nb.classify("user input");