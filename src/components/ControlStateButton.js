import React from 'react';
import styled from 'styled-components';

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

const ControlStateButton = ({text}) => {
  return (
    <ControlButton>
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

const ControlText = styled.Text`
  color: ${(props) => props.theme.colors.text};
`;

export default ControlStateButton;