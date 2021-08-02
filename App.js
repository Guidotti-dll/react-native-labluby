import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Search from './screens/Search';
import Details from './screens/Details';
import { Provider } from 'react-redux';
import store from './store';


const Stack = createNativeStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator >
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Search" component={Search} />
          <Stack.Screen 
            name="Details"
            component={Details}
            options={({ route }) => ({
              title: route.params.name
            })}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;