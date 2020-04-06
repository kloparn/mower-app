/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment, useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid,
  Alert,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { BleManager } from 'react-native-ble-plx';


const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "Cool Photo App Location Permission",
        message:
          "We need your location" +
          "So we can find your dog",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("Now we have you data/dog");
    } else {
      console.log("Apple failed to steal your data");
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
      }
      else {
        //console.warn("dev", devices);
        const devAlreadyExist = devices.find(d => d.id === device.id);
        if (!devAlreadyExist)
          setDevices([...devices, device]);
        console.log(device.id);
      }
    })

  }
  const resetDeviceScan = () => {
    setDevices([]);
    deviceScan();
  }
  deviceScan();

  useEffect(() => {
    // Create an scoped async function in the hook
    async function functionName() {


    }
    // Execute the created function directly
    functionName();
  }, []);


  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <View style={styles.container}>
          <Button title="Request Location permission" onPress={requestLocationPermission} />
        </View>
        <View>
          <Text>Searching...</Text>
          {devices.map(d => {
            return (
              <Fragment key={d.id}>
                <Text>Name:{(d.name === null) ? "null" : d.name}</Text>
                <Text>Id:{d.id}</Text>
              </Fragment>
            )
          })}
        </View>
        <Button title="Scan for devices" onPress={resetDeviceScan} />

      </SafeAreaView>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
