import React from 'react';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { Provider } from 'react-redux';
import { Notifications } from 'expo';
import { Alert } from 'react-native';

import registerForNotifications from './services/push_notifications';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import SettingsScreen from './screens/SettingsScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener(notification => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text) {
        Alert.alert('New Push Notification', text, [{ text: 'Ok.' }]);
      }
    });
  }

  render() {
    const MainNavigator = TabNavigator(
      {
        welcome: { screen: WelcomeScreen },
        auth: { screen: AuthScreen },
        main: {
          screen: TabNavigator(
            {
              map: { screen: MapScreen },
              deck: { screen: DeckScreen },
              review: {
                screen: StackNavigator({
                  review: { screen: ReviewScreen },
                  settings: { screen: SettingsScreen },
                }),
              },
            },
            {
              tabBarPosition: 'bottom',
              swipeEnabled: false,
              tabBarOptions: {
                labelStyle: { fontSize: 10 },
              },
            }
          ),
        },
      },
      {
        navigationOptions: {
          tabBarVisible: false,
        },
        lazy: true,
      }
    );

    return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    );
  }
}
