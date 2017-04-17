import React from 'react';
import MyAccount from './MyAccount';
import {shallowWithIntlTheme} from '../../helpers/intl-theme-test';

const wrapper=shallowWithIntlTheme(<MyAccount/>)

describe('components', () => {
  describe('MyAccount', () => {
    it('renders without exploding', () => {
      expect(wrapper.length).toBe(1)
    })
  })
})
