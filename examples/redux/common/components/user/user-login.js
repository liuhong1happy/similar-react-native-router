const React = require('react');
const {
    ListView,
    View,
	RecyclerViewBackedScrollView,
	StyleSheet,
    Alert,
	StatusBar
} = require('react-native');
const TabBars = require('../base/tabbars');
const {ContentContainer,RowContainer}  = require('../base/system-container')
const ToolBar = require('../base/react-native-toolbar');
const { Button,TextInput } = require('../base/react-native-form');
const Dimensions = require('../../utils/Dimensions');
const UserPageAction = require('../../actions/userPage');
const { connect } = require('react-redux'); 
const { bindActionCreators } = require('redux');

const mapDispatchToProps = function(dispatch){
	return bindActionCreators(UserPageAction,dispatch);
}

class UserLoginView extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			form_data: {}
		}
	}
    handleTextChange(name,text){
        var form_data = this.state.form_data;
        form_data[name] = text;
        this.setState({
            form_data:form_data
        })
    }
    handleUserLogin(){
        var form_data = this.state.form_data;
        // 校验表单
        if(!form_data.username){
            Alert.alert("提示","请输入用户名",[{text: '确定', onPress: () => {}}]);
            return;
        }
        if(!form_data.password){
            Alert.alert("提示","请输入密码",[{text: '确定', onPress: () => {}}]);
            return;
        }
		const { userLogin } = this.props;
        userLogin(form_data);
    }
    render(){
        var form_data = this.state.form_data;
        return (<ContentContainer>
                        <ToolBar title="登录"></ToolBar>
                        <RowContainer style={styles.RowContainer}>
                            <View style={styles.inputView}>
                                <TextInput name="username" placeholder="请输入用户名" style={styles.input} value={form_data.username} onChangeText={this.handleTextChange.bind(this)}></TextInput> 
                            </View>
                            <View style={styles.blank}></View>
                            <View style={styles.inputView}>
                                <TextInput name="password" placeholder="请输入密码" style={styles.input} secureTextEntry={true} value={form_data.password}  onChangeText={this.handleTextChange.bind(this)} maxLength={16}></TextInput> 
                            </View>
                        </RowContainer>
                        <Button title="登陆" style={styles.button} textAlign="center" onPress={this.handleUserLogin.bind(this)}></Button>	  	
                   </ContentContainer>)
    }
}

const styles = StyleSheet.create({
  RowContainer:{
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
      width:Dimensions.screenWidth-Dimensions.getSize(6),
      fontSize:Dimensions.getSize(5)
  },
  button:{
      width:Dimensions.screenWidth-Dimensions.getSize(12),
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
})

module.exports = connect(undefined,mapDispatchToProps)(UserLoginView);