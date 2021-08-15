import {createSelector} from 'reselect';

const selectOnDemand = state => state.onDemand;

export const selectOnDemandItems = createSelector(
  [selectOnDemand],
  onDemand => onDemand,
);
