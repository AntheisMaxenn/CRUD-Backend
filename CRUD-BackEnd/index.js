const express = require("express");
const cors = require('cors');

const login = require("./route/login");
const profile = require('./route/profile');
const post = require('./route/post');


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Hello World!");
});


app.use("/login", login);
app.use("/profile", profile);
app.use("/post", post)





const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});