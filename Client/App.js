import React, { Fragment, Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { persistor, store } from './store/store';

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
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <Fragment>
            <h1>Welcome To React!</h1>
          </Fragment>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
