// This is the JSON way to define React Router rules in a Rekit app.
// Learn more from: http://rekit.js.org/docs/routing.html

import {
  Main,
} from './';

export default {
  path: 'koyla',
  name: 'Koyla',
  childRoutes: [
    { path: 'main', name: 'Main', component: Main, isIndex: true },
  ],
};
