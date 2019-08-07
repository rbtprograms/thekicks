const cookieParser = require("cookie-parser");
const jwt = require('jsonwebtoken')

require("dotenv").config({ path: "variables.env" });

const server = require("./createServer")();

//express middleware for JWT and populate user
server.express.use(cookieParser());
server.express.use((req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const { userId } = jwt.verify(token, process.env.APP_SECRET);
    //tack userId onto the request
    req.userId = userId;
  }
  next();
});

server.start(
  {
    cors: {
      credentials: true,
      origin: process.env.FRONTEND_URL
    }
  },
  ({ port }: { port: number }) => {
    console.log(`server is now running on port ${port}`);
  }
);
