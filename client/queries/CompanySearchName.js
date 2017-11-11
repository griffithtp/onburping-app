import gql from 'graphql-tag';

export default gql`
  query companysearchname($country:String, $name:String, $limit: Int) {
    companysearchname(country: $country, name:$name, limit:$limit) {
      id
      country
      registrationNumber
      name
    }
  }
`;
