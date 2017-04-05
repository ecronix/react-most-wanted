import React from 'react';
import { DrawerContent } from '../../components/Drawer';
import { shallowWithIntlTheme } from '../../helpers/intl-theme-test';

const wrapper=shallowWithIntlTheme(<DrawerContent/>)

describe('components', () => {
  describe('DrawerContent', () => {
    it('renders without exploding', () => {
      expect(wrapper.length).toBe(1)
    })
  })
})
