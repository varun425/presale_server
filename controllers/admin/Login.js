const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // Admin or trader can log in using this API
  adminLogin: async (req, res) => {
    try {
      if (!req.body.email || !req.body.password) {
        return {
          code: 412,
          message: "Missing User Email or Password",
        };
      }

      let email = req.body.email.toLowerCase();

      // Simulate admin credentials - Replace with actual admin credentials retrieval from your database
      const saltRounds = 10;
     
      const adminCredentials = {
        mail: "test@mail.com",
        password: "1234", // This should be a hashed password in production
        role: "ADMIN",
      };
      const myPlaintextPassword = adminCredentials.password;
      const hashPassword = bcrypt.hashSync(myPlaintextPassword, saltRounds);
      if (adminCredentials) {
        let check = bcrypt.compareSync(req.body.password, hashPassword);

        if (check) {
          let token;
          if (adminCredentials.role === "ADMIN") {
            // Generate a JSON Web Token (JWT) for the admin user
            token = jwt.sign({ email, role: adminCredentials.role }, "seceret_key", {
              expiresIn: "1h",
            });
          }

          return { code: 200, msg: "Login successful.", token: token };
        } else {
          return { code: 401, msg: "Password is incorrect.", data: null };
        }
      } else {
        return {
          code: 404,
          msg: "This admin does not exist or the account is not verified for this user.",
          data: null,
        };
      }
    } catch (error) {
      console.error(error);
      return {
        code: 500,
        msg: error.message || "Internal Server Error",
        data: null,
      };
    }
  },
};
