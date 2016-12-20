import React from 'react';
import { View, Text, Navigator, TouchableOpacity } from 'react-native';

let navigator = null;
const defaultConfig = Navigator.SceneConfigs.FadeAndroid;
const RouteHistory = {
  routeTable:[],
  curRoute:{ index:0, name:"/user/welcome", config:defaultConfig },
    // 修改当前路由，不适合后退页面，适合平行页面之间跳跃
  pushRoute(name, index, config) {
    index = index || 0;
    config = config || defaultConfig;
    this.routeTable = navigator ? navigator.getCurrentRoutes() : [];
    this.curRoute = { name, index, config };
    const existRoutes = this.routeTable.filter((ele, pos) => ele.name === name);

    if (navigator) {
      if (existRoutes.length > 0) {
        navigator.jumpTo(existRoutes[0]);
      } else {
        navigator.push({
          name, index, config
        });
      }
    }
  },
    // 重置route，适合首次初始化的时候
  resetToRoute(name, index, config) {
    index = index || 0;
    config = config || defaultConfig;
    this.routeTable = [];
    this.curRoute = { name, index, config };
    if (navigator) {
      navigator.resetTo({
        name, index, config
      });
    }
  },
    // 后退到上一级
  popRoute() {
    if (navigator) {
      navigator.pop();
    }
  },
    // 后退多级
  popToRoute(name) {
    const routes = navigator.getCurrentRoutes();
    const existRoutes = routes.filter((ele, pos) => ele.name === name);
    if (navigator && existRoutes.length > 0) {
      navigator.popToRoute(existRoutes[0]);
    }
  }
};
const RouterUtils = {
  createRoute(element, parentProps) {
    var location = `${parentProps.location}/${element.props.path}`,
      components = parentProps.components.concat([element.props.component]);
    return {
      location,
      components
    };
  },
  createRoutesByPropsChildren(children, parentProps) {
    var routes = [];
    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      const route = this.createRoute(element, parentProps);

      if (element.props.children instanceof Array) {
        route.routes = this.createRoutesByPropsChildren(element.props.children, route);
      } else if (element.props.children instanceof Object) {
        route.routes = this.createRoutesByPropsChildren([element.props.children], route);
      }
      routes.push(route);
    }

    return routes;
  },
  createRoutes(parentProps) {
    var parentRoute = {
      components:[parentProps.component],
      location:""
    };
    parentRoute.routes = this.createRoutesByPropsChildren(parentProps.children, parentRoute);
    return parentRoute;
  }
};
class Router extends React.Component {
  constructor(props) {
    super(props);
    const defaultRoute = props.defaultRoute || "/";
    RouteHistory.curRoute.name = defaultRoute;
    this.state = {
      location:  defaultRoute,
      routes:null,
      components:null,
    };
  }
  componentWillMount() {
    const routes = RouterUtils.createRoutes(this.props);
    const components = this._parseHash(routes, this.state.location);
    this.setState({
      routes,
      components
    });
  }
  componentDidMount() {
      // 全局navigator赋值
    navigator = this.refs.navigator;
  }
  componentWillUnmout() {
    window.removeEventListener("hashchange", this._handleHashChange);
  }
  _matchLocation(_location, hash) {
    const locations = _location.split("/");
    const hashs = hash.split("/");
    const props = { location:hash };
    if (locations.length === hashs.length) {
      const results = locations.filter((ele, pos) => {
        const _hash = hashs[pos];
        if (_hash.indexOf("?") !== -1) {
          const _hashs = _hash.split("?");
          hashs[pos] = _hashs[0];
          const eles = _hashs[1].split("&");
          for (let i = 0; i < eles.length; i++) {
            const objs = eles[i].split("=");
            props[objs[0]] = objs[1];
          }
        }
        if (ele.indexOf(":") !== -1) {
          props[ele.split(":")[1]] = hashs[pos];
          return true;
        } else {
          return ele === hashs[pos];
        }
      });
      return results.length === locations.length ? props : null;
    }
    return null;
  }
  _parseHashByRoutes(routes, hash) {
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      const props = this._matchLocation(route.location, hash);
      if (props) {
        route.props = props;
        return route;
      }
      if (route.routes) {
        const result = this._parseHashByRoutes(route.routes, hash);
        if (result != null) return result;
      }
    }
    return null;
  }
  _parseHash(routes, hash) {
    var route = this._parseHashByRoutes(routes.routes, hash);
    if (route == null) return (<Text>404</Text>);
    return this._createElementByComponents(route.components, route.props);
  }
  _createElementByComponent(component, components, props) {
    if (components.length > 1) {
      const _components = components.filter((ele, pos) => pos > 0);
      const child = this._createElementByComponent(_components[0], _components, props);
      return React.createElement(component, props, child);
    } else {
      return React.createElement(component, props, null);
    }
  }
  _createElementByComponents(components, props) {
    return this._createElementByComponent(components[0], components, props);
  }
  _handleHashChange(route, _navigator) {
    var hash = route.name;
    var components = this._parseHash(this.state.routes, hash);
    return components;
  }
  _handleConfigureScene(route, routeStack) {
      // PushFromRight FloatFromRight FloatFromLeft FloatFromBottom
      // FloatFromBottomAndroid FadeAndroid
      // HorizontalSwipeJump VerticalUpSwipeJump VerticalDownSwipeJump
    return route.config || Navigator.SceneConfigs.PushFromRight;
  }
  render() {
    return (
      <Navigator
        ref="navigator" initialRoute={{ name:this.props.defaultRoute, index:0 }}
        configureScene={this._handleConfigureScene.bind(this)}
        renderScene={this._handleHashChange.bind(this)}
      />
    );
  }
}
const Route = () => <View />;
class Link extends React.Component {
  handlePress(e) {
    // 先 生效点击事件
    if (this.props.onPress) {
      this.props.onPress(e);
    }
    const name = this.props.name;
    const index = this.props.index || 0;
    const config = this.props.config || Navigator.SceneConfigs.PushFromRight;
    RouteHistory.pushRoute(name, index, config);
  }
  render() {
    return (<TouchableOpacity onPress={this.handlePress}>
      <View style={this.props.style}>
        { this.props.children }
      </View>
    </TouchableOpacity>);
  }
}

module.exports.Router = Router;
module.exports.Route = Route;
module.exports.Link = Link;
module.exports.RouteHistory = RouteHistory;
