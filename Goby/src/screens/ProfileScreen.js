import React from 'react';
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

const ProfileScreen = ({navigation}) => {
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
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Experience</Text>
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
