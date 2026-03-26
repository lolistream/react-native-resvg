import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { uniffiInitAsync } from '@lolistream/react-native-resvg';

uniffiInitAsync().then(() => {
  AppRegistry.registerComponent(appName, () => App);
});
