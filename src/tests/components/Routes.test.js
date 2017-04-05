import React from 'react';
import { Routes } from '../../components/Routes';
import { shallowWithIntlTheme } from '../../helpers/intl-theme-test';

const wrapper=shallowWithIntlTheme(<Routes/>)

describe('components', () => {
  describe('Routes', () => {
    it('renders without exploding', () => {
      expect(wrapper.length).toBe(1)
    })
  })
})
