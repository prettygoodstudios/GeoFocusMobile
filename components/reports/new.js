import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';

import history from '../../history';
import * as actions from '../../actions';
import baseStyles from '../../styles';
import {ROOT_URL} from '../../backend';
import {parseNetworkErrors} from '../../helpers/errors';

import FormGroup from "../form/group";
import Error from "../widgets/error";
import Button from '../widgets/button';

class ReportsNew extends Component {

  constructor(){
    super();
    this.state = {
      message: "",
      error: ""
    }
  }

  updateMessage = (m) => {
    this.setState({
      message: m
    });
  }

  submit = () => {
    const params = {
      email: this.props.user.email,
      token: this.props.user.authentication_token,
      ...this.props,
      message: this.state.message
    }
    this.props.setLoading(true);
    axios.post(`${ROOT_URL}/reports`, params).then((r) => {
      const {errors, report} = r.data;
      this.props.setLoading(false);
      if(!errors){
        alert("Successfully Reported Content!");
        history.push("/locations");
      }else{
        this.setState({
          error: errors.message[0]
        });
      }
    }).catch((e) => {
      this.props.setLoading(false);
      this.setState({
        error: parseNetworkErrors(e)
      });
    });
  }

  render(){
    return(
      <View>
        <Text style={baseStyles.h1}>Report Content</Text>
        <Text style={baseStyles.p}>Reported content will be investigated by a site administrator before any action will be taken. Content that violates our terms of service will be edited or taken down. A account may be terminated after repeat violations or extreme acts.</Text>
        <FormGroup placeholder="Message" label="Message" value={this.state.message} onChangeText={(l, t) => this.updateMessage(t)} />
        <Error error={this.state.error}/>
        <Button content="Submit" onPress={this.submit}/>
        <View style={{height: 20}}></View>
      </View>
    );
  }
}

function mapStateToProps(state){
  return{
    ...state.reports.content,
    user: state.auth.user
  }
}

export default connect(mapStateToProps, actions)(ReportsNew);
