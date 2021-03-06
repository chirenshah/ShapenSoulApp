/**
 * @format
 */

import {name as appName} from './app.json';
import { AppRegistry } from 'react-native';
import BackgroundJob from 'react-native-background-job'
import AdminHome from './screens/AdminHome.js';
import App from './App.js'

AppRegistry.registerComponent(appName, () => App);

const backgroundJob = {
    jobKey: "myJob",
    job: () => console.log("Running in background")
   };
   
   BackgroundJob.register(backgroundJob);
   
   var backgroundSchedule = {
    jobKey: "myJob",
   }
   
BackgroundJob.schedule(backgroundSchedule)
    .then(() => console.log("Success"))
    .catch(err => console.err(err));
