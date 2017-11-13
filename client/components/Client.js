import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import { Link } from 'react-router';

import fetchCompanyDetails from '../queries/fetchCompanyDetails';

class Client extends Component
{
  render() {
    const { company } = this.props.data;
    if (!company) { return <div>Loading...</div>; }

    const { ultimateBeneficialOwner, director, secretary } = company.people || {};

    return (
      <div className="row">
        <Link to="/dashboard">Back</Link>
        <h4>{ company.name }</h4>

        <div className="row">
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title"></span>
                <ul>
                  <li>
                    <label className="col s4">Registration Number</label>
                    <span>{company.registrationNumber}</span>
                  </li>
                  <li>
                    <label className="col s4">Legal form</label>
                    <span>{company.legalForm}</span>
                  </li>
                  <li>
                    <label className="col s4">Country</label>
                    <span>{company.country}</span>
                  </li>
                  <li>
                    <label className="col s4">sicNaceCodes</label>
                    <span>{company.sicNaceCodes}</span>
                  </li>
                  <li>
                    <label className="col s4">Date of incorporation</label>
                    <span>{company.dateOfIncorporation}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col s12 m6">
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <span className="card-title"></span>
                <ul>
                  {company.address.map( (address) => {
                    return <li>{address}</li>
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col s6">
          <ul className="collection with-header">
            <li className="collection-header"><h4>Your application is processing</h4></li>
            <li className="collection-item">Our compliance office will be in touch within 24hours.</li>
          </ul>
        </div>

      </div>
    );
  }
}

export default graphql(fetchCompanyDetails, {
  options: (props) => {
    return { variables: { id: props.params.id }} // dataset is set to 'full' by default from the gql query
  }
})(Client);
