import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert, Image, AsyncStorage
} from 'react-native';
import Constants from 'expo-constants';
import axios from 'react-native-axios'

export default class Login extends React.Component {

static navigationOptions = {
  title: "User Login",
  headerStyle:{
    backgroundColor: '#4a70ad'
  }
}

  state = {
    mail: 'ali@ali.com',
    pass: '12345',
  };

  constructor(props) {
    super(props);
    console.log('constructor call');
  }

  fncLogin = () => {
    
    const mail = this.state.mail;
    const pass = this.state.pass;
    if (mail == '') {
      /* === string olup olmadığına da bakar */
      this.fncAlert('Hata', 'Lütfen mail girin !');
    } else if (pass == '') {
      this.fncAlert('Hata', 'Lütfen şifre girin');
    } else {
      //formu gönder
      const url = "https://www.jsonbulut.com/json/userLogin.php"
      const data = {
        ref: "5380f5dbcc3b1021f93ab24c3a1aac24",
        
        userEmail: mail,
        userPass: pass,
        face: 'no',

    }
     axios.get(url, {params: data}).then(res => {
        //res datası geldi, artık işlemlerini yap
        const dt = res.data;
        console.log("data : " + JSON.stringify(dt))
        const durum = dt.user[0].durum
        const mesaj = dt.user[0].mesaj
        if(durum){
          //kayıt başarılı
          
          //const bilgi = dt.user[0].bilgiler
          //AsyncStorage.setItem("userid", bilgi.userId)
          this.fncAlert("Başarılı", mesaj)
        }else{
          //kayıt hatalı
          this.fncAlert("Hata", mesaj)
        }
      })
    }
  };


  fncAlert = (title, detail) => {
    Alert.alert(title, detail, [
      {
        text: 'Tamam',
        onPress: () => {
          /* yapılacak işlemler */
          this.props.navigation.navigate("products")
        },
      },
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>Login</Text>
          <TextInput
            value={this.state.mail}
            onChangeText={txt => this.setState({ mail: txt })}
            autoCapitalize="none"
            keyboardType="email-address"
            style={[styles.input, {borderColor: this.state.mail =='ali' ?'#ff0000': '#3b78db'}]}
            placeholder="E-Mail Address"
          />
          <TextInput
            value={this.state.pass}
            onChangeText={txt => this.setState({ pass: txt })}
            secureTextEntry
            style={styles.input}
            placeholder="Password"
          />
          <View
            style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between' }}>
            <TouchableOpacity onPress={() => this.fncLogin()}>
              <Text style={styles.btn}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => { this.props.navigation.navigate("register")}}>
              <Text style={styles.btn}>Register</Text>
            </TouchableOpacity>
            
          </View>
          <View style={{flex:1, justifyContent:'center', flexDirection:'row', marginTop:10}}>
          {this.state.mail == "murat" &&
              <Image source={ require('./assets/homeone.png') }/>
          }

          {this.state.mail === "yasin"?(
            <Image source={ require('./assets/hometwo.png') }/>
          ):null
          
          }
            </View>
        </ScrollView>
      </View>
    );
  }

  componentDidMount() {
    if(AsyncStorage.getItem("userid") != null){
      //this.props.navigation.navigate("register")
    }
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
  title: {
    fontSize: 25,
    color: '#3f71c1',
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#3b78db',
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
    marginTop: 5,
  },
  btn: {
    borderWidth: 1,
    borderColor: '#3b78db',
    backgroundColor: '#3b78db',
    color: '#fff',
    padding: 10,
    fontSize: 18,
    borderRadius: 10,
    marginTop: 10,
    width:'100%',
    textAlign: 'center',
  },
});
