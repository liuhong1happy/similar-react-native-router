import React from 'react';
import {
  View,
  StyleSheet,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ContentContainer, RowContainer } from '../base/system-container';
import ToolBar from '../base/react-native-toolbar';
import { Button, TextInput } from '../base/react-native-form';
import Dimensions from '../../utils/Dimensions';
import UserPageAction from '../../actions/userPage';

const mapDispatchToProps = function (dispatch) {
  return bindActionCreators(UserPageAction, dispatch);
};

class UserLoginView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      form_data: {}
    };
  }
  handleTextChange(name, text) {
    const formData = this.state.form_data;
    formData[name] = text;
    this.setState({
      form_data:formData
    });
  }
  handleUserLogin() {
    const formData = this.state.form_data;
        // 校验表单
    if (!formData.username) {
      Alert.alert("提示", "请输入用户名", [{ text: '确定', onPress: () => {} }]);
      return;
    }
    if (!formData.password) {
      Alert.alert("提示", "请输入密码", [{ text: '确定', onPress: () => {} }]);
      return;
    }
    const { userLogin } = this.props;
    userLogin(formData);
  }
  render() {
    const formData = this.state.form_data;
    return (<ContentContainer>
      <ToolBar title="登录" />
      <RowContainer style={styles.row}>
        <View style={styles.inputView}>
          <TextInput
            name="username" placeholder="请输入用户名" style={styles.input}
            value={formData.username} onChangeText={this.handleTextChange.bind(this)}
          />
        </View>
        <View style={styles.blank} />
        <View style={styles.inputView}>
          <TextInput
            name="password" placeholder="请输入密码" style={styles.input} secureTextEntry
            value={formData.password} onChangeText={this.handleTextChange.bind(this)} maxLength={16}
          />
        </View>
      </RowContainer>
      <Button title="登陆" style={styles.button} textAlign="center" onPress={this.handleUserLogin.bind(this)} />
    </ContentContainer>);
  }
}

const styles = StyleSheet.create({
  row:{
    marginTop: Dimensions.getSize(4)
  },
  blank:{
    marginLeft:Dimensions.getSize(2),
    marginRight:Dimensions.getSize(2),
    backgroundColor:"#ddd",
    height:1
  },
  inputView:{
    height:Dimensions.getSize(16),
    width:Dimensions.screenWidth,
    borderColor: "#ddd"
  },
  input:{
    height:Dimensions.getSize(16),
    width:Dimensions.screenWidth - Dimensions.getSize(6),
    fontSize:Dimensions.getSize(5)
  },
  button:{
    width:Dimensions.screenWidth - Dimensions.getSize(12),
    height:Dimensions.getSize(16),
    backgroundColor:"#74C93C",
    borderBottomLeftRadius:Dimensions.getSize(2),
    borderBottomRightRadius:Dimensions.getSize(2),
    borderTopLeftRadius:Dimensions.getSize(2),
    borderTopRightRadius:Dimensions.getSize(2),
    marginTop:Dimensions.getSize(6),
    marginLeft:Dimensions.getSize(6),
    marginRight:Dimensions.getSize(6)
  }
});

module.exports = connect(undefined, mapDispatchToProps)(UserLoginView);
