import React, {
  AppRegistry, Component, StyleSheet, PropTypes, Children,
  Text, View, TouchableOpacity, TextInput, Navigator
} from 'react-native'

import { Provider } from 'react-redux'
import { store } from './js/index'
import { FamilyInfo, Api } from './js/form'
import { Button } from './js/components'
import { Route, Router } from './js/router'

const { func, object, string, shape, any, array } = PropTypes

/* --- */

const ReactNativeComponents = () =>
  <Provider store={store}>
    <View style={{marginTop: 20}}>
      <FamilyInfo />
    </View>
  </Provider>

// const PageOne = ({ navigator }, context) => <View>
//   <Text>PAGE ONE</Text>
//   <Button onClick={e => navigator.push({path: 'pageOne', component: PageTwo})}>To page two</Button>
//   <Button onClick={e => console.log(context)}>LOG CONTEXT</Button>
// </View>
//
// PageOne.contextTypes = {
//   routes: object,
//   navigator: any
// }

class PageOne extends Component {
  static contextTypes = {
    routes: object,
    navigator: any
  }

  render = () => <View>
    <Text>PAGE ONE</Text>
    <Button onClick={e => navigator.push({path: 'pageOne', component: PageTwo})}>To page two</Button>
    <Button onClick={e => console.log(this.context)}>LOG CONTEXT</Button>
  </View>
}

const PageTwo = ({ navigator }) => <View>
  <Text>PAGE TWO</Text>
  <Button onClick={e => navigator.pop()}>BACK</Button>
</View>

const App = () =>
  <Router>
    <Route index path="pageOne" component={PageOne} />
    <Route path="pageTwo" component={PageTwo} />
  </Router>

AppRegistry.registerComponent('ReactNativeComponents', () => App)
