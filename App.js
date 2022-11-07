import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./Screen/Login/LoginScreen";
import HomeScreen from "./Screen/Main/HomeScreen";
import SignUpScreen from "./Screen/Login/SignUpScreen";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './db/DatabaseConfig/firebase';
import { useState } from 'react';
import WriteReview from "./Screen/Review/WriteReview";
import Title from "./Component/Title/Title";
import LectureReview from "./Screen/Review/LectureReview";
import ProfileScreen from "./Screen/Profile/ProfileScreen";
import ReviewInfo from "./Screen/Review/ReviewInfo";
import UpdateReview from "./Screen/Review/UpdateReview";

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
    {isLoggedIn ? (
    <Stack.Navigator screenOptions={{headerShown: false, animationEnabled:false}}>
      <Stack.Screen name="HomeScreen" component={HomeScreen}/>
      <Stack.Screen name="Title" component={Title} />
      <Stack.Screen name="WriteReview" component={WriteReview} />
      <Stack.Screen name="LectureReview" component={LectureReview} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="ReviewInfo" component={ReviewInfo} />
      <Stack.Screen name="UpdateReview" component={UpdateReview} />
    </Stack.Navigator> 
    ) : (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animationEnabled:false}}
    >
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
      <Stack.Screen name="WriteReview" component={WriteReview} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  )}
  </NavigationContainer>
  );
}