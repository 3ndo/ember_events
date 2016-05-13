import Ember from 'ember';
import Common from '../common/route';

export default Ember.Route.extend(Common, {
    actions: {
        logout: function () {
            this.get('current-user')
                .closeCurrentSession()
                .then(() => {
                    this.transitionTo('sign_in');
                });
        }
    }
});
