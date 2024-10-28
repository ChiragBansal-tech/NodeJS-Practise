const express = require('express')
const users = require('./MOCK_DATA.json')
const app = express();
const PORT = 8001
const fs = require("fs")


app.use(express.urlencoded({ extended: false}));

app.use((req, res, next) => {
    console.log("Hello from middelWare 1");
    fs.appendFile('log.txt', `${Date.now()}: ${req.method}: ${req.path}\n`, (err, data) => {
        next();
    });
});

app.get("/users", (req, res) => {
    const html = `
        <ul>
            ${users.map(user => `<li>${user.first_name}</li>`).join("")}
        </ul>
    `;
    res.send(html);
})


app.get("/api/users", (req, res) => {
    console.log(req.headers);
    res.setHeader('X-MyName', "Chirag Bansal") // Custom Header 
    return res.json(users);
});

app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({ ...body, id: users.length + 1});
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err, data) =>{
        return res.status(201).json({ status: 'success', id: users.length});
    });
});


app.listen(PORT, () => console.log(`Server started at port 8001`))