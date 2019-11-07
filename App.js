import React from 'react';
import { StyleSheet, View } from 'react-native';
import axios from 'axios';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import Posts from './pages/Posts';
import Post from './pages/Post';
import Login from './pages/Login';

const routes = createStackNavigator({
  home: Posts,
  post: Post,
  login: Login,
});

const AppContainer = createAppContainer(routes);

export default function App() {
  return (
    <View style={styles.container}>
      <AppContainer />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: 0,
  },
});
