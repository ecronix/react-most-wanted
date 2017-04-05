import React from 'react';
import { PageNotFound } from '../../components/PageNotFound';
import { shallowWithIntlTheme } from '../../helpers/intl-theme-test';

const wrapper=shallowWithIntlTheme(<PageNotFound/>)

describe('components', () => {
  describe('PageNotFound', () => {
    it('renders without exploding', () => {
      expect(wrapper.length).toBe(1)
    })
  })
})
