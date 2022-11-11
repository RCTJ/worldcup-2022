'use babel';

import Worldcup2022View from './worldcup-2022-view';
import { CompositeDisposable } from 'atom';

export default {

  worldcup2022View: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.worldcup2022View = new Worldcup2022View(state.worldcup2022ViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.worldcup2022View.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'worldcup-2022:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.worldcup2022View.destroy();
  },

  serialize() {
    return {
      worldcup2022ViewState: this.worldcup2022View.serialize()
    };
  },

  toggle() {
    console.log('Worldcup2022 was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
