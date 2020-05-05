import React from 'react';
import styled from 'styled-components';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Icon from 'react-native-vector-icons/FontAwesome5';

import {Button, View, Text, addons} from 'react-native';

const LineSensorIndicator = () => {
  const {lineSensor} = useStoreState((state) => state.bluetooth);
  const picture = <Icon name="grip-lines" size={60} color="#FFFFFF" />;

  return lineSensor ? (
    <TheView>{picture}</TheView>
  ) : (
    <TheOtherView>{picture}</TheOtherView>
  );
};

const TheView = styled.View`
  padding: 30px;
  background: red;
`;

const TheOtherView = styled.View`
  padding: 30px;
  background: green;
`;

export default LineSensorIndicator;
