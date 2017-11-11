const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} = graphql;

const PartnerCompanyType = new GraphQLObjectType({
  name: 'PartnerCompanyType',
  fields: () => ({
    name: { type: GraphQLString },
    trading_name: { type: GraphQLString }
  })
});
const PartnerType = new GraphQLObjectType({
  name: 'PartnerType',
  fields: () => ({
    partner_id: { type: GraphQLString },
    company: {
      type: PartnerCompanyType
    },
    partner_products: { type: GraphQLString },
    partner_ref: { type: GraphQLString }
  })
});

module.exports = PartnerType;
