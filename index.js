/**
 * @format
 */

import { AppRegistry } from 'react-native';
// import App from './App.js';
//import App from './screens/Login.js';
import {name as appName} from './app.json';
import Appointments from './screens/Appointments'
//AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerComponent(appName, () => Appointments);
