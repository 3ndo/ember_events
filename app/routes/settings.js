import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        edit_profile: function (password, email, first_name, last_name) {

            const currentUser = this.get('current-user');

            this.get('isProgress', true);

            currentUser
                .editCurrentProfile(password, email, first_name, last_name)
                .then(() => {
                    this.get('requestError', undefined);
                    currentUser
                        .loadCurrentProfile()
                        .then(() => {
                            this.set('isProgress', false);
                            this.transitionTo('profile');
                        });
                }, () => {
                    this.set('isProgress', false);
                    this.set('requestError', 'Edit error. Please check your entries and try again.');
                });
        }
    }
});
