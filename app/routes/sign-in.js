import Ember from 'ember';

export default Ember.Route.extend({
    store: Ember.inject.service(),

    loginPasswordError:        undefined,
    loginPhoneError:           undefined,
    isProgress:                undefined,
    requestError:              undefined,

    actions: {
        login: function (phone,password) {

            //validation field
            if (!phone) {
                this.set('loginPhoneError', 'Phone is required');
                return;
            } else {
                this.set('loginPhoneError', undefined);
            }

            if (!password) {
                this.set('loginPhoneError', 'Password is required');
                return;
            } else {
                this.set('loginPhoneError', undefined);
            }

            const currentUser = this.get('current-user');
            
            this.get('isProgress', true);

            currentUser
                .openNewSession(phone, password)
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
                    this.set('requestError', 'Login error. Please check your entries and try again.');
                });

        }
    }
});
