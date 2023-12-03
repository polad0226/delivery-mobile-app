import { View, Text, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';
import sanityClient from '../sanity';

const FeaturedRow = ({ id, title, description }) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `
     *[_type == 'featured' && _id== $id] {
    ...,  

    restaurants[]-> {
      ...,  
        dishes[]->,
        type=> {
          name
        }
    }
  }[0]

    `,
        { id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      });
  }, []);

  return (
    <View>
      <View className="flex-row justify-between items-center px-4 mt-4">
        <Text className="flex-bold text-lg">FeaturedRow</Text>
        <ArrowRightIcon color={'#00CCBB'} />
      </View>
      <Text className="text-xs text-gray-500 px-4">{description}</Text>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* RestaurantCards */}

        {restaurants.map((restaurant) => (
          <RestaurantCard
            id={restaurant?._id}
            key={restaurant?._id}
            imgUrl={restaurant?.image}
            title={restaurant?.name}
            rating={restaurant?.rating}
            genre={restaurant?.type?.name}
            address={restaurant?.address}
            dishes={restaurant?.dishes}
            short_description={restaurant?.short_description}
            long={restaurant?.long}
            lat={restaurant?.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
