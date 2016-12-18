'use strict'
const React = require('react');
const {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet
} = require('react-native');
const Dimensions = require('./react-native-dimensions');
const {height, width} = Dimensions.get('window');

const Utils = {
    from:"icomoon",
    glypy:{
          home: 'e900',
          user: 'e901',
          search: 'e902',
          send: 'e903'
    },
    glypyMapMaker:function(glypy){
        return Object.keys(glypy)
            .map(function(key){
            return {
                key:key,
                value: String.fromCharCode(parseInt(glypy[key], 16))
            }
            })
            .reduce(function(map,glypy){
                map[glypy.key] = glypy.value;
                return map;
            },{})
    },
}

const TabBar = (props)=>{
	var { barColor } = props;
	return (<View style={[{backgroundColor:barColor},styles.tabbar]}>
				{props.children}
			</View>)
}

class Tab extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			glypy: Utils.glypyMapMaker(Utils.glypy)
		}
	}
    onPress(e){
        var name = this.props.name;
        if(this.props.onPress){
            this.props.onPress(e,name);
        }
    }
    genIcon(){
        var { selected,icon,selectedIcon,systemIcon,defaultColor,selectedColor } = this.props;
        if(systemIcon){
            var glypy= this.state.glypy;
            var color = selected ?  selectedColor : defaultColor;
            return (<Text style={[{"color":color,"fontFamily":Utils.from},styles.systemIcon]}>{glypy[systemIcon]}</Text>)
        } else {
            return (<Image source={selected?  selectedIcon : icon}></Image>)
        }
    }
    render(){
        var { title } = this.props; 
        var icon = this.genIcon();
        return (<TouchableOpacity style={styles.tab} onPress={this.onPress}>
                        <View style={styles.nav}>
                            <View style={styles.iconRow}>
                                {icon}
                            </View>
                            <View style={styles.labelRow}>
                                <Text style={styles.label}>{title}</Text>
                            </View>
                        </View>
                </TouchableOpacity>)
    }
}
				
Tab.propTypes = {
	defaultColor: React.PropTypes.string,
	selectedColor: React.PropTypes.string
}
				
Tab.defaultProps = {
	defaultColor: "#999999",
	selectedColor: "#4590a9"
}
  
const styles = StyleSheet.create({
    nav:{
        alignItems:"center",
        paddingTop: Dimensions.getSize(2)
    },
    tabbar:{
        position:"absolute",
        bottom:0,
        left:0,
        right:0,
        flexDirection:"row",
        justifyContent:"space-around",// 水平方向
        alignItems:"center",
        width:width,
        borderTopColor:"#d8d8d8",
        borderTopWidth:0.5,
        borderStyle:"solid",
		height:Dimensions.tabBarHeight
    },
    tab:{
        flex:1
    },
	iconRow:{
		flexDirection:"row",
		justifyContent:"center"
	},
    systemIcon:{
        fontSize:Dimensions.getSize(7),
        textAlign:"center",
        marginTop:Dimensions.getSize(2),
        lineHeight:Dimensions.getHeight(10),
        textAlignVertical:"center"
    },
    labelRow:{
        marginBottom:Dimensions.getSize(2)
    },
    label:{
        fontSize:Dimensions.getSize(4),
        color:"#282828",
        textAlign:"center",
        lineHeight:Dimensions.getSize(6)
    }
})

module.exports.TabBar = TabBar;
module.exports.Tab = Tab;