import React, {Fragment, useState, useEffect} from 'react';
import styled from 'styled-components';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {requestLocationPermission} from '../helpers/permissions';

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

const ControlScreen = () => {
  const {initBluetooth} = useStoreActions((state) => state.bluetooth);
  const status = useStoreState((state) => state.bluetooth.status);
  /*useEffect(() => {
    // Create an scoped async function in the hook
    async function functionName() {}
    // Execute the created function directly
    functionName();
  }, []);*/
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <MainView>
          <MainText>{status}</MainText>
        </MainView>
        <Button title="Connect" onPress={initBluetooth} />
        <Button
          title="Location permission"
          onPress={requestLocationPermission}
        />
      </SafeAreaView>
    </Fragment>
  );
};

// TEMP
const MainView = styled.View`
  background-color: black;
`;
const MainText = styled.Text`
  color: white;
`;

export default ControlScreen;
