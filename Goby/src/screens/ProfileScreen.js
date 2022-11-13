import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomPanel from '../components/CustomPanel';
import UserAvatar from 'react-native-user-avatar';
import CustomTag from '../components/CustomTag';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../config';
import ExperienceListItem from '../components/ExperienceListItem';

const ProfileScreen = ({navigation}) => {
  const {experienceList, userInfo, userToken} = useContext(AuthContext);
  const [profileExperience, setProfileExperience] = useState(null);
  // console.log(profileExperience);
  const fetchData = () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${userToken}`,
          'Content-Type': 'application/json',
        },
      };
      const bodyParameters = {
        userid: userInfo.user.pk,
      };
      // console.log(bodyParameters);
      // console.log(config);
      axios
        .get(
          `${BASE_URL}/users/profile/experience?userid=${userInfo.user.pk}`,
          bodyParameters,
          config,
        )
        .then(res => {
          console.log('result============');
          console.log(res.data);
          setProfileExperience(res.data);
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
    console.log(profileExperience);
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
            flex: 1,
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <ImageBackground
            source={require('../assets/images/user-profile.jpg')}
            style={{width: 50, height: 50}}
            imageStyle={{borderRadius: 25}}
          />
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'center',
              marginLeft: 5,
            }}>
            <Text>Name 1</Text>
            <Text>Name 2</Text>
          </View>
        </View>
        <View>
          {/* <CustomPanel title="abc123123213">
            <Text>safdsfasdfdsafdsafdsa</Text>
          </CustomPanel> */}
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <Text
              style={{fontSize: 18, fontWeight: 'bold'}}
              onPress={() => experienceList()}>
              Experience
            </Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 60,
              }}>
              <TouchableOpacity
                onPress={() => navigation.navigate('ExperienceDetail')}>
                <Icon name="add-sharp" size={30} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('ExperienceList')}>
                <Icon name="pencil-outline" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          {profileExperience &&
            profileExperience.map(item => (
              <ExperienceListItem
                key={item.id}
                company={item.company}
                title={item.title}
                startdate={item.startdate}
                enddate={item.enddate}
                description={item.description}
                onPress={() =>
                  navigation.navigate('ExperienceDetail', {
                    title: item.title,
                    id: item.id,
                    company: item.company,
                    startdate: item.startdate,
                    enddate: item.enddate,
                    description: item.description,
                  })
                }
              />
            ))}
          {/* <TouchableOpacity style={{marginTop: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <UserAvatar size={50} name="APEX" />
              <View style={{flexDirection: 'column', marginLeft: 15}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  Developer Director
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                  Apex Globe Logistics LTD.
                </Text>
                <Text style={{color: 'gray'}}>
                  Oct 2013 - Present · 9 yrs 2 mos
                </Text>
                <Text style={{color: 'gray'}}>Team management ...</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <UserAvatar size={50} name="APEX" />
              <View style={{flexDirection: 'column', marginLeft: 15}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  Developer Director
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                  Apex Globe Logistics LTD.
                </Text>
                <Text style={{color: 'gray'}}>
                  Oct 2013 - Present · 9 yrs 2 mos
                </Text>
                <Text style={{color: 'gray'}}>Team management ...</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <UserAvatar size={50} name="APEX" />
              <View style={{flexDirection: 'column', marginLeft: 15}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  Developer Director
                </Text>
                <Text style={{fontWeight: 'bold'}}>
                  Apex Globe Logistics LTD.
                </Text>
                <Text style={{color: 'gray'}}>
                  Oct 2013 - Present · 9 yrs 2 mos
                </Text>
                <Text style={{color: 'gray'}}>Team management ...</Text>
              </View>
            </View>
          </TouchableOpacity> */}
        </View>
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Projects</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 60,
              }}>
              <TouchableOpacity>
                <Icon name="add-sharp" size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="pencil-outline" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={{marginTop: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <UserAvatar size={50} name="East China Normal University" />
              <View style={{flexDirection: 'column', marginLeft: 15}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  East China Normal University
                </Text>
                <Text style={{color: 'gray'}}>2005 - 2008 · 3 yrs</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Education</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 60,
              }}>
              <TouchableOpacity>
                <Icon name="add-sharp" size={30} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon name="pencil-outline" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity style={{marginTop: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <UserAvatar size={50} name="East China Normal University" />
              <View style={{flexDirection: 'column', marginLeft: 15}}>
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  East China Normal University
                </Text>
                <Text style={{color: 'gray'}}>2005 - 2008 · 3 yrs</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        <View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 30,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Skills</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 60,
              }}></View>
          </View>
          <CustomTag />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileScreen;
