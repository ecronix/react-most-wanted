import React from 'react';
import { Root } from '../../components/Root';
import { shallowWithIntlTheme } from '../../helpers/intl-theme-test';

const wrapper=shallowWithIntlTheme(<Root/>)

describe('components', () => {
  describe('Root', () => {
    it('renders without exploding', () => {
      expect(wrapper.length).toBe(1)
    })
  })
})
