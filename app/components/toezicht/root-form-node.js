import Component from '@ember/component';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  didReceiveAttrs() {
    this._super(...arguments);
    console.log('no solution yet');
    var formSolution = this.get('store').createRecord('form-solution', {
      formNode: this.get('model')
    });
    this.set('solution', formSolution);
  },
  actions: {
    save() {
      console.log('saving');
    }
  }
});
