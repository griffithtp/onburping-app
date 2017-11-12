import gql from 'graphql-tag';

export default gql`
  query fetchCompanyDetails($id: String, $dataset: String = "full") {
    company(id: $id, dataset: $dataset) {
      country
      id
      name
      registrationNumber
      status
      legalForm
      sicNaceCodes
      dateOfIncorporation
      secretaries
      address
      managingDirectors
      people {
        secretary {
          name
          startDate
          endDate
          status
        }
        ultimateBeneficialOwner {
          name
          startDate
          endDate
          status
          address
        }
      }
      shareholders
    }
  }
`;
