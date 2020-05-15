import React from 'react';
import styled from 'styled-components';
import {useStoreState, useStoreActions} from 'easy-peasy';

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

const ControlStateButton = ({text, id, isSelected}) => {
  const {sendCommand, setDriveState, setMotor} = useStoreActions(
    (state) => state.bluetooth,
  );
  return isSelected ? (
    <SelectedControlButton
      onPress={() => {
        //sendCommand({d: id});
        setDriveState(id);
        setMotor({left: true, value: 5});
        setMotor({left: false, value: 5});
      }}>
      <ControlText>{text}</ControlText>
    </SelectedControlButton>
  ) : (
    <ControlButton
      onPress={() => {
        //sendCommand({d: id});
        setDriveState(id);
        setMotor({left: true, value: 5});
        setMotor({left: false, value: 5});
      }}>
      <ControlText>{text}</ControlText>
    </ControlButton>
  );
};

const ControlButton = styled.TouchableOpacity`
  width: 27%;
  background-color: ${(props) => props.theme.colors.secondary};
  border-radius: 5px;
  display: flex;
  padding: 12px 15px;
  justify-content: center;
  align-items: center;
`;

const SelectedControlButton = styled.TouchableOpacity`
  width: 27%;
  background-color: black;
  border-radius: 5px;
  display: flex;
  padding: 12px 15px;
  justify-content: center;
  align-items: center;
`;

const ControlText = styled.Text`
  color: ${(props) => props.theme.colors.text};
`;

export default ControlStateButton;
