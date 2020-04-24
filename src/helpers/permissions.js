import {PermissionsAndroid} from 'react-native';

/*
  TRACE:: #A1.2.6 -> Bluetooth commands for sending the user inputs
*/

export const requestLocationPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location permission',
        message: 'Location permission needed for bluetooth connection to mower',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Permission granted, thank you!');
    } else {
      console.log('Apple failed to steal your data');
    }
  } catch (err) {
    console.warn(err);
  }
};
