/*
 * @Author: Xiaolu Tan xiaolutan@apexglobe.com
 * @Date: 2022-05-02 21:57:26
 * @LastEditors: Xiaolu Tan xiaolutan@apexglobe.com
 * @LastEditTime: 2022-10-07 09:12:48
 * @FilePath: /react-navigation-v6-mix-master/src/components/CustomButton.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {Text, TouchableOpacity} from 'react-native';
import React from 'react';

export default function CustomButton({label, onPress}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: '#3B71F3',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </TouchableOpacity>
  );
}
