const React = require('react');
const {
    View,
	StyleSheet,
    Text
} = require('react-native');

const { ContentContainer }  = require('../base/system-container')
const Dimensions = require('../../utils/Dimensions');

class UserWelcomeView extends React.Component{
    render(){
        return (<ContentContainer style={styles.container}>
                    <View style={styles.form}>
							<View style={styles.textView}>
								<Text style={styles.title}>改变世界，改变你我</Text>
							</View>
							<View style={styles.textView}>
								<Text style={styles.text}>智汇学习学生版移动端</Text>
							</View>
					</View>			  	
                </ContentContainer>)
    }
}

const styles = StyleSheet.create({
	  form: {
			flexDirection: "column",
			justifyContent: 'center',
		  	width:Dimensions.screenWidth,
		  	height:Dimensions.screenHeight,
		    alignItems:"center",
		    marginTop:-Dimensions.getSize(24)
	  },
	  textView:{
          height:Dimensions.getSize(16),
          width:Dimensions.screenWidth-Dimensions.getSize(6)
	  },
      title:{
		  lineHeight:Dimensions.getSize(16),
          textAlign:"center",
		  fontSize:Dimensions.getSize(8),
          color:"#74C93C"
      },
	  text:{
		  lineHeight:Dimensions.getSize(12),
          textAlign:"center",
		  fontSize:Dimensions.getSize(6),
          color:"#999"
	  },
	  button:{
		  width:Dimensions.getSize(64),
		  height:Dimensions.getSize(12),
		  backgroundColor:"#74C93C",
		  borderBottomLeftRadius:Dimensions.getSize(2),
		  borderBottomRightRadius:Dimensions.getSize(2),
		  borderTopLeftRadius:Dimensions.getSize(2),
		  borderTopRightRadius:Dimensions.getSize(2),
		  marginTop:Dimensions.getSize(6)
	  },
	  container:{
		backgroundColor:"#f0f0f0"
	}
})

module.exports = UserWelcomeView;