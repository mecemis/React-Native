import * as React from 'react';
import {Text,} from 'react-native';
import { createAppContainer, createStackNavigator} from 'react-navigation'

//pages import
import Login from './components/Login'
import Register from './components/Register'
import Products from './components/Products'
import Detail from './components/Detail'

const stack = createStackNavigator({
  login : {screen : Login},
  register : {screen : Register},
  products : {screen: Products},
  detail: {screen: Detail},
})

export default createAppContainer(stack);