import {ApolloServer,makeExcutableSchema } from 'apollo-server-express'
import {applyMiddlware} from 'graphql-middleware'
import express from 'express'
import expressJwt from 'expressJwt'
import permissions from './permissions'
import  typeDefs  from './graph/typeDefs.js'
import resolvers from './graph/resolvers.js'

const port = 4000;
const app = express()
app.use(
    expressJwt({
        secret: "SUPER_SECRET",
        algorithms: ['HS256'],
        credentialsRequired: false
    })
);
 const server = new ApolloServer({
     schema: applyMiddlware(
         makeExcutableSchema({typeDefs,resolvers}),
         permissions
     ),
     context:({req})=>{
         const user = req.user || null;
         return { user}
     }
 });
 server.applyMiddleware({ app });
 app.listen({port},()=>{
     console.log(`server is running at http://localhost:${port}${server.graphqlPath}`)
 })