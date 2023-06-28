/*
 * @Author: Xiaolu Tan xiaolutan@apexglobe.com
 * @Date: 2022-10-06 08:08:10
 * @LastEditors: Xiaolu xiaolutan@apexglobe.com
 * @LastEditTime: 2022-10-31 08:56:22
 * @FilePath: /react-navigation-v6-mix-master/src/context/AuthContext.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../config';

export const ProfileContext = createContext();

export const ProfileProvider = ({children}) => {
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [profileExperience, setProfileExperience] = useState(null);

  const experienceList = async () => {
    try {
      const config = {
        headers: {Authorization: `Bearer ${userToken}`},
      };
      const bodyParameters = {
        userid: userInfo.user.pk,
      };
      axios
        .post(`${BASE_URL}/users/profile/experience`, bodyParameters, config)
        .then(res => {
          console.log(res.data);
          setProfileExperience(res.data);
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    } catch (e) {
      console.log(`experienceList is error ` + e);
    }
  };

  const isLoggedIn = async () => {
    try {
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');

      userInfo = JSON.parse(userInfo);
      // console.log(userInfo);
      // console.log(userToken);
      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
    } catch (e) {
      console.log(`isLogged is error ` + e);
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, []);
  useEffect(() => {
    experienceList();
  });
  // console.log(someState);
  return (
    <ProfileContext.Provider
      value={{
        userToken,
        userInfo,
        experienceList,
        profileExperience,
      }}>
      {children}
    </ProfileContext.Provider>
  );
};
