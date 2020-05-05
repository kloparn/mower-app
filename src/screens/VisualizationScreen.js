import React, {Fragment} from 'react';
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

const VisualizationScreen = () => {
  return (
    <Layout>
      <View>
        <Text>Hej backend :)))))))))))))</Text>
      </View>
    </Layout>
  );
};

export default VisualizationScreen;
