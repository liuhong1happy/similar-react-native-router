import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import Dimensions from '../../utils/Dimensions';
import { TouchableOpacity } from './react-native-form';

const { width } = Dimensions.get('window');
const Utils = {
  from:"icomoon",
  glypy:{
    home: 'e900',
    user: 'e901',
    search: 'e902',
    send: 'e903'
  },
  glypyMapMaker(glypy) {
    return Object.keys(glypy)
            .map(key => ({
              key,
              value: String.fromCharCode(parseInt(glypy[key], 16))
            }))
            .reduce((map, _glypy) => {
              map[_glypy.key] = _glypy.value;
              return map;
            }, {});
  },
};

const TabBar = (props) => {
  const { barColor } = props;
  return (<View style={[styles.tabbar, { backgroundColor:barColor }]}>
    {props.children}
  </View>);
};

class Tab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      glypy: Utils.glypyMapMaker(Utils.glypy)
    };
  }
  onPress(e) {
    const name = this.props.name;
    if (this.props.onPress) {
      this.props.onPress(e, name);
    }
  }
  genIcon() {
    const { selected, icon, selectedIcon, systemIcon, defaultColor, selectedColor } = this.props;
    if (systemIcon) {
      const glypy = this.state.glypy;
      const color = selected ? selectedColor : defaultColor;
      return (<Text style={[{ color, fontFamily: Utils.from }, styles.systemIcon]}>{glypy[systemIcon]}</Text>);
    } else {
      return (<Image source={selected ? selectedIcon : icon} />);
    }
  }
  render() {
    var { title } = this.props;
    var icon = this.genIcon();
    return (<TouchableOpacity style={styles.tab} onPress={this.onPress.bind(this)}>
      <View style={styles.nav}>
        <View style={styles.iconRow}>
          {icon}
        </View>
        <View style={styles.labelRow}>
          <Text style={styles.label}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>);
  }
}

Tab.propTypes = {
  defaultColor: React.PropTypes.string,
  selectedColor: React.PropTypes.string
};

Tab.defaultProps = {
  defaultColor: "#999999",
  selectedColor: "#4590a9"
};

const styles = StyleSheet.create({
  nav:{
    alignItems:"center",
    height: Dimensions.tabBarHeight
  },
  tabbar:{
    position:"absolute",
    bottom:0,
    left:0,
    right:0,
    flexDirection:"row",
    justifyContent:"space-around", // 水平方向
    alignItems:"center",
    width,
    height: Dimensions.tabBarHeight
  },
  tab:{
    flex:1,
    height: Dimensions.tabBarHeight
  },
  iconRow:{
    flexDirection:"row",
    justifyContent:"center",
    height: Dimensions.getHeight(12)
  },
  systemIcon:{
    fontSize:Dimensions.getSize(8),
    textAlign:"center",
    lineHeight:Dimensions.getHeight(12),
    textAlignVertical:"center"
  },
  labelRow:{
    height: Dimensions.getHeight(6)
  },
  label:{
    fontSize:Dimensions.getSize(4),
    color:"#282828",
    textAlign:"center",
    lineHeight:Dimensions.getSize(6)
  }
});

module.exports.TabBar = TabBar;
module.exports.Tab = Tab;
