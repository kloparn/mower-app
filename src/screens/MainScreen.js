import React from 'react';
import styled from 'styled-components';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useStoreState} from 'easy-peasy';

/*
  TRACE:: #A1.1.1 -> Scaffold react native application.
*/

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
  FlatList,
} from 'react-native';

import {Layout} from '../components';

const MainScreen = () => {
  const {manager, data_debug} = useStoreState((state) => state.bluetooth);
  return (
    <Layout>
      <MainView>
        <FlatList
          data={data_debug}
          renderItem={({item}) => <MainText key={item}>Data: {item}</MainText>}
          keyExtractor={(item, index) => `${index}`}
        />
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
  font-size: 24px;
`;

export default MainScreen;
