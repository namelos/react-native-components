import React, { View, Text, TextInput, TouchableOpacity } from 'react-native'

export const Label = ({ children }) => <Text>{ children }</Text>

export const Button = ({children, onClick, style}) =>
  <TouchableOpacity onPress={onClick} style={style}>
    {typeof children === 'string' ?
      <Text>{children}</Text> : children }
  </TouchableOpacity>

const defaultInputStyle = {height: 20, borderColor: '#000', borderWidth: 1}

export const Input = ({value, onChange, style = defaultInputStyle}) =>
  <TextInput value={value} onChangeText={onChange} style={style}/>

const On = () => <Text>ON</Text>
const Off = () => <Text>OFF</Text>

export const Radio = ({value, onChange, children, True = <On />, False = <Off />}) =>
  <Button onClick={e => onChange(children)}>
    <Text>{children}</Text>
    {value === children ? True : False}
  </Button>

export const RadioGroup = ({options, ...rest}) => <View>
  { options.map(option => <Radio key={option} {...rest} >{option}</Radio>) }
</View>

export const CheckBox = ({value, onChange, children, True = <On />, False = <Off />}) =>
  <Button onClick={e => onChange(!value)}>
    <Text>{children}</Text>
    {value ? True : False}
  </Button>

export const CheckGroup = ({options, ...rest}) => <View>
  { options.map(option => <CheckBox option={option} {...rest} />) }
</View>
