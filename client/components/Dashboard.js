import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
// import mutation from '../mutations/CompanySearch';
// import CompanyDetails from '../queries/CompanySearch';

import CompanySearchForm from './CompanySearchForm';
import CompanyList from './CompanyList';

class Dashboard extends Component
{
  render() {
    if (this.props.data.loading) { return <div>Loading</div>; }

    return (
      <div>
        <CompanySearchForm />
        <CompanyList />
        <Link to="/company/05C45F7F6AB6BC73BD6E776408C2BC85">Test</Link>
      </div>
    );
  }
}

export default Dashboard;
