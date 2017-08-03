import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import SuperSelectField from 'material-ui-superselectfield';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import muiThemeable from 'material-ui/styles/muiThemeable';
import * as filterActions from '../../store/filters/actions';
import * as filterSelectors from '../../store/filters/selectors';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import config from '../../config';
import { OperatorField } from './OperatorField'
import { SearchField } from './SearchField'


class FilterDrawer extends Component {

  handleCloseFilter = () => {
    const { setFilterIsOpen, name } = this.props;

    setFilterIsOpen(name, false);
  }

  handleSortFieldChange = (selectedField, fieldName) => {
    const { setFilterSortField, name } = this.props;

    setFilterSortField(name, selectedField);
  }

  handleSortOrientationChange = (orientation) => {
    const { setFilterSortOrientation, name } = this.props;

    setFilterSortOrientation(name, orientation);
  }

  handleAddFilterQuery = () => {
    const { addFilterQuery, name, intl } = this.props;

    addFilterQuery(name, {operator: {value: 'like', label: intl.formatMessage({id: 'operator_like_label'})}});
  }

  handleQueryChange = (index, field, value, operator) => {
    const { editFilterQuery, name } = this.props;

    if (operator === undefined) {
      editFilterQuery(name, index, {[field]: value});
    } else {
      editFilterQuery(name, index, {[field]: value, operator: operator});
    }
  }

  getFieldType = (currentField) => {
    const { fields } = this.props;

    if (!currentField) {
      return undefined;
    }

    let fieldType = '';

    fields.map((field) => {
      if(field.name === currentField.value) {
        fieldType = field.type;
      }
      return field;
    });

    return fieldType;
  }

  getFirstOperator = (currentField) => {
    const { operators } = this.props;
    const fieldType = this.getFieldType(currentField);

    if(!fieldType) {
      return undefined;
    }

    let op = undefined;

    operators.map((operator) => {
      if(operator.type === fieldType || (operator.type === 'string' && fieldType === undefined)) {
        op = { value: operator.operators[0].value, label: operator.operators[0].label };
      }
      return op;
    });

    return op;
  }

  handleFieldChange = (i, field, val) => {
    const operator = this.getFirstOperator(val);

    this.handleQueryChange(i, field, val, operator)
  }



  handleQueryDelete = (index) => {
    const { removeFilterQuery, name }= this.props;

    removeFilterQuery(name, index);
  }


  render() {
    const { muiTheme, intl, filters, name, fields, operators }= this.props;

    const { isOpen, sortField, sortOrientation, queries } = filterSelectors.selectFilterProps(name, filters);

    return (
      <Drawer width={config.filter_drawer_width} openSecondary={true} open={isOpen} >
        <AppBar
          title={intl.formatMessage({id:'filter'})}
          onLeftIconButtonTouchTap={this.handleCloseFilter}
          iconElementLeft={
            <IconButton
              tooltipPosition={'bottom-right'}
              tooltip={intl.formatMessage({id:'close_filter'})}>
              <FontIcon className="material-icons" >chevron_right</FontIcon>
            </IconButton>
          }
        />
        <div>
          <div style={{display: 'flex', flexDirectiaron: 'row', alignItems: 'center'}}>
            <Subheader style={{maxWidth: config.filter_drawer_width-67}}>{intl.formatMessage({id:'sorting'})}</Subheader>
            <div>
              <IconButton
                style={{padding: 0}}
                onTouchTap={()=>{this.handleSortOrientationChange(!sortOrientation)}}
                tooltipPosition={'bottom-left'}
                tooltip={intl.formatMessage({id:'change_sort_orientation'})}>
                <FontIcon
                  className="material-icons"
                  color={sortOrientation===false?muiTheme.palette.accent1Color:muiTheme.palette.primary1Color}>
                  sort_by_alpha
                </FontIcon>
              </IconButton>
            </div>
          </div>

          <div >
            <div>
              <SuperSelectField
                name='sortField'
                value={sortField}
                onChange={this.handleSortFieldChange}
                fullWidth={true}
                showAutocompleteThreshold={4}
                hintTextAutocomplete={intl.formatMessage({id: 'hint_autocomplete'})}
                noMatchFound={intl.formatMessage({id: 'not_match_found'})}
                hintText={intl.formatMessage({id:'select_field'})}
                style={{marginLeft: 15, marginRight: 10}}>
                {fields.map((field)=>{
                  return <div
                    value={field.name}
                    key={field.name}
                    label={field.label}>
                    {field.label}
                  </div>
                })}
              </SuperSelectField>
              <br/>
            </div>
          </div>
          <Divider />
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Subheader style={{maxWidth: config.filter_drawer_width-67}}>{intl.formatMessage({id:'filters'})}</Subheader>
            <div>
              <IconButton
                style={{padding: 0}}
                onTouchTap={this.handleAddFilterQuery}
                tooltipPosition={'bottom-left'}
                tooltip={intl.formatMessage({id:'add_filter'})}>
                <FontIcon
                  className="material-icons"
                  color={muiTheme.palette.primary1Color}>
                  add_circle
                </FontIcon>
              </IconButton>
            </div>
          </div>

          {queries.map((query, i)=>{
            const { field } = filterSelectors.selectQueryProps(query);

            return  <div key={i}>
              <div>
                <br/>
                <SuperSelectField
                  name='field'
                  value={field}
                  showAutocompleteThreshold={4}
                  hintTextAutocomplete={intl.formatMessage({id: 'hint_autocomplete'})}
                  noMatchFound={intl.formatMessage({id: 'not_match_found'})}
                  onChange={(val)=>{this.handleFieldChange(i, 'field', val)}}
                  hintText={intl.formatMessage({id:'select_field'})}
                  style={{marginLeft: 15, marginRight: 10 }}>
                  {fields.map((field)=>{
                    return <div
                      value={field.name}
                      key={field.name}
                      label={field.label}>
                      {field.label}
                    </div>
                  })}
                </SuperSelectField>
              </div>
              <br/>
              <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>

                <OperatorField
                  queryIndex={i}
                  currentField={field}
                  query={query}
                  fields={fields}
                  operators={operators}
                  handleQueryChange={this.handleQueryChange}
                  intl={intl}
                />


                <div>
                  <IconButton
                    style={{padding: 0}}
                    onTouchTap={()=>{this.handleQueryDelete(i)}}
                    tooltipPosition={'bottom-left'}
                    tooltip={intl.formatMessage({id:'delete_filter'})}>
                    <FontIcon
                      className="material-icons"
                      color={muiTheme.palette.accent1Color}>
                      delete
                    </FontIcon>
                  </IconButton>
                </div>

              </div>


              <SearchField
                queryIndex={i}
                currentField={field}
                query={query}
                muiTheme={muiTheme}
                intl={intl}
                handleQueryChange={this.handleQueryChange}
                fields={fields}
              />


              <Divider />
            </div>
          })}

        </div>
      </Drawer>
    );
  }

}

FilterDrawer.propTypes = {
  intl: intlShape.isRequired,
  muiTheme: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  fields: PropTypes.array.isRequired,
  setFilterIsOpen: PropTypes.func.isRequired,
};


const mapStateToProps = (state) => {
  const { filters, intl } = state;

  return {
    filters,
    intl,
  };
};

export default connect(
  mapStateToProps, {...filterActions}
)(injectIntl(muiThemeable()(FilterDrawer)));
