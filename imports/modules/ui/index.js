import React from 'react';

import { AppNavigation } from '/imports/modules/navigation/app-navigation';

export const Index = ({children}) => (
  <div>
    <AppNavigation />
    {children}
  </div>
);
