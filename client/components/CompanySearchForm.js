import React, { Component } from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

import mutation from '../mutations/CompanySearch';

class CompanySearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = { result: '', country: 'UK', company: 'lloyds', limit: 9};
  }

  onSearchSubmit(event){
    event.preventDefault();

    this.props.mutate({
      variables: {
        country: this.state.country,
        name: this.state.company,
        limit: this.state.limit
      }
    });
  }

  render() {
    return(
      <div className="row">
        <form onSubmit={this.onSearchSubmit.bind(this)} className="col s4">
          <div className="input-field">
            <input placeholder="Country Code"
              value={this.state.country}
              onChange={ e => {this.setState({country: e.target.value})}}
            />
          </div>
          <div className="input-field">
            <input placeholder="Company Name"
              value={this.state.name}
              onChange={e => this.setState({name: e.target.value})}
            />
          </div>
          <button className="btn">Search</button>
        </form>
      </div>
    )
  }
}

export default graphql(mutation)(CompanySearchForm);
