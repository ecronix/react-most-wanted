import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import Person from '../../components/Person/Person'
import Paper from '@material-ui/core/Paper'

class Companies extends Component {
  state = {}

  componentDidMount() {
    try {
      this.setState({
        companies: JSON.parse(localStorage.getItem('users')) || [],
      })
    } catch (error) {}

    try {
      axios
        .get('https://www.react-most-wanted.com/api/users?limit=5')
        .then(({ data, status }) => {
          if (status === 200) {
            this.setState({
              users: data.users.reverse(),
            })

            localStorage.setItem('users', JSON.stringify(data.users))
          }
        })
    } catch (error) {
      console.log('error', error)
    }
  }

  render() {
    const { users = [] } = this.state

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-around',
          flexDirection: 'row',
          width: '100%',
          marginTop: 30,
          flexWrap: 'wrap',
        }}
      >
        {users &&
          users.map(item => {
            return (
              <Paper
                key={item.uid}
                style={{
                  textAlign: 'center',
                  paddingTop: '10px',
                  marginTop: '10px',
                  padding: 18,
                  minWidth: 280,
                }}
              >
                <Person
                  id={item.uid}
                  name={item.displayName}
                  label={item.levelName}
                  src={item.photoURL}
                />
                <br />
                <Typography variant="h4" component="div" color="secondary">
                  {item.points}
                </Typography>
              </Paper>
            )
          })}
      </div>
    )
  }
}

export default Companies
