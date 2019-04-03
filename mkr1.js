const fs = require("fs");

const fileContent = fs.readFileSync("input.txt", "utf8");

startScopes = {
	'(':true,
	'[':true,
	'{':true
}
endScopes = {
	')':'(',
	']':'[',
	'}':'{'
}

let output = []
for (let i = 0; i < fileContent.length; i++) {
	if (!isNaN(fileContent[i])) {
		let number = fileContent[i];
		while (!isNaN(fileContent[i + 1])) {
			number += fileContent[i + 1];
			i++;
		}
		let current = output.pop();
		if(endScopes[current]) {
			let j = output.length;
			let counter = 0;
			while (output[j] !== endScopes[current]) {
				j--;
				counter++;
			}
			let subArray = output.splice(j, counter);
			subArray.shift();
			subArray.map((a) => a.value = a.value * +number);
			output = output.concat(subArray);
		} else {
			current.value = current.value * +number;
			output.push(current);
		}
	} else if (startScopes[fileContent[i]] || endScopes[fileContent[i]]) {
		output.push(fileContent[i]);
	} else {
		let name = fileContent[i];
		while (isNaN(fileContent[i + 1]) && !endScopes[fileContent[i + 1]] && !startScopes[fileContent[i + 1]] && fileContent[i + 1].toLowerCase() === fileContent[i + 1]) {
			name += fileContent[i + 1];
			i++;
		}
		output.push({name: name, value: 1})
	}
	console.log(output);
}

for (let i = 0; i < output.length; i++) {
	for (let j = 0; i < output.length; i++) {
		if (i !== j && output[i].name === output[j].name) {
			let newValue = output[i].value + output[j].value;
			output[j].value = newValue;
			output.splice(i,1);
		}
	}
}


let outputString = '';
output.map((data, index) => {
	outputString += data.name + ':' + ' ' + data.value + ', ';
});

fs.writeFileSync("output.txt", outputString);

