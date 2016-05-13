import Ember from 'ember';

export default Ember.Mixin.create({
    redirect() {
        if (!this.get('current-user.session.access_token')) {
            this.transitionTo('sign_in');
        }
    }
});
