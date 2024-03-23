import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextComponent,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
let id = '';
const Users = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  console.log('USERS--->', users);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    id = await AsyncStorage.getItem('USERID');
    let tempData = [];
    const email = await AsyncStorage.getItem('EMAIL');
    firestore()
      .collection('Users')
      .where('email', '!=', email)
      .get()
      .then(res => {
        console.log('getUsers------>', res.docs[0].data());
        if (res.docs != []) {
          res.docs.map(item => {
            tempData.push(item.data());
          });
        }
        console.log('tempData---->', tempData);
        setUsers(tempData);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>React Native Firebase Chat App</Text>
      </View>
      <FlatList
        data={users}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={styles.userList}
              onPress={() => {
                navigation.navigate('Chat', {data: item, id: id});
              }}>
              <Image
                source={require('../images/user3.png')}
                style={styles.userImg}
              />
              <Text style={styles.userName}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default Users;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    width: '100%',
    height: 70,
    backgroundColor: '#fff',
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontWeight: '600',
    fontSize: 18,
    color: 'green',
  },
  userList: {
    width: Dimensions.get('screen').width - 50,
    height: 60,
    marginTop: 20,
    borderWidth: 0.5,
    borderRadius: 10,
    alignSelf: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    alignItems: 'center',
  },
  userImg: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  userName: {
    fontWeight: '600',
    marginLeft: 10,
    fontSize: 20,
    color: '#000',
  },
});
