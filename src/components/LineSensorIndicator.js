import React from 'react';
import styled from 'styled-components';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {gripLinesIcon} from '../helpers/icons';

import {Button, View, Text, addons} from 'react-native';

/*
  TRACE:: #A1.3.7 -> Create visualization component for the collision avoidance.
*/

const LineSensorIndicator = () => {
  /*
    TRACE:: #A1.3.9 -> Hook up visualization component to sensor data from the mower.
  */
  const {lineSensor} = useStoreState((state) => state.bluetooth);

  return !lineSensor ? (
    <DangerView>{gripLinesIcon}</DangerView>
  ) : (
    <SafeView>{gripLinesIcon}</SafeView>
  );
};

const DangerView = styled.View`
  width: 120px;
  height: 120px;
  background: red;
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

export default LineSensorIndicator;
