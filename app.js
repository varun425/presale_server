const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const trackEtherTransfer = require("./web3/trackEtherTransfer");
const cron = require('node-cron');
const app = express();
const dbURL = "mongodb+srv://minting:minting@cluster0.fw8thv9.mongodb.net/";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(8000, () => {
    console.log(`Server is running on ${8000}`);
});

const connectPromise = mongoose.connect(dbURL);
require("./config/index").config(app);
require("./routes/index")(app);


connectPromise
    .then(() => {
        console.log("Connected to the database successfully");
    })
    .catch((error) => {
        console.log("Failed to connect db", error);
    })
    .finally(() => {
    });



// cron.schedule('*/1 * * * * *', async () => {
//     console.log('Cron job is running');
//     await trackEtherTransfer();
// });