import React, { Fragment, Component } from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { persistor, store } from './store/store';
import routes from './routes';
import NotFound from './components/notFound/NotFound';

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
          <Router>
            <Fragment>
              <Switch>
                {
                    routes.map(route => (
                      <Route
                        exact={route.exact}
                        path={route.path}
                        key={route.path}
                        component={route.component}
                      />
                    ))
                  }
                <Route component={NotFound} />
              </Switch>
            </Fragment>
          </Router>
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
