import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Splash = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      checkLogin();
    }, 3000);
  }, []);

  const checkLogin = async () => {
    const id = await AsyncStorage.getItem('USERID');
    if (id !== null) {
      navigation.navigate('Main');
    } else {
      navigation.navigate('Login');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.splashLogo}>{'Firebase Chat\nApp'}</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1abc9c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashLogo: {
    fontWeight: '600',
    fontSize: 40,
    color: '#fff',
    textAlign: 'center',
  },
});
