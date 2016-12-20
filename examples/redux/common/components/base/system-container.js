import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import Dimensions from '../../utils/Dimensions';
import Platform from './react-native-platform';

const SystemContainer = props => <View style={[styles.system, props.style]}>{props.children}</View>;

const ContentContainer = props => <View style={[styles.content, props.style]}>{props.children}</View>;

const RowContainer = props => <View style={[styles.row, props.style]}>{props.children}</View>;

const Splitter = props => <View style={[styles.splitter, props.style]}>{props.children}</View>;

const styles = StyleSheet.create({
  system:{
    marginTop:Platform.isIOS ? Dimensions.statusBarHeight : 0,
    height:Dimensions.contentHeight,
    width:Dimensions.screenWidth
  },
  content:{
    height:Dimensions.contentHeight,
    width:Dimensions.screenWidth,
    backgroundColor:"#ddd"
  },
  row:{
    width:Dimensions.screenWidth,
    backgroundColor:"#fff",
    borderBottomColor:"#d8d8d8",
    borderBottomWidth:1,
    borderStyle:"solid"
  },
  splitter:{
    height:1,
    width:Dimensions.screenWidth - Dimensions.getSize(4),
    backgroundColor:"#d8d8d8",
    marginHorizontal:Dimensions.getSize(2)
  }
});

module.exports.SystemContainer = SystemContainer;
module.exports.ContentContainer = ContentContainer;
module.exports.RowContainer = RowContainer;
module.exports.Splitter = Splitter;
