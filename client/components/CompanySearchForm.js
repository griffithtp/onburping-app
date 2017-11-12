import React, { Component } from 'react';
// import gql from 'graphql-tag';
// import { graphql } from 'react-apollo';
import { Link, hashHistory} from 'react-router';

class CompanySearchForm extends Component {
  constructor(props) {
    super(props);

    this.state = { country: 'UK', registrationNumber: '02019697', limit: 9};
  }

  onSubmit(event){
    event.preventDefault();

    this.props.onSubmit(this.state);
  }

  render() {
    return(
      <div className="row">
        <form onSubmit={this.onSubmit.bind(this)} className="col s4">
          <div className="row">
            <div className="input-field">
              <input placeholder="country code"
                value={this.state.country}
                onChange={ e => {this.setState({country: e.target.value})}}
              />
            </div>
            <div className="input-field">
              <input placeholder="registrationNumber"
                value={this.state.registrationNumber}
                onChange={e => this.setState({registrationNumber: e.target.value})}
              />
            </div>

            <div className="errors">
              {this.props.errors.map(error => <div key={error}>{error}</div>)}
            </div>

            <button className="btn">Burp it!</button>
            {/* <Link to="/company/05C45F7F6AB6BC73BD6E776408C2BC85">Test</Link> */}
          </div>
        </form>
      </div>
    )
  }
}

export default CompanySearchForm;
