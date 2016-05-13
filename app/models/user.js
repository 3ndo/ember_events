import Model from 'ember-data/model';
import DS from 'ember-data';

export default Model.extend({
    id: DS.attr('integer'),
    phone_number: DS.attr('string'),
    email: DS.attr('string'),
    first_name: DS.attr('string'),
    last_name: DS.attr('string'),
    created_at: DS.attr('date'),
    updated_at: DS.attr('date')
});
