import React from 'react';
import { StyleSheet, Text, View, ScrollView} from 'react-native';

import styles from "./styles";

import Login from "./components/auth/login";
import TitleBar from "./components/layout/titleBar";

export default class App extends React.Component {
  render() {
    return (
      <View>
        <TitleBar style={styles.body}/>
        <ScrollView style={styles.container}>
          <Login />
        </ScrollView>
      </View>
    );
  }
}
