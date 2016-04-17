import React, {
  AppRegistry, Component, StyleSheet,
  Text, View, TouchableOpacity, TextInput
} from 'react-native'
import { applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { configureStore, createDecorator } from './js/store/index'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { Button, Input, Radio, RadioGroup, CheckBox } from './js/components'


// const Button = ({children, onClick, style}) =>
//   <TouchableOpacity onPress={onClick} style={style}>
//     {typeof children === 'string' ?
//       <Text>{children}</Text> : children }
//   </TouchableOpacity>

// class ReactNativeComponents extends Component {
//   state = {
//     value: 'nothing happens',
//     checkGroup: []
//   }
//
//   handler = message => this.setState({value: message})
//
//   handleBoolean = e => this.handler(typeof e === 'boolean' ? e + '' : e)
//
//   handleClick = e => this.handler('clicked!')
//
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text>{this.state.value}</Text>
//         <Button onClick={this.handleClick}>My buttons</Button>
//         <Input value={this.state.value}
//                onChange={this.handler}/>
//         <RadioGroup value={this.state.value}
//                     onChange={this.handler}
//                     options={['foo', 'bar', 'baz']}/>
//         <CheckBox value={this.state.value} onChange={this.handleBoolean} />
//       </View>
//     )
//   }
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

const store = configureStore(
  applyMiddleware(logger())
)
const decorator = createDecorator(store)

const Counter = decorator('api', {
  form: 'my form',
  properties: {
    name: {
      type: 'TextField'
    }
  }
}, {
  log: state => { console.log(state); return state }
})(({ log }) => <View style={styles.container}>
  <Button onClick={log}>LOG</Button>
</View>)

const ReactNativeComponents = () => <Provider store={store}>
  <Counter />
</Provider>

AppRegistry.registerComponent('ReactNativeComponents', () => ReactNativeComponents);
