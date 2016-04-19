import React, {Component, PropTypes, Children, Navigator} from 'react-native'
const { object, any } = PropTypes

const renderScene = (route, navigator) =>
  <route.component {...route.params} navigator={navigator} />

export class Router extends Component {
  static childContextTypes = {
    routes: object,
    navigator: any
  }

  getChildContext() {
    const routes = {}
    Children.forEach(this.props.children, child =>
      routes[child.props.path]= child.props.component)

    return {
      navigator: this.refs.navigator,
      routes
    }
  }

  renderScene = (route, navigator) =>
    <route.component {...route.params} navigator={navigator} />

  render = () => {
    const {path, component} = Children
      .toArray(this.props.children)
      .filter(child =>
        child.props.index)[0].props

    const index = { path, component }

    return <Navigator
      ref="navigator"
      initialRoute={index}
      configureScene={ route => Navigator.SceneConfigs.VerticalDownSwipeJump }
      renderScene={this.renderScene}
    />
  }
}

// export const Router = ({ children }) => {
//
//   const {path, component} = Children
//     .toArray(children)
//     .filter(child =>
//       child.props.index)[0].props
//
//   const index = { path, component }
//
//   return <Navigator
//     ref={ref => global.nav = ref}
//     initialRoute={index}
//     configureScene={ route => Navigator.SceneConfigs.VerticalDownSwipeJump }
//     renderScene={renderScene}
//     style={{marginTop: 20}}
//   />
// }

export const Route = props => null
Route.displayName = 'Route'
