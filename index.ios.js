import React, {
  AppRegistry, Component, StyleSheet,
  Text, View, TouchableOpacity, TextInput
} from 'react-native'
import { applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { configureStore, createDecorator } from './js/store/index'
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import { reduxForm } from 'redux-form'
import { Button, Input, Radio, RadioGroup, CheckBox } from './js/components'

const store = configureStore(applyMiddleware(thunk, logger()))
const module = createDecorator(store)

const schema = {
  form: 'my form',
  fields: {
    name: {
      description: 'my new text field',
      type: 'TextField'
    }
  }
}

const Label = ({ children }) => <Text>{children}</Text>

const renderFields = (fields, schema) =>
  Object.keys(fields).map(field => {
    const currentSchema = schema.fields[field]
    const currentField = fields[field]
    const { type, description, validation } = currentSchema
    switch (type) {
      case 'TextField':
        return <View key={field}>
          {description && <Label>{description}</Label>}
          <Input {...currentField} />
        </View>
    }
    // return <View key={field}>
    //   <Text>{field}</Text>
    //   <Input {...fields[field]}/>
    // </View>
  })

const DynamicForm = reduxForm({form: 'dynamic'})
  (({ fields, schema }) =>
    <View>{renderFields(fields, schema)}</View>)

const getFields = ({ fields }) => Object.keys(fields)

const FamilyInfo = module('familyInfo')
  (({ api: { schema } }) =>
    <View>
      <DynamicForm fields={getFields(schema)} schema={schema} />
    </View>)

const Api = module('api', { schema })(() => <View />)

const ReactNativeComponents = () =>
  <Provider store={store}>
    <View style={{marginTop: 20}}>
      <Api />
      <FamilyInfo />
    </View>
  </Provider>

AppRegistry.registerComponent('ReactNativeComponents', () => ReactNativeComponents)
