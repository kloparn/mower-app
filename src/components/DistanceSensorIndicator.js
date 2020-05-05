import React from 'react';
import styled from 'styled-components';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Button, View, Text} from 'react-native';

const DistanceSensorIndicator = () => {
  const {motionSensor} = useStoreState((state) => state.bluetooth);
  return motionSensor === null ? (
    <TheOtherView>
      <Icon name="eye-slash" size={60} color="#FFFFFF" />
    </TheOtherView>
  ) : motionSensor < 10 ? (
    <TheView>
      <Text>{motionSensor}</Text>
    </TheView>
  ) : (
    <TheOtherView>
      <Text>{motionSensor}</Text>
    </TheOtherView>
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

export default DistanceSensorIndicator;
