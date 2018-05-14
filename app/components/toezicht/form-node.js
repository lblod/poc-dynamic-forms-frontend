import EmberObject from '@ember/object';
import { sort } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  store: service(),
  sorting: Object.freeze(['index']),
  sortedChildren: sort('model.children', 'sorting'),
  didReceiveAttrs() {
    this._super(...arguments);
    if (!this.get('solution')) {
      console.log('no solution yet');
      var formSolution = this.get('store').createRecord('form-solution', {
        formNode: this.get('model')
      });
      this.set('solution', formSolution);
    }
  }
});
