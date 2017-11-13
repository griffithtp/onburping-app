import React, { Component } from 'react';
import AuthForm from './AuthForm';
import mutation from '../mutations/Signup';
import { graphql } from 'react-apollo';
import query from '../queries/CurrentUser';
import { hashHistory } from 'react-router';

class SignupForm extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user) {
      // quick Hack around to direct to Client page and display message
      hashHistory.push("/dashboard");
    }
  }


  onSubmit({ email, password}) {
    this.props.mutate({
      variables: {email, password},
      refetchQueries: [{ query }]
    }).catch( res => {
      const errors = res.graphQLErrors.map( error => error.message);
      this.setState({ errors });
    });
  }
  render() {
    return (
      <div className="container">
        <h3>Sign Up</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    )
  }

}

export default graphql(query)(
  graphql(mutation)(SignupForm)
);
