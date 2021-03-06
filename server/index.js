import { ApolloServer } from 'apollo-server';
import jwt from 'express-jwt';
import { resolvers } from './data/resolvers';
import { typeDefs } from './data/schema';
import mockDB from './data/mocks';
import { User } from './data/connectors';
import configurationManager from './configurationManager';

const JWT_SECRET = configurationManager.jwt.secret;
const PORT = 8080;

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req, res, connection }) => {
      // web socket subscriptions will return a connection
      if (connection) {
        // check connection for metadata
        return {};
      }
      const user = new Promise((resolve) => {
        jwt({
          secret: JWT_SECRET,
          credentialsRequired: false,
        })(req, res, () => {
          if (req.user) {
            resolve(User.findOne({ where: { id: req.user.id } }));
          } else {
            resolve(null);
          }
        });
      });
      return {
        user,
      };
    },
  });
  const { url } = await server.listen({ port: PORT });
  console.log(`🚀 Server ready at ${url}`);
};

const init = async () => {
  await mockDB({ populating: true, force: true });
  startServer();
};

init();
