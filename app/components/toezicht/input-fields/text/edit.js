import Component from '@ember/component';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    const value = this.get('solution.answers').get('model.identifier');
    this.set('value', value);
  },
  actions: {
    editSolution() {
      const prop = this.get('model.identifier');
      this.get('solution.answers').set(prop, this.get('value'));
    }
  }
});
