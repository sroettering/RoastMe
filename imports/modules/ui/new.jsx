import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { RoastsListView, roastLimit } from './roasts-list-view';
import { Roasts } from '/imports/modules/roasts/roasts-collection';

export const New = createContainer(() => {
  const subHandle = Meteor.subscribe('roasts.new', roastLimit.get());
  const roasts = Roasts.find({}, { sort: { "category.enteredAt": -1 } }).fetch();
  const hasMore = roasts.length >= roastLimit.get();
  return {
    ready: subHandle.ready(),
    roasts,
    hasMore,
  }
}, RoastsListView);
