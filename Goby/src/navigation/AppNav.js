/*
 * @Author: Xiaolu Tan xiaolutan@apexglobe.com
 * @Date: 2022-10-06 08:23:32
 * @LastEditors: Xiaolu Tan xiaolutan@apexglobe.com
 * @LastEditTime: 2022-10-14 15:37:24
 * @FilePath: /react-navigation-v6-mix-master/src/navigation/AppNav.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {View, ActivityIndicator} from 'react-native';
import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AuthStack from './AuthStack';
import {AuthContext} from '../context/AuthContext';
import AppStack from './AppStack';

const AppNav = () => {
  const {isLoading, userToken} = useContext(AuthContext);
  // console.log(userToken === null ? 'null userinfo' : userToken);

  if (isLoading) {
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={'large'} />
    </View>;
  }
  return (
    <NavigationContainer>
      {userToken !== null ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNav;
