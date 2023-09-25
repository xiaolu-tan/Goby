import React, {useState, useContext} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

// import DatePicker from 'react-native-date-picker';

import InputField from '../components/InputField';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RegistrationSVG from '../assets/images/misc/registration.svg';
import GoogleSVG from '../assets/images/misc/google.svg';
import FacebookSVG from '../assets/images/misc/facebook.svg';
import TwitterSVG from '../assets/images/misc/twitter.svg';
import CustomButton from '../components/CustomButton';
import {AuthContext} from '../context/AuthContext';

const ForgetPasswordScreen = ({navigation}) => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleStep1 = () => {
    // 后台验证邮箱是否准确的逻辑
    // 例如调用API来验证邮箱是否存在

    // 验证通过后，进入下一步
    setStep(2);
  };

  const handleStep2 = () => {
    // 后台发送验证码到用户邮箱的逻辑
    // 例如调用API来发送验证码到用户邮箱

    // 发送成功后，进入下一步
    setStep(3);
  };

  const handleStep3 = () => {
    // 后台验证验证码是否正确的逻辑
    // 例如调用API来验证用户输入的验证码是否匹配

    // 验证通过后，进入下一步
    setStep(4);
  };

  const handleResetPassword = () => {
    // 后台更新密码的逻辑
    // 例如调用API来更新用户的密码

    // 更新成功后，显示成功消息
    setMessage('密码重置成功');
  };

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
          <RegistrationSVG
            height={300}
            width={300}
            style={{transform: [{rotate: '-5deg'}]}}
          />
        </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Forget Password
        </Text>
        <View style={styles.stepIndicator}>
          <View
            style={[styles.stepCircle, step >= 1 && styles.stepCircleActive]}>
            <Text style={[styles.stepText, step >= 1 && styles.stepTextActive]}>
              1
            </Text>
          </View>
          <View style={[styles.stepBar, step >= 2 && styles.stepBarActive]} />
          <View
            style={[styles.stepCircle, step >= 2 && styles.stepCircleActive]}>
            <Text style={[styles.stepText, step >= 2 && styles.stepTextActive]}>
              2
            </Text>
          </View>
          <View style={[styles.stepBar, step >= 3 && styles.stepBarActive]} />
          <View
            style={[styles.stepCircle, step >= 3 && styles.stepCircleActive]}>
            <Text style={[styles.stepText, step >= 3 && styles.stepTextActive]}>
              3
            </Text>
          </View>
        </View>
        <View>
          {step === 1 && (
            <View>
              <InputField
                label={'Email ID'}
                icon={
                  <MaterialIcons
                    name="alternate-email"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                  />
                }
                keyboardType="email-address"
                value={email}
                onChangeText={text => setEmail(text)}
              />
              <CustomButton label="下一步" onPress={handleStep1} />
            </View>
          )}

          {step === 2 && (
            <View>
              <InputField
                label={'Verification Code'}
                value={verificationCode}
                onChangeText={setVerificationCode}
              />
              <CustomButton label="下一步" onPress={handleStep2} />
            </View>
          )}

          {step === 3 && (
            <View>
              <InputField
                label={'New Password'}
                value={newPassword}
                onChangeText={setNewPassword}
                icon={
                  <Ionicons
                    name="ios-lock-closed-outline"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                  />
                }
                inputType="password"
              />
              <InputField
                label={'New Password'}
                value={newPassword}
                onChangeText={setNewPassword}
                icon={
                  <Ionicons
                    name="ios-lock-closed-outline"
                    size={20}
                    color="#666"
                    style={{marginRight: 5}}
                  />
                }
                inputType="password"
              />
              <CustomButton
                label={'Reset Password'}
                onPress={handleResetPassword}
              />
            </View>
          )}

          <Text>{message}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    margin: 20,
    flex: 1,
    // justifyContent: 'center',
    // flexDirection: 'column',
  },
  bottomView: {
    position: 'absolute',
    backgroundColor: '#FFF',
    opacity: 0.9,
    bottom: 0,
    left: 0,
    right: 0,
  },
  stepIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  stepCircle: {
    borderWidth: 2,
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepCircleActive: {
    backgroundColor: 'black',
    borderColor: 'black',
  },
  stepText: {
    fontSize: 20,
  },
  stepTextActive: {
    color: 'white',
  },
  stepBar: {
    flex: 1,
    height: 2,
    backgroundColor: 'gray',
  },
  stepBarActive: {
    backgroundColor: 'black',
  },
  stepContent: {
    marginBottom: 20,
  },
  stepButton: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  checkbox: {
    marginBottom: 20,
  },
  description: {
    height: 100,
  },
  imageStyle: {
    width: 100,
    height: 100,
    // margin: 5,
    // width: '30%',
    margin: '1.5%',
    aspectRatio: 1,
  },
  images: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ForgetPasswordScreen;
