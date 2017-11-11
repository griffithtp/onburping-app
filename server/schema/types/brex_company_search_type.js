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
// const PartnerType = new GraphQLObjectType({
//   name: 'PartnerType',
//   fields: () => ({
//     partner_id: { type: GraphQLString },
//     company: {
//       type: CompanyType
//     },
//     partner_products: { type: GraphQLString },
//     partner_ref: { type: GraphQLString }
//   })
// });

module.exports = CompanySearchType;
