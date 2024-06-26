const graphql = require('graphql')
const axios = require('axios')

const {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull, GraphQLSchema, GraphQLList} = graphql

const UserType = new GraphQLObjectType({
    name: 'User',
    fields: {
        id: { type: GraphQLString },
        firstName: { type: GraphQLString },
        lastName: { type: GraphQLString },
    }
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        user: {
            type: UserType,
            args: { id: { type: GraphQLString } },
            resolve(parentValue, args) {
                return axios.get(`http://localhost:3000/users/${args.id}`)
                    .then(response => response.data)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})

