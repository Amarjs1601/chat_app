import {
  StyleSheet,
  Text,
  View,
  Modal,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React from 'react';

const Loader = ({visible}) => {
  return (
    <Modal visible={visible} transparent>
      <View style={styles.modalView}>
        <View style={styles.mainView}>
          <ActivityIndicator size={'large'} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  modalView: {
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height,
    backgroundColor: 'rgba(0,0,0,.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainView: {
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 50,
    justifyContent: 'center',
    alignContent: 'center',
  },
});
