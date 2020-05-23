/**
 * @format
 */

import { AppRegistry } from 'react-native';
//import UserProfile from './screens/Profile.js';
import App from './screens/Login.js';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
//AppRegistry.registerComponent(appName, () => UserProfile);
