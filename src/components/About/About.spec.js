import React from 'react';
import About from './About';
import {shallowWithIntlTheme} from '../../helpers/intl-theme-test';

const wrapper=shallowWithIntlTheme(<About/>)

describe('components', () => {
  describe('About', () => {
    it('renders without exploding', () => {
      expect(wrapper.length).toBe(1)
    })
  })
})
