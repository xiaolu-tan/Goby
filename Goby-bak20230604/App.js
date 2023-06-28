/*
 * @Author: Xiaolu Tan xiaolutan@apexglobe.com
 * @Date: 2022-05-02 21:57:26
 * @LastEditors: Xiaolu Tan xiaolutan@apexglobe.com
 * @LastEditTime: 2022-10-06 11:17:10
 * @FilePath: /react-navigation-v6-mix-master/App.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import React from 'react';
import {AuthProvider} from './src/context/AuthContext';
import AppNav from './src/navigation/AppNav';

function App() {
  return (
    <AuthProvider>
      <AppNav />
    </AuthProvider>
  );
}

export default App;
