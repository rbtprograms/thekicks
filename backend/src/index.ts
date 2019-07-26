const cookieParser = require('cookie-parser');

require('dotenv').config({ path: 'variables.env' });

const server = require('./createServer')();

//express middleware for JWT and populate user
server.express.use(cookieParser());

server.start({
  cors: {
    credentials: true,
    origin: process.env.FRONTEND_URL
  },
}, ({ port }: { port: number }) => {
  console.log(`server is now running on port ${port}`);
});