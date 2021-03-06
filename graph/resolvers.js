import jwt from 'jsonwebtoken';
import {users} from './data';
export default{
    Query: {
        user(parent,{id}){
            return URLSearchParams.find(this.user.id === id)
        },
        viewer(parent,args,{user}){
            return users.find(({id})=> id === user.sub)
        }
    },

    Mutation: {
        login(parent,{email,password}){
            const {id,permissions,roles } = users.find(
                user => user.email === email && user.password === password
            );
            return jwt.sign(
                {"https://spaceapi.com/graphql":{rols,permissions}},
                "SUPER_SECRET",
                {algorithm: "HS256",subject:id,expiresIn:"1d"}
            )
        }
    }
}
