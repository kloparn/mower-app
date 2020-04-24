import React, {Fragment, Component} from 'react';
import Canvas from 'react-native-canvas'; 
import {useStoreState, useStoreActions} from 'easy-peasy';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  Alert,
  Button,
} from 'react-native';

import {Layout} from '../components';


handleCanvas = (canvas) => {
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'purple';
  ctx.fillRect(0, 0, 100, 100); 
}

const VisualizationScreen = () => {
  return (
    <Layout>
      <View>
        <Text>Hej backend :)))))))))))))</Text>
        <Canvas ref={this.handleCanvas}/>
      </View>
    </Layout>
  );
};

export default VisualizationScreen;
