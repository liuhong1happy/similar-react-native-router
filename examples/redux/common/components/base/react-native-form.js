'use strict'
const React = require('react');
const {
    View,
    Text,
    Switch,
    Picker,
    TextInput,
    TouchableOpacity,
    StyleSheet,
	TouchableHighlight,
	Image
} = require('react-native');
const Dimensions = require('../../utils/Dimensions');
const Platform = require('./react-native-platform');
// TouchableHighlight ...props
const NewTouchableHighlight =(props)=>{
	var {delayLongPress,delayPressIn,delayPressOut,activeOpacity,underlayColor,...others} = props;
	delayLongPress = delayLongPress?delayLongPress:0;
	delayPressIn = delayPressIn?delayPressIn:0;
	delayPressOut = delayPressOut?delayPressOut:0;
	activeOpacity = activeOpacity?activeOpacity:0.5;
	underlayColor = underlayColor?underlayColor:"#d8d8d8";
	return (<TouchableHighlight delayLongPress={delayLongPress} delayPressIn={delayPressIn} delayPressOut={delayPressOut} activeOpacit={activeOpacity} underlayColor={underlayColor} {...others}></TouchableHighlight>)
}

const NewTouchableOpacity = (props)=>{
	var {delayLongPress,delayPressIn,delayPressOut,activeOpacity,underlayColor,...others} = props;
	delayLongPress = delayLongPress?delayLongPress:0;
	delayPressIn = delayPressIn?delayPressIn:0;
	delayPressOut = delayPressOut?delayPressOut:0;
	activeOpacity = activeOpacity?activeOpacity:0.5;
	underlayColor = underlayColor?underlayColor:"#d8d8d8";
	return (<TouchableOpacity delayLongPress={delayLongPress} delayPressIn={delayPressIn} delayPressOut={delayPressOut} activeOpacit={activeOpacity} underlayColor={underlayColor} {...others}></TouchableOpacity>)
}

// props
// {name:xxx,icon:xxx,title:xxx,style:{},onPress:function(){} }
class Button extends React.Component{
    onPress(e){
        if(this.props.onPress){
            this.props.onPress(e,this.props.name);
        }
    }
    genImage(){
		var {iconHeight,iconWidth} = this.props;
		var height = iconHeight? iconHeight :Dimensions.getSize(16);
		var width = iconWidth? iconWidth:Dimensions.getSize(16);
        if(this.props.icon){
            return (<View style={{height:height,width:width}}><Image source={this.props.icon} style={[styles.buttonImg,{height:height,width:width},this.props.imgStyle]} /></View>)
        }else{
            return (<View style={{height:0,width:0}}></View>)
        }
    }
    render(){
        var img = this.genImage();
		var {title,style,icon,onPress,name,titleStyle,imgStyle,textAlign,underlayColor,...props} = this.props;
		 var _style = StyleSheet.flatten(style);
		var height = _style && _style.height?_style.height :Dimensions.getSize(16);
		var screenWidth = _style && _style.width?_style.width : Dimensions.screenWidth;
		var _imgStyle = icon?{width:Dimensions.getSize(12),height:Dimensions.getSize(12)}:{height:0,width:0};
		var textWidth  =  screenWidth - _imgStyle.width - Dimensions.getSize(8);
		var textStyle = Platform.isIOS ?[styles.buttonText,titleStyle] : [styles.buttonText,{lineHeight:height},titleStyle];
		var _underlayColor=underlayColor?underlayColor:"transparent";
        return (<NewTouchableHighlight underlayColor={_underlayColor} onPress={this.onPress.bind(this)}>
						<View style={[styles.buttonContainer,{height:height},style]} {...props}>
							{img}
							<View style={[styles.buttonTextContainer,{height:height, justifyContent:textAlign?textAlign:"flex-start", width:textWidth}]}>
								<Text style={textStyle}>{this.props.title}</Text>
							</View>
						</View>
                </NewTouchableHighlight>)
    }
}
class ToggleButton extends React.Component{
	constructor(props){
		super(props);
		this.state = { toggle: true }
	}
	onPress(e,name){
		var toggle = !this.state.toggle;
		this.setState({
			toggle:toggle
		})
        if(this.props.onPress){
            this.props.onPress(e,this.props.name,toggle);
        }
	}
	render(){
		var {title,icon,toggleTitle,toggleIcon,onPress,...props} = this.props; 
		var toggle = this.state.toggle;
		return (<Button title={(toggle?toggleTitle:title)} onPress={this.onPress.bind(this)} icon={(toggle?toggleIcon:icon)} {...props} ></Button>)
	}
}

// like TextInput       
const TextArea = (props)=> {
	 var {multiline,...others} = props;
	 return (<NewTextIntput style={this.props.style} multiline={true} {...others}></NewTextIntput>)
}

// DatePicker
// DateTimePicker
// CheckBox / CheckGroup
// RadioBox / RadioGroup
// NewTextIntput
class NewTextIntput extends React.Component{
    handleChangeText(text){
        if(this.props.onChangeText){
             this.props.onChangeText(this.props.name,text)
        }  
    }
    render(){
        var {name,onChangeText,style,...props} = this.props;
        return (<TextInput style={style} {...props} onChangeText={this.handleChangeText.bind(this)} underlineColorAndroid="transparent" autoCapitalize="none"/>)
    }
}
                 
class RadioSelect extends React.Component{
    handleClick(){
        if(this.props.onPress){
            this.props.onPress(this.props.option,this.props.topicID);
        }
    }
    render(){
        var {style,option,topicID,selected,...props} = this.props;
        return(
          <TouchableOpacity onPress = {this.handleClick.bind(this)} style = {style}>
             <View style = {styles.raido}>
                 <View style = {[styles.raidoInset,option == selected?styles.raidoSelect:""]}></View>
             </View>
          </TouchableOpacity>
        )
    }
}
                     
const styles = StyleSheet.create({
    raido:{
        width:Dimensions.getSize(10),
		height:Dimensions.getSize(10),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderStyle: "solid",
        borderWidth: 1,
        borderColor: "#0D0D0D",
        borderRadius:Dimensions.getSize(5)
    },
    raidoInset:{
        width:Dimensions.getSize(8),
		height:Dimensions.getSize(8),
        borderRadius:Dimensions.getSize(4)
    },
    raidoSelect:{
        backgroundColor: "#74C93C"
    },
	buttonContainer:{
		paddingHorizontal:Dimensions.getSize(4)
	},
    buttonImg:{
        width:Dimensions.getSize(12),
		height:Dimensions.getSize(12)
    },
	buttonTextContainer:{
		flexDirection:"row",
		alignItems:"center"
	},
	buttonText:{
		color:"#fff",
		fontSize:Dimensions.getSize(5),
		textAlignVertical:"center",
		textAlign:"left",
		lineHeight:Dimensions.getSize(7),
		height:Dimensions.getSize(7)
	}
})

module.exports.Button = Button;
module.exports.ToggleButton = ToggleButton;
module.exports.TextInput = NewTextIntput;
module.exports.TextArea = TextArea;
module.exports.Picker = Picker;
module.exports.Switch = Switch;
module.exports.TouchableHighlight = NewTouchableHighlight;
module.exports.TouchableOpacity = NewTouchableOpacity;
module.exports.RadioSelect = RadioSelect;
                