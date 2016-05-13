import Ember from 'ember';

export default Ember.Route.extend({
    model(){
        const access_token = this.get('current-user.session.access_token');

        this.store.queryRecord('venue/items', { access_token: access_token });
    }
});
