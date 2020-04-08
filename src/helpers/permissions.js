import {PermissionsAndroid} from 'react-native';

// Make sure to clean up the code, NO STUPID TEXT.
export const requestLocationPermission = async () => {
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
