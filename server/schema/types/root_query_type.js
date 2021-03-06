const axios = require('axios');
const { api_url, api_key, brex_api_key, brex_api_url } = require('config.json')('./apikey-demo.json');
const fetch = require('node-fetch');

const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLList, GraphQLString, GraphQLInt } = graphql;
const UserType = require('./user_type');
const PartnerType = require('./partner_type');

const CompanySearchType = require('./brex_company_search_type');
const CompanyDetailsType = require('./brex_company_details_type');
const CompanyProductType = require('./brex_products_type');
const brex_headers = {
  headers: {'Content-Type': 'application/json'
  , 'Accept': 'application/json', 'user_key': `${brex_api_key}`}
};

const Shareholders = {
  shareholders: [ "Peter Griffin", "Louis Griffin" ]
}

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    user: {
      type: UserType,
      resolve(parentValue, args, req) {
        return req.user;
      }
    },
    partners: {
      type: new GraphQLList(PartnerType),
      resolve() {
        const railsbank_headers = {
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `API-Key ${api_key}`}
        };
        return axios.get(api_url + `v1/customer/partners`, railsbank_headers)
          .then( (res) => {
            return res.data ;
          })
          .catch( err => console.log(err) );
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
    companysearch: { // default search by registrationNumber
      type: new GraphQLList(CompanyDetailsType),
      args: {
        country: { type: GraphQLString },
        registrationNumber: { type: GraphQLString },
        limit: { type: GraphQLInt }
      },
      resolve(parentValue, { country, registrationNumber, limit}, req) {
        return axios.get(brex_api_url + `api/v1/company/search/number/${country}/${registrationNumber}?limit=1`, brex_headers)
          .then( (res) => {
            // return res.data;
            // if (res.id) {
            //   const result = axios.get(brex_api_url + `api/v1/company/${id}/${dataset}`, brex_headers)
            //     .then( (companydetails) => {
            //       return companydetails.data;
            //       // return {...companydetails.data, ...Shareholders};
            //     })
            //     .catch( err => console.log(err) );
            // }
            // console.log(res.data);
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
        const result = axios.get(brex_api_url + `api/v1/company/${id}/${dataset}`, brex_headers)
          .then( (res) => {
            // console.log(res.data);
            return {...res.data, ...Shareholders};
          })
          .catch( err => console.log(err) );
        return result;
      }
    },
    companyproducts: {
      type: new GraphQLList(CompanyProductType),
      args: {
        id: { type: GraphQLString },
      },
      resolve(parentValue, { id }, req) {
        const result = axios.get(brex_api_url + `api/v1/product/search/${id}`, brex_headers)
          .then( (res) => {
            // console.log(res.data);
            return res.data;
          })
          .catch( err => console.log(err) );
        return result;
      }
    }
  })
});

module.exports = RootQueryType;
