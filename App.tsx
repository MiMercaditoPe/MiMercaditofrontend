import React from "react";
import {View, Text, Image} from 'react-native';

export default function App(){
return ( <View> 
  <Text> Mi Mercadito 🛒</Text>
   <Image
        source={require('./assets/MMP.png')}
      />
</View>);
}
