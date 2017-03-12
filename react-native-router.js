import React from 'react';
import {View,Text,Navigator,TouchableOpacity} from 'react-native';

const navigator = null;
const defaultConfig = Navigator.SceneConfigs.FadeAndroid;
export const RouteHistory = {
    routeTable:[],
    curRoute:{index:0,name:"/user/welcome",config:defaultConfig},
    // 修改当前路由，不适合后退页面，适合平行页面之间跳跃
    pushRoute(name,index,config){
        index = index?index:0;
		config = config?config:defaultConfig;
        this.routeTable = navigator.getCurrentRoutes();
        this.curRoute = { name:name, index:index, config:config };
		const existRoutes = this.routeTable.filter(function(ele,pos){ return ele.name==name });
		
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
    resetToRoute(name,index,config){
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
    popRoute(){
        if(navigator){
            navigator.pop();
        }
    },
    // 后退多级
    popToRoute(name){
        let routes = navigator.getCurrentRoutes();
        let existRoutes = routes.filter(function(ele,pos){ return ele.name==name });
        if(navigator && existRoutes.length>0){
            navigator.popToRoute(existRoutes[0]);
        }
    }
};
const RouterUtils = {
    createRoute(element,parentProps){
        const location=parentProps.location+"/"+element.props.path;
        const components=parentProps.components.concat([element.props.component]);
        return {
            location:location,
            components: components
        }
    },
    createRoutesByPropsChildren(children,parentProps){
        const routes = [];
        for(let i=0;i<children.length;i++){
            const element = children[i];
            const route = this.createRoute(element,parentProps)
            
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
    createRoutes(parentProps){
        const parentRoute = {
            components:[parentProps.component],
            location:""
        }
        parentRoute.routes = this.createRoutesByPropsChildren(parentProps.children,parentRoute);
        return parentRoute;
    }
};
export class Router extends React.Component{
  constructor(props){
		super(props)
		this.state = { 
			location: props.defaultRoute ?props.defaultRoute:"/",
			routes:null,
			components:null,
		};
	}
  componentWillMount(){
      const routes = RouterUtils.createRoutes(this.props);
      const components = this._parseHash(routes,this.state.location);
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
      const locations = _location.split("/");
      const hashs = hash.split("/");
      const props = { location:hash }
      if(locations.length==hashs.length){
           const results = locations.filter(function(ele,pos){
               const _hash = hashs[pos];
               if(_hash.indexOf("?")!=-1){
                    const _hashs = _hash.split("?");
                    hashs[pos] = _hashs[0];
                    const eles = _hashs[1].split("&");
                    for(let i=0;i<eles.length;i++){
                        const objs = eles[i].split("=");
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
     for(let i=0;i<routes.length;i++){
         const route = routes[i];
         const props = this._matchLocation(route.location,hash);
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
      const route = this._parseHashByRoutes(routes.routes,hash);
      if(route==null) return (<Text>404</Text>);
      return this._createElementByComponents(route.components,route.props);
   }
    _createElementByComponent(component,components,props){
        if(components.length>1){
            const _components = components.filter(function(ele,pos){return pos>0});
            const child = this._createElementByComponent(_components[0], _components,props);
            return React.createElement(component,props,child);
        }else{
            return React.createElement(component,props,null);
        }
    }
    _createElementByComponents(components,props){
            return this._createElementByComponent(components[0],components,props)
    }
  _handleHashChange(route,navigator){
      const hash = route.name;
      const components = this._parseHash(this.state.routes,hash);
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
      <Navigator ref="navigator" initialRoute={{name:this.props.defaultRoute,index:0}} 
      configureScene={()=>this._handleConfigureScene(route,routeStack)} 
      renderScene={(route,navigator)=>this._handleHashChange(route,navigator)}>
      </Navigator>
    );
  }
};
export const Route = ()=>{ return (<View></View>)};
export class Link extends React.Component{
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
        return (<TouchableOpacity onPress={(e)=>this.handlePress(e)}>
					<View style={this.props.style}>
						{ this.props.children }
					</View>
                </TouchableOpacity>)
    }
};
 
export default {
    Router,
    Route,
    Link,
    RouteHistory,
}

