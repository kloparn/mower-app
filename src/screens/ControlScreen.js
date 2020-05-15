import React, {Fragment, useState, useEffect} from 'react';
import styled from 'styled-components';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {requestLocationPermission} from '../helpers/permissions';
import {useBluetoothStatus} from 'react-native-bluetooth-status';
import {
  MotorSlider,
  ControlStateButton,
  LineSensorIndicator,
  DistanceSensorIndicator,
} from '../components';

/*
  TRACE:: #A1.2.5 -> Input screen for the mower.
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
  TouchableOpacity,
} from 'react-native';

import {Layout} from '../components';

const ControlScreen = () => {
  const {initBluetooth} = useStoreActions((state) => state.bluetooth);
  const {status, driveState} = useStoreState((state) => state.bluetooth);
  const [btStatus, isPending, setBluetooth] = useBluetoothStatus();

  const connectToRobot = () => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then((hasPermission) => {
      if (hasPermission) {
        // Make sure bluetooth is on.
        if (!isPending && btStatus) {
          initBluetooth();
        } else {
          setBluetooth();
        }
      } else {
        requestLocationPermission();
      }
    });
  };
  return (
    <Layout>
      {status === 'ERROR' ? (
        <ControlView>
          <TitleText>Control Mower</TitleText>
          <SensorView>
            <LineSensorIndicator />
            <DistanceSensorIndicator />
          </SensorView>
          {driveState === 2 && (
            <SliderView>
              <MotorSlider left={true} />
              <MotorSlider left={false} />
            </SliderView>
          )}
          <ButtonView>
            <ControlStateButton
              text="Stop"
              id={0}
              isSelected={driveState == 0}
            />
            <ControlStateButton
              text="Autonomous"
              id={1}
              isSelected={driveState == 1}
            />
            <ControlStateButton
              text="Manual"
              id={2}
              isSelected={driveState == 2}
            />
          </ButtonView>
        </ControlView>
      ) : (
        <MainView>
          <ConnectButton onPress={connectToRobot}>
            <ConnectButtonText>Connect to Robot</ConnectButtonText>
          </ConnectButton>
          {status !== 'INIT' && <StatusText>{status}</StatusText>}
        </MainView>
      )}
    </Layout>
  );
};

const MainView = styled.View`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ControlView = styled.View`
  display: flex;
  justify-content: space-around;
  width: 100%;
  height: 100%;
`;

const TitleText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 25px;
  text-align: center;
`;

const SensorView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const SliderView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const ButtonView = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const ConnectButton = styled.TouchableOpacity`
  width: 60%;
  background-color: ${(props) => props.theme.colors.secondary};
  height: 20%;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 2px;
`;

const ConnectButtonText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 25px;
  text-align: center;
`;

const StatusText = styled.Text`
  color: ${(props) => props.theme.colors.text};
  font-size: 15px;
`;

export default ControlScreen;
