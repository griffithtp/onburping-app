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
    },
    companysearchname: {
      type: new GraphQLList(CompanySearchType),
      args: {
        country: { type: GraphQLString },
        name: { type: GraphQLString },
        limit: { type: GraphQLInt }
      },
      resolve(parentValue, { country, name, limit}, req) {
        return axios.get(brex_api_url + `api/v1/company/search/name/${country}/${name}?limit=${limit}`, brex_headers)
          .then( (res) => {
            return res.data;
          })
          .catch( err => console.log(err) );
      }
    },
    companysearch: {
      type: new GraphQLList(CompanySearchType),
      args: {
        country: { type: GraphQLString },
        id: { type: GraphQLString },
        limit: { type: GraphQLInt }
      },
      resolve(parentValue, { country, name, limit}, req) {
        return axios.get(brex_api_url + `api/v1/company/search/number/${country}/${id}?limit=1`, brex_headers)
          .then( (res) => {
            return res.data;
          })
          .catch( err => console.log(err) );
      }
    },
    company: {
      type: CompanyDetailsType,
      args: {
        id: { type: GraphQLString },
        dataset: { type: GraphQLString }
      },
      resolve(parentValue, { id, dataset}, req) {
        return axios.get(brex_api_url + `api/v1/company/${id}/${dataset}`, brex_headers)
          .then( (res) => {
            return res.data;
          })
          .catch( err => console.log(err) );
      }
    }
  }
});

module.exports = mutation;
