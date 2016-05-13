import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('sign_in');
  this.route('sign_up');
  this.route('profile');
  this.route('page-not-found', { path: '/*wildcard' });
  this.route('settings');

  this.route('venue', function() {
    this.route('items');
  });
});

export default Router;
