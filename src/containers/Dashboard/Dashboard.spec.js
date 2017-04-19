import React from 'react';
import Dashboard   from './Dashboard';
import { shallowWithIntlTheme } from '../../utils/intl-theme-test';

const wrapper=shallowWithIntlTheme(<Dashboard/>)

describe('components', () => {
  describe('Dashboard', () => {
    it('renders without exploding', () => {
      expect(wrapper.length).toBe(1)
    })
  })
})
