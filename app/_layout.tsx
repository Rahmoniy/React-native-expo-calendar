import { Stack } from "expo-router";
import {persistor, store} from '../store';
import {PersistGate} from 'redux-persist/integration/react';
import { Provider } from 'react-redux';

export default function RootLayout() {
  return <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Stack screenOptions={{headerShown: false}} />
    </PersistGate>
  </Provider>;
}
