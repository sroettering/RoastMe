import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';

import { RoastsListView, roastLimit } from './roasts-list-view';
import { Roasts } from '/imports/modules/roasts/roasts-collection';

export const Trending = createContainer(() => {
  Meteor.subscribe('trending-roasts', roastLimit.get());
  const roasts = Roasts.find({}, { sort: { totalComments: 1 } }).fetch();
  const hasMore = roasts.length >= roastLimit.get();
  return {
    roasts,
    hasMore,
  }
}, RoastsListView);
