import { computed } from '@ember/object';
import Component from '@ember/component';
import { observer } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  store: service(),
  oldP: undefined,

  pObserver: observer( 'solution', 'model.identifier', function() {
    const oldP = this.get('oldP');
    if( oldP )
      this.removeObserver( `solution.${oldP}`, this, "updateResourceValue" );

    const p = this.get('model.identifier');
    if ( p ) {
      this.addObserver( `solution.${p}`, this, "updateResourceValue" );
      this.set('oldP', p);
    }
    this.updateResourceValue();
  }).on('init'),

  /**
   * Called when either the resource, the property, or the value of
   * the property in the resource, is changed.
   */
  updateResourceValue: function(){
    const value = this.get(`solution.${this.get('model.identifier')}`);
    this.set('value', value);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    if (this.get('model') && this.get('solution')) {
      this.get('solution.formNode').then((formNode) => {
        const path = this.get('model.identifier');
        const pathSegments = path.split('.');
        const typeMap = formNode.get('inputTypeMap');

        const populateSegments = (filledSegments, restSegments) => {
          if (restSegments.length == 0)
            return;

          const path = filledSegments.join('.');
          const [first, ...rest] = restSegments;
          const newPath = [...filledSegments, first].join('.');
          const kind = typeMap[newPath];
          console.log('New path is ' + newPath);
          console.log('Kind is ' + kind);
          const prop = `solution.${newPath}`;
          if (kind && !this.get(prop).content) {
            console.log('setting property: ' + prop);
            const resource = this.get('store').createRecord(kind, {});
            this.set(prop, resource);
          }
          populateSegments([...filledSegments, first], rest);
        };

        populateSegments([], pathSegments);
      });
    };
  },

  subform: computed('model.identifier', 'value', 'model.dynamicSubforms.[]', 'model.dynamicSubforms.@each.{key,value}', function() {
    const subform = this.get('model.dynamicSubforms').find(f => {
      // TODO scope value comparison with matchKind (also support uuid/uri)
      return f.get('key') == this.get('model.identifier') && f.get('value') == this.get('value');
    });
    return subform;
  }),
  childComponentName: computed('model.displayType', function() {
    return `toezicht/input-fields/${this.get('model.displayType')}/edit`;
  })
});
