import React, { Component } from 'react';

class Loading extends Component
{
  render() {
    if (!this.props.burping) { return <div></div>; }
    return (
      <div className="progress">
        <div className="indeterminate"></div>
      </div>
    )
  }
}

export default Loading;
