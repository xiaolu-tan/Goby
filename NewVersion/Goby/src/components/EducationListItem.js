/*
 * @Author: Xiaolu xiaolutan@apexglobe.com
 * @Date: 2022-11-05 08:57:53
 * @LastEditors: Xiaolu xiaolutan@apexglobe.com
 * @LastEditTime: 2023-01-08 22:37:16
 * @FilePath: /Goby/src/components/ExperienceListItem.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {windowWidth} from '../utils/Dimensions';
import UserAvatar from 'react-native-user-avatar';

export default function EducationListItem({
  schoolName,
  degree,
  fieldOfStudy,
  startdate,
  enddate,
  description,
  onPress,
}) {
  return (
    <TouchableOpacity style={{marginTop: 10}} onPress={onPress}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <UserAvatar size={50} name={schoolName} />
        <View style={{flexDirection: 'column', marginLeft: 15}}>
          <Text style={{fontWeight: 'bold', fontSize: 18}}>{schoolName}</Text>
          <Text style={{color: 'gray'}}>{fieldOfStudy}</Text>
          <Text style={{color: 'gray'}}>{degree}</Text>
          <Text style={{color: 'gray'}}>Oct 2013 - Present · 9 yrs 2 mos</Text>
          <Text style={{color: 'gray'}}>{description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
