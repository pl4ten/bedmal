import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {Alert, Dimensions} from 'react-native';
import axios from 'axios';
// define data
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const main_endpoint = 'https://bedmal-core.aralstudio.top/api/';
let _token = '';
let modlogin = '';
let main_color = '#F0F0F0';

// fuction for all send and resive data to backend
function send(url, method, token, bodydata) {
  try {
    if (bodydata && method=="POST") {
      console.log(url, method, token, bodydata);

      return axios({
        url: main_endpoint + url,
        method: 'POST',
        headers: {Authorization: 'Bearer ' + token},
        data: bodydata,
      })
        .then(responseJson => {
          return responseJson.data;
        })
        .catch(r => {
          return r.response.data;
        });
    } else {
      console.log(main_endpoint + url)
      return axios({
        url: main_endpoint + url,
        method: 'GET',
        headers: {Authorization: 'Bearer ' + token},
      })
        .then(responseJson => {
          console.log(responseJson)
          return responseJson.data;
        })
        .catch(r => {
          console.log("========>")
          console.log(r); 
          return r
        });
    }
  } catch (error) {
    console.log(error);
    return 'error';
  }
}
function get_via_token(url, method, token) {
  try {
    console.log(url, method, token);
    return axios({
      url: main_endpoint + url,
      method: 'GET',
      headers: {Authorization: 'Bearer ' + token},
    })
      .then(responseJson => {
        return responseJson.data;
      })
      .catch(r => {
        console.log(r); 
        return r.response.data;
      });
  } catch (error) {
    console.log(error);
    return 'error';
  }
}

module.exports = {
  get_via_token,
  send,
  main_endpoint,
  _token,
  modlogin,
  main_color,
  height,
  width,
};
