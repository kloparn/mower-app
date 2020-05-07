import React from 'react';
import styled from 'styled-components';
import {useStoreState, useStoreActions} from 'easy-peasy';
import Icon from 'react-native-vector-icons/FontAwesome';

import {Button, View, Text} from 'react-native';

const DistanceSensorIndicator = () => {
  const {motionSensor} = useStoreState((state) => state.bluetooth);
  return motionSensor === null ? (
    <SafeView>
      <Icon name="eye-slash" size={60} color="#FFFFFF" />
    </SafeView>
  ) : motionSensor < 10 ? (
    <DangerView>
      <Text>{motionSensor}</Text>
    </DangerView>
  ) : (
    <SafeView>
      <Text>{motionSensor}</Text>
    </SafeView>
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

export default DistanceSensorIndicator;
