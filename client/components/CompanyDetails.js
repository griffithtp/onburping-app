import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchCompanyDetails from '../queries/fetchCompanyDetails';

class CompanyDetails extends Component
{


  render() {

    const { company } = this.props.data;
    if (!company) { return <div>Loading...</div>; }

    return (
      <div>
        <Link to="/dashboard">Back</Link>
        <h4>{ company.name }</h4>
        <p>Country: { company.country }</p>
        <p>Company Registration Number: { company.registrationNumber }</p>
        <p>
          ultimateBeneficialOwner
          { company.people.ultimateBeneficialOwner.map( (b) => {
            return (
              <a>{ b.name }</a>
            )
          })}
        </p>
        <p>
          <b>
            secretary
          </b>
          { company.people.secretary.map( (b) => {
            return (
              <a>{ b.name }</a>
            )
          })}
        </p>
      </div>
    );
  }
}

export default graphql(fetchCompanyDetails, {
  options: (props) => {
    return { variables: { id: props.params.id }} // dataset is set to 'full' by default from the gql query
  }
})(CompanyDetails);
