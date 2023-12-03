import { View, Text, SafeAreaView, Image } from 'react-native';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import {
  UserIcon,
  ChevronDownIcon,
  SearchIcon,
  CogIcon,
} from 'react-native-heroicons/outline';
import { TextInput } from 'react-native';
import { ScrollView } from 'react-native';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';

const HomeScreen = () => {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient
      .fetch(
        `
     *[_type == 'featured'] {
    ...,  // Add other fields you need at the top level

    restaurants[]-> {
      ...,  // Add other restaurant fields

        dishes[]->
    }
  }

  `
      )
      .then((data) => {
        setFeaturedCategories(data);
      });
  }, []);

  // console.log(data);
  return (
    <SafeAreaView className="bg-white pt-10">
      {/* <Text className="text-red-400">HomeScreen</Text> */}
      <View className="flex-row  pb-3 items-center mx-4 space-x-4 px-1">
        <Image
          source={{
            uri: 'https://links.papareact.com/wru',
          }}
          className="h-7 w-7 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs">Deliver now</Text>
          <Text className="font-bold text-lg">
            Current Location
            <ChevronDownIcon color="#00CCBB" size={20} />
          </Text>
        </View>
        <UserIcon size={35} color="#00CCBB" />
      </View>

      {/* SearchBox */}
      <View className="flex-row items-center pb-2 mx-4 space-x-2 px-1">
        <View className="flex-row flex-1 p-3 bg-gray-200 space-x-2">
          <CogIcon color={'gray'} size={20} />
          <TextInput
            placeholder="Resturants and cusinies"
            keyboardType="default"
          />
        </View>
        <CogIcon color="#00CCBB" />
      </View>

      {/* Body */}

      <ScrollView className="bg-gray-100">
        {/* Categories */}
        <Categories></Categories>

        {/* FeatureRows */}
        {featuredCategories?.map((category) => {
          return (
            <FeaturedRow
              key={category?._id}
              id={category?._id}
              title={category?.name}
              description={category?.short_description}
            />
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
