/*
 * @Author: Xiaolu xiaolutan@apexglobe.com
 * @Date: 2022-10-15 01:51:34
 * @LastEditors: Xiaolu xiaolutan@apexglobe.com
 * @LastEditTime: 2023-01-29 14:26:33
 * @FilePath: /Goby/src/screens/ExperienceScreen.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {useState, useCallback, useEffect, useContext} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import UserAvatar from 'react-native-user-avatar';
import {
  DatePicker,
  List,
  Provider,
  Flex,
  Button,
  Result,
} from '@ant-design/react-native';
import moment from 'moment';
// import enUS from '@ant-design/react-native/lib/locale-provider/en_US';
import {AuthContext} from '../context/AuthContext';
import axios from 'axios';
import {BASE_URL} from '../config';
import Textarea from 'react-native-textarea';
import ExperienceListItem from '../components/ExperienceListItem';

const ExperienceList = ({navigation, route}) => {
  const {experienceList, userInfo, userToken} = useContext(AuthContext);
  const [profileExperience, setProfileExperience] = useState(null);
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
    <View>
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
    </View>
  );
};

export default ExperienceList;

export const ExperienceDetail = ({navigation, route}) => {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const [startDate, setStartDate] = useState();
  const [startVisible, setStartVisible] = useState(false);
  const [endDate, setEndDate] = useState();
  const [endVisible, setEndVisible] = useState(false);
  const [title, setTitle] = useState();
  const [company, setCompany] = useState();
  const [description, setDescription] = useState();
  const onStartDateChange = (value: any) => {
    setStartDate(value);
    setStartVisible(false);
  };
  const onEndDateChange = (value: any) => {
    // console.log(value);
    setEndDate(value);
    setEndVisible(false);
  };
  const onTitleChange = (value: any) => {
    setTitle(value);
  };
  const onDescriptionChange = (value: any) => {
    setDescription(value);
  };
  const onCompanyChange = (value: any) => {
    console.log(value);
    setCompany(value);
  };
  const [time, setTime] = useState(null);
  const [visible, setVisible] = useState(false);
  const onCancel = useCallback(() => {
    setVisible(false);
    setEndVisible(false);
    setStartVisible(false);
  }, []);

  const onChange = useCallback(time => {
    setTime(time);
    setVisible(false);
  }, []);

  const {userInfo, userToken} = useContext(AuthContext);
  const [profileExperience, setProfileExperience] = useState(null);
  // console.log(profileExperience);

  const save = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken}`,
        'Content-Type': 'application/json',
      },
    };
    const bodyParameters = {
      user: userInfo.user.pk,
      title: title,
      startdate: startDate,
      enddate: endDate,
      company: company,
      description: description,
    };
    console.log('Save==========');
    // console.log('body data is' + JSON.stringify(bodyParameters));
    // console.log(route);
    if (route.params && route.params.id) {
      axios
        .put(
          `${BASE_URL}/users/profile/experience/${route.params.id}`,
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
          let a = res.data;
          console.log(a.startdate);
          if (a.startdate) {
            setStartDate(moment(a.startdate));
          }
          a.title ? setTitle(a.title) : setTitle('');
          a.company ? setCompany(a.company) : setCompany('');
          a.description ? setDescription(a.description) : setDescription('');
          a.enddate ? setEndDate(moment(a.enddate)) : setEndDate(null);
          console.log(moment(startDate).format('yyyy-MMM'));
          // <Result
          //   title="Success"
          //   message="The experience had been updated"
          //   buttonText="Complete"
          //   onButtonClick={() => navigation.navigate('Profile')}
          // />;
          navigation.navigate('Profile');
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
            console.log('error request' + error.request);
          } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
          }
          console.log(error.config);
        });
    } else {
      console.log('Save 111==========');
      console.log(title.Text);
      axios
        .post(`${BASE_URL}/users/profile/experience/`, bodyParameters, config)
        .then(res => {
          console.log('result============');
          console.log(res.data);
          setProfileExperience(res.data);
          // profileExperience.map(item => {
          //   console.log(item.title);
          // });
          let a = res.data;
          console.log(a.startdate);
          if (a.startdate) {
            setStartDate(moment(a.startdate));
          }
          a.title ? setTitle(a.title) : setTitle('');
          a.company ? setCompany(a.company) : setCompany('');
          a.description ? setDescription(a.description) : setDescription('');
          a.enddate ? setEndDate(moment(a.enddate)) : setEndDate(null);
          console.log(moment(startDate).format('yyyy-MMM'));
          // <Result
          //   title="Success"
          //   message="The experience had been updated"
          //   buttonText="Complete"
          //   onButtonClick={() => navigation.navigate('Profile')}
          // />;
          navigation.navigate('Profile');
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
    }
  };
  const fetchData = () => {
    if (route.params && route.params.id) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${userToken}`,
            'Content-Type': 'application/json',
          },
        };
        // const bodyParameters = {
        //   userid: userInfo.user.pk,
        // };
        // console.log(bodyParameters);
        // console.log(config);
        console.log(route.params);
        axios
          .get(
            `${BASE_URL}/users/profile/experience/${route.params?.id}`,
            // bodyParameters,
            config,
          )
          .then(res => {
            console.log('result============');
            console.log(res.data);
            setProfileExperience(res.data);
            // profileExperience.map(item => {
            //   console.log(item.title);
            // });
            let a = res.data;
            console.log(a.startdate);
            if (a.startdate) {
              setStartDate(moment(a.startdate));
            }
            a.title ? setTitle(a.title) : setTitle('');
            a.company ? setCompany(a.company) : setCompany('');
            a.description ? setDescription(a.description) : setDescription('');
            a.enddate ? setEndDate(moment(a.enddate)) : setEndDate(null);
            console.log(moment(startDate).format('yyyy-MMM'));
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
      <View
        style={{
          flex: 1,
          backgroundColor: '#fff',
        }}>
        <View>
          <Text style={{height: 20, marginTop: 20, marginLeft: 5}}>Title</Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              margin: 5,
            }}
            onChange={onTitleChange}
            defaultValue={title}></TextInput>
          <Text style={{height: 20, marginTop: 20, marginLeft: 5}}>
            Company
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderWidth: 1,
              margin: 5,
            }}
            onChange={() => onCompanyChange}
            defaultValue={company}></TextInput>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <View>
            <Flex
              justify="start"
              direction="column"
              // onPress={() => setStartVisible(true)}
              style={{paddingRight: 10}}>
              <Text style={{height: 20, marginTop: 20, marginLeft: 5}}>
                Start Date
              </Text>
              <TextInput
                style={{
                  height: 40,
                  borderColor: 'gray',
                  borderWidth: 1,
                  margin: 5,
                }}
                onFocus={() => setStartVisible(true)}
                onPressIn={() => setStartVisible(true)}>
                {startDate ? moment(startDate).format('YYYY-MMM') : 'Present'}
              </TextInput>
            </Flex>
            {/* <Text>Start Date</Text>
            <Text>{moment(startDate).format('MM-yyyy')}</Text> */}
            <DatePicker
              visible={startVisible}
              value={startDate}
              mode="month"
              defaultDate={new Date()}
              minDate={new Date(2015, 1, 1)}
              maxDate={new Date(2026, 11, 3)}
              onChange={onStartDateChange}
              onDismiss={onCancel}
              format="YYYY-MM"
            />
            {/* <List.Item arrow="horizontal">Select Date</List.Item> */}
            {/* </DatePicker> */}
          </View>
          <View>
            <Flex
              justify="start"
              direction="column"
              // onPress={() => setStartVisible(true)}
              style={{paddingRight: 10}}>
              <Text style={{height: 20, marginTop: 20, marginLeft: 5}}>
                End Date
              </Text>
              <TextInput
                style={{
                  height: 40,
                  borderColor: 'gray',
                  borderWidth: 1,
                  margin: 5,
                }}
                onFocus={() => setEndVisible(true)}
                onPressIn={() => setEndVisible(true)}>
                {endDate ? moment(endDate).format('YYYY-MMM') : 'Present'}
              </TextInput>
            </Flex>
            <DatePicker
              visible={endVisible}
              value={endDate}
              mode="month"
              defaultDate={new Date()}
              minDate={new Date(2015, 1, 1)}
              maxDate={new Date(2026, 11, 3)}
              onChange={onEndDateChange}
              onDismiss={onCancel}
              format="YYYY-MM"
            />
          </View>
        </View>
        <Text style={{height: 20, marginTop: 20, marginLeft: 5}}>
          Responsibility
        </Text>
        <Textarea
          style={{
            height: 120,
            borderColor: 'gray',
            borderWidth: 1,
            margin: 5,
            textAlignVertical: 'top',
          }}
          onChangeText={onDescriptionChange}
          defaultValue={description}
        />
        <Button style={{margin: 5}} type="primary" onPress={save}>
          Save
        </Button>
      </View>
    </Provider>
  );
};
