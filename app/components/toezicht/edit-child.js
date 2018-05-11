import { computed } from '@ember/object';
import Component from '@ember/component';

export default Component.extend({
  childComponentName: computed('model.displayType', function() {
    return `toezicht/input-fields/${this.get('model.displayType')}/edit`;
  })
});
