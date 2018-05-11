import { computed } from '@ember/object';
import Component from '@ember/component';
import { observer } from '@ember/object';

export default Component.extend({
  oldP: undefined,

  pObserver: observer( 'solution.answers', 'model.identifier', function() {
    const oldP = this.get('oldP');
    if( oldP )
      this.removeObserver( `solution.answers.${oldP}`, this, "updateResourceValue" );

    const p = this.get('model.identifier');
    if ( p ) {
      this.addObserver( `solution.answers.${p}`, this, "updateResourceValue" );
      this.set('oldP', p);
    }
    this.updateResourceValue();
  }).on('init'),

  /**
   * Called when either the resource, the property, or the value of
   * the property in the resource, is changed.
   */
  updateResourceValue: function(){
    const value = this.get(`solution.answers.${this.get('model.identifier')}`);
    this.set('value', value);
  },

  subform: computed('model.identifier', 'value', 'model.dynamicSubforms.[]', 'model.dynamicSubforms.@each.{key,value}', function() {
    const subform = this.get('model.dynamicSubforms').find(f => {
      return f.get('key') == this.get('model.identifier') && f.get('value') == this.get('value');
    });
    return subform;
  }),
  childComponentName: computed('model.displayType', function() {
    return `toezicht/input-fields/${this.get('model.displayType')}/edit`;
  })
});
