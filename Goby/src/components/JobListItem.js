/*
 * @Author: Xiaolu xiaolutan@apexglobe.com
 * @Date: 2023-01-08 23:42:04
 * @LastEditors: Xiaolu xiaolutan@apexglobe.com
 * @LastEditTime: 2023-01-22 23:52:59
 * @FilePath: /Goby/src/components/JobListItem.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import {windowWidth} from '../utils/Dimensions';
import UserAvatar from 'react-native-user-avatar';

export default function JobListItem({
  photo,
  title,
  description,
  location,
  end_date,
  onPress,
}) {
  return (
    <TouchableOpacity style={{marginTop: 10}} onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 20,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center', flex: 1}}>
          {/* <Image
          source={photo}
          style={{width: 55, height: 55, borderRadius: 10, marginRight: 8}}
        /> */}
          <UserAvatar name={title} size={55} />
          <View style={{width: windowWidth - 220, marginLeft: 10}}>
            <Text
              style={{
                color: '#333',
                fontFamily: 'Roboto-Medium',
                fontSize: 14,
              }}>
              {title}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                color: '#333',
                fontFamily: 'Roboto-Medium',
                fontSize: 14,
                textTransform: 'uppercase',
              }}>
              {description}
            </Text>
            <Text>{end_date}</Text>
          </View>
        </View>

        {/* <TouchableOpacity onPress={onPress} style={{
        backgroundColor:'#0aada8',
        padding:10,
        width: 100,
        borderRadius: 10,
      }}>
        <Text style={{
          color: '#fff',
          textAlign: 'center',
          fontFamily: 'Roboto-Medium',
          fontSize: 14,
        }}>
          {isFree == 'Yes' && 'Play'}
          {isFree == 'No' && price}
        </Text>
      </TouchableOpacity> */}
      </View>
    </TouchableOpacity>
  );
}
