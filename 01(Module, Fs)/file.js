const fs = require('fs');
const os = require('os') // use to give information of your computer
console.log(os.cpus().length); // to know no. of cpus in your computer


console.group("1");
// Blocking...
const result = fs.readFileSync('contact.txt', 'utf-8');
console.log(result);

//Non-Blocking
fs.readFile('contact.txt', 'utf-8', (err, res) => {
    console.log(res)
})

console.log("2"); 


// default size of thread pool = 4
// Max? 8core cpu = 8