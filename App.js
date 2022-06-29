import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screen/Login/LoginScreen";
import HomeScreen from "./Screen/Main/HomeScreen";
import SignUpScreen from "./Screen/Login/SignUpScreen";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './db/DatabaseConfig/firebase';
import { useState } from 'react';

const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  onAuthStateChanged(auth, (user) => {
    if (user != null) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false);
    }
  });

  return (
    <NavigationContainer>
      {isLoggedIn ? <Stack.Navigator screenOptions={{headerShown: false, animationEnabled:false}}>
        <Stack.Screen  name="HomeScreen" component={HomeScreen}/>
      </Stack.Navigator> :
      <Stack.Navigator
        screenOptions={{ headerShown: false, animationEnabled:false}}
      >
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      </Stack.Navigator>}
    </NavigationContainer>
  );
}