import gql from 'graphql-tag';

export default gql`
  mutation companysearch($registrationNumber:String, $country:String, $limit: Int){
    companysearch(country: $country, registrationNumber: $registrationNumber, limit: $limit) {
      id
      registrationNumber
      name
      country
      address
      status
    }
  }
`;
