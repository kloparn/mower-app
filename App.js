/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment, useState, useEffect} from 'react';
import styled from 'styled-components';

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

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {BleManager} from 'react-native-ble-plx';

// Make sure to clean up the code, NO STUPID TEXT.
const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Cool Photo App Location Permission',
        message: 'We need your location' + 'So we can find your dog', // LIKE THIS BITCH
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Now we have you data/dog');
    } else {
      console.log('Apple failed to steal your data');
    }
  } catch (err) {
    console.warn(err);
  }
};

const App = () => {
  const [devices, setDevices] = useState([]);
  const manager = new BleManager();

  const deviceScan = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      } else {
        //console.warn("dev", devices);
        const devAlreadyExist = devices.find((d) => d.id === device.id);
        if (!devAlreadyExist) setDevices([...devices, device]);
        console.log(device.id);
      }
    });
  };
  const resetDeviceScan = () => {
    setDevices([]);
    deviceScan();
  };
  deviceScan();

  useEffect(() => {
    // Create an scoped async function in the hook
    async function functionName() {}
    // Execute the created function directly
    functionName();
  }, []);

  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View>
          <Button
            title="Request Location permission"
            onPress={requestLocationPermission}
          />
        </View>
        <MainView>
          <MainText>Searching...</MainText>
          {devices.map((d) => {
            return (
              <Fragment key={d.id}>
                <MainText>Name:{d.name === null ? 'null' : d.name}</MainText>
                <MainText>Id:{d.id}</MainText>
              </Fragment>
            );
          })}
        </MainView>
        <Button title="Scan for devices" onPress={resetDeviceScan} />
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

export default App;
