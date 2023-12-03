import { View, Text, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useRoute, useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Delivery');
    }, 4000);
  });
  return (
    <SafeAreaView className="bg-[#00CCBB] justify-center items-center flex-1">
      <Animatable.Image
        source={require('../assets/orderFood.gif')}
        animation={'slideInUp'}
        iterationCount={1}
        className="h-70 w-70"
      />

      <Animatable.Text
        source={require('../assets/orderFood.gif')}
        animation={'slideInUp'}
        iterationCount={2}
        className="text-lg my-10 text-white font-bold text-center mx-3"
      >
        Waiting for Restaurant to accept your order
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color="white" />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
