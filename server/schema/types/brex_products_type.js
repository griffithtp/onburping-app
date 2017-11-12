const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} = graphql;

const ProductType = new GraphQLObjectType({
  name: 'ProductType',
  fields: () => ({
    sku: { type: GraphQLString },
    description: { type: GraphQLString },
    price: { type: GraphQLString },
    type: { type: GraphQLString },
    category: { type: GraphQLString },
    provider: { type: GraphQLString },
    countryCode: { type: GraphQLString },
    hasOptions: { type: GraphQLString },
    options: { type: new GraphQLList(GraphQLString) },
    availability: { type: GraphQLString }
  })
});

module.exports = ProductType;
