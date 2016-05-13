import DS from 'ember-data';

export default DS.RESTSerializer.extend({
    modelNameFromPayloadKey: function(payloadKey) {
        if (payloadKey === 'venue/items') {
            return this._super(payloadKey.replace('/items', ''));
        } else {
            return this._super(payloadKey);
        }
    }
});