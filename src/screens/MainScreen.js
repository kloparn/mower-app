import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useStoreState} from 'easy-peasy';

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

const MainScreen = () => {
  const {manager, data_debug} = useStoreState((state) => state.bluetooth);
  console.log('manager', manager);
  return (
    <Layout>
      <MainView>
        {data_debug.map((d, i) => {
          return <MainText key={i}>Data: {d}</MainText>;
        })}
      </MainView>
    </Layout>
  );
};

// TEMP
const MainView = styled.View`
  background-color: black;
`;
const MainText = styled.Text`
  color: white;
`;

export default MainScreen;
