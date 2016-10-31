import React from 'react';
import {View,Text,Navigator,TouchableOpacity} from 'react-native';

var navigator = null;
var defaultConfig = Navigator.SceneConfigs.FadeAndroid;
var RouteHistory = {
    routeTable:[],
    curRoute:{index:0,name:"/user/welcome",config:defaultConfig},
    // 修改当前路由，不适合后退页面，适合平行页面之间跳跃
    pushRoute:function(name,index,config){
        index = index?index:0;
		config = config?config:defaultConfig;
        this.routeTable = navigator.getCurrentRoutes();
        this.curRoute = { name:name, index:index, config:config };
		var existRoutes = this.routeTable.filter(function(ele,pos){ return ele.name==name });
		
        if(navigator){
			if(existRoutes.length>0){
				navigator.jumpTo(existRoutes[0])
			}else{
				navigator.push({
					name:name,index:index,config:config
				})
			}
        }
    },
    // 重置route，适合首次初始化的时候
    resetToRoute:function(name,index,config){
        index = index?index:0;
		config = config?config:defaultConfig;
        this.routeTable = [];
        this.curRoute = { name:name, index:index, config:config };
        if(navigator){
            navigator.resetTo({
                name:name,index:index,config:config
            })
        }
    },
    // 后退到上一级
    popRoute:function(){
        if(navigator){
            navigator.pop();
        }
    },
    // 后退多级
    popToRoute:function(name){
        var routes = navigator.getCurrentRoutes();
        var existRoutes = routes.filter(function(ele,pos){ return ele.name==name });
        if(navigator && existRoutes.length>0){
            navigator.popToRoute(existRoutes[0]);
        }
    }
};
var RouterUtils = {
    createRoute:function(element,parentProps){
        var location=parentProps.location+"/"+element.props.path,
            components=parentProps.components.concat([element.props.component]);
        return {
            location:location,
            components: components
        }
    },
    createRoutesByPropsChildren:function(children,parentProps){
        var routes = new Array();
        for(var i=0;i<children.length;i++){
            var element = children[i];
            var route = this.createRoute(element,parentProps)
            
            if(element.props.children instanceof Array){
                route.routes = this.createRoutesByPropsChildren(element.props.children, route)
            }
            else if(element.props.children instanceof Object){
                route.routes = this.createRoutesByPropsChildren([element.props.children], route)
            }
            routes.push(route);
        }
         
        return routes;
    },
    createRoutes:function(parentProps){
            var parentRoute = {
                components:[parentProps.component],
                location:""
            }
            parentRoute.routes = this.createRoutesByPropsChildren(parentProps.children,parentRoute);
            return parentRoute;
    }
};
class Router extends React.Component{
  constructor(props){
		super(props)
		this.state = { 
			location: props.defaultRoute ?props.defaultRoute:"/",
			routes:null,
			components:null,
		};
	}
  componentWillMount(){
      var routes = RouterUtils.createRoutes(this.props);
      var components = this._parseHash(routes,this.state.location);
      this.setState({
          routes:routes,
          components:components
      })
  }
  componentDidMount(){
      // 全局navigator赋值
     navigator = this.refs.navigator;
  }
  componentWillUnmout(){
      window.removeEventListener("hashchange",this._handleHashChange)
  }
  _matchLocation(_location,hash){
      var locations = _location.split("/");
      var hashs = hash.split("/");
      var props = { location:hash }
      if(locations.length==hashs.length){
           var results = locations.filter(function(ele,pos){
               var _hash = hashs[pos];
               if(_hash.indexOf("?")!=-1){
                    var _hashs = _hash.split("?");
                    hashs[pos] = _hashs[0];
                    var eles = _hashs[1].split("&");
                    for(var i=0;i<eles.length;i++){
                        var objs = eles[i].split("=");
                        props[objs[0]] = objs[1];
                    }
               }
               if(ele.indexOf(":")!=-1){
                   props[ele.split(":")[1]] = hashs[pos];
                   return true;
               }else{
                   return ele == hashs[pos];
               }
           }) 
           return results.length == locations.length?props:null;
      }
      return null;
  }
  _parseHashByRoutes(routes,hash){
     for(var i=0;i<routes.length;i++){
         var route = routes[i];
         var props = this._matchLocation(route.location,hash);
         if(props){
             route.props = props;
             return route;
         }
         if(route.routes){
             var result = this._parseHashByRoutes(route.routes,hash);
             if(result!=null) return result;
         }
     }
     return null;
  }
  _parseHash(routes,hash){
      var route = this._parseHashByRoutes(routes.routes,hash);
      if(route==null) return (<Text>404</Text>);
      return this._createElementByComponents(route.components,route.props);
   }
    _createElementByComponent(component,components,props){
        if(components.length>1){
            var _components = components.filter(function(ele,pos){return pos>0});
            var child = this._createElementByComponent(_components[0], _components,props);
            return React.createElement(component,props,child);
        }else{
            return React.createElement(component,props,null);
        }
    }
    _createElementByComponents(components,props){
            return this._createElementByComponent(components[0],components,props)
    }
  _handleHashChange(route,navigator){
      var hash = route.name;
      var components = this._parseHash(this.state.routes,hash);
      return components;
  }
  _handleConfigureScene(route,routeStack){
      // PushFromRight FloatFromRight FloatFromLeft FloatFromBottom 
      // FloatFromBottomAndroid FadeAndroid
      // HorizontalSwipeJump VerticalUpSwipeJump VerticalDownSwipeJump
      return route.config || Navigator.SceneConfigs.PushFromRight;
  }
  render() {     
    return (
      <Navigator ref="navigator" initialRoute={{name:this.props.defaultRoute,index:0}} configureScene={this._handleConfigureScene} renderScene={this._handleHashChange}>
      </Navigator>
    );
  }
};
var Route = ()=>{ return (<View></View>)};
class Link extends React.Component{
    handlePress(e){
		// 先 生效点击事件
        if(this.props.onPress){
            this.props.onPress(e);
        }
        var name = this.props.name;
        var index = this.props.index || 0;
        var config = this.props.config || Navigator.SceneConfigs.PushFromRight;
        RouteHistory.pushRoute(name,index,config);
    }
    render(){
        return (<TouchableOpacity onPress={this.handlePress}>
					<View style={this.props.style}>
						{ this.props.children }
					</View>
                </TouchableOpacity>)
    }
};
 
module.exports.Router = Router;
module.exports.Route = Route;
module.exports.Link = Link;
module.exports.RouteHistory = RouteHistory;