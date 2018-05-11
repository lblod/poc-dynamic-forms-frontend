import Component from '@ember/component';

export default Component.extend({
  didReceiveAttrs() {
    this._super(...arguments);
    const value = this.get('solution.answers')[this.get('model.identifier')];
    this.set('value', value);
  },
  actions: {
    editSolution() {
      console.log('Yeeh');
      this.get('solution.answers')[this.get('model.identifier')] = this.get('value');
    }
  }
});
