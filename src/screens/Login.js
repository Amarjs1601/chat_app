import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Loader from '../components/Loader';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);

  const loginUser = () => {
    setVisible(true);
    firestore()
      .collection('Users')
      .where('email', '==', email)
      .get()
      .then(res => {
        setVisible(false);
        if (res.docs !== []) {
          console.log(JSON.stringify(res.docs[0].data()));
          goToNext(
            res.docs[0].data().name,
            res.docs[0].data().email,
            res.docs[0].data().userId,
          );
        } else {
          Alert.alert('user not found');
        }
      })
      .catch(error => {
        setVisible(false);
        console.log(error);
        Alert.alert('Error searching for user');
      });
  };

  const goToNext = async (name, email, userId) => {
    await AsyncStorage.setItem('NAME', name);
    await AsyncStorage.setItem('EMAIL', email);
    await AsyncStorage.setItem('USERID', userId);
    navigation.navigate('Main');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        value={email}
        onChangeText={txt => setEmail(txt)}
        placeholder="Enter Email"
        style={[styles.input, {marginTop: 10}]}
      />

      <TextInput
        value={password}
        onChangeText={txt => setPassword(txt)}
        placeholder="Enter Password"
        style={[styles.input, {marginTop: 10}]}
      />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          loginUser();
        }}>
        <Text style={styles.btnText}>Login</Text>
      </TouchableOpacity>
      <Text
        style={styles.redirectLogin}
        onPress={() => {
          navigation.navigate('Signup');
        }}>
        Or Sign Up
      </Text>
      <Loader visible={visible} />
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    fontWeight: '600',
    color: '#000',
    marginTop: 150,
  },
  input: {
    width: '90%',
    borderWidth: 0.7,
    borderRadius: 15,
    fontWeight: '600',
    alignSelf: 'center',
    marginVertical: 20,
    paddingLeft: 20,
  },
  btn: {
    width: '90%',
    height: 50,
    marginTop: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: '#1abc9c',
  },
  btnText: {
    fontWeight: '600',
    fontSize: 23,
    color: '#fff',
  },
  redirectLogin: {
    textAlign: 'center',
    fontSize: 24,
    marginTop: 40,
    textDecorationLine: 'underline',
    color: '#000',
  },
});
