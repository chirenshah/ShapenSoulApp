/**
 * @format
 */

import {name as appName} from './app.json';
import { AppRegistry } from 'react-native';


import AdminHome from './screens/Home.js';
AppRegistry.registerComponent(appName, () => AdminHome);


// import App from './App.js';

// import Appointments from './screens/Appointments'
// AppRegistry.registerComponent(appName, () => Appointments);

// import Test from './screens/Login'
// AppRegistry.registerComponent(appName, () => Test);