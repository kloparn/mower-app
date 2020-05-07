import React from 'react';
import styled from 'styled-components';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Button, View, Text, addons} from 'react-native';

const LineSensorIndicator = () => {
  const {lineSensor} = useStoreState((state) => state.bluetooth);

  // Made the picture a const to be used in both statements, so it does not need to be init in both statements
  const picture = <Icon name="grip-lines" size={60} color="#FFFFFF" />;

  return lineSensor ? (
    <DangerView>{picture}</DangerView>
  ) : (
    <SafeView>{picture}</SafeView>
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
