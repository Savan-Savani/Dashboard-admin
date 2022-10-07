const express = require('express')
const cors = require("cors")
const mongoose = require("mongoose")
const Credentials = require("./model/model")
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
require('dotenv').config()
const path = require("path");

let loginRoute = require("./routes/loginRoute")
let productRoute = require("./routes/productRoute")
let employeeRoute = require("./routes/employeeRoute")
let productionRoute = require("./routes/productionRoute")
let billingRoute = require("./routes/billingRoute")



const app = express();
app.use(cors())

app.use(express.json());


// mongoose.connect("mongodb+srv://test:test@cluster0.jsoar.mongodb.net/manaki?retryWrites=true&w=majority",
//     {
//         useNewUrlParser: true,
//     }
// );
mongoose.connect("mongodb://localhost:27017/logincredential",
    {
        useNewUrlParser: true,
    }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

app.use("/auth", loginRoute)
app.use("/product", productRoute)
app.use("/employee", employeeRoute)
app.use("/production", productionRoute)
app.use("/billing", billingRoute)

app.use(express.static(__dirname + '/public'));
// app.post("/signup",)

// app.post("/login",)

if (process.env.NODE_ENV === "production") {
    app.use(express.static('client/build'))
    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "client", "build", "index.html"))
    })
}

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log("Server is running at port 3001");
});