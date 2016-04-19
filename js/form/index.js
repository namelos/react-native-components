import { reduxForm } from 'redux-form'
import { module } from '../'

const schema = {
  form: 'my form',
  endpoint: '/post/api',
  fields: {
    name: {
      description: 'my new text field',
      type: 'TextField',
      validate: {
        required: {
          error: 'please fill in the blank'
        }
      }
    },
    sex: {
      validate: 'your gender',
      type: 'RadioGroup',
      options: ['male', 'female']
    }
  }
}

const getValidate = schema => values => {
  const errors = {}
  Object.keys(schema.fields).forEach(field => {
    const currentField = schema.fields[field]
    const {validate} = currentField

    if (validate) {
      const {required} = validate
      if (required && !(require.value === false)) {
        if (!values[field]) {
          errors[field] = required.error
        }
      }
    }
  })

  return errors
}

const renderField = (field, { type, options }) => {
  switch (type) {
    case 'TextField': return <Input {...field} />
    case 'RadioGroup': return <RadioGroup options={options} {...field} />
  }
}

const renderFields = (fields, schema) =>
  Object.keys(fields).map(field => {
    const currentSchema = schema.fields[field]
    const currentField = fields[field]
    const {error} = currentField
    const {description} = currentSchema
    return <View key={field}>
      {description && <Label>{description}</Label>}
      {renderField(currentField, currentSchema)}
      {error && <Label>{error}</Label>}
    </View>
  })

const ReduxForm = reduxForm({})
(({ fields, schema }) =>
  <View>{renderFields(fields, schema)}</View>)

const DynamicForm = ({ schema }) =>
  <ReduxForm form={schema.form}
             fields={Object.keys(schema.fields)}
             validate={getValidate(schema)}
             schema={schema} />

export const FamilyInfo = module('familyInfo')
(({api:{schema}}) =>
  <View>
    <DynamicForm schema={schema} />
  </View>)

export const Api = module('api', { schema })
