const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList
} = graphql;

const BrexDirectorType = new GraphQLObjectType({
  name: 'BrexDirectorType',
  fields: {
    name: { type: GraphQLString },
    startDate: { type: GraphQLString },
    endDate: { type: GraphQLString },
    status: { type: GraphQLString },
    address: { type: new GraphQLList(GraphQLString) }
  }
});
const BrexPeopleType = new GraphQLObjectType({
  name: 'BrexPeopleType',
  fields: () => ({
    director: { type: new GraphQLList(BrexDirectorType)  },
    secretary: { type: new GraphQLList(BrexDirectorType)  },
    ultimateBeneficialOwner: { type: new GraphQLList(BrexDirectorType) }
  })
});

const CompanyDetailsType = new GraphQLObjectType({
  name: 'CompanyDetailsType',
  fields: () => ({
    id: { type: GraphQLString },
    country: { type: GraphQLString },
    name: { type: GraphQLString },
    registrationNumber: { type: GraphQLString },
    status: { type: GraphQLString },
    address: { type: new GraphQLList(GraphQLString) },
    formattedAddress: { type: new GraphQLList(GraphQLString) },
    managingDirectors: { type: new GraphQLList(GraphQLString) },
    secretaries: { type: new GraphQLList(GraphQLString) },
    dateOfIncorporation: { type: GraphQLString },
    legalForm: { type: GraphQLString },
    sicNaceCodes: { type: GraphQLString },
    people: { type: BrexPeopleType },
    extraData: { type: new GraphQLList(GraphQLString) }
  })
});

module.exports = CompanyDetailsType;
