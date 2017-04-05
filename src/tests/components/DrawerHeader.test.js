import React from 'react';
import { DrawerHeader } from '../../components/Drawer';
import { shallowWithIntlTheme } from '../../helpers/intl-theme-test';

const wrapper=shallowWithIntlTheme(<DrawerHeader/>)

describe('components', () => {
  describe('DrawerHeader', () => {
    it('renders without exploding', () => {
      expect(wrapper.length).toBe(1)
    })
  })
})
