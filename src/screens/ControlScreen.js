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

import {BleManager} from 'react-native-ble-plx';

const ROBOT_UID_CONNECT = '0000ffe1-0000-1000-8000-00805f9b34fb';
const ROBOT_UID_SEND = '0000ffe3-0000-1000-8000-00805f9b34fb';

const ControlScreen = () => {
  const [devices, setDevices] = useState([]);
  const manager = new BleManager();
  const deviceScan = () => {
    manager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.log(error);
      } else {
        /*const devAlreadyExist = devices.find((d) => d.id === device.id);
        if (!devAlreadyExist) setDevices([...devices, device]);
        console.log(device.id);*/

        if (device.id === ROBOT_UID_CONNECT) {
          manager.stopDeviceScan();

          // We found the device, connect to it (and subscribe to events etc)
          device
            .connect()
            .then((device) => {
              device.discoverAllServicesAndCharacteristics();
            })
            .then((device) => {
              device.monitorCharacteristicForService(device.id);
              // Här ska vi göra skit
            })
            .catch((err) => {
              console.error(err);
            });
        }
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

export default ControlScreen;
