/*
 * @Author: Xiaolu Tan xiaolutan@apexglobe.com
 * @Date: 2022-10-06 08:08:10
 * @LastEditors: Xiaolu xiaolutan@apexglobe.com
 * @LastEditTime: 2022-11-09 18:38:55
 * @FilePath: /react-navigation-v6-mix-master/src/context/AuthContext.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {BASE_URL} from '../config';
import {CommonActions} from '@react-navigation/native';
import {InteractionManager} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [test, setTest] = useState('it is a test');
  const [profileExperience, setProfileExperience] = useState(null);

  const login = (email, password) => {
    setIsLoading(true);
    axios
      .post(`${BASE_URL}/users/login/`, {
        email: email,
        password: password,
      })
      .then(res => {
        // console.log(res.data);
        let userInfo = res.data;
        setUserInfo(userInfo);
        setUserToken(userInfo.access_token);
        // console.log(res.data);
        // experienceList();
        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        AsyncStorage.setItem('userToken', userInfo.access_token);
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
    // setUserToken('2wefsfawerwer');
    // AsyncStorage.setItem('userToken', '2wefsfawerwer');
    setIsLoading(false);
  };

  const register = (username, email, password1, password2) => {
    console.log(username + email + password1 + password2);
    axios
      .post(`${BASE_URL}/users/register/`, {
        username: username,
        email: email,
        password1: password1,
        password2: password2,
      })
      .then(res => {
        console.log(res.data);
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
  };

  const logout = () => {
    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {
    try {
      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');

      userInfo = JSON.parse(userInfo);
      console.log(userInfo);
      // console.log(userToken);
      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);

        // try {
        //   const config = {
        //     headers: {
        //       Authorization: `Bearer ${userToken}`,
        //       'Content-Type': 'application/json',
        //     },
        //   };
        //   const bodyParameters = {
        //     userid: userInfo.user.pk,
        //   };
        //   console.log(bodyParameters);
        //   console.log(config);
        //   await axios
        //     .get(
        //       `${BASE_URL}/users/profile/experience?userid=${userInfo.user.pk}`,
        //       bodyParameters,
        //       config,
        //     )
        //     .then(res => {
        //       console.log('result============');
        //       console.log(res.data);
        //       setProfileExperience(res.data);
        //     })
        //     .catch(function (error) {
        //       if (error.response) {
        //         // The request was made and the server responded with a status code
        //         // that falls out of the range of 2xx
        //         console.log('errors==== ');
        //         console.log(error.response.data);
        //         console.log(error.response.status);
        //         console.log(error.response.headers);
        //       } else if (error.request) {
        //         // The request was made but no response was received
        //         // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        //         // http.ClientRequest in node.js
        //         console.log(error.request);
        //       } else {
        //         // Something happened in setting up the request that triggered an Error
        //         console.log('Error', error.message);
        //       }
        //       console.log(error.config);
        //     });
        // } catch (e) {
        //   console.log(`experienceList is error ` + e);
        // }
      }
      setIsLoading(false);
    } catch (e) {
      console.log(`isLogged is error ` + e);
    }
  };

  // const experienceList = async () => {
  //   try {
  //     const config = {
  //       headers: {
  //         Authorization: `Bearer ${userToken}`,
  //         'Content-Type': 'application/json',
  //       },
  //     };
  //     const bodyParameters = {
  //       userid: userInfo.user.pk,
  //     };
  //     console.log(bodyParameters);
  //     console.log(config);
  //     await axios
  //       .get(
  //         `${BASE_URL}/users/profile/experience?userid=${userInfo.user.pk}`,
  //         bodyParameters,
  //         config,
  //       )
  //       .then(res => {
  //         console.log('result============');
  //         console.log(res.data);
  //         setProfileExperience(res.data);
  //       })
  //       .catch(function (error) {
  //         if (error.response) {
  //           // The request was made and the server responded with a status code
  //           // that falls out of the range of 2xx
  //           console.log('errors==== ');
  //           console.log(error.response.data);
  //           console.log(error.response.status);
  //           console.log(error.response.headers);
  //         } else if (error.request) {
  //           // The request was made but no response was received
  //           // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //           // http.ClientRequest in node.js
  //           console.log(error.request);
  //         } else {
  //           // Something happened in setting up the request that triggered an Error
  //           console.log('Error', error.message);
  //         }
  //         console.log(error.config);
  //       });
  //   } catch (e) {
  //     console.log(`experienceList is error ` + e);
  //   }
  // };

  useEffect(() => {
    isLoggedIn();
    // experienceList();
  }, []);
  // useEffect(() => {
  //   experienceList();
  // });
  // console.log(someState);
  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        isLoading,
        userToken,
        userInfo,
        test,
        profileExperience,
        // experienceList,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
