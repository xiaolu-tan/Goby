/*
 * @Author: Xiaolu Tan xiaolutan@apexglobe.com
 * @Date: 2022-05-02 21:57:26
 * @LastEditors: Xiaolu xiaolutan@apexglobe.com
 * @LastEditTime: 2023-06-29 17:06:43
 * @FilePath: /react-navigation-v6-mix-master/App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {useEffect, useState} from 'react';
import {AuthProvider} from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';
import localStorage from '@react-native-async-storage/async-storage';
import {
  getFcmToken,
  getFcmTokenFromLocalStorage,
  requestUserPermission,
  notificationListener,
} from './src/notifications';

function App() {
  const fcmToken = localStorage.getItem('fcmtoken');
  const [generatedToken, setGeneratedToken] = useState();
  useEffect(() => {
    console.log('storage', fcmToken, 'newly generated', generatedToken);
  }, [fcmToken, generatedToken]);
  useEffect(() => {
    const fetchToken = async () => {
      const token = await getFcmToken();
      if (token) {
        setGeneratedToken(token);
      }
    };
    const fetchTokenByLocal = async () => {
      await getFcmTokenFromLocalStorage();
    };
    void fetchToken();
    void fetchTokenByLocal();
    void requestUserPermission();
    void notificationListener();
  }, []);
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

export default App;
