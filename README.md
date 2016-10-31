# similar-react-native-router

similar react-native-router

## 安装

	npm install --save similar-react-native-router
	
## 用法

```js

import {Router,Route,Link,RouteHistory} from 'similar-react-native-router';

var RouterApp = ()=>{
	return (<Router defaultRoute="/home/index" path="/" component={MainApp}>
					<Route component={HomeView} path="home">
							<Route component={HomeIndexView} path="index"></Route>
							<Route component={HomeListView} path="list/:subject"></Route>
							<Route component={HomeDetails} path="details/:id"></Route>
					</Route>
				</Router>)
}
```

## API

- Router 定义根路由，指定defaultRoute(默认路由)
    - path 路由名称，这里指定为"/" `String`
    - component 路由对应的组件 `React.Component`
    - defaultRoute 默认路由 `String`
- Route 定义路由，可包含子路由，允许定义[:id]格式路由，默认允许传递[?id=xxx]方式
    - path 路由名称，这里指定为"/" `String`
    - component 路由对应的组件 `React.Component`
    - children 子路由 `Array<Route> or <Route>`
- Link 简单路由链接
    - name 跳转到的路由名称 `String`
    - onPress 路由点击回调函数，内部已经实现路由跳转 `Function`
	- config 跳转动画方式 `Navigator.SceneConfigs`
- RouteHistory 路由操纵，注意以下是属性或者方法，非props。
    - pushRoute 修改当前路由，不适合后退页面，适合平行页面之间跳跃 `Function(name,index,config)`
	- resetToRoute 重置route，适合首次初始化的时候，例如登录应用过后 `Function(name,index,config)`
	- popRoute 后退到上一级 `Function`
	- popToRoute 后退多级 `Function(name)`
    - curHash 当前路由 `String`
	

## 特点

1. similar-react-native-router采用ES6写法。

2. 高度模仿react-router组件，采用Navigator实现，使用便捷。

## 联系方式

Email: [liuhong1happy](liuhong1.happy@163.com)