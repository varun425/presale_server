// const express = require("express");
// const bodyParser = require("body-parser");
// const GetRound = require('./controllers/InitializeTier'); // Replace with the correct path

// const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// // Create mock req and res objects
// const mockReq = {};
// const mockRes = {
//     status: (code) => {
//         return {
//             json: (data) => {
//                 console.log("Response Code:", code);
//                 console.log("Response Data:", data);
//             },
//         };
//     },
// };

// // Now you can use the GetRound function in this file
// GetRound.GetTier(mockReq, mockRes)
//     .then((response) => {
//         // Handle the response here
//         console.log(response);
//     })
//     .catch((errorResponse) => {
//         // Handle any errors here
//         console.error(errorResponse);
//     });
// jwt.js
const jwt = require('jsonwebtoken');

const generateToken = (userId) => {
  const secretKey = '123';
  const payload = {
    userId: "varun@mail.com",
  };
  const token = jwt.sign(payload, secretKey, {
    expiresIn: '1h',
  });
  return token;
};

let a = generateToken()

console.log(a);

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ2YXJ1bkBtYWlsLmNvbSIsImlhdCI6MTY5NjU4ODU5NCwiZXhwIjoxNjk2NTkyMTk0fQ._JsGvd67i6vcW4ecInSQt35BJLefDhKmItQ3b-3qbgw