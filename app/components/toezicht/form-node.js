import EmberObject from '@ember/object';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service(),
  init() {
    this._super(...arguments);
    var formSolution = this.get('store').createRecord('form-solution', {
      answers: new EmberObject()
    });
    this.set('solution', formSolution);
  },
  sorting: Object.freeze(['index']),
  sortedChildren: sort('model.children', 'sorting')
});
