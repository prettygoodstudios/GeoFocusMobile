import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';
import {Route, Switch, Router} from 'react-router-native';
import {routerMiddleware} from 'react-router-redux';
import { Provider } from 'react-redux';
import reduxThunk from "redux-thunk";
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';


import reducers from './reducers';
const logger = createLogger();
const store = createStore(reducers, applyMiddleware(logger, reduxThunk, routerMiddleware(history)));

import history from "./history";
import styles from "./styles";

import Login from "./components/auth/login";

import LocationsIndex from "./components/locations/index";
import LocationsShow from "./components/locations/show";

import TitleBar from "./components/layout/titleBar";
import Spinner from "./components/widgets/spinner";


export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View>
          <TitleBar style={styles.body}/>
          <ScrollView style={styles.container}>
            <Router history={history}>
              <Switch>
                <Route exact path="/" component={Login} />
                <Route exact path="/locations" component={LocationsIndex} />
                <Route path="/locations/:id" component={LocationsShow} />
              </Switch>
            </Router>
          </ScrollView>
          <Spinner />
        </View>
      </Provider>
    );
  }
}
