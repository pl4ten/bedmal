import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {Alert, Dimensions} from 'react-native';
import axios from 'axios';
// define data
const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const main_endpoint = 'http://bedmal-core.aralstudio.top/api/';
let _token = '';
let modlogin = '';
let main_color = '#F0F0F0';

// fuction for all send and resive data to backend
function send(url, method, token, bodydata) {
  try {
    if (bodydata) {
      console.log(url, method, token, bodydata);
      console.log("========>")
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
      return axios({
        url: main_endpoint + url,
        method: 'GET',
        headers: {Authorization: 'Bearer ' + token},
      })
        .then(responseJson => {
          return responseJson.data;
        })
        .catch(r => {
          Alert.alert('Error', 'Error in connection to server ... ', [{text: 'ok'}], {
            cancelable: true,
          }); 
          return r.response.data;
        });
    }
  } catch (error) {
    console.log(error);
    Alert.alert('Error', 'Error in connection to server ... ', [{text: 'ok'}], {
      cancelable: true,
    }); 
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
        Alert.alert('Error', 'Error in connection to server ... ', [{text: 'ok'}], {
      cancelable: true,
    }); 
        return r.response.data;
      });
  } catch (error) {
    console.log(error);
        Alert.alert('Error', 'Error in connection to server ... ', [{text: 'ok'}], {
      cancelable: true,
    }); 
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
