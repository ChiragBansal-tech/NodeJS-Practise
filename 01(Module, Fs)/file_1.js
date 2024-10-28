const fs = require("fs");
const { resourceLimits } = require("worker_threads");

fs.writeFileSync("./text.txt", "Hey There"); // Sync.. call

fs.writeFile("./text.txt", "Hello World ASync", (err) => {}) //Async.. call

// both give same output but Async all needs an callback function

const res = fs.readFileSync('./contact.txt', 'utf-8'); // Sync.. call
console.log(res)

fs.readFile("./contacts.txt", 'UTF-8', (err, result) => {
    if(err){
        console.log("Error", err);
    }
    else{
        console.log(result)
    }
}); // Async.. call

// Sync.. values ko variable ma dal ka da deta hay but in case of Async.. usse ek call back function chaeya
// jiska first argument err hoga and dusra result hoga

// also Sync.. returns a value but Async does not 

fs.appendFileSync("./text.txt", newDate().getDate().toLocalString()); // Does not overwrite file like writeFileSync, updates it

fs.cpSync('./text.txt', './copy.txt');// create a copy of a file

fs.unlinkSync('./copy.txt'); // for deleting a file

fs.statSync('./text.txt') // to check stats of a file

fs.mkdirSync( 'my-docs') // used to create folder
fs.mkdirSync('docs/a/b' , {recursive: true});