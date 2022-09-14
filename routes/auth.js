const jwt = require("express-jwt");

const getTokenFromCookies = (req) => {
  const userJSON = req.cookies.user;
  console.log(userJSON);
  if (userJSON) {
    return userJSON.token;
  }
  return null;
};

const auth = {
  required: jwt.expressjwt({
    secret: "secret",
    userProperty: "payload",
    getToken: getTokenFromCookies,
    algorithms: ["HS256"],
  }),
  optional: jwt.expressjwt({
    secret: "secret",
    userProperty: "payload",
    getToken: getTokenFromCookies,
    credentialsRequired: false,
    algorithms: ["HS256"],
  }),
};

module.exports = auth;
