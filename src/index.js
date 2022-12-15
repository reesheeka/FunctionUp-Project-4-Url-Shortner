const express = require("express");
const mongoose = require("mongoose");
const app = express();
const route = require("./routes/route.js");

app.use(express.json());

mongoose.connect("mongodb+srv://nitukumari:Kashyapnitu8271@cluster0.5uwtnyo.mongodb.net/group10Database", { useNewUrlParser: true }, mongoose.set('strictQuery', false))
    .then(() => console.log("mongodb is connected"))
    .catch(err => console.log(err))


app.use('/', route);

app.listen(3000, function () {
    console.log("Express app is rumnning on the port 3000");
})




