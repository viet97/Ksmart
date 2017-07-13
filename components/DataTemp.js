/**
 *
 * Created by hao on 7/13/17.
 */
import React, {Component} from 'react'
import DatePicker from 'react-native-datepicker'
import {Text, View, StyleSheet, TouchableOpacity, Dimensions, Button, Picker, TouchableHightLight} from "react-native";
import URlConfig from "../configs/url";
import Color from '../configs/color'
import Icon1 from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Icon2 from 'react-native-vector-icons/Entypo'
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';
import DialogManager, {ScaleAnimation, DialogContent} from 'react-native-dialog-component';
import {DialogComponent, SlideAnimation} from 'react-native-dialog-component';
import Dialog from '../components/Dialog'
import orderListData from '../dbcontext/orderListData'
import AtoZListView from 'react-native-atoz-listview';
import Search from 'react-native-search-box';
var {height} = Dimensions.get('window');
var GiftedListView = require('react-native-gifted-listview');
export default class DataTemp extends React.Component {
    static filtDialog = {
        'status': 'false'
    }
}