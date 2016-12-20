import React, { PropTypes } from 'react';
import {
    View,
    Text,
    Switch,
    Picker,
    TextInput,
    TouchableOpacity,
    TouchableHighlight,
    StyleSheet
} from 'react-native';

import Dimensions from '../../utils/Dimensions';

// TouchableHighlight ...props
const NewTouchableHighlight = props => <TouchableHighlight {...props} />;

NewTouchableHighlight.propTypes = {
  delayLongPress: PropTypes.number,
  delayPressIn: PropTypes.number,
  delayPressOut: PropTypes.number,
  activeOpacity: PropTypes.number,
  underlayColor: PropTypes.string
};

NewTouchableHighlight.defaultProps = {
  delayLongPress: 0,
  delayPressIn: 0,
  delayPressOut: 0,
  activeOpacity: 0.5,
  underlayColor: "#d8d8d8"
};


const NewTouchableOpacity = props => <TouchableOpacity {...props} />;

NewTouchableOpacity.propTypes = {
  delayLongPress: PropTypes.number,
  delayPressIn: PropTypes.number,
  delayPressOut: PropTypes.number,
  activeOpacity: PropTypes.number,
  underlayColor: PropTypes.string
};

NewTouchableOpacity.defaultProps = {
  delayLongPress: 0,
  delayPressIn: 0,
  delayPressOut: 0,
  activeOpacity: 0.5,
  underlayColor: "#d8d8d8"
};


// props
// {name:xxx,icon:xxx,title:xxx,style:{},onPress:function(){} }
class Button extends React.Component {
  onPress(e) {
    if (this.props.onPress) {
      this.props.onPress(e, this.props.name);
    }
  }
  genImage() {
    const { iconHeight, iconWidth, iconStyle, icon } = this.props;

    if (this.props.icon) {
      return (<View style={{ height: iconHeight, width: iconWidth }}>
        <Image source={icon} style={[styles.buttonImg, { height: iconHeight, width: iconWidth }, iconStyle]} />
      </View>);
    } else {
      return (<View style={{ height:0, width:0 }} />);
    }
  }
  render() {
    const { width, height, title, titleStyle, style, textAlign, underlayColor } = this.props;
    const img = this.genImage();

    return (<NewTouchableOpacity underlayColor={underlayColor} style={[{ width, height }, style]} onPress={this.onPress.bind(this)}>
      <View style={[styles.buttonContainer]} >
        {img}
        <View style={[styles.buttonTextContainer, { height, justifyContent: textAlign }]}>
          <Text style={[styles.buttonText, titleStyle]}>{ title }</Text>
        </View>
      </View>
    </NewTouchableOpacity>);
  }
}

Button.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
  icon: PropTypes.object,
  titleStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  iconStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  style: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  iconHeight: PropTypes.number,
  iconWidth: PropTypes.number,
  textAlign: PropTypes.string,
  underlayColor: PropTypes.string,
  onPress: PropTypes.func
};

Button.defaultProps = {
  width: Dimensions.screenWidth,
  height: Dimensions.getSize(16),
  title: "",
  iconHeight: Dimensions.getSize(0),
  iconWidth: Dimensions.getSize(0),
  textAlign: "flex-start",
  underlayColor: "#d8d8d8",
  onPress: (name) => {}
};


class ToggleButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { toggle: true };
  }
  onPress(e, name) {
    var toggle = !this.state.toggle;
    this.setState({
      toggle
    });
    if (this.props.onPress) {
      this.props.onPress(e, this.props.name, toggle);
    }
  }
  render() {
    const toggle = this.state.toggle;
    const { toggleTitle, title, toggleIcon, icon } = this.props;
    const others = {
      ...this.props,
      title: toggle ? toggleTitle : title,
      icon: toggle ? toggleIcon : icon,
      onPress: this.onPress.bind(this)
    };
    return (<Button {...others} />);
  }
}

// like TextInput
const TextArea = (props) => {
  const others = { ...props, multiline:true };
  return (<NewTextIntput {...others} />);
};

// DatePicker
// DateTimePicker
// CheckBox / CheckGroup
// RadioBox / RadioGroup
// NewTextIntput
class NewTextIntput extends React.Component {
  handleChangeText(text) {
    if (this.props.onChangeText) {
      this.props.onChangeText(this.props.name, text);
    }
  }
  render() {
    const others = {
      ...this.props,
      onChangeText: this.handleChangeText.bind(this),
      underlineColorAndroid: "transparent",
      autoCapitalize: "none"
    };
    return (<TextInput {...others} />);
  }
}

class RadioSelect extends React.Component {
  handleClick() {
    if (this.props.onPress) {
      this.props.onPress(this.props.option, this.props.selectedId);
    }
  }
  render() {
    const { style, option, selected } = this.props;
    return (
      <TouchableOpacity onPress={this.handleClick.bind(this)} style={style}>
        <View style={styles.raido}>
          <View style={[styles.raidoInset, option === selected ? styles.raidoSelect : ""]} />
        </View>
      </TouchableOpacity>
    );
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
    paddingHorizontal:Dimensions.getSize(4),
    backgroundColor: "#74C93C"
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
    lineHeight:Dimensions.getSize(10),
    height:Dimensions.getSize(12)
  }
});

module.exports.Button = Button;
module.exports.ToggleButton = ToggleButton;
module.exports.TextInput = NewTextIntput;
module.exports.TextArea = TextArea;
module.exports.Picker = Picker;
module.exports.Switch = Switch;
module.exports.TouchableHighlight = NewTouchableHighlight;
module.exports.TouchableOpacity = NewTouchableOpacity;
module.exports.RadioSelect = RadioSelect;

