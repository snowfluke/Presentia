/**
 * @format
 */
import * as dotenv from 'dotenv';
dotenv.config();

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import messaging from '@react-native-firebase/messaging';

messaging().setBackgroundMessageHandler(async remoteMessage => {
  return;
});

AppRegistry.registerComponent(appName, () => App);
