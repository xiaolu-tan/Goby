/*
 * @Author: Xiaolu xiaolutan@apexglobe.com
 * @Date: 2022-11-11 00:13:20
 * @LastEditors: Xiaolu xiaolutan@apexglobe.com
 * @LastEditTime: 2022-11-11 00:56:08
 * @FilePath: /Goby/src/components/MonthPicker.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React, {memo} from 'react';
import {DatePicker} from '@ant-design/react-native';

const MonthPicker = ({value, onChange, visible, onCancel}) => {
  return (
    <DatePicker
      value={value}
      visible={visible}
      onDismiss={onCancel}
      mode="month"
      defaultDate={new Date()}
      minDate={new Date(2015, 1, 1)}
      maxDate={new Date(2026, 11, 3)}
      onChange={onChange}
      format="YYYY-MM-DD"
    />
  );
};

export default memo(MonthPicker);
