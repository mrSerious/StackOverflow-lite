import React, { Component } from 'react';

/**
 * @class App
 *
 * @classdesc class representing App
 */
class App extends Component {
  /**
  * Constructor
  * How to take care about onChange and states?
  * @param {any} props parameter
  */
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
   * Renders the component
   *
   * @memberof app.components.MyComponent
   * @return {string} - HTML markup for the component
   */
  render() {
    return (
      <div className="app">
        <h1>Welcome To React!</h1>
      </div>
    );
  }
}

export default App;
