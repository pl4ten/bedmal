import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {Alert, Dimensions} from 'react-native';

// define data
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const main_endpoint = 'https://bedmal-core.aralstudio.top/api/';
let _token = '';
let modlogin = '';
let main_color = '#F0F0F0';

function send(url, method, bodydata) {
  try {
    if (bodydata) {
      console.log(url, method, bodydata);
      return fetch(main_endpoint + url, {
        method: method,
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodydata),
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          if (responseJson.description === 'Access denied!') {
            return 'Access denied!';
          } else if (responseJson.status === 200) {
            return responseJson;
          } else {
            return responseJson;
          }
        });
    } else {
      fetch(main_endpoint + url, {
        method: method,
        dataType: 'json',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(responseJson => {
          if (responseJson.description === 'Access denied!') {
            return 'Access denied!';
          } else if (responseJson.status === 200) {
            return responseJson;
          } else {
            return responseJson;
          }
        });
    }
  } catch (error) {
    console.log(error);
    return 'error';
  }
}

module.exports = {
  main_endpoint,

  send,
  main_color,

  _token,
  modlogin,
  height,
  width,
};
