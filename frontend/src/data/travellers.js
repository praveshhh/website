/**
 * Traveller and cabin rules for the flight search.
 *
 * Kept out of TravellersField.jsx so that file only exports a component, which
 * is what .oxlintrc.json's react/only-export-components rule asks for.
 */

export const CABINS = ['Economy', 'Premium Economy', 'Business', 'First'];

/** Usual single-booking seat cap. Larger groups go to the team directly. */
export const MAX_SEATS = 9;

export const DEFAULT_TRAVELLERS = { adults: 1, children: 0, infants: 0, cabin: 'Economy' };

/** "2 Adults, 1 Child · Business" — what the closed field shows. */
export function travellersLabel(t) {
  const bits = [`${t.adults} Adult${t.adults === 1 ? '' : 's'}`];
  if (t.children) bits.push(`${t.children} Child${t.children === 1 ? '' : 'ren'}`);
  if (t.infants) bits.push(`${t.infants} Infant${t.infants === 1 ? '' : 's'}`);
  return `${bits.join(', ')} · ${t.cabin}`;
}
