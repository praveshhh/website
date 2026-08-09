/**
 * Airports offered in the flight search.
 *
 * Ordered by how often Indian travellers actually search them, because the
 * picker shows the first eight as "Popular" before anyone types. `popular`
 * marks the metros that lead that list.
 *
 * Kept deliberately small: this ships in the main bundle, and a long tail of
 * airports nobody searches would cost every visitor bytes for nothing. The
 * team handles anything unusual over WhatsApp anyway.
 */
export const AIRPORTS = [
  // ── Indian metros ─────────────────────────────────────────────────────────
  { code: 'DEL', city: 'New Delhi',  region: 'Delhi',           country: 'India', name: 'Indira Gandhi International', popular: true },
  { code: 'BOM', city: 'Mumbai',     region: 'Maharashtra',     country: 'India', name: 'Chhatrapati Shivaji Maharaj International', popular: true },
  { code: 'BLR', city: 'Bengaluru',  region: 'Karnataka',       country: 'India', name: 'Kempegowda International', popular: true },
  { code: 'HYD', city: 'Hyderabad',  region: 'Telangana',       country: 'India', name: 'Rajiv Gandhi International', popular: true },
  { code: 'MAA', city: 'Chennai',    region: 'Tamil Nadu',      country: 'India', name: 'Chennai International', popular: true },
  { code: 'CCU', city: 'Kolkata',    region: 'West Bengal',     country: 'India', name: 'Netaji Subhas Chandra Bose International', popular: true },
  { code: 'GOI', city: 'Goa',        region: 'Dabolim',         country: 'India', name: 'Goa International', popular: true },
  { code: 'PNQ', city: 'Pune',       region: 'Maharashtra',     country: 'India', name: 'Pune International', popular: true },

  // ── Rest of India ─────────────────────────────────────────────────────────
  { code: 'AMD', city: 'Ahmedabad',  region: 'Gujarat',         country: 'India', name: 'Sardar Vallabhbhai Patel International' },
  { code: 'LKO', city: 'Lucknow',    region: 'Uttar Pradesh',   country: 'India', name: 'Chaudhary Charan Singh International' },
  { code: 'JAI', city: 'Jaipur',     region: 'Rajasthan',       country: 'India', name: 'Jaipur International' },
  { code: 'COK', city: 'Kochi',      region: 'Kerala',          country: 'India', name: 'Cochin International' },
  { code: 'TRV', city: 'Thiruvananthapuram', region: 'Kerala',  country: 'India', name: 'Trivandrum International' },
  { code: 'IXC', city: 'Chandigarh', region: 'Punjab',          country: 'India', name: 'Chandigarh International' },
  { code: 'PAT', city: 'Patna',      region: 'Bihar',           country: 'India', name: 'Jay Prakash Narayan International' },
  { code: 'BBI', city: 'Bhubaneswar',region: 'Odisha',          country: 'India', name: 'Biju Patnaik International' },
  { code: 'GAU', city: 'Guwahati',   region: 'Assam',           country: 'India', name: 'Lokpriya Gopinath Bordoloi International' },
  { code: 'NAG', city: 'Nagpur',     region: 'Maharashtra',     country: 'India', name: 'Dr. Babasaheb Ambedkar International' },
  { code: 'IDR', city: 'Indore',     region: 'Madhya Pradesh',  country: 'India', name: 'Devi Ahilyabai Holkar' },
  { code: 'VNS', city: 'Varanasi',   region: 'Uttar Pradesh',   country: 'India', name: 'Lal Bahadur Shastri International' },
  { code: 'ATQ', city: 'Amritsar',   region: 'Punjab',          country: 'India', name: 'Sri Guru Ram Dass Jee International' },
  { code: 'SXR', city: 'Srinagar',   region: 'Jammu & Kashmir', country: 'India', name: 'Sheikh ul-Alam International' },
  { code: 'IXB', city: 'Bagdogra',   region: 'West Bengal',     country: 'India', name: 'Bagdogra International' },
  { code: 'RPR', city: 'Raipur',     region: 'Chhattisgarh',    country: 'India', name: 'Swami Vivekananda' },
  { code: 'BDQ', city: 'Vadodara',   region: 'Gujarat',         country: 'India', name: 'Vadodara' },
  { code: 'STV', city: 'Surat',      region: 'Gujarat',         country: 'India', name: 'Surat' },
  { code: 'CJB', city: 'Coimbatore', region: 'Tamil Nadu',      country: 'India', name: 'Coimbatore International' },
  { code: 'VTZ', city: 'Visakhapatnam', region: 'Andhra Pradesh', country: 'India', name: 'Visakhapatnam' },
  { code: 'IXR', city: 'Ranchi',     region: 'Jharkhand',       country: 'India', name: 'Birsa Munda' },
  { code: 'DED', city: 'Dehradun',   region: 'Uttarakhand',     country: 'India', name: 'Jolly Grant' },
  { code: 'UDR', city: 'Udaipur',    region: 'Rajasthan',       country: 'India', name: 'Maharana Pratap' },
  { code: 'IXL', city: 'Leh',        region: 'Ladakh',          country: 'India', name: 'Kushok Bakula Rimpochee' },
  { code: 'PNY', city: 'Puducherry', region: 'Puducherry',      country: 'India', name: 'Puducherry' },
  { code: 'IXZ', city: 'Port Blair', region: 'Andaman & Nicobar', country: 'India', name: 'Veer Savarkar International' },

  // ── Short-haul international, common from India ───────────────────────────
  { code: 'DXB', city: 'Dubai',      region: '',                country: 'UAE',       name: 'Dubai International' },
  { code: 'AUH', city: 'Abu Dhabi',  region: '',                country: 'UAE',       name: 'Zayed International' },
  { code: 'DOH', city: 'Doha',       region: '',                country: 'Qatar',     name: 'Hamad International' },
  { code: 'SIN', city: 'Singapore',  region: '',                country: 'Singapore', name: 'Changi' },
  { code: 'BKK', city: 'Bangkok',    region: '',                country: 'Thailand',  name: 'Suvarnabhumi' },
  { code: 'KTM', city: 'Kathmandu',  region: '',                country: 'Nepal',     name: 'Tribhuvan International' },
  { code: 'CMB', city: 'Colombo',    region: '',                country: 'Sri Lanka', name: 'Bandaranaike International' },
  { code: 'KUL', city: 'Kuala Lumpur', region: '',              country: 'Malaysia',  name: 'Kuala Lumpur International' },
  { code: 'LHR', city: 'London',     region: '',                country: 'UK',        name: 'Heathrow' },
  { code: 'JFK', city: 'New York',   region: '',                country: 'USA',       name: 'John F. Kennedy International' },
];

/** Where the airport sits, as one readable line. */
export function airportPlace(a) {
  return [a.city, a.region, a.country].filter(Boolean).join(', ');
}

/** Compact label used once a field has a selection. */
export function airportLabel(a) {
  return a ? `${a.city} (${a.code})` : '';
}

/**
 * Rank airports against a query. Exact code match wins, then code prefix, then
 * city prefix, then anything containing the term — so typing "del" puts Delhi
 * above New Delhi's neighbours, and "bom" lands on Mumbai immediately.
 */
export function searchAirports(query, { exclude, limit = 7 } = {}) {
  const q = String(query || '').trim().toLowerCase();
  const pool = AIRPORTS.filter((a) => !exclude || a.code !== exclude);

  if (!q) return pool.filter((a) => a.popular).slice(0, limit);

  const scored = [];
  for (const a of pool) {
    const code = a.code.toLowerCase();
    const city = a.city.toLowerCase();
    const name = a.name.toLowerCase();
    const region = (a.region || '').toLowerCase();

    let score = 0;
    if (code === q) score = 100;
    else if (code.startsWith(q)) score = 90;
    else if (city.startsWith(q)) score = 80;
    else if (city.includes(q)) score = 60;
    else if (name.toLowerCase().includes(q)) score = 40;
    else if (region.includes(q)) score = 30;
    else if (a.country.toLowerCase().startsWith(q)) score = 20;

    if (score) scored.push({ a, score });
  }

  return scored
    .sort((x, y) => y.score - x.score || x.a.city.localeCompare(y.a.city))
    .slice(0, limit)
    .map((s) => s.a);
}
