import gql from 'graphql-tag';

export default gql`
  mutation companysearch($country:String, $name:String, $limit: Int) {
    companysearch(country: $country, name:$name, limit:$limit) {
      id
      country
      registrationNumber
      name
    }
  }
`;
