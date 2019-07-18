import * as React from 'react';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native';
import Constants from 'expo-constants';

export default class Detail extends React.Component {
  static navigationOptions = {
    title: 'Detail',
    headerStyle: {
      backgroundColor: '#4a70ad',
    },
  };

  item = this.props.navigation.getParam('item', null);

  render() {
    return (
      <View style={styles.container}>
        <ScrollView style={{marginLeft:10, marginRight:10}}>
          <View style={{height:250,flexDirection: 'row', marginTop: 10 }}>
            <Image
              style={{ flex:1, height:250 }}
              source={{ uri: this.item.images[0].normal }}
              resizeMode='contain'
            />
          </View>
          <View>
            <Text style={{justifyContent:'center',fontSize: 25, color:'#44774c', marginTop: 10}}>{this.item.productName}</Text>
          </View>
          <View>
            <Text style={{textAlign:'right',fontSize: 25, color:'red', marginTop: 10}}>{this.item.price} ₺</Text>
          </View>
          <View>
            <Text style={{marginTop: 10}}>{this.item.description}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
});
