import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Search, CheckCircle, Phone, ArrowRight, Heart } from 'lucide-react';
import TiltCard from './TiltCard';
import TravelHyperspeed from './TravelHyperspeed';
import AirportField from './AirportField';
import TravellersField from './TravellersField';
import { DEFAULT_TRAVELLERS, travellersLabel } from '../data/travellers';
import { airportLabel, AIRPORTS } from '../data/airports';

const TODAY = new Date().toISOString().slice(0, 10);

export default function TravelPage({ onOpenModal }) {
  const [activeSearchTab, setActiveSearchTab] = useState(0);
  const [tripType, setTripType] = useState('one-way');
  const [busPassengers, setBusPassengers] = useState(1);
  const [holidayPassengers, setHolidayPassengers] = useState(2);

  // Form states
  const [flightFrom, setFlightFrom] = useState('DEL');
  const [flightTo, setFlightTo] = useState('BOM');
  const [flightDate, setFlightDate] = useState('');
  const [flightReturn, setFlightReturn] = useState('');
  const [travellers, setTravellers] = useState(DEFAULT_TRAVELLERS);

  const [hotelCity, setHotelCity] = useState('');
  const [hotelCheckIn, setHotelCheckIn] = useState('');
  const [hotelCheckOut, setHotelCheckOut] = useState('');
  const [hotelGuests, setHotelGuests] = useState('1 Room, 2 Adults');

  const [busFrom, setBusFrom] = useState('Delhi');
  const [busTo, setBusTo] = useState('');
  const [busDate, setBusDate] = useState('');

  const [trainFrom, setTrainFrom] = useState('New Delhi (NDLS)');
  const [trainTo, setTrainTo] = useState('');
  const [trainDate, setTrainDate] = useState('');
  const [trainClass, setTrainClass] = useState('All Classes');
  const [trainQuota, setTrainQuota] = useState('General');

  const [holidayDest, setHolidayDest] = useState('');
  const [holidayDep, setHolidayDep] = useState('');
  const [holidayDate, setHolidayDate] = useState('');
  const [holidayDuration, setHolidayDuration] = useState('3–4 Days');

  // Trigger whatsapp redirect
  const handleWhatsApp = (msg) => {
    window.open(`https://wa.me/919278403522?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let msg = '';
    if (activeSearchTab === 0) {
      msg = `Hi BillsPay24X7 Travel!
I want to book a Flight:
Type: ${tripType}
From: ${airportLabel(AIRPORTS.find(a => a.code === flightFrom))}
To: ${airportLabel(AIRPORTS.find(a => a.code === flightTo))}
Departure: ${flightDate || 'N/A'}
Return: ${tripType === 'one-way' ? 'One way' : (flightReturn || 'N/A')}
Travellers: ${travellersLabel(travellers)}`;
    } else if (activeSearchTab === 1) {
      msg = `Hi BillsPay24X7 Travel!\nI want to book a Hotel:\nCity/Property: ${hotelCity || 'N/A'}\nCheck-in: ${hotelCheckIn || 'N/A'}\nCheck-out: ${hotelCheckOut || 'N/A'}\nGuests: ${hotelGuests}`;
    } else if (activeSearchTab === 2) {
      msg = `Hi BillsPay24X7 Travel!\nI want to book a Bus:\nFrom: ${busFrom}\nTo: ${busTo || 'N/A'}\nDate: ${busDate || 'N/A'}\nPassengers: ${busPassengers}`;
    } else if (activeSearchTab === 3) {
      msg = `Hi BillsPay24X7 Travel!\nI want to book a Train:\nFrom Station: ${trainFrom}\nTo Station: ${trainTo || 'N/A'}\nDate: ${trainDate || 'N/A'}\nClass: ${trainClass}\nQuota: ${trainQuota}`;
    } else if (activeSearchTab === 4) {
      msg = `Hi BillsPay24X7 Travel!\nI want to book a Holiday Package:\nDestination: ${holidayDest || 'N/A'}\nDeparture: ${holidayDep || 'N/A'}\nDate: ${holidayDate || 'N/A'}\nDuration: ${holidayDuration}\nPassengers: ${holidayPassengers}`;
    }
    handleWhatsApp(msg);
  };

  const swapRoute = (type) => {
    if (type === 'flight') {
      const temp = flightFrom;
      setFlightFrom(flightTo);
      setFlightTo(temp);
    } else if (type === 'bus') {
      const temp = busFrom;
      setBusFrom(busTo);
      setBusTo(temp);
    } else if (type === 'train') {
      const temp = trainFrom;
      setTrainFrom(trainTo);
      setTrainTo(temp);
    }
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Travel Hero — matches homepage light theme */}
      <div className="t-hero" style={{
        minHeight: '480px',
        position: 'relative',
        overflow: 'hidden',
        padding: '96px 8% 40px',
        // Dark ground so the hyperspeed trails have something to read against.
        // Contained to this hero: everything below it stays on the light theme.
        background: '#0B1130',
        borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
        color: '#F2F3FF',
        textAlign: 'center'
      }}>
        <TravelHyperspeed />
        {/* Animated ambient blobs — same as homepage */}
        <motion.div
          className="glow-overlay-green"
          style={{ top: '-10%', left: '-5%', opacity: 0.5 }}
          animate={{ x: [0, 20, 0], y: [0, -15, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="glow-overlay-blue"
          style={{ bottom: '5%', right: '5%', opacity: 0.5 }}
          animate={{ x: [0, -15, 0], y: [0, 10, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px', margin: '0 auto' }}>
          <div className="t-hero-tag" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1px solid rgba(185, 183, 255, 0.35)',
            color: '#C9C7FF',
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '6px 16px',
            borderRadius: '50px',
            marginBottom: '20px'
          }}>
            🌍 Powered by BillsPay24X7✓
          </div>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
            marginBottom: '16px',
            // Set explicitly: the global `h1..h6 { color: var(--text-primary) }`
            // rule beats inheritance from the dark hero wrapper.
            color: '#FFFFFF'
          }}>
            Where Do You Want<br />To Go Next?
          </h1>
          <p style={{
            fontSize: '15px',
            color: 'rgba(226, 228, 255, 0.82)',
            marginBottom: '32px',
            maxWidth: '600px',
            margin: '0 auto 32px'
          }}>
            Flights · Hotels · Buses · Trains · Holiday Packages — Best Prices Guaranteed
          </p>

          <div style={{
            display: 'flex',
            gap: '24px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginBottom: '40px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(226, 228, 255, 0.82)' }}>
              <CheckCircle size={14} color="#8EE6A8" /> 500+ Airlines
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(226, 228, 255, 0.82)' }}>
              <CheckCircle size={14} color="#8EE6A8" /> 1M+ Hotels
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(226, 228, 255, 0.82)' }}>
              <CheckCircle size={14} color="#8EE6A8" /> 1000+ Bus Operators
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(226, 228, 255, 0.82)' }}>
              <CheckCircle size={14} color="#8EE6A8" /> IRCTC Integrated
            </div>
          </div>
        </div>

        {/* Search Widget */}
        <div className="search-box" style={{
          background: 'var(--white)',
          borderRadius: '18px',
          maxWidth: '1060px',
          margin: '0 auto',
          boxShadow: 'var(--shadow-xl)',
          color: 'var(--text-primary)',
          textAlign: 'left',
          // Not hidden: it clipped the airport and traveller dropdowns. The tab
          // strip carries its own top radius so the corners still read clean.
          overflow: 'visible'
        }}>
          {/* Tab headers */}
          <div className="s-tabs" style={{ display: 'flex', borderBottom: '1px solid var(--border-dark)', overflowX: 'auto', background: '#F8FAFF', borderRadius: '18px 18px 0 0' }}>
            {['Flights', 'Hotels', 'Buses', 'Trains', 'Holidays'].map((tab, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveSearchTab(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '16px 24px',
                  fontSize: '12.5px',
                  fontWeight: 700,
                  color: activeSearchTab === idx ? 'var(--accent-periwinkle)' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  border: 'none',
                  borderBottom: activeSearchTab === idx ? '3px solid var(--accent-periwinkle)' : '3px solid transparent',
                  background: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.2s'
                }}
              >
                <span>
                  {idx === 0 && '✈️'}
                  {idx === 1 && '🏨'}
                  {idx === 2 && '🚌'}
                  {idx === 3 && '🚂'}
                  {idx === 4 && '🏖️'}
                </span>
                {tab}
              </button>
            ))}
          </div>

          <form onSubmit={handleSearch} style={{ padding: '24px' }}>
            {/* Panel: Flights */}
            {activeSearchTab === 0 && (
              <div>
                {/* Trip type as pills, so the current choice reads at a glance */}
                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                  {[['one-way', 'One Way'], ['round-trip', 'Round Trip'], ['multi-city', 'Multi City']].map(([val, text]) => {
                    const on = tripType === val;
                    return (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setTripType(val)}
                        aria-pressed={on}
                        style={{
                          padding: '7px 16px', borderRadius: '50px', cursor: 'pointer',
                          fontSize: '12.5px', fontWeight: 700, fontFamily: 'inherit',
                          border: on ? '1.5px solid var(--accent-periwinkle)' : '1.5px solid var(--border-dark)',
                          background: on ? 'rgba(94, 92, 230, 0.08)' : '#fff',
                          color: on ? 'var(--accent-periwinkle)' : 'var(--text-secondary)',
                          transition: 'all .15s',
                        }}
                      >{text}</button>
                    );
                  })}
                </div>

                {/* One divided bar rather than boxes in a grid. Boxed fields on a
                    white card drew --border-primary, which is a white border, so
                    they were invisible against the card. */}
                <div
                  className="flight-bar"
                  style={{
                    display: 'grid',
                    // minmax(0, ...) so a long airport name cannot set a min-content floor and
                    // blow the column wider than its share.
                    gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 1.15fr) minmax(0, 0.9fr) minmax(0, 0.9fr) minmax(0, 1.1fr) auto',
                    border: '1.5px solid var(--border-dark)',
                    borderRadius: '14px',
                    background: '#fff',
                    position: 'relative',
                  }}
                >
                  <div style={{ position: 'relative', minWidth: 0, borderRight: '1px solid var(--border-dark)' }}>
                    <AirportField label="From" value={flightFrom} onChange={setFlightFrom}
                      excludeCode={flightTo} placeholder="Where from?" variant="bare" />
                  </div>

                  <div style={{ position: 'relative', minWidth: 0, borderRight: '1px solid var(--border-dark)' }}>
                    <AirportField label="To" value={flightTo} onChange={setFlightTo}
                      excludeCode={flightFrom} placeholder="Where to?" variant="bare" />
                    <button
                      type="button"
                      onClick={() => swapRoute('flight')}
                      aria-label="Swap origin and destination"
                      title="Swap"
                      style={{
                        position: 'absolute', left: 0, top: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '30px', height: '30px', borderRadius: '50%',
                        background: '#fff', border: '1.5px solid var(--border-dark)',
                        boxShadow: '0 2px 8px rgba(27,42,107,0.12)', cursor: 'pointer',
                        zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, color: 'var(--accent-periwinkle)', fontSize: '13px',
                      }}
                    >&#8646;</button>
                  </div>

                  <label style={{ display: 'block', padding: '14px 18px', minHeight: '74px', borderRight: '1px solid var(--border-dark)', cursor: 'pointer' }}>
                    <span className="sf-lbl" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Departure</span>
                    <input type="date" value={flightDate} min={TODAY} required aria-label="Departure date"
                      onChange={(e) => setFlightDate(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700, fontSize: '13.5px', fontFamily: 'inherit', color: 'var(--text-primary)', padding: 0 }} />
                  </label>

                  <label style={{ display: 'block', padding: '14px 18px', minHeight: '74px', borderRight: '1px solid var(--border-dark)', cursor: tripType === 'one-way' ? 'not-allowed' : 'pointer', opacity: tripType === 'one-way' ? 0.45 : 1 }}>
                    <span className="sf-lbl" style={{ display: 'block', fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Return</span>
                    <input type="date" value={flightReturn} min={flightDate || TODAY}
                      required={tripType !== 'one-way'} disabled={tripType === 'one-way'} aria-label="Return date"
                      onChange={(e) => setFlightReturn(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700, fontSize: '13.5px', fontFamily: 'inherit', color: 'var(--text-primary)', padding: 0 }} />
                  </label>

                  <div style={{ position: 'relative', minWidth: 0 }}>
                    <TravellersField value={travellers} onChange={setTravellers} variant="bare" />
                  </div>

                  <button
                    type="submit"
                    className="flight-bar-cta"
                    style={{
                      border: 'none', cursor: 'pointer', background: 'var(--g-brand)',
                      color: '#fff', fontFamily: 'inherit', fontWeight: 800, fontSize: '14.5px',
                      padding: '0 30px', borderRadius: '0 12px 12px 0',
                      display: 'flex', alignItems: 'center', gap: '8px', whiteSpace: 'nowrap',
                    }}
                  >
                    Search <span aria-hidden="true">&rarr;</span>
                  </button>
                </div>
              </div>
            )}


            {/* Panel: Hotels */}
            {activeSearchTab === 1 && (
              <div>
                <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px', marginBottom: '12px' }}>
                  <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>City, Area or Hotel Name</div>
                  <input className="sf-inp" type="text" placeholder="e.g. Goa, Mumbai, Jaipur" value={hotelCity} onChange={(e) => setHotelCity(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700 }} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '18px' }}>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Check-In</div>
                    <input className="sf-inp" type="date" value={hotelCheckIn} onChange={(e) => setHotelCheckIn(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700 }} />
                  </div>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Check-Out</div>
                    <input className="sf-inp" type="date" value={hotelCheckOut} onChange={(e) => setHotelCheckOut(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700 }} />
                  </div>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Rooms & Guests</div>
                    <input className="sf-inp" type="text" value={hotelGuests} onChange={(e) => setHotelGuests(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700, fontSize: '13.5px' }} />
                  </div>
                </div>
              </div>
            )}

            {/* Panel: Buses */}
            {activeSearchTab === 2 && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', position: 'relative', marginBottom: '12px' }}>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>From</div>
                    <input className="sf-inp" type="text" value={busFrom} onChange={(e) => setBusFrom(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700 }} />
                  </div>
                  <button type="button" onClick={() => swapRoute('bus')} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '32px', height: '32px', borderRadius: '50%', background: '#fff', border: '1px solid var(--border-primary)', cursor: 'pointer', zIndex: 1, display: 'flex', alignItems: 'center', justify: 'center' }}>⇄</button>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>To</div>
                    <input className="sf-inp" type="text" placeholder="Destination City" value={busTo} onChange={(e) => setBusTo(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700 }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '18px' }}>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Date of Journey</div>
                    <input className="sf-inp" type="date" value={busDate} onChange={(e) => setBusDate(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700 }} />
                  </div>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Passengers</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                      <button type="button" onClick={() => setBusPassengers(Math.max(1, busPassengers - 1))} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid rgba(27,42,107,0.2)', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>−</button>
                      <span style={{ fontSize: '15px', fontWeight: 800, minWidth: '20px', textAlign: 'center' }}>{busPassengers}</span>
                      <button type="button" onClick={() => setBusPassengers(Math.min(9, busPassengers + 1))} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid rgba(27,42,107,0.2)', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Panel: Trains */}
            {activeSearchTab === 3 && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', position: 'relative', marginBottom: '12px' }}>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>From Station</div>
                    <input className="sf-inp" type="text" value={trainFrom} onChange={(e) => setTrainFrom(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700 }} />
                  </div>
                  <button type="button" onClick={() => swapRoute('train')} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '32px', height: '32px', borderRadius: '50%', background: '#fff', border: '1px solid var(--border-primary)', cursor: 'pointer', zIndex: 1, display: 'flex', alignItems: 'center', justify: 'center' }}>⇄</button>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>To Station</div>
                    <input className="sf-inp" type="text" placeholder="Destination Station" value={trainTo} onChange={(e) => setTrainTo(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700 }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '18px' }}>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Date of Journey</div>
                    <input className="sf-inp" type="date" value={trainDate} onChange={(e) => setTrainDate(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700 }} />
                  </div>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Class</div>
                    <select className="sf-inp" value={trainClass} onChange={(e) => setTrainClass(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700, fontSize: '13.5px', color: 'var(--text-primary)' }}>
                      <option>All Classes</option>
                      <option>Sleeper (SL)</option>
                      <option>Third AC (3A)</option>
                      <option>Second AC (2A)</option>
                      <option>First AC (1A)</option>
                      <option>AC Chair Car (CC)</option>
                    </select>
                  </div>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Quota</div>
                    <select className="sf-inp" value={trainQuota} onChange={(e) => setTrainQuota(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700, fontSize: '13.5px', color: 'var(--text-primary)' }}>
                      <option>General</option>
                      <option>Tatkal</option>
                      <option>Ladies</option>
                      <option>Senior Citizen</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Panel: Holidays */}
            {activeSearchTab === 4 && (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Destination</div>
                    <input className="sf-inp" type="text" placeholder="e.g. Goa, Kerala, Dubai" value={holidayDest} onChange={(e) => setHolidayDest(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700 }} />
                  </div>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Departure City</div>
                    <input className="sf-inp" type="text" placeholder="e.g. Lucknow, Delhi" value={holidayDep} onChange={(e) => setHolidayDep(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700 }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '18px' }}>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Travel Date</div>
                    <input className="sf-inp" type="date" value={holidayDate} onChange={(e) => setHolidayDate(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700 }} />
                  </div>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Duration</div>
                    <select className="sf-inp" value={holidayDuration} onChange={(e) => setHolidayDuration(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700, fontSize: '13.5px', color: 'var(--text-primary)' }}>
                      <option>3–4 Days</option>
                      <option>5–6 Days</option>
                      <option>7–8 Days</option>
                      <option>9–10 Days</option>
                      <option>10+ Days</option>
                    </select>
                  </div>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Adults</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
                      <button type="button" onClick={() => setHolidayPassengers(Math.max(1, holidayPassengers - 1))} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid rgba(27,42,107,0.2)', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>−</button>
                      <span style={{ fontSize: '15px', fontWeight: 800, minWidth: '20px', textAlign: 'center' }}>{holidayPassengers}</span>
                      <button type="button" onClick={() => setHolidayPassengers(Math.min(9, holidayPassengers + 1))} style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid rgba(27,42,107,0.2)', background: '#fff', cursor: 'pointer', fontWeight: 'bold' }}>+</button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeSearchTab !== 0 && <button type="submit" className="search-cta" style={{
              background: 'var(--g-brand)',
              color: '#fff',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 32px',
              width: '100%',
              fontSize: '15px',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              boxShadow: '0 4px 20px rgba(27,42,107,0.2)'
            }}>
              <Search size={16} /> Search & Book via WhatsApp
            </button>}
          </form>
        </div>
      </div>

      {/* Mobile-only Visual Cards Strip — shown below hero on small screens */}
      <div className="t-mobile-cards">
        {/* Globe Card */}
        <div className="t-mobile-card">
          <span className="t-mobile-card-label">✈️ Flights</span>
          <svg width="80" height="80" viewBox="0 0 150 150" fill="none">
            <defs>
              <clipPath id="globeMaskM">
                <circle cx="75" cy="75" r="50" />
              </clipPath>
              <radialGradient id="globeGlowM" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(94,92,230,0.18)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </radialGradient>
            </defs>
            <circle cx="75" cy="75" r="52" fill="rgba(94,92,230,0.06)" />
            <g clipPath="url(#globeMaskM)">
              <circle cx="75" cy="75" r="50" fill="#EEF3F9" />
              <g fill="rgba(36,178,99,0.75)">
                <path d="M20,25 Q30,18 45,28 T35,50 T15,35 Z" />
                <path d="M50,20 Q60,15 70,22 T65,38 T48,30 Z" />
                <path d="M55,55 Q65,50 75,58 T70,72 T52,64 Z" />
                <path d="M80,30 Q90,25 100,35 T95,50 T78,42 Z" />
                <path d="M105,75 Q120,78 115,90 T98,88 Z" />
              </g>
            </g>
            <circle cx="75" cy="75" r="50" fill="none" stroke="rgba(94,92,230,0.15)" strokeWidth="1" />
            <ellipse cx="75" cy="75" rx="70" ry="22" stroke="rgba(94,92,230,0.2)" strokeWidth="0.8" strokeDasharray="4,4" transform="rotate(-15 75 75)" />
            <circle cx="75" cy="75" r="52" fill="url(#globeGlowM)" />
          </svg>
        </div>
        {/* Beach Card */}
        <div className="t-mobile-card">
          <span className="t-mobile-card-label">🏖️ Goa</span>
          <svg width="80" height="60" viewBox="0 0 120 70" fill="none">
            <defs>
              <linearGradient id="sunsetM" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#BAE6FD" />
                <stop offset="55%" stopColor="#FED7AA" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
            </defs>
            <rect width="120" height="70" fill="url(#sunsetM)" rx="8" />
            <circle cx="60" cy="36" r="10" fill="#F97316" style={{filter:'drop-shadow(0 0 5px #F97316)'}} />
            <path d="M5,50 Q12,30 8,10" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M8,10 Q2,8 -4,11 M8,10 Q14,8 20,11 M8,10 Q6,3 4,-4 M8,10 Q13,4 18,2" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" transform="translate(5,0)" />
            <path d="M0,60 Q30,57 60,60 T120,60 L120,70 L0,70 Z" fill="rgba(94,92,230,0.18)" />
            <path d="M-5,63 Q25,60 60,63 T125,63 L125,70 L-5,70 Z" fill="rgba(0,122,255,0.18)" />
          </svg>
        </div>
        {/* Train Card */}
        <div className="t-mobile-card">
          <span className="t-mobile-card-label">🚂 Train</span>
          <svg width="70" height="80" viewBox="0 0 120 120" fill="none">
            <path d="M60,10 L68,22 L68,32 L60,38 L56,46 L52,52 L45,59 L48,66 L42,72 L38,79 L48,84 L52,92 L48,102 L58,114 L60,118 L70,105 L72,95 L76,85 L80,75 L84,65 L88,58 L95,58 L98,45 L88,40 L78,45 L72,35 L75,25 L70,18 L62,15 Z"
              fill="rgba(94,92,230,0.06)" stroke="rgba(27,42,107,0.15)" strokeWidth="1.2" />
            <path d="M60,10 C58,35 48,65 52,90 C56,105 60,110 60,118"
              fill="none" stroke="rgba(27,42,107,0.1)" strokeWidth="1.2" strokeDasharray="3,3" />
            <motion.path d="M60,10 C58,35 48,65 52,90 C56,105 60,110 60,118"
              fill="none" stroke="#5E5CE6" strokeWidth="2.5" strokeLinecap="round"
              strokeDasharray="25 120" animate={{ strokeDashoffset: [145, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
              style={{ filter: 'drop-shadow(0 0 4px #5E5CE6)' }} />
          </svg>
        </div>
        {/* Bus Card */}
        <div className="t-mobile-card">
          <span className="t-mobile-card-label">🚌 Bus</span>
          <svg width="80" height="60" viewBox="0 0 120 70" fill="none">
            <defs>
              <linearGradient id="daySkyM" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E0F2FE" />
                <stop offset="100%" stopColor="#F1F5F9" />
              </linearGradient>
            </defs>
            <rect width="120" height="70" fill="url(#daySkyM)" rx="8" />
            <g transform="translate(10,12)">
              <rect x="0" y="8" width="18" height="30" fill="#CBD5E1" stroke="rgba(94,92,230,0.12)" strokeWidth="0.8" />
              <polygon points="9,0 0,8 18,8" fill="#5E5CE6" />
              <rect x="3" y="12" width="3" height="3" fill="#FBBF24" opacity="0.9" />
              <rect x="11" y="12" width="3" height="3" fill="#FBBF24" opacity="0.5" />
              <rect x="3" y="20" width="3" height="3" fill="#FBBF24" opacity="0.7" />
              <rect x="11" y="20" width="3" height="3" fill="#FBBF24" opacity="1" />
            </g>
            <line x1="35" y1="70" x2="58" y2="40" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
            <line x1="105" y1="70" x2="72" y2="40" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
            <motion.g animate={{ y: [0,-1.2,0] }} transition={{ duration:1, repeat:Infinity, ease:'easeInOut' }}>
              <rect x="44" y="44" width="28" height="13" rx="2" fill="#5E5CE6" />
              <rect x="47" y="47" width="5" height="4" fill="rgba(255,255,255,0.9)" />
              <rect x="55" y="47" width="5" height="4" fill="rgba(255,255,255,0.9)" />
              <rect x="63" y="47" width="5" height="4" fill="rgba(255,255,255,0.9)" />
              <circle cx="50" cy="57" r="2.2" fill="#334155" />
              <circle cx="66" cy="57" r="2.2" fill="#334155" />
            </motion.g>
          </svg>
        </div>
      </div>

      {/* Travel Content grids */}
      <div className="t-content" style={{ padding: '60px 8%', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Top Flight Deals */}
          <div className="t-sec-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 className="t-sec-h2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800 }}>🔥 Top Flight Deals</h2>
            <span className="t-see-all" onClick={() => onOpenModal('booking')} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-periwinkle)', cursor: 'pointer', letterSpacing: '1px' }}>SEE ALL →</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '60px'
          }}>
            {[
              {
                route: 'DEL → GOA',
                from: 'Delhi',
                to: 'Goa',
                info: 'Daily flights · IndiGo, Air India',
                price: '₹4,199',
                old: '₹7,200',
                save: '42% off',
                nights: '3N/4D',
                img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=480&h=280&fit=crop&q=80',
                tag: 'BEACH'
              },
              {
                route: 'DEL → BOM',
                from: 'Delhi',
                to: 'Mumbai',
                info: 'Mon, Thu, Sat · IndiGo',
                price: '₹3,299',
                old: '₹5,499',
                save: '40% off',
                nights: '2N/3D',
                img: 'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?w=480&h=280&fit=crop&q=80',
                tag: 'METRO'
              },
              {
                route: 'BLR → JKT',
                from: 'Bengaluru',
                to: 'Jaipur',
                info: 'Daily · SpiceJet, IndiGo',
                price: '₹3,899',
                old: '₹6,400',
                save: '39% off',
                nights: '3N/4D',
                img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=480&h=280&fit=crop&q=80',
                tag: 'HERITAGE'
              },
              {
                route: 'BOM → KEL',
                from: 'Mumbai',
                to: 'Kerala',
                info: 'Daily · Air India, Vistara',
                price: '₹2,899',
                old: '₹4,900',
                save: '41% off',
                nights: '4N/5D',
                img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=480&h=280&fit=crop&q=80',
                tag: 'NATURE'
              },
              {
                route: 'DEL → DXB',
                from: 'Delhi',
                to: 'Dubai',
                info: '3x Weekly · Emirates, Air India',
                price: '₹18,500',
                old: '₹28,000',
                save: '34% off',
                nights: '5N/6D',
                img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=480&h=280&fit=crop&q=80',
                tag: 'INTERNATIONAL'
              },
              {
                route: 'DEL → MNL',
                from: 'Delhi',
                to: 'Manali',
                info: 'Fly + Stay package',
                price: '₹8,999',
                old: '₹14,500',
                save: '38% off',
                nights: '4N/5D',
                img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=480&h=280&fit=crop&q=80',
                tag: 'MOUNTAINS'
              }
            ].map((deal, idx) => (
              <TiltCard key={idx} style={{ height: '100%' }}>
                <div
                  onClick={() => onOpenModal('booking')}
                  className="deal-card"
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Destination Photo with gradient overlay */}
                  <div style={{ position: 'relative', height: '150px', overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src={deal.img}
                      alt={deal.to}
                      loading="lazy"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.4s ease'
                      }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    {/* Dark gradient overlay for text readability */}
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)'
                    }} />
                    {/* Category tag - top left */}
                    <span style={{
                      position: 'absolute', top: '10px', left: '10px',
                      fontSize: '8px', fontWeight: 800, letterSpacing: '0.12em',
                      background: 'rgba(255,255,255,0.22)', backdropFilter: 'blur(6px)',
                      color: '#fff', padding: '3px 9px', borderRadius: '50px',
                      border: '1px solid rgba(255,255,255,0.25)'
                    }}>
                      {deal.tag}
                    </span>
                    {/* Nights badge - top right */}
                    <span style={{
                      position: 'absolute', top: '10px', right: '10px',
                      fontSize: '8px', fontWeight: 800,
                      background: 'var(--accent-periwinkle)', color: '#fff',
                      padding: '3px 9px', borderRadius: '50px'
                    }}>
                      {deal.nights}
                    </span>
                    {/* Destination name overlay - bottom of photo */}
                    <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px' }}>
                      <div style={{ fontSize: '18px', fontWeight: 900, color: '#fff', lineHeight: 1.1, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
                        {deal.to}
                      </div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.85)', fontWeight: 600, marginTop: '2px' }}>
                        {deal.route}
                      </div>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* Airline & schedule info */}
                    <div style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                      ✈️ {deal.info}
                    </div>

                    {/* Price row */}
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginTop: '2px' }}>
                      <span style={{ fontWeight: 900, fontSize: '20px', color: 'var(--accent-periwinkle)', fontFamily: 'var(--font-mono)' }}>
                        {deal.price}
                      </span>
                      <span style={{ fontSize: '11.5px', color: 'var(--text-muted)', textDecoration: 'line-through' }}>
                        {deal.old}
                      </span>
                    </div>

                    {/* Savings + Book Now row */}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
                      <span style={{
                        fontSize: '9.5px', fontWeight: 800, color: '#1E9438',
                        background: 'rgba(45,184,75,0.08)', padding: '3px 10px', borderRadius: '50px',
                        border: '1px solid rgba(45,184,75,0.15)'
                      }}>
                        🏷️ {deal.save}
                      </span>
                      <span style={{
                        fontSize: '10px', fontWeight: 700, color: 'var(--accent-periwinkle)',
                        cursor: 'pointer', letterSpacing: '0.04em'
                      }}>
                        Book Now →
                      </span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Featured Hotels */}
          <div className="t-sec-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 className="t-sec-h2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800 }}>🏨 Featured Hotels</h2>
            <span className="t-see-all" onClick={() => onOpenModal('booking')} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-periwinkle)', cursor: 'pointer', letterSpacing: '1px' }}>SEE ALL →</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '60px'
          }}>
            {[
              {
                name: 'Taj Mahal Palace',
                loc: 'Mumbai, Maharashtra',
                stars: 5,
                rating: '4.9',
                reviews: '2.1k reviews',
                price: '₹12,500',
                tag: 'LUXURY',
                amenities: ['🏊 Pool', '🍽️ Restaurant', '🧖 Spa'],
                img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=560&h=320&fit=crop&q=80'
              },
              {
                name: 'Kumarakom Lake Resort',
                loc: 'Kerala Backwaters',
                stars: 5,
                rating: '4.8',
                reviews: '1.4k reviews',
                price: '₹8,200',
                tag: 'NATURE',
                amenities: ['🚤 Boating', '🌿 Ayurveda', '🍽️ Restaurant'],
                img: 'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=560&h=320&fit=crop&q=80'
              },
              {
                name: 'Rambagh Palace',
                loc: 'Jaipur, Rajasthan',
                stars: 5,
                rating: '4.9',
                reviews: '987 reviews',
                price: '₹14,800',
                tag: 'HERITAGE',
                amenities: ['🏰 Palace Stay', '🍽️ Fine Dining', '🐘 Safari'],
                img: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=560&h=320&fit=crop&q=80'
              },
              {
                name: 'W Goa',
                loc: 'Vagator Beach, Goa',
                stars: 5,
                rating: '4.7',
                reviews: '1.8k reviews',
                price: '₹9,500',
                tag: 'BEACHFRONT',
                amenities: ['🏖️ Private Beach', '🏊 Infinity Pool', '🎵 Nightlife'],
                img: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=560&h=320&fit=crop&q=80'
              },
              {
                name: 'The Leela Palace',
                loc: 'New Delhi',
                stars: 5,
                rating: '4.9',
                reviews: '3.2k reviews',
                price: '₹16,200',
                tag: 'URBAN LUXURY',
                amenities: ['🥂 Lounge', '🏋️ Gym', '🍽️ Multi-cuisine'],
                img: 'https://images.unsplash.com/photo-1590073242678-70ee3fc28e8e?w=560&h=320&fit=crop&q=80'
              },
              {
                name: 'Ananda in the Himalayas',
                loc: 'Rishikesh, Uttarakhand',
                stars: 5,
                rating: '4.8',
                reviews: '654 reviews',
                price: '₹22,000',
                tag: 'WELLNESS',
                amenities: ['🧘 Yoga', '♨️ Hot Springs', '🌲 Forest View'],
                img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=560&h=320&fit=crop&q=80'
              }
            ].map((hotel, idx) => (
              <TiltCard key={idx} style={{ height: '100%' }}>
                <div
                  onClick={() => onOpenModal('booking')}
                  className="hotel-card"
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Hotel Photo */}
                  <div style={{ position: 'relative', height: '190px', overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src={hotel.img}
                      alt={hotel.name}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    {/* Gradient overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 55%)' }} />
                    {/* Category tag */}
                    <span style={{
                      position: 'absolute', top: '10px', left: '10px',
                      fontSize: '8px', fontWeight: 800, letterSpacing: '0.1em',
                      background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(6px)',
                      color: '#fff', padding: '3px 9px', borderRadius: '50px',
                      border: '1px solid rgba(255,255,255,0.3)'
                    }}>
                      {hotel.tag}
                    </span>
                    {/* Heart / Save — Airbnb style */}
                    <button
                      onClick={e => { e.stopPropagation(); }}
                      style={{
                        position: 'absolute', top: '10px', right: '10px',
                        background: 'rgba(255,255,255,0.85)', border: 'none',
                        borderRadius: '50%', width: '30px', height: '30px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        cursor: 'pointer', fontSize: '14px', boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
                      }}
                    >
                      ♡
                    </button>
                    {/* Hotel name on photo */}
                    <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px' }}>
                      <div style={{ fontSize: '16px', fontWeight: 900, color: '#fff', textShadow: '0 1px 4px rgba(0,0,0,0.4)', lineHeight: 1.1 }}>
                        {hotel.name}
                      </div>
                    </div>
                  </div>

                  {/* Card body — Airbnb style */}
                  <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    {/* Location + Rating row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11.5px', color: 'var(--text-secondary)' }}>📍 {hotel.loc}</span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: '#1E293B' }}>
                        ⭐ {hotel.rating} <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '10px' }}>({hotel.reviews})</span>
                      </span>
                    </div>
                    {/* Stars */}
                    <div style={{ color: '#F59E0B', fontSize: '12px', letterSpacing: '1px' }}>
                      {'★'.repeat(hotel.stars)}
                    </div>
                    {/* Amenities */}
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '2px' }}>
                      {hotel.amenities.map((a, ai) => (
                        <span key={ai} style={{
                          fontSize: '9.5px', background: 'rgba(94,92,230,0.06)',
                          border: '1px solid rgba(94,92,230,0.12)',
                          color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '50px'
                        }}>{a}</span>
                      ))}
                    </div>
                    {/* Price + Book row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--border-primary)' }}>
                      <div>
                        <span style={{ fontWeight: 900, fontSize: '19px', color: 'var(--accent-periwinkle)', fontFamily: 'var(--font-mono)' }}>{hotel.price}</span>
                        <span style={{ fontSize: '10.5px', color: 'var(--text-muted)', marginLeft: '4px' }}>/night</span>
                      </div>
                      <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--accent-periwinkle)' }}>Book Now →</span>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Holiday Packages */}
          <div className="t-sec-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 className="t-sec-h2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800 }}>🏖️ Holiday Packages</h2>
            <span className="t-see-all" onClick={() => onOpenModal('booking')} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-periwinkle)', cursor: 'pointer', letterSpacing: '1px' }}>SEE ALL →</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '60px'
          }}>
            {[
              {
                name: 'Goa Beach Getaway',
                sub: 'North Goa · Calangute & Baga',
                label: 'BEST SELLER',
                labelColor: '#F97316',
                tags: ['✈️ Flights', '🏨 4 Nights', '🚕 Transfers'],
                price: '₹15,999',
                per: '/ person',
                rating: '4.8', reviews: '3.2k',
                img: 'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?w=560&h=320&fit=crop&q=80'
              },
              {
                name: 'Kerala Backwaters',
                sub: 'Alleppey · Munnar · Kovalam',
                label: 'TRENDING',
                labelColor: '#5E5CE6',
                tags: ['✈️ Flights', '🏨 5 Nights', '🚤 Houseboat'],
                price: '₹21,500',
                per: '/ person',
                rating: '4.9', reviews: '2.1k',
                img: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=560&h=320&fit=crop&q=80'
              },
              {
                name: 'Dubai City & Desert',
                sub: 'Downtown · Desert Safari · Creek',
                label: 'INTERNATIONAL',
                labelColor: '#D97706',
                tags: ['✈️ Flights', '🏨 4 Nights', '🏛️ Tours'],
                price: '₹45,000',
                per: '/ person',
                rating: '4.7', reviews: '1.8k',
                img: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=560&h=320&fit=crop&q=80'
              },
              {
                name: 'Manali Snow Adventure',
                sub: 'Solang Valley · Rohtang · Hadimba',
                label: 'ADVENTURE',
                labelColor: '#1E9438',
                tags: ['🚌 Volvo Bus', '🏨 4 Nights', '🎿 Snow Sports'],
                price: '₹12,499',
                per: '/ person',
                rating: '4.6', reviews: '4.5k',
                img: 'https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?w=560&h=320&fit=crop&q=80'
              },
              {
                name: 'Rajasthan Royal Tour',
                sub: 'Jaipur · Jodhpur · Udaipur',
                label: 'HERITAGE',
                labelColor: '#B91C1C',
                tags: ['✈️ Flights', '🏨 6 Nights', '🐪 Camel Safari'],
                price: '₹28,999',
                per: '/ person',
                rating: '4.8', reviews: '1.2k',
                img: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?w=560&h=320&fit=crop&q=80'
              },
              {
                name: 'Andaman Island Escape',
                sub: 'Port Blair · Havelock · Neil Island',
                label: 'ISLAND',
                labelColor: '#0EA5E9',
                tags: ['✈️ Flights', '🏨 5 Nights', '🤿 Scuba Diving'],
                price: '₹32,500',
                per: '/ person',
                rating: '4.9', reviews: '876',
                img: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=560&h=320&fit=crop&q=80'
              }
            ].map((pkg, idx) => (
              <TiltCard key={idx} style={{ height: '100%' }}>
                <div
                  onClick={() => onOpenModal('booking')}
                  className="pkg-card"
                  style={{
                    background: 'var(--white)',
                    border: '1px solid var(--border-primary)',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    transition: 'transform 0.25s, box-shadow 0.25s',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  {/* Package Photo */}
                  <div style={{ position: 'relative', height: '180px', overflow: 'hidden', flexShrink: 0 }}>
                    <img
                      src={pkg.img}
                      alt={pkg.name}
                      loading="lazy"
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.4s ease' }}
                      onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.06)'}
                      onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
                    />
                    {/* Gradient overlay */}
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)' }} />
                    {/* Label badge */}
                    <span style={{
                      position: 'absolute', top: '10px', left: '10px',
                      fontSize: '8px', fontWeight: 800, letterSpacing: '0.1em',
                      background: pkg.labelColor, color: '#fff',
                      padding: '3px 10px', borderRadius: '50px'
                    }}>
                      {pkg.label}
                    </span>
                    {/* Rating badge */}
                    <span style={{
                      position: 'absolute', top: '10px', right: '10px',
                      fontSize: '9px', fontWeight: 800,
                      background: 'rgba(255,255,255,0.9)', color: '#1E293B',
                      padding: '3px 9px', borderRadius: '50px',
                      display: 'flex', alignItems: 'center', gap: '3px'
                    }}>
                      ⭐ {pkg.rating}
                    </span>
                    {/* Package name on photo */}
                    <div style={{ position: 'absolute', bottom: '10px', left: '12px', right: '12px' }}>
                      <div style={{ fontSize: '17px', fontWeight: 900, color: '#fff', lineHeight: 1.1, textShadow: '0 1px 4px rgba(0,0,0,0.4)' }}>
                        {pkg.name}
                      </div>
                      <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.8)', fontWeight: 500, marginTop: '3px' }}>
                        📍 {pkg.sub}
                      </div>
                    </div>
                  </div>

                  {/* Card body */}
                  <div style={{ padding: '14px 16px 16px', flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {/* Inclusions tags */}
                    <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                      {pkg.tags.map((tag, ti) => (
                        <span key={ti} style={{
                          fontSize: '9.5px', background: 'rgba(94,92,230,0.05)',
                          border: '1px solid rgba(94,92,230,0.12)',
                          color: 'var(--text-secondary)', padding: '2px 8px', borderRadius: '50px'
                        }}>{tag}</span>
                      ))}
                    </div>
                    {/* Reviews */}
                    <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>
                      {pkg.reviews} travellers rated this package
                    </div>
                    {/* Price + CTA */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '8px', borderTop: '1px solid var(--border-primary)' }}>
                      <div>
                        <div style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Starting from</div>
                        <span style={{ fontWeight: 900, fontSize: '19px', color: 'var(--accent-periwinkle)', fontFamily: 'var(--font-mono)' }}>{pkg.price}</span>
                        <span style={{ fontSize: '10px', color: 'var(--text-muted)', marginLeft: '3px' }}>{pkg.per}</span>
                      </div>
                      <button
                        onClick={() => onOpenModal('booking')}
                        style={{
                          background: 'var(--accent-periwinkle)', color: '#fff',
                          border: 'none', borderRadius: '10px',
                          padding: '8px 16px', fontSize: '11px', fontWeight: 700,
                          cursor: 'pointer'
                        }}
                      >
                        View Package
                      </button>
                    </div>
                  </div>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Why Book section */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '26px', fontWeight: 800 }}>Why Book with BillsPay24X7✓</h2>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '60px'
          }}>
            {[
              { t: 'Best Price Guarantee', d: 'Compare across 500+ airlines & 1M+ hotels. We match or beat any price.', icon: '💰', bg: 'rgba(27,42,107,0.04)' },
              { t: 'Instant Confirmation', d: 'E-tickets and hotel vouchers within seconds of booking completion.', icon: '⚡', bg: 'rgba(45,184,75,0.05)' },
              { t: 'Easy Cancellations', d: 'Hassle-free cancellations and refunds per airline/hotel policy.', icon: '🔄', bg: 'rgba(27,42,107,0.05)' },
              { t: '24×7 Travel Support', d: 'WhatsApp, phone and email support round the clock, every day.', icon: '📞', bg: 'rgba(94,92,230,0.05)' }
            ].map((feat, idx) => (
              <TiltCard key={idx} style={{ height: '100%' }}>
                <div style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '16px',
                  padding: '24px',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                  height: '100%',
                  width: '100%'
                }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: feat.bg, display: 'flex', alignItems: 'center', justify: 'center', fontSize: '22px', margin: '0 auto 16px' }}>{feat.icon}</div>
                <h4 style={{ fontSize: '14.5px', fontWeight: 800, marginBottom: '6px' }}>{feat.t}</h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{feat.d}</p>
                </div>
              </TiltCard>
            ))}
          </div>

          {/* Travel CTA banner */}
          <div style={{
            background: 'var(--g-navy)',
            borderRadius: '24px',
            padding: '50px 40px',
            textAlign: 'center',
            color: '#fff',
            boxShadow: 'var(--shadow-xl)'
          }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '30px', fontWeight: 800, marginBottom: '12px' }}>Need Help Planning Your Trip?</h2>
            <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.7)', marginBottom: '28px' }}>Talk to our travel experts on WhatsApp. We plan, you enjoy.</p>
            <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button onClick={() => onOpenModal('booking')} className="btn-cred-neon" style={{ padding: '12px 28px', fontSize: '13.5px' }}>Book Now →</button>
              <button onClick={() => window.location.href='#contact'} className="btn-cred-outline" style={{ padding: '12px 28px', fontSize: '13.5px', color: '#fff', borderColor: '#fff' }}>Enquire B2B Travel API</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
