import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    return this.store.findAll('form-node').then((forms) => {
      return forms.get('firstObject');
    });
  }
});
