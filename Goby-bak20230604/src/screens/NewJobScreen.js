import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  // Picker,
  // CheckBox,
  SafeAreaView,
  FlatList,
  ScrollView,
  ActionSheetIOS,
  Button,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

const NewJobScreen = ({navigation}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [name, setName] = useState('');
  const [numOfPeople, setNumOfPeople] = useState('1');
  const [ageRange, setAgeRange] = useState('18-24');
  const [resumeRequired, setResumeRequired] = useState(false);
  const [duration, setDuration] = useState('1 hour');
  const [location, setLocation] = useState('Remote');
  const [description, setDescription] = useState('');

  const [numOfPeopleVisible, setNumOfPeopleVisible] = useState(false);
  const [ageRangeVisible, setAgeRangeVisible] = useState(false);
  const [durationVisible, setDurationVisible] = useState(false);
  const [locationVisible, setLocationVisible] = useState(false);

  const [images, setImages] = useState([]);
  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const captureImage = async type => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();
    if (isCameraPermitted && isStoragePermitted) {
      //   launchCamera(options, response => {
      //     console.log('Response = ', response);

      //     if (response.didCancel) {
      //       alert('User cancelled camera picker');
      //       return;
      //     } else if (response.errorCode == 'camera_unavailable') {
      //       alert('Camera not available on device');
      //       return;
      //     } else if (response.errorCode == 'permission') {
      //       alert('Permission not satisfied');
      //       return;
      //     } else if (response.errorCode == 'others') {
      //       alert(response.errorMessage);
      //       return;
      //     }
      //     console.log('base64 -> ', response.base64);
      //     console.log('uri -> ', response.uri);
      //     console.log('width -> ', response.width);
      //     console.log('height -> ', response.height);
      //     console.log('fileSize -> ', response.fileSize);
      //     console.log('type -> ', response.type);
      //     console.log('fileName -> ', response.fileName);

      //     setImages([...images, response.assets[0]]);
      //   });
      ImagePicker.openCamera(options).then(selectedImage => {
        setImages([...images, selectedImage]);
      });
    }
  };

  const handleChoosePhoto = type => {
    if (Platform.OS === 'ios') {
      ActionSheetIOS.showActionSheetWithOptions(
        {
          options: ['Cancel', 'Take Photo...', 'Choose from Library...'],
          cancelButtonIndex: 0,
          title: 'Select Photo',
        },
        buttonIndex => {
          if (buttonIndex === 1) {
            // Take Photo...
            captureImage(type);
          } else if (buttonIndex === 2) {
            // Choose from Library...
            chooseFile(type);
          }
        },
      );
    } else {
      // Android code
    }
  };
  const chooseFile = type => {
    let options = {
      multiple: true,
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
    };
    // launchImageLibrary(options, response => {
    //   console.log('Response = ', response);

    //   if (response.didCancel) {
    //     alert('User cancelled camera picker');
    //     return;
    //   } else if (response.errorCode == 'camera_unavailable') {
    //     alert('Camera not available on device');
    //     return;
    //   } else if (response.errorCode == 'permission') {
    //     alert('Permission not satisfied');
    //     return;
    //   } else if (response.errorCode == 'others') {
    //     alert(response.errorMessage);
    //     return;
    //   }
    //   console.log('assets->', response.assets[0]);
    //   console.log('base64 -> ', response.base64);
    //   console.log('uri -> ', response.assets[0].uri);
    //   console.log('width -> ', response.assets[0].width);
    //   console.log('height -> ', response.assets[0].height);
    //   console.log('fileSize -> ', response.assets[0].fileSize);
    //   console.log('type -> ', response.assets[0].type);
    //   console.log('fileName -> ', response.assets[0].fileName);

    //   setImages([...images, response.assets[0]]);
    // });
    ImagePicker.openPicker(options).then(selectedImages => {
      setImages([...images, selectedImages]);
      console.log(selectedImages);
    });
  };
  const goToNextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const goToPreStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const saveFormData = async () => {
    try {
      const formData = {
        name,
        numOfPeople,
        ageRange,
        resumeRequired,
        duration,
        location,
        description,
      };
      await AsyncStorage.setItem('formData', JSON.stringify(formData));
      console.log('Form data saved!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* <ScrollView> */}

      <View style={styles.stepIndicator}>
        <View
          style={[
            styles.stepCircle,
            currentStep >= 1 && styles.stepCircleActive,
          ]}>
          <Text
            style={[
              styles.stepText,
              currentStep >= 1 && styles.stepTextActive,
            ]}>
            1
          </Text>
        </View>
        <View
          style={[styles.stepBar, currentStep >= 2 && styles.stepBarActive]}
        />
        <View
          style={[
            styles.stepCircle,
            currentStep >= 2 && styles.stepCircleActive,
          ]}>
          <Text
            style={[
              styles.stepText,
              currentStep >= 2 && styles.stepTextActive,
            ]}>
            2
          </Text>
        </View>
        <View
          style={[styles.stepBar, currentStep >= 3 && styles.stepBarActive]}
        />
        <View
          style={[
            styles.stepCircle,
            currentStep >= 3 && styles.stepCircleActive,
          ]}>
          <Text
            style={[
              styles.stepText,
              currentStep >= 3 && styles.stepTextActive,
            ]}>
            3
          </Text>
        </View>
      </View>
      {currentStep === 1 && (
        <View style={styles.stepContent}>
          <Text style={styles.label}>Name:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Enter your name"
          />
          <Button title="Next" onPress={goToNextStep} />
        </View>
      )}
      {currentStep === 2 && (
        <View style={styles.stepContent}>
          <Text style={styles.label}>Number of people:</Text>
          <TextInput
            style={styles.input}
            editable={false}
            onFocus={() => setNumOfPeopleVisible(true)}
            onPressIn={() => setNumOfPeopleVisible(true)}>
            {numOfPeople ? numOfPeople : ''}
          </TextInput>

          <Text style={styles.label}>Age range:</Text>
          <TextInput
            style={styles.input}
            editable={false}
            onFocus={() => setAgeRangeVisible(true)}
            onPressIn={() => setAgeRangeVisible(true)}>
            {ageRange ? ageRange : ''}
          </TextInput>

          <Text style={styles.label}>Resume required:</Text>
          <CheckBox
            style={styles.checkbox}
            value={resumeRequired}
            onValueChange={setResumeRequired}
          />
          <View style={styles.stepButton}>
            <Button title="Previous" onPress={goToPreStep} />
            <Button title="Next" onPress={goToNextStep} />
          </View>
        </View>
      )}
      {currentStep === 3 && (
        <View style={styles.stepContent}>
          <Text style={styles.label}>Duration:</Text>
          <TextInput
            style={styles.input}
            editable={false}
            onFocus={() => setDurationVisible(true)}
            onPressIn={() => setDurationVisible(true)}>
            {duration ? duration : ''}
          </TextInput>

          <Text style={styles.label}>Location:</Text>
          <TextInput
            style={styles.input}
            editable={false}
            onFocus={() => setLocationVisible(true)}
            onPressIn={() => setLocationVisible(true)}>
            {location ? location : ''}
          </TextInput>

          <Text style={styles.label}>Description:</Text>
          <TextInput
            style={[styles.input, styles.description]}
            value={description}
            onChangeText={setDescription}
            placeholder="Enter job description"
            multiline
          />
          <Text style={styles.label}>Pictures:</Text>
          <View style={styles.images}>
            {images.map((image, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => console.log('View Image Detail')}>
                {console.log(image)}
                <Image source={{uri: image.path}} style={styles.imageStyle} />
              </TouchableOpacity>
            ))}

            {images.length < 6 && (
              <TouchableOpacity
                onPress={() => handleChoosePhoto('photo')}
                style={styles.imageStyle}>
                <Text style={styles.uploadText}>Upload Image</Text>
              </TouchableOpacity>
            )}
          </View>
          {/* <TouchableOpacity
            activeOpacity={0.5}
            style={styles.buttonStyle}
            onPress={() => captureImage('photo')}>
            <Text style={styles.textStyle}>Launch Camera for Image</Text>
          </TouchableOpacity> */}
          <View style={styles.stepButton}>
            <Button title="Previous" onPress={goToPreStep} />
            <Button title="Save" onPress={saveFormData} />
          </View>
        </View>
      )}
      {/* </ScrollView> */}
      {numOfPeopleVisible && (
        <View style={styles.bottomView}>
          <Picker
            // style={styles.input}
            selectedValue={numOfPeople}
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) => {
              setNumOfPeople(itemValue);
              setNumOfPeopleVisible(false);
            }}>
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
          </Picker>
        </View>
      )}
      {ageRangeVisible && (
        <View style={styles.bottomView}>
          <Picker
            // style={styles.input}
            selectedValue={ageRange}
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) => {
              setAgeRange(itemValue);
              setAgeRangeVisible(false);
            }}>
            <Picker.Item label="18-24" value="18-24" />
            <Picker.Item label="25-34" value="25-34" />
            <Picker.Item label="35-44" value="35-44" />
          </Picker>
        </View>
      )}
      {durationVisible && (
        <View style={styles.bottomView}>
          <Picker
            // style={styles.input}
            selectedValue={duration}
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) => {
              setDuration(itemValue);
              setDurationVisible(false);
            }}>
            <Picker.Item label="1 hour" value="1 hour" />
            <Picker.Item label="2 hours" value="2 hours" />
            <Picker.Item label="3 hours" value="3 hours" />
          </Picker>
        </View>
      )}
      {locationVisible && (
        <View style={styles.bottomView}>
          <Picker
            // style={styles.input}
            selectedValue={location}
            mode="dropdown"
            onValueChange={(itemValue, itemIndex) => {
              setLocation(itemValue);
              setLocationVisible(false);
            }}>
            <Picker.Item label="Remote" value="Remote" />
            <Picker.Item label="In-person" value="In-person" />
          </Picker>
        </View>
      )}
    </ScrollView>
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

export default NewJobScreen;
