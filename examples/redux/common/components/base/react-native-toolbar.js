'use strict'
const React = require('react');
const {
    View,
    Text,
    Image,
    StyleSheet,
	StatusBar
} = require('react-native');
const Dimensions = require('../../utils/Dimensions');
const {height, width} = Dimensions.get('window');
const {TouchableOpacity} = require('./react-native-form');
// navIcon,logo,title,titleColor,subtitle,subtitleColor,actions
// name title icon show showWithText
class ActionButton extends React.Component{
    onPress(e){
        if(this.props.onPress){
            this.props.onPress(e,this.props.name);
        }
    }
    genImage(){
        if(this.props.icon){
            return (<Image source={this.props.icon} style={styles.actionImg} />)
        }else{
            return (<Text></Text>)
        }
    }
    render(){
        var img = this.genImage();
        return (<TouchableOpacity onPress={this.onPress.bind(this)} style={ [styles.button,{"width":this.props.width,"marginLeft":this.props.marginLeft} ]}>
                        {img}
                        <Text style={{color:"#fff",fontSize:Dimensions.getSize(6)}}>{this.props.title}</Text>
                </TouchableOpacity>)
    }
}
class ToolBar extends React.Component{
	constructor(props){
		super(props);
		var { navIcon,logo,title,titleColor,subtitle,subtitleColor,actions} = props;
		this.state = {
			navIcon:navIcon,
			logo:logo,
			title:title,
			titleColor:titleColor,
			subtitle:subtitle,
			subtitleColor:subtitleColor,
			actions:actions
		}
	}
    onNavIconPress(e){
        if(this.props.onNavIconPress){
            this.props.onNavIconPress(e);
        }
    }
    onLogoPress(e){
        if(this.props.onLogoPress){
            this.props.onLogoPress(e);
        }
    }
    onActionPress(e,name){
        if(this.props.onActionPress){
            this.props.onActionPress(e,name);
        }
    }
    setNavIcon(navIcon){
      this.setState({
          navIcon:navIcon
      })  
    }
    setLogo(logo){
        this.setState({
          logo:logo
      })  
    }
    setTitle(title){
      this.setState({
          title:title
      })  
    }
    setSubtitle(subtitle){
        this.setState({
          subtitle:subtitle
      })  
    }
    genTitle(title){
        if(title){
            return (<View><Text style={styles.title}>{title}</Text></View>)
        }else{
            return (<View></View>)
        }
    }
    genSubtitle(subtitle){
        if(subtitle){
            return (<View><Text style={styles.subtitle}>{subtitle}</Text></View>)
        }else{
            return (<View></View>)
        }
    }
    render(){
        var { titleColor,subtitleColor} = this.state;
        var onActionPress = this.onActionPress.bind(this);
        var title = this.genTitle(this.props.title);
        var subtitle = this.genSubtitle(this.props.subtitle);
		var actions = this.props.actions?this.props.actions:[];
		var navIcon = this.props.navIcon?this.props.navIcon:{};
		var logo = this.props.logo?this.props.logo:{};
        return (<View style={[styles.toolbar]}>
							<StatusBar hidden={false} barStyle="light-content"/>
                            <View style={[styles.item,styles.actions,{justifyContent:"flex-start",marginLeft:Dimensions.getSize(4) }]}>
                                <ActionButton icon={navIcon.icon} title={navIcon.title} name={navIcon.name} width={navIcon.width} onPress={this.onNavIconPress.bind(this)}/>
                                <ActionButton icon={logo.icon} title={logo.title} name={logo.name} width={navIcon.width}  onPress={this.onLogoPress.bind(this)}/>
                            </View>
                            <View style={[styles.item,styles.titles]}>
                                { title }
                                { subtitle }
                            </View>
                            <View style={[styles.item,styles.actions,{justifyContent:"flex-end",marginRight:Dimensions.getSize(4)}]}>
                                {
                                    actions.map(function(action,pos){
                                        action.onPress = onActionPress;
                                        action.key = pos;
										action.marginLeft = Dimensions.getSize(6);
                                        return React.createElement(ActionButton,action,null);
                                    })
                                }
                            </View>
                </View>)
    }
}

const styles = StyleSheet.create({
    toolbar:{
        flexDirection:"row",//子项目从左向有对齐
        justifyContent:"space-around",// 水平方向
        alignItems:"center",//垂直方向
        width:width,
        borderBottomColor:"#ccc",
        borderBottomWidth:0.5,
        borderStyle:"solid",
        backgroundColor:"#74C93C",
		height:Dimensions.toolBarHeight+Dimensions.statusBarHeight,
		marginTop: -Dimensions.statusBarHeight
    },
    item:{
        flex:1,
		marginTop: Dimensions.statusBarHeight
    },
    titles:{
        flexDirection:"column",
        justifyContent:"space-around",
        marginTop:Dimensions.statusBarHeight + Dimensions.getSize(2),
        marginBottom:Dimensions.getSize(2),
        alignItems:"center"
    },
    title:{
        flex:1,
        color:"#fff",
        fontSize:Dimensions.getSize(7),
        textAlign:"center"
    },
    subtitle:{
        flex:1,
        color:"#fff",
        fontSize:Dimensions.getSize(7),
        textAlign:"center"
    },
    actions:{
        flexDirection:"row",
        alignItems:"center",
    },
    button:{
        flexDirection:"row",
        justifyContent:"space-around",// 水平方向
        alignItems:"center",
        flex:0
    },
	actionImg:{
		width:Dimensions.getSize(12),
		height:Dimensions.getSize(12)
	}
});
module.exports = ToolBar;