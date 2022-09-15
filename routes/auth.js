const jwt = require("express-jwt");

const getTokenFromCookies = (req) => {
  const userJSON = req.cookies.user;
  // decode the token from the cookie
  console.log(userJSON); // TO-DO -> remove this line
  // When on JournalEntries, getTokenFromCookies is called infinite times, probably due to the get request to /journalEntries
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
