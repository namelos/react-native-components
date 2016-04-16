import React, { AppRegistry, Component, StyleSheet, Text, View, TouchableOpacity } from 'react-native'

const Button = ({ children, onClick, style }) =>
  <TouchableOpacity onPress={onClick}>
    <Text>{children}</Text>
  </TouchableOpacity>

class ReactNativeComponents extends Component {
  constructor() {
    super()
    this.state = { text: 'nothing happens.' }
    this.handleClick.bind(this)
  }
  
  handleClick(message) {
    return e => this.setState({ text: message })
  }
  
  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.text}</Text>
        <Button onClick={this.handleClick('button clicked.')}>My button</Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactNativeComponents', () => ReactNativeComponents);
