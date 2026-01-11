import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@as-integrations/express5';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import * as authUtils from './utils/authUtils';
import { clientConfig } from '@generatedata/config';
import { RequestContext } from '../types/server';
import { typeDefs } from './schema/typeDefs.generated';
import { resolvers } from './schema/resolvers.generated';
import http from 'http';

const app = express();
const httpServer = http.createServer(app);

const protocol = clientConfig.webServer.GD_WEB_USE_HTTPS ? 'https' : 'http';

app.use(cookieParser());

const server = new ApolloServer<RequestContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

(async () => {
  await server.start();

  app.use(
    '/',
    cors<cors.CorsRequest>({
      origin: `${protocol}://${clientConfig.webServer.GD_WEB_DOMAIN}:${clientConfig.webServer.GD_WEB_SERVER_PORT}`,
      credentials: true
    }),
    express.json(),

    // @ts-expect-error
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        const token = (req.headers.authorization || '').replace('Bearer ', '');

        // try to retrieve a user with the token
        const user = authUtils.getUser(token);

        return { req, res, token: req.headers.token, user };
      }
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: clientConfig.api.GD_API_SERVER_PORT }, resolve));

  console.log('Server started on port ' + clientConfig.api.GD_API_SERVER_PORT);
})();
