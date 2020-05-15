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
    <SafeView>{eyeSlashIcon}</SafeView>
  ) : motionSensor < 30 ? (
    <DangerView>
      <CustomText>{motionSensor} cm</CustomText>
    </DangerView>
  ) : motionSensor >= 30 && motionSensor < 50 ? (
    <WarningView>
      <CustomText>{motionSensor} cm</CustomText>
    </WarningView>
  ) : (
    <SafeView>
      <CustomText>{motionSensor} cm</CustomText>
    </SafeView>
  );
};

const CustomText = styled.Text`
  font-size: 27px;
`;

const DangerView = styled.View`
  width: 120px;
  height: 120px;
  background: red;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WarningView = styled.View`
  width: 120px;
  height: 120px;
  background: yellow;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SafeView = styled.View`
  width: 120px;
  height: 120px;
  background: green;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default DistanceSensorIndicator;
