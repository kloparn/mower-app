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
} from 'react-native';

const Layout = ({children}) => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <StyledSafeAreaView>{children}</StyledSafeAreaView>
    </>
  );
};

const StyledSafeAreaView = styled.SafeAreaView`
  background: ${(props) => props.theme.colors.primary};
  height: 100%;
`;

export default Layout;
