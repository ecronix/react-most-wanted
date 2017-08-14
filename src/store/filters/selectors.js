import { formatDateToString } from '../../utils/dateTime'
import config from '../../config';


export const STRING_TYPE = 'string';
export const NUMBER_TYPE = 'number';
export const DATE_TYPE = 'date';
export const TIME_TYPE = 'time';
export const ARRAY_TYPE = 'array';
export const SELECT_FIELD_TYPE = 'select_field';


function getValue(snapshot, fieldName, isCaseSensitive){

  if(snapshot!==undefined && snapshot!==null){
    const fieldValue=snapshot.val[fieldName];

    var options = {year: 'numeric', month: 'numeric', day: 'numeric' };
    const tempDate = new Date(fieldValue);

    if(tempDate.toString() !== "Invalid Date") {
      return fieldValue.toLocaleString('de-DE', options);
    } else if(typeof fieldValue === 'object' || fieldValue instanceof Object){
      if(fieldValue.hasOwnProperty('label')){
        return isCaseSensitive===true?fieldValue.label:fieldValue.label.toUpperCase();
      }
    } else if(fieldValue === 'true' || fieldValue === 'false' || fieldValue === undefined) {
      return fieldValue===undefined?'false':fieldValue;
    } else {
      return isCaseSensitive===true?fieldValue:fieldValue.toUpperCase();
    }

  }

  return undefined;
}


export function dynamicSort(sortField, sortOrientation) {
  var sortOrder = sortOrientation?1:-1;

  return (x,y) => {
    var a = getValue(x, sortField);
    var b = getValue(y, sortField);
    var result = (a < b) ? -1 : (a > b) ? 1 : 0;
    return result * sortOrder;
  }

}

export function selectFilterProps(filterName, filters){

  let isOpen=false;
  let hasFilters=false;
  let sortField=null;
  let sortOrientation=true;
  let queries=[];

  if(filters[filterName]!==undefined){
    const filter=filters[filterName];

    isOpen=filter.isOpen!==undefined?filter.isOpen:isOpen;
    hasFilters=filter.queries!==undefined?filter.queries.length:hasFilters;
    sortField=filter.sortField!==undefined?filter.sortField:sortField;
    sortOrientation=filter.sortOrientation!==undefined?filter.sortOrientation:sortOrientation;
    queries=filter.queries!==undefined?filter.queries:queries;
  }

  return {
    isOpen,
    hasFilters,
    sortField,
    sortOrientation,
    queries
  };
}

export function selectQueryProps(query){

  let value='';
  let operator=undefined;
  let field=undefined;
  let isCaseSensitive=false;
  let isSet=false;

  if(query!==undefined){
    value=query.value!==undefined?query.value:value;
    operator=query.operator!==undefined?query.operator:operator;
    field=query.field!==undefined?query.field:field;
    isCaseSensitive=query.isCaseSensitive!==undefined?query.isCaseSensitive:isCaseSensitive;
    isSet=field!==undefined&&field!==null&&operator!==undefined&&operator!==null&&value!==undefined;
  }

  return {
    value,
    operator,
    field,
    isCaseSensitive,
    isSet
  };
}


export function getFilteredList(filterName, filters, list){
  const { sortField, sortOrientation, queries } = selectFilterProps(filterName, filters);

  let result=list;

  if(list!==undefined && queries.length){

    result=list.filter((row, i)=>{

      let show=true;

      for (let query of queries) {

        const { value, operator, field, isCaseSensitive, isSet } = selectQueryProps(query);

        if(isSet){

          let fieldValue = getValue(row, field.value, isCaseSensitive);
          let queryValue = value;

          const yearMonthDayOptions = { year: 'numeric', month: '2-digit', day: '2-digit' }
          const tempDate = new Date(fieldValue);
          if(fieldValue !== undefined && tempDate.toString() !== "Invalid Date") {


            const queryDateString = new Date(queryValue).toLocaleString('de-DE', config.date_format_options);
            const fieldDateString = new Date(fieldValue).toLocaleString('de-DE', config.date_format_options);

            const queryDate = formatDateToString(queryDateString, yearMonthDayOptions, 'ko-KR'); //ko-KR beacuse it is year-month-date
            const fieldDate = formatDateToString(fieldDateString, yearMonthDayOptions, 'ko-KR');

            switch (operator.value) {

              case '=':
              if(queryDateString === '') {
                show = false;
              } else {
                show = (fieldDateString === queryDateString);
              }
              break;

              case '!=':
              show = (fieldDateString !== queryDateString);
              break;

              case '>':
              show = fieldDate>queryDate;
              break;

              case '>=':
              show=fieldDate>=queryDate;
              break;

              case '<':
              show=fieldDate<queryDate;
              break;

              case '<=':
              show=fieldDate<=queryDate;
              break;

              default:
              break;
            }
          }
          else if(fieldValue===undefined) {
            show=String(queryValue)==='false' || queryValue === false || queryValue === '' || queryValue === undefined;
          }
          else if( fieldValue!==undefined && (fieldValue === 'true' ||
                                              fieldValue === 'false' ||
                                              fieldValue === true ||
                                              fieldValue === false))
          {
            show=fieldValue===(queryValue?String(queryValue):'false');
          }

          else if( fieldValue!==undefined && (typeof fieldValue === 'string' || fieldValue instanceof String)){
            const valueString = String(value);
            let queryValueString=isCaseSensitive===true?valueString:valueString.toUpperCase();

            switch (operator.value) {
              case 'like':
              show=fieldValue.indexOf(queryValueString) !== -1;
              break;

              case 'notlike':
              show=fieldValue.indexOf(queryValueString) === -1;
              break;

              case '=':
              show=fieldValue===queryValueString;
              break;

              case '>':
              show=fieldValue.localeCompare(queryValueString)>0;
              break;

              case '>=':
              show=fieldValue.localeCompare(queryValueString)>=0;
              break;

              case '<':
              show=fieldValue.localeCompare(queryValueString)<0;
              break;

              case '<=':
              show=fieldValue.localeCompare(valueString)<=0;
              break;

              default:
              break;

            }

          }else{
            if(operator.value==='novalue'){
              show=true; //If the field value is not set
            }else{
              show=false; //If the field value is not set
            }
          }

        }else{
          show=true; //If the query is not completed
        }

        if(!show){
          return false; //We return false if one of all queries doesn't match
        }
      }

      return show;
    })

  }

  if(result!==undefined && sortField!==null){
    result.sort(dynamicSort(sortField.value, sortOrientation));
  }

  return result;
}
