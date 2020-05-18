import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import {StoreProvider, createStore} from 'easy-peasy';
import {ThemeProvider} from 'styled-components';

import model from './store/model';
import {defaultTheme, experimentTheme} from './styles/themes';
import {MainScreen, ControlScreen, VisualizationScreen} from './screens';

const store = createStore(model);

const Tab = createBottomTabNavigator();

/*
  TRACE:: #A1.1.1 -> Scaffold react native application.
  TRACE:: #A1.2.4 -> Screen navigation in application.
*/
const App = () => {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={experimentTheme}>
        <NavigationContainer>
          <Tab.Navigator
            tabBarOptions={{
              activeBackgroundColor: '#212121',
              inactiveBackgroundColor: '#212121',
              activeTintColor: '#8ecccc',
              inactiveTintColor: '#50717b',
            }}
            screenOptions={({route}) => ({
              tabBarIcon: ({focused, color, size}) => {
                switch (route.name) {
                  case 'Home':
                    return <Icon name="home" size={size} color={color} />;
                  case 'Control':
                    return <Icon name="gamepad" size={size} color={color} />;
                  case 'Visualization':
                    return <Icon name="map" size={size} color={color} />;
                  default:
                    return <Icon name="question" size={size} color={color} />;
                }
              },
            })}>
            <Tab.Screen name="Control" component={ControlScreen} />
            {/*<Tab.Screen name="Home" component={MainScreen} />*/}
            <Tab.Screen name="Visualization" component={VisualizationScreen} />
          </Tab.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </StoreProvider>
  );
};

export default App;
