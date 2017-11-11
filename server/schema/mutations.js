const axios = require('axios');
const graphql = require('graphql');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList
} = graphql;
const { api_url, api_key, brex_api_key, brex_api_url } = require('config.json')('./apikey-demo.json');

const UserType = require('./types/user_type');
const AuthService = require('../services/auth');

const CompanySearchType = require('./types/brex_company_search_type');
const CompanyDetailsType = require('./types/brex_company_details_type');

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    signup: {
      type: UserType,
      args: {
        email: { type: GraphQLString },
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.signup({ email, password, req});
      }
    },
    logout: {
      type: UserType,
      resolve(parentValue, args, req) {
        const { user } = req;
        req.logout();
        return user;
      }
    },
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLString},
        password: { type: GraphQLString }
      },
      resolve(parentValue, { email, password }, req) {
        return AuthService.login({email, password, req});
      }
    }
  }
});

module.exports = mutation;
