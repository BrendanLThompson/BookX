import React,{useEffect} from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import OnboardingScreen from '../screens/OnboardingScreen';



const Stack = createStackNavigator();

export default function AuthStack() {
  
  const [isFirstLanch, setFirstLaunch] = React.useState(null);
  
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setFirstLaunch(true);
      } else {
        setFirstLaunch(false);
      }
    });
  }, []);

  if(isFirstLanch == null){
    return null;
  } else if ( isFirstLanch == true){
    return(
     <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name="Onboarding" options={{headerStyle: {color: '#fff'}}} component={OnboardingScreen}/>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Signup' component={SignupScreen} />
     </Stack.Navigator>
    );
  } else{
    return (
      <Stack.Navigator screenOptions={{headerShown : false}}>
        <Stack.Screen name='Login' component={LoginScreen} />
        <Stack.Screen name='Signup' component={SignupScreen} />
      </Stack.Navigator>
    );
  }
}