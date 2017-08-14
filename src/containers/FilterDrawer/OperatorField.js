import React from 'react';
import SuperSelectField from 'material-ui-superselectfield';
import * as filterSelectors from '../../store/filters/selectors';


export class OperatorField extends React.Component {

  getFieldType = (currentField) => {
    const { fields } = this.props;

    let fieldType = '';

    fields.map((field) => {
      if(field.name === currentField.value) {
        fieldType = field.type;
      }
      return field;
    });

    return fieldType;
  }

  render() {

    const { queryIndex, currentField, query, fields, operators, handleQueryChange, formatMessage } = this.props;
    const { operator } = filterSelectors.selectQueryProps(query);


    if(queryIndex===undefined ||
       currentField===undefined ||
       currentField===null ||
       query===undefined ||
       handleQueryChange===undefined ||
       fields === undefined)
    {
      return (<div></div>);
    }

    const fieldType = this.getFieldType(currentField);

    let divFields = [];

    operators.map((operator) => {
      if(operator.type === fieldType || (operator.type === 'string' && fieldType === undefined)) {
        operator.operators.map((op)=>{
          return (
            divFields.push(
              <div
                value={op.value}
                key={op.value}
                label={op.label}>
                {op.label}
              </div>
            )
          );
        });
      }
      return divFields;
    });
    return (

      <div style={{flexGrow: 1}}>
        <SuperSelectField
          name='operator'
          value={operator}
          showAutocompleteThreshold={4}
          hintTextAutocomplete={formatMessage?formatMessage({id: 'hint_autocomplete'}):''}
          noMatchFound={formatMessage?formatMessage({id: 'not_match_found'}):''}
          onChange={(val)=>{handleQueryChange(queryIndex, 'operator', val)}}
          hintText={formatMessage?formatMessage({id:'select_field'}):''}
          style={{marginLeft: 15, marginRight: 10 }}>
          {
            divFields.map((divField) => divField)
          }
        </SuperSelectField>
      </div>
    );


  }


}
