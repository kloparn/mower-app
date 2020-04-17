import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StoreProvider, createStore} from 'easy-peasy';
import {ThemeProvider} from 'styled-components';

import model from './store/model';
import {defaultTheme} from './styles/themes';
import {MainScreen, ControlScreen, VisualizationScreen} from './screens';

const store = createStore(model);

const Tab = createBottomTabNavigator();

/*
  Scaffold react native application
*/
const App = () => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={defaultTheme}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                switch (route.name) {
                  case 'Home':
                    return <Icon name="home" size={size} color={color} />;
                  case 'Control':
                    return <Icon name="bluetooth" size={size} color={color} />;
                  case 'Visualization':
                    return <Icon name="map" size={size} color={color} />;
                  default:
                    return <Icon name="question" size={size} color={color} />;
                }
              },
            })}>
            <Tab.Screen name="Control" component={ControlScreen} />
            <Tab.Screen name="Home" component={MainScreen} />
            <Tab.Screen name="Visualization" component={VisualizationScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
