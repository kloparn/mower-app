import React, {Fragment, useState, useEffect} from 'react';
import styled from 'styled-components';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {requestLocationPermission} from '../helpers/permissions';
import {MotorSlider, ControlStateButton, SendBTButton} from '../components';

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

/*
  TRACE:: #A1.2.5 -> Input screen for the mower.
*/
const ControlScreen = () => {
  const {initBluetooth} = useStoreActions((state) => state.bluetooth);
  const status = useStoreState((state) => state.bluetooth.status);

  const connectToRobot = () => {
    PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ).then((hasPermission) => {
      if (hasPermission) {
        initBluetooth();
      } else {
        requestLocationPermission();
      }
    });
  };
  return (
    <Layout>
      {status === 'SCANNING' ? (
        <ControlView>
          <TitleText>Control Mower</TitleText>
          <DebugButtonsView>
            <SendBTButton msg="0" text="Send 0" />
            <SendBTButton msg="1" text="Send 1" />
          </DebugButtonsView>
          <SliderView>
            <MotorSlider left={true} />
            <MotorSlider left={false} />
          </SliderView>
          <ButtonView>
            <ControlStateButton text="Stop" />
            <ControlStateButton text="Autonomous" />
            <ControlStateButton text="Manual" />
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

const DebugButtonsView = styled.View``;

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
