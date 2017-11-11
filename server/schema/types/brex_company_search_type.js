const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} = graphql;

const CompanySearchType = new GraphQLObjectType({
  name: 'CompanySearchType',
  fields: () => ({
    id: { type: GraphQLString },
    country: { type: GraphQLString },
    registrationNumber: { type: GraphQLString },
    name: { type: GraphQLString },
  })
});

module.exports = CompanySearchType;
