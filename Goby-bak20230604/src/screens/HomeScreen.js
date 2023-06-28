import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import {BASE_URL} from '../config';
import BannerSlider from '../components/BannerSlider';
import {windowWidth} from '../utils/Dimensions';

import {freeGames, paidGames, sliderData} from '../model/data';
import CustomSwitch from '../components/CustomSwitch';
import JobListItem from '../components/JobListItem';
import {AuthContext} from '../context/AuthContext';
import Icon from 'react-native-vector-icons/Ionicons';

export default function HomeScreen({navigation}) {
  const [gamesTab, setGamesTab] = useState(1);

  const renderBanner = ({item, index}) => {
    return <BannerSlider data={item} />;
  };

  const onSelectSwitch = value => {
    setGamesTab(value);
  };

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
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{padding: 20}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 20,
          }}>
          <Text style={{fontSize: 18, fontFamily: 'Roboto-Medium'}}>
            Hello {userInfo === null ? '' : userInfo.user.username}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Root', {screen: 'Profile'})}>
            <ImageBackground
              source={require('../assets/images/user-profile.jpg')}
              style={{width: 35, height: 35}}
              imageStyle={{borderRadius: 25}}
            />
          </TouchableOpacity>
        </View>

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
            Discover jobs
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('NewJob')}>
            {/* <Text style={{color: '#0aada8'}}>See all</Text> */}
            <Icon name="add" size={25} />
          </TouchableOpacity>
        </View>

        {/* <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={sliderData}
          renderItem={renderBanner}
          sliderWidth={windowWidth - 40}
          itemWidth={300}
          loop={true}
        />

        <View style={{marginVertical: 20}}>
          <CustomSwitch
            selectionMode={1}
            option1="Free to play"
            option2="Paid games"
            onSelectSwitch={onSelectSwitch}
          />
        </View> */}

        {jobs &&
          jobs.map(item => (
            <JobListItem
              key={item.pk}
              // photo={item.poster}
              title={item.title}
              description={item.description}
              location={item.location}
              end_date={item.end_date}
              // onPress={() =>
              //   navigation.navigate('GameDetails', {
              //     title: item.title,
              //     id: item.id,
              //   })
              // }
            />
          ))}
        {/* {gamesTab == 1 &&
          freeGames.map(item => (
            <ListItem
              key={item.id}
              photo={item.poster}
              title={item.title}
              subTitle={item.subtitle}
              isFree={item.isFree}
              onPress={() =>
                navigation.navigate('GameDetails', {
                  title: item.title,
                  id: item.id,
                })
              }
            />
          ))}
        {gamesTab == 2 &&
          paidGames.map(item => (
            <ListItem
              key={item.id}
              photo={item.poster}
              title={item.title}
              subTitle={item.subtitle}
              isFree={item.isFree}
              price={item.price}
              onPress={() =>
                navigation.navigate('GameDetails', {
                  title: item.title,
                  id: item.id,
                })
              }
            />
          ))} */}
      </ScrollView>
    </SafeAreaView>
  );
}
