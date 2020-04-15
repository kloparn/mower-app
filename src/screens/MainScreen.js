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

const MainScreen = () => {
  const {manager, data_debug} = useStoreState((state) => state.bluetooth);
  console.log('manager', manager);
  return (
    <MainView>
      {data_debug.map((d) => {
        return <MainText key={d}>Data: {d}</MainText>;
      })}
    </MainView>
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
