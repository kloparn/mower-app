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
  const users = useStoreState((state) => state.users.items);
  const manager = useStoreState((state) => state.bluetooth.manager);
  console.log('manager', manager);
  return (
    <MainView>
      {users.map((u) => {
        return (
          <MainText>
            Name:{u.name}
            Id: {u.id}
          </MainText>
        );
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
