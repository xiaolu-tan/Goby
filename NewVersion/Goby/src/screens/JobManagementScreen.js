/*
 * @Author: Xiaolu xiaolutan@apexglobe.com
 * @Date: 2023-01-22 23:15:35
 * @LastEditors: Xiaolu xiaolutan@apexglobe.com
 * @LastEditTime: 2023-09-11 12:57:51
 * @FilePath: /Goby/src/screens/JobManagementScreen.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {useContext, useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {Provider} from '@ant-design/react-native';
import Feather from 'react-native-vector-icons/Feather';
import JobListItem from '../components/JobListItem';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../config';
import Icon from 'react-native-vector-icons/Ionicons';
import Swiper from 'react-native-swiper';

const JobManagementScreen = ({navigation}) => {
  const {userInfo, userToken} = useContext(AuthContext);
  const [jobs, setJobs] = useState(null);
  // console.log(userInfo + '123' + test);
  const fetchData = () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      };
      const bodyParameters = {
        // userid: userInfo.user.pk,
      };
      // console.log(bodyParameters);
      // console.log(config);
      axios
        .get(`${BASE_URL}/api/jobs/`, bodyParameters, config)
        .then(res => {
          console.log('result============');
          console.log(res.data);
          setJobs(res.data);
          // profileExperience.map(item => {
          //   console.log(item.title);
          // });
        })
        .catch(function (error) {
          if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log('errors==== ');
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
    console.log(jobs);
  };
  useEffect(() => {
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchData();
    });

    return willFocusSubscription;
  }, []);
  return (
    <View style={{flex: 1, backgroundColor: '#fff', marginTop: 20}}>
      <View
        style={{
          flexDirection: 'row',
          borderColor: '#C6C6C6',
          borderWidth: 1,
          borderRadius: 8,
          paddingHorizontal: 10,
          paddingVertical: 8,
        }}>
        <Feather
          name="search"
          size={20}
          color="#C6C6C6"
          style={{marginRight: 5}}
        />
        <TextInput placeholder="Search" />
      </View>
      <View
        style={{
          marginVertical: 15,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
          My Published Jobs
        </Text>
        <TouchableOpacity onPress={() => {}}>
          {/* <Text style={{color: '#0aada8'}}>See all</Text> */}
          <Icon name="add" size={25} />
        </TouchableOpacity>
      </View>
      {jobs &&
        jobs.map(item => (
          <JobListItem
            key={item.id}
            // photo={item.poster}
            title={item.title}
            description={item.description}
            location={item.location}
            end_date={item.end_date}
            photo={item.images}
            onPress={() =>
              navigation.navigate('JobDetail', {
                title: item.title,
                description: item.description,
                location: item.location,
                end_date: item.end_date,
                photo: item.images,
              })
            }
          />
        ))}
    </View>
  );
};

export default JobManagementScreen;

export const JobDetailScreen = ({navigation, route}) => {
  console.log(route);
  const {title, description, location, end_date, photo} = route.params;
  const fetchData = () => {
    if (route.params && route.params.id) {
      console.log(route.params);
    }
  };
  useEffect(() => {
    // console.log(route.startDate);
    // setStartDate(moment(route.startDate));
    // console.log(moment(startDate).format('yyyy-MMM'));
    fetchData();
    const willFocusSubscription = navigation.addListener('focus', () => {
      fetchData();
    });

    return willFocusSubscription;
  }, []);
  return (
    <Provider>
      <ScrollView style={{flex: 1, backgroundColor: '#fff', padding: 20}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', marginBottom: 10}}>
          {title}
        </Text>
        <Text style={{fontSize: 16, marginBottom: 10}}>{description}</Text>
        <View style={{width: '100%', height: 300}}>
          <Swiper>
            {photo.map((image, index) => (
              <View key={index}>
                <Image
                  source={{uri: image.filePath}}
                  style={{width: '100%', height: 100}}
                  resizeMode="cover"
                />
              </View>
            ))}
          </Swiper>
        </View>
        <Text style={{fontSize: 16, marginBottom: 10}}>
          Location: {location}
        </Text>
        <Text style={{fontSize: 16, marginBottom: 10}}>
          End Date: {end_date}
        </Text>
        {/* <Image
        source={{uri: photo}}
        style={{width: '100%', height: 200, marginBottom: 20}}
        resizeMode="cover"
      /> */}
        {/* 在此处添加其他显示图片的代码，如果需要的话 */}
      </ScrollView>
      <View style={{padding: 20}}>
        <TouchableOpacity
          // onPress={handleApplyJob}
          style={{
            backgroundColor: '#0aada8',
            paddingVertical: 15,
            alignItems: 'center',
            borderRadius: 8,
            marginBottom: 20,
          }}>
          <Text style={{color: 'white', fontSize: 18}}>Apply This Job</Text>
        </TouchableOpacity>
      </View>
    </Provider>
  );
};
