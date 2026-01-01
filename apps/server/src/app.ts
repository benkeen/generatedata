import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';
import cookieParser from 'cookie-parser';
import authUtils from './utils/authUtils';
import path from 'path';

require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

const app = express();

const protocol = process.env.GD_WEB_USE_HTTPS === 'true' ? 'https' : 'http';

// see: https://github.com/expressjs/cors#configuration-options
const corsOptions = {
  origin: `${protocol}://${process.env.GD_WEB_DOMAIN}:${process.env.GD_WEB_SERVER_PORT}`,
  credentials: true
};

app.use(cookieParser());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => {
    // the token is the "live" token with a short expiry time, passed along with every request in a header while
    // the user is logged in
    const token = (req.headers.authorization || '').replace('Bearer ', '');

    // try to retrieve a user with the token
    const user = authUtils.getUser(token);

    // provides the auth token to all resolvers, plus access to the original request + response objects for
    // more fine-tune stuff
    return {
      res,
      req,
      token,
      user
    };
  }
});

server.applyMiddleware({
  app,
  cors: corsOptions
});

app.listen(process.env.GD_API_SERVER_PORT, () => {
  console.log('Server started on port ' + process.env.GD_API_SERVER_PORT);
});
