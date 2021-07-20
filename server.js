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