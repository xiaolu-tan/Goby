/*
 * @Author: Xiaolu xiaolutan@apexglobe.com
 * @Date: 2023-01-02 23:41:59
 * @LastEditors: Xiaolu xiaolutan@apexglobe.com
 * @LastEditTime: 2023-01-08 22:07:39
 * @FilePath: /Goby/src/screens/ProjectScreen.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import {View, Text} from 'react-native';
import React, {useState, useCallback, useEffect, useContext} from 'react';

const ProjectList = () => {
  return (
    <View>
      <Text>ProjectList</Text>
    </View>
  );
};

export default ProjectList;

export const ProjectDetail = ({navigation, route}) => {
  return (
    <>
      <Text>Project Detail</Text>
    </>
  );
};
