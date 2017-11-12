import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import mutation from '../mutations/CompanySearch';
// import CompanyDetails from '../queries/CompanySearch';

import CompanySearchForm from './CompanySearchForm';
import CompanyList from './CompanyList';
import Loading from './Loading';

class Dashboard extends Component
{
  constructor(props) {
    super(props);

    this.state = { errors: [], burping: false};
  }

  // componentWillUpdate(nextProps) {
  //   console.log(this.props.data, nextProps.data);
  //
  //   if (!this.props.data.user && nextProps.data.user) {
  //     // redirect to dashboard!
  //     console.log(nextProps.data);
  //   }
  // }

  onSubmit({country, registrationNumber, limit}) {
    this.setState({burping: true});
    this.props.mutate({
      variables: { country: country, registrationNumber: registrationNumber, limit: limit }
      //refetchQueries: [{}]
    }).then( (res) => {
      if (res.data.companysearch.length > 0) {
        hashHistory.push(`/company/${res.data.companysearch[0].id}`);
      }
    }).catch( res => {
      const errors = rest.graphQLErrors.map( error => error.message);
      this.setState({ errors });
    })
  }

  render() {
    if (this.props.data.loading) { return <div>Loading</div>; }

    return (
      <div>
        <Loading burping={ this.state.burping } />
        <CompanySearchForm
          errors={ this.state.errors }
          onSubmit={ this.onSubmit.bind(this) }
          />
        {/* <CompanyList /> */}
      </div>
    );
  }
}

export default graphql(mutation)(Dashboard);
