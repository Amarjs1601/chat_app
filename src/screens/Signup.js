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
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

import uuid from 'react-native-uuid';
import {flattenDiagnosticMessageText} from 'typescript';

const Signup = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const registerUser = () => {
    const userId = uuid.v4();
    firestore()
      .collection('Users')
      .doc(userId)
      .set({
        name: name,
        email: email,
        password: password,
        mobile: mobile,
        userId: userId,
      })
      .then(res => {
        console.log('user created');
        navigation.goBack();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const validate = () => {
    let isValid = true;
    if (name == '') {
      isValid = false;
    }
    if (email == '') {
      isValid = false;
    }
    if (mobile == '') {
      isValid = false;
    }
    if (confirmPassword !== password) {
      isValid = false;
    }
    return isValid;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        value={name}
        onChangeText={txt => setName(txt)}
        placeholder="Enter Name"
        style={styles.input}
      />
      <TextInput
        value={email}
        onChangeText={txt => setEmail(txt)}
        placeholder="Enter Email"
        style={[styles.input, {marginTop: 10}]}
      />
      <TextInput
        value={mobile}
        onChangeText={txt => setMobile(txt)}
        placeholder="Enter Mobile"
        keyboardType={'number-pad'}
        style={[styles.input, {marginTop: 10}]}
      />
      <TextInput
        value={password}
        onChangeText={txt => setPassword(txt)}
        placeholder="Enter Password"
        style={[styles.input, {marginTop: 10}]}
      />
      <TextInput
        value={confirmPassword}
        onChangeText={txt => setConfirmPassword(txt)}
        placeholder="Enter Confirm Password"
        style={[styles.input, {marginTop: 10}]}
      />
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          if (validate()) {
            registerUser();
          } else {
            Alert.alert('Please Enter Correct Data');
          }
        }}>
        <Text style={styles.btnText}>Sign Up</Text>
      </TouchableOpacity>
      <Text
        style={styles.redirectLogin}
        onPress={() => {
          navigation.navigate('Login');
        }}>
        Or Login
      </Text>
    </View>
  );
};

export default Signup;

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
    marginTop: 100,
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
