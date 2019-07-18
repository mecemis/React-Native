import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert, Image
} from 'react-native';
import Constants from 'expo-constants';
import axios from 'react-native-axios'

export default class Register extends React.Component {
  state = {
    name: '',
    surname:'',
    phone:'',
    mail: '',
    pass: '',
  };

  constructor(props) {
    super(props);
    console.log('constructor call');
  }

  fncRegister = () => {
    const name = this.state.name;
    const surname = this.state.surname;
    const tel = this.state.phone;
    const mail = this.state.mail;
    const pass = this.state.pass;
    if (mail == '') {
      /* === string olup olmadığına da bakar */
      this.fncAlert('Hata', 'Lütfen mail girin !');
    } else if (pass == '') {
      this.fncAlert('Hata', 'Lütfen şifre girin');
    } else {
      //formu gönder
      const url = "https://www.jsonbulut.com/json/userRegister.php"
      const data = {
        ref: "5380f5dbcc3b1021f93ab24c3a1aac24",
        userName: name,
        userSurname: surname,
        userPhone: tel,
        userMail: mail,
        userPass: pass,
      }
      axios.get(url, {params: data}).then(res => {
        //res datası geldi, artık işlemlerini yap
        const dt = res.data;
        console.log("data : " + JSON.stringify(dt))
        const durum = dt.user[0].durum
        const mesaj = dt.user[0].mesaj
        if(durum){
          //kayıt başarılı
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
        },
      },
    ]);
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Text style={styles.title}>User Register</Text>


          <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={txt => this.setState({name:txt})} />

           <TextInput
          style={styles.input}
          placeholder="Surname"
          onChangeText={txt => this.setState({surname:txt})} />

           <TextInput
          style={styles.input}
          placeholder="Telephone"
          onChangeText={txt => this.setState({phone:txt})}
          keyboardType='phone-pad' />

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
            
            <TouchableOpacity onPress={() => this.fncRegister()}>
              <Text style={styles.btn}>Register</Text>
            </TouchableOpacity>
            
          </View>
          <View style={{flex:1, justifyContent:'center', flexDirection:'row', marginTop:10}}>
          {this.state.mail == "muratDSADSAD" &&
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
    console.log('render after call');
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
