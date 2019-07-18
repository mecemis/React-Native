import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  BackHandler,
  FlatList,
  ScrollView,
  Image, TouchableOpacity
} from 'react-native';
import Constants from 'expo-constants';
import axios from 'react-native-axios';

export default class Products extends React.Component {
  static navigationOptions = {
    title: 'Products List',
    headerTintColor: 'red',
    headerStyle: {
      backgroundColor: '#4a70ad',
    },
    headerLeft: null,
    gesturesEnabled: false,
  };

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }

  state = {
    data: [],
  };

  componentDidMount() {
    const url =
      'https://www.jsonbulut.com/json/product.php?ref=5380f5dbcc3b1021f93ab24c3a1aac24&start=0';
    axios.get(url).then(res => {
      const dt = res.data;
      this.setState({ data: dt.Products[0].bilgiler });
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <FlatList
            contentContainerStyle={{ flex: 1, marginBottom: 10 }}
            data={this.state.data}
            keyExtractor={item => item.productId}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={()=>{  this.props.navigation.navigate("detail", {item:item})}}>
              <View style={{flexDirection: 'row', marginTop:20 }}>
                <Image
                  style={{ width: 75, height: 75 }}
                  source={{ uri: item.images[0].thumb }}
                />
                <View style={{marginLeft:8}}>
                  <Text style={{fontSize: 18, color:'#44774c'}}>{item.productName}</Text>
                  <Text style={{marginTop:7}}>{item.categories[0].categoryName} </Text>
                   <Text style={{marginTop:7}}>{item.price} ₺ </Text>
                </View>
              </View>
              </TouchableOpacity>
            )}
          />
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
