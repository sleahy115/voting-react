import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setEntries, next, vote} from '../src/core';

describe('set entries', () => {
  // creates entries list

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

describe('next entry', () => {
  // adds to entries list, moves to new state
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

describe('vote', () => {
  //adds vote tally
  describe('vote', () => {
    it('creates a tally of the votes entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Parks and Rec', '30 Rock')
        }),
        entries: List()
      });
      const nextState = vote(state, 'Parks and Rec');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Parks and Rec', '30 Rock'),
          tally: Map({
            'Parks and Rec': 1
          })
        }),
        entries: List()
      }));
    });
    it('adds to existing tally for the voted entry', () => {
      const state = Map({
        vote: Map({
          pair: List.of('Parks and Rec', '30 Rock'),
          tally: Map({
            'Parks and Rec': 2,
            '30 Rock' : 3
          })
        }),
        entries: List()
      });
      const nextState = vote(state, 'Parks and Rec');
      expect(nextState).to.equal(Map({
        vote: Map({
          pair: List.of('Parks and Rec', '30 Rock'),
          tally: Map({
            'Parks and Rec': 3,
            '30 Rock': 3
          })
        }),
        entries: List()
      }));
    });
  });
});
