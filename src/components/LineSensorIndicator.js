import React from 'react';
import styled from 'styled-components';
import {useStoreState, useStoreActions} from 'easy-peasy';
import {dangerGripLinesIcon, safeGripLinesIcon} from '../helpers/icons';

import {Button, View, Text, addons} from 'react-native';

/*
  TRACE:: #A1.3.7 -> Create visualization component for the collision avoidance.
*/

const LineSensorIndicator = () => {
  /*
    TRACE:: #A1.3.9 -> Hook up visualization component to sensor data from the mower.
  */
  const {lineSensor} = useStoreState((state) => state.bluetooth);

  console.log('CURRENT LINE SENSOR VALUE FROM COMPONENT: ', lineSensor);

  return lineSensor ? (
    <CustomView>{dangerGripLinesIcon}</CustomView>
  ) : (
    <CustomView>{safeGripLinesIcon}</CustomView>
  );
};

const CustomView = styled.View`
  width: 120px;
  height: 120px;
  background-color: ${(props) => props.theme.colors.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default LineSensorIndicator;
