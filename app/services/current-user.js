import Ember from 'ember';
import ENV from '../config/environment';
import { v4 } from "ember-uuid";

const {get, $} = Ember;

export default Ember.Service.extend({
    store: Ember.inject.service(),

    profile: {},
    session: {},
    lastSmsCode: undefined,

    setCurrentUserProfile(profile) {
        this.set('profile', profile);
    },

    openNewSession(phoneNumber, password) {

        if (!phoneNumber || !password) {
            return;
        }

        const options = {
            phone_number: phoneNumber,
            password:     password,
            uuid: v4(),
            device_type:  'web'
        };

        const resolveFunction = (result) => {
            this.set('session', get(result, 'session'));
        };

        return this.makeRequest('sessions', 'POST', JSON.stringify(options), resolveFunction);

    },

    closeCurrentSession() {

        if (!this.get('session.access_token')) {
            return;
        }

        const options = {
            access_token: this.get('session.access_token')
        };

        const resolveFunction = ()=> {
            this.set('session', {});
            this.set('profile', {});
        };

        return this.makeRequest('sessions', 'DELETE', JSON.stringify(options), resolveFunction);

    },

    loadCurrentProfile() {

        if (!this.get('session.access_token')) {
            return;
        }

        const options = {
            access_token: this.get('session.access_token')
        };

        const resolveFunction = (result)=> {
            this.set('profile', get(result, 'profile'));
        };

        return this.makeRequest('profile', 'GET', options, resolveFunction);

    },

    editCurrentProfile(password, email, first_name, last_name) {

        if (!this.get('session.access_token')) {
            return;
        }

        const options = {
            access_token: this.get('session.access_token'),
            password: password,
            email: email,
            first_name: first_name,
            last_name: last_name
        };
        
        return this.makeRequest('profile', 'PATCH', JSON.stringify(options));

    },

    makeRequest(url, method, options, resolveFunction = () => {}) {

        return new Ember.RSVP.Promise(function (resolve, reject) {
            $.ajax({
                url:         ENV.serverURL + '/' + ENV.apiNamespace + '/' + url,
                type:        method,
                dataType:    'json',
                contentType: 'application/json; charset=utf-8',
                data:        options,
                success(result) {
                    resolveFunction(result);
                    resolve(result);
                },
                error(result) {
                    console.warn(result);
                    reject(result);
                }
            });
        });

    }
});
