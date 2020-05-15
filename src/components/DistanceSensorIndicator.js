import React from 'react';
import styled from 'styled-components';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {eyeSlashIcon} from '../helpers/icons';

import {Button, View, Text} from 'react-native';

/*
  TRACE:: #A1.3.7 -> Create visualization component for the collision avoidance.
*/

const DistanceSensorIndicator = () => {
  /*
    TRACE:: #A1.3.9 -> Hook up visualization component to sensor data from the mower.
  */
  const {motionSensor} = useStoreState((state) => state.bluetooth);
  return motionSensor === null ? (
    <CustomView>{eyeSlashIcon}</CustomView>
  ) : motionSensor < 30 ? (
    <CustomView>
      <DangerText>{motionSensor} cm</DangerText>
    </CustomView>
  ) : motionSensor >= 30 && motionSensor < 50 ? (
    <CustomView>
      <WarningText>{motionSensor} cm</WarningText>
    </CustomView>
  ) : (
    <CustomView>
      <SafeText>{motionSensor} cm</SafeText>
    </CustomView>
  );
};

const DangerText = styled.Text`
  font-size: 27px;
  color: red;
`;
const WarningText = styled.Text`
  font-size: 27px;
  color: orange;
`;
const SafeText = styled.Text`
  font-size: 27px;
  color: green;
`;

const CustomView = styled.View`
  width: 120px;
  height: 120px;
  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default DistanceSensorIndicator;
