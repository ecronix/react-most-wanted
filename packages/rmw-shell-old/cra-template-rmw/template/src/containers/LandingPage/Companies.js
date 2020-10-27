import 'react-multi-carousel/lib/styles.css'
import Carousel from 'react-multi-carousel'
import Company from '../../components/LandingPage/Company'
import React, { Component } from 'react'
import axios from 'axios'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 601 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 600, min: 0 },
    items: 1,
  },
}

class Companies extends Component {
  state = {}

  componentDidMount() {
    try {
      this.setState({
        companies: JSON.parse(localStorage.getItem('companies')) || [],
      })
    } catch (error) {}

    try {
      axios
        .get('https://www.react-most-wanted.com/api/companies?limit=5')
        .then(({ data, status }) => {
          if (status === 200) {
            this.setState({
              companies: data.companies.reverse(),
            })

            localStorage.setItem('companies', JSON.stringify(data.companies))
          }
        })
    } catch (error) {
      console.log('error', error)
    }
  }

  render() {
    const { history } = this.props
    const { companies = [] } = this.state

    return (
      <div>
        <Carousel
          responsive={responsive}
          showDots={false}
          transitionDuration={500}
          autoPlay
          autoPlaySpeed={5000}
          swipeable
          removeArrowOnDeviceType={['tablet', 'mobile']}
        >
          {companies &&
            companies.map(company => (
              <Company key={company.uid} company={company} history={history} />
            ))}
        </Carousel>
      </div>
    )
  }
}

export default Companies
