import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';

import Onboarding from 'react-native-onboarding-swiper';

const Skip = ({...props}) => <TouchableOpacity title="Skip" color="#fff" {...props} />;
const Next = ({...props}) => <TouchableOpacity title="Next" color="#fff" {...props} />;
const Done = ({...props}) => <TouchableOpacity title="Done" color="#fff" {...props} />;

export default function OnboardingScreen ({navigation}){
    return(
      
    <Onboarding
      onSkip={() => navigation.navigate('Login')}
      onDone={() => navigation.navigate('Login')}
      pages={[
        {
          backgroundColor: '#ECECEC',
          image: <Image source={require('../assets/OnboardingImages/cover_1.png')} />,
          title: 'Welcome!',
          subtitle: 'The Book Exchange App',
        },
        {
          backgroundColor: '#E7DED3',
          image: <Image source={require('../assets/OnboardingImages/cover_2.png')} />,
          title: 'Book X',
          subtitle: 'Exchange books with your local book lovers',
        },
        {
          backgroundColor: '#F2EFE9',
          image: <Image source={require('../assets/OnboardingImages/cover_3.png')} />,
          title: 'Book X',
          subtitle: 'Get Started',
        },
      ]}
    />
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
