import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setEntries, next} from '../src/core';

describe('application logic', () => {
  describe('setEntries', () => {
    it('converts to immutable', () => {
      const state = Map();
      const entries = ['Parks and Rec', '30 Rock'];
      const nextState = setEntries(state, entries);
      expect(nextState).to.equal(Map({
        entries: List.of('Parks and Rec', '30 Rock')
      }));
    });
  });
});

describe('application logic', () => {
  describe('next', () =>  {
    it('takes the next two entries under vote', () => {
      const state = Map({
        entries: List.of('Parks and Rec', '30 Rock', 'Veronica Mars')
      });
      const nextState = next(state);
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Parks and Rec', '30 Rock')
      }),
      entries: List.of('Veronica Mars')
      }));
    });
  });
});
