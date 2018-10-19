import React, {Component} from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView} from 'react-native';
import {Font} from 'expo';
import {Route, Switch, Router} from 'react-router-native';
import {routerMiddleware} from 'react-router-redux';
import { Provider, connect } from 'react-redux';
import reduxThunk from "redux-thunk";
import { createLogger } from 'redux-logger';
import { createStore, applyMiddleware, compose } from 'redux';
import { Viewport } from '@skele/components';


import reducers from './reducers';
const logger = createLogger();
const store = createStore(reducers, applyMiddleware(logger, reduxThunk, routerMiddleware(history)));

import * as actions from "./actions";
import history from "./history";
import styles from "./styles";

import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Profile from "./components/users/profile";
import UsersShow from "./components/users/show";

import LocationsIndex from "./components/locations/index";
import LocationsShow from "./components/locations/show";
import LocationsNew from "./components/locations/new";
import LocationsEdit from "./components/locations/edit";

import PhotosShow from "./components/photos/show";
import PhotosNew from "./components/photos/new";

import TitleBar from "./components/layout/titleBar";
import Nav from "./components/layout/nav";
import Spinner from "./components/widgets/spinner";

class MyLayout extends Component{
  render(){
    const {scroll, padding} = this.props;
    return(
      <View style={styles.body}>
        <TitleBar/>
        <Viewport.Tracker>
          <ScrollView style={[styles.container, {padding}]} scrollEnabled={scroll}>
            <KeyboardAvoidingView behavior="padding">
              <Router history={history}>
                <Switch>
                  <Route exact path="/" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/locations" component={LocationsIndex} />
                  <Route exact path="/locations/:id" component={LocationsShow} />
                  <Route path="/locations/new/create" component={LocationsNew} />
                  <Route path="/locations/:id/update" component={LocationsEdit} />
                  <Route exact path="/users/profile" component={Login} />
                  <Route path="/users/show/:id" component={UsersShow} />
                  <Route path="/users/profile/show" component={Profile} />
                  <Route exact path="/photos/:id" component={PhotosShow} />
                  <Route path="/photos/new/upload" component={PhotosNew} />
                </Switch>
              </Router>
            </KeyboardAvoidingView>
          </ScrollView>
        </Viewport.Tracker>
        <Nav />
        <Spinner />
      </View>
    );
  }
}

function mapStateToProps(state){
  const {scroll} = state.scrolling;
  const {padding} = state.padding;
  return{
    scroll,
    padding
  }
}

const Layout = connect(mapStateToProps, actions)(MyLayout);


class App extends Component {

  constructor(){
    super();
    this.state = {
      fontsLoaded: false
    }
  }

  async componentDidMount(){
    await Font.loadAsync({
      'avenir-medium': require('./assets/fonts/avenirmedium.ttf'),
    });
    await Font.loadAsync({
      'avenir-light': require('./assets/fonts/avenirlight.ttf'),
    });
    this.setState({
      fontsLoaded: true
    })
  }

  render() {
    return (
      <Provider store={store}>
        { this.state.fontsLoaded ?  <Layout /> : <View></View>}
      </Provider>
    );
  }
}

export default App;
