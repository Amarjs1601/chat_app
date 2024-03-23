import {StyleSheet, Text, TouchableOpacity, View, Image} from 'react-native';
import React, {useState} from 'react';
import Users from '../tabs/Users';
import Setting from '../tabs/Setting';

const Main = () => {
  const [selected, setSelected] = useState(0);
  return (
    <View style={styles.container}>
      {selected == 0 ? <Users /> : <Setting />}
      <View style={styles.bottomTab}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelected(0);
          }}>
          <Image
            source={require('../images/users.png')}
            style={[
              styles.tabIcon,
              {tintColor: selected == 0 ? '#fff' : 'grey'},
            ]}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => {
            setSelected(1);
          }}>
          <Image
            source={require('../images/setting.png')}
            style={[
              styles.tabIcon,
              {tintColor: selected == 1 ? '#fff' : 'grey'},
            ]}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Main;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bottomTab: {
    width: '100%',
    height: 70,
    position: 'absolute',
    bottom: 0,
    backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  tab: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIcon: {
    width: 30,
    height: 30,
  },
});
