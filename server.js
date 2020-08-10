// I likely want to add later:
// 1) performance improvements that would include compression
//    (see David's work & do additional research)

// Add immediately:
// * Reference models -- seems to be working 7/20/2020 at 3:20 PM
// * setup sequelize -- done
// * setup controller -- step 1 would be do that in here,
//    then step 2 move it into a separate controller file

require("dotenv").config();
const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();

const db = require("./models");

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

// SETUP ROUTES / initial controller here:
require("./controllers/user-games-api.js")(app);
require("./controllers/other-controller.js")(app);

app.get("/api/config", (req, res) => {
    res.json({
        success: true,
        currentPort: PORT,
    });
});

app.use(express.static("client/build"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

// db.sequelize.sync({force: true}).then(function () {
db.sequelize.sync().then(() =>  {
    app.listen(PORT, () => {
        console.log(`Server listening on: http://localhost:${PORT}`);
    });
});