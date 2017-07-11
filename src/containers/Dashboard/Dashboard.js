import React, {Component} from 'react';
import {connect} from 'react-redux';
import FlatButton from 'material-ui/FlatButton';
import { injectIntl, intlShape } from 'react-intl';
import { GitHubIcon } from '../../components/Icons';
import { Activity } from '../../containers/Activity';
import muiThemeable from 'material-ui/styles/muiThemeable';
import {Line} from 'react-chartjs-2';
import { withFirebase } from 'firekit';

const currentYear=new Date().getFullYear();
const daysPath=`/user_registrations_per_day/${currentYear}/${new Date().toISOString().slice(5, 7)}`;
const monthsPath=`/user_registrations_per_month/${currentYear}`;


class Dashboard extends Component {

  componentDidMount(){
    const { watchPath }=this.props;

    watchPath(daysPath);
    watchPath(monthsPath);

  }

  render() {

    const {muiTheme, intl, days, months}= this.props;


    let daysLabels=[];
    let daysData=[]

    if(days){
      Object.keys(days).sort().map(key =>{
        daysLabels.push(key);
        daysData.push(days[key]);
        return key;
      })
    }

    const daysComponentData = {
      labels: daysLabels,
      datasets: [
        {
          label: intl.formatDate(Date.now(),{month: 'long'}),
          fill: false,
          lineTension: 0.1,
          backgroundColor: muiTheme.palette.primary1Color,
          borderColor: muiTheme.palette.primary1Color,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: muiTheme.palette.accent1Color,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: muiTheme.palette.primary1Color,
          pointHoverBorderColor: muiTheme.palette.accent1Color,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: daysData
        }
      ]
    };

    let monthsLabels=[];
    let monthsData=[]

    if(months){
      Object.keys(months).sort().map(key =>{

        let date=new Date(`${currentYear}-${key}-1`);
        monthsLabels.push(intl.formatDate(date,{month: 'long'}));


        monthsData.push(months[key]);
        return key;
      })
    }

    const monthsComponentData = {
      labels: monthsLabels,
      datasets: [
        {
          label: intl.formatMessage({id: 'user_registrationg_graph_label'}),
          fill: false,
          maintainAspectRatio: true,
          lineTension: 0.1,
          backgroundColor: muiTheme.palette.primary1Color,
          borderColor: muiTheme.palette.primary1Color,
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: muiTheme.palette.accent1Color,
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: muiTheme.palette.primary1Color,
          pointHoverBorderColor: muiTheme.palette.accent1Color,
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
          data: monthsData
        }
      ]
    };

    return (
      <Activity
        iconElementRight={
          <FlatButton
            style={{marginTop: 4}}
            href="https://github.com/TarikHuber/react-most-wanted"
            target="_blank"
            rel="noopener"
            secondary={true}
            icon={<GitHubIcon/>}
          />
        }
        title={intl.formatMessage({id: 'dashboard'})}>

        <div style={{margin: 5, display: 'flex', flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
          <div style={{flexGrow: 1, flexShrink: 1, maxWidth: 600}}>
            <Line
              options={{
                maintainAspectRatio: true,
              }}
              data={monthsComponentData}
            />
          </div>
          <div style={{flexGrow: 1, flexShrink: 1, maxWidth: 600}}>
            <Line
              options={{
                maintainAspectRatio: true,
              }}
              data={daysComponentData}
            />
          </div>
        </div>

      </Activity>
    );
  }

}

Dashboard.propTypes = {
  intl: intlShape.isRequired,
};

const mapStateToProps = (state) => {
  const { paths } = state;

  return {
    days: paths[daysPath],
    months: paths[monthsPath],
  };
};

export default connect(
  mapStateToProps
)(injectIntl(muiThemeable()(withFirebase(Dashboard))));
