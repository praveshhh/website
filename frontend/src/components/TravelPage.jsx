import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Search, CheckCircle, Phone, ArrowRight, Heart } from 'lucide-react';

export default function TravelPage({ onOpenModal }) {
  const [activeSearchTab, setActiveSearchTab] = useState(0);
  const [tripType, setTripType] = useState('one-way');
  const [busPassengers, setBusPassengers] = useState(1);
  const [holidayPassengers, setHolidayPassengers] = useState(2);

  // Form states
  const [flightFrom, setFlightFrom] = useState('Delhi (DEL)');
  const [flightTo, setFlightTo] = useState('Mumbai (BOM)');
  const [flightDate, setFlightDate] = useState('');
  const [flightReturn, setFlightReturn] = useState('');
  const [flightClass, setFlightClass] = useState('1 Adult, Economy');

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
      msg = `Hi BillsPay24X7 Travel!\nI want to book a Flight:\nType: ${tripType}\nFrom: ${flightFrom}\nTo: ${flightTo}\nDeparture: ${flightDate || 'N/A'}\nReturn: ${flightReturn || 'N/A'}\nClass/Pax: ${flightClass}`;
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
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--surf-1)' }}>
      {/* Travel Hero */}
      <div className="t-hero" style={{
        minHeight: '480px',
        position: 'relative',
        overflow: 'hidden',
        padding: '96px 8% 40px',
        background: 'linear-gradient(145deg, #0D1638 0%, #1B2A6B 45%, #243080 70%, #1E9438 100%)',
        color: '#fff',
        textAlign: 'center'
      }}>
        {/* Sky/clouds parallax indicators */}
        <div style={{ position: 'absolute', inset: 0, opacity: 0.08, zIndex: 0, backgroundImage: 'radial-gradient(circle, #fff 10%, transparent 80%)' }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div className="t-hero-tag" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(45, 184, 75, 0.15)',
            border: '1px solid rgba(45, 184, 75, 0.3)',
            color: '#86EFAC',
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
            marginBottom: '16px'
          }}>
            Where Do You Want<br />To Go Next?
          </h1>
          <p style={{
            fontSize: '15px',
            color: 'rgba(255,255,255,0.7)',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
              <CheckCircle size={14} color="#86EFAC" /> 500+ Airlines
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
              <CheckCircle size={14} color="#86EFAC" /> 1M+ Hotels
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
              <CheckCircle size={14} color="#86EFAC" /> 1000+ Bus Operators
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'rgba(255,255,255,0.8)' }}>
              <CheckCircle size={14} color="#86EFAC" /> IRCTC Integrated
            </div>
          </div>
        </div>

        {/* Search Widget */}
        <div className="search-box" style={{
          background: 'var(--white)',
          borderRadius: '18px',
          maxWidth: '1000px',
          margin: '0 auto',
          boxShadow: 'var(--shadow-xl)',
          color: 'var(--text-primary)',
          textAlign: 'left',
          overflow: 'hidden'
        }}>
          {/* Tab headers */}
          <div className="s-tabs" style={{ display: 'flex', borderBottom: '1px solid var(--border-primary)', overflowX: 'auto', background: '#F8FAFF' }}>
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
                  color: activeSearchTab === idx ? '#1B2A6B' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  border: 'none',
                  borderBottom: activeSearchTab === idx ? '3px solid #1B2A6B' : '3px solid transparent',
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
                <div style={{ display: 'flex', gap: '16px', marginBottom: '18px' }}>
                  {['one-way', 'round-trip', 'multi-city'].map((type) => (
                    <label key={type} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer', fontWeight: 600, color: tripType === type ? '#1B2A6B' : 'var(--text-secondary)' }}>
                      <input
                        type="radio"
                        name="tripType"
                        value={type}
                        checked={tripType === type}
                        onChange={(e) => setTripType(e.target.value)}
                        style={{ accentColor: '#1B2A6B' }}
                      />
                      {type === 'one-way' && 'One Way'}
                      {type === 'round-trip' && 'Round Trip'}
                      {type === 'multi-city' && 'Multi City'}
                    </label>
                  ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', position: 'relative', marginBottom: '12px' }}>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>From</div>
                    <input className="sf-inp" type="text" value={flightFrom} onChange={(e) => setFlightFrom(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700, fontSize: '14.5px' }} />
                  </div>
                  <button type="button" onClick={() => swapRoute('flight')} style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)', width: '32px', height: '32px', borderRadius: '50%', background: '#fff', border: '1px solid var(--border-primary)', cursor: 'pointer', zIndex: 1, display: 'flex', alignItems: 'center', justify: 'center', fontWeight: 700 }}>⇄</button>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>To</div>
                    <input className="sf-inp" type="text" value={flightTo} onChange={(e) => setFlightTo(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700, fontSize: '14.5px' }} />
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '18px' }}>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Departure</div>
                    <input className="sf-inp" type="date" value={flightDate} onChange={(e) => setFlightDate(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700 }} />
                  </div>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Return (Optional)</div>
                    <input className="sf-inp" type="date" value={flightReturn} onChange={(e) => setFlightReturn(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700 }} disabled={tripType === 'one-way'} />
                  </div>
                  <div className="sf" style={{ background: '#F8FAFF', border: '1.5px solid var(--border-primary)', borderRadius: '12px', padding: '10px 16px' }}>
                    <div className="sf-lbl" style={{ fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Travellers & Class</div>
                    <input className="sf-inp" type="text" value={flightClass} onChange={(e) => setFlightClass(e.target.value)} style={{ width: '100%', border: 'none', background: 'transparent', outline: 'none', fontWeight: 700, fontSize: '13.5px' }} />
                  </div>
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

            <button type="submit" className="search-cta" style={{
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
            </button>
          </form>
        </div>
      </div>

      {/* Travel Content grids */}
      <div className="t-content" style={{ padding: '60px 8%', background: 'var(--surf-1)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          
          {/* Top Flight Deals */}
          <div className="t-sec-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 className="t-sec-h2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800 }}>🔥 Top Flight Deals</h2>
            <span className="t-see-all" onClick={() => onOpenModal('booking')} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-periwinkle)', cursor: 'pointer', letterSpacing: '1px' }}>SEE ALL →</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '20px',
            marginBottom: '60px'
          }}>
            {[
              { route: 'DEL → BOM', info: 'Delhi to Mumbai · Mon, Thu, Sat', price: '₹3,299', old: '₹5,499', save: 'Save 40%', bg: 'linear-gradient(135deg, #1B2A6B, #243080)' },
              { route: 'DEL → GOA', info: 'Delhi to Goa · Daily flights', price: '₹4,199', old: '₹7,200', save: 'Save 42%', bg: 'linear-gradient(135deg, #1E9438, #2DB84B)' },
              { route: 'BLR → COK', info: 'Bengaluru to Kochi · Daily', price: '₹2,499', old: '₹4,100', save: 'Save 39%', bg: 'linear-gradient(135deg, #15803D, #2DB84B)' },
              { route: 'DEL → DXB', info: 'Delhi to Dubai · 3x Weekly', price: '₹18,500', old: '₹28,000', save: 'Save 34%', bg: 'linear-gradient(135deg, #D97706, #F59E0B)' }
            ].map((deal, idx) => (
              <div key={idx} onClick={() => onOpenModal('booking')} className="deal-card" style={{
                background: 'var(--white)',
                border: '1px solid var(--border-primary)',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}>
                <div style={{ height: '110px', background: deal.bg, display: 'flex', alignItems: 'center', justify: 'center', fontSize: '32px' }}>✈️</div>
                <div style={{ padding: '16px' }}>
                  <div style={{ fontWeight: 800, fontSize: '15px' }}>{deal.route}</div>
                  <div style={{ fontSize: '11.5px', color: 'var(--text-secondary)', margin: '4px 0 10px' }}>{deal.info}</div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                    <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--accent-periwinkle)' }}>{deal.price}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textDecoration: 'line-through' }}>{deal.old}</span>
                  </div>
                  <span style={{ display: 'inline-block', marginTop: '8px', fontSize: '9.5px', fontWeight: 700, color: '#1E9438', background: 'rgba(45,184,75,0.08)', padding: '2px 8px', borderRadius: '50px' }}>{deal.save}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Hotels */}
          <div className="t-sec-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 className="t-sec-h2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800 }}>🏨 Featured Hotels</h2>
            <span className="t-see-all" onClick={() => onOpenModal('booking')} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-periwinkle)', cursor: 'pointer', letterSpacing: '1px' }}>SEE ALL →</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '60px'
          }}>
            {[
              { name: 'Taj Mahal Palace', loc: 'Mumbai, India', stars: '★★★★★', price: '₹12,500', bg: 'linear-gradient(135deg, #1B2A6B, #243080)' },
              { name: 'Kumarakom Lake Resort', loc: 'Kerala, India', stars: '★★★★★', price: '₹8,200', bg: 'linear-gradient(135deg, #065F46, #059669)' },
              { name: 'Rambagh Palace', loc: 'Jaipur, Rajasthan', stars: '★★★★★', price: '₹14,800', bg: 'linear-gradient(135deg, #B91C1C, #DC2626)' }
            ].map((hotel, idx) => (
              <div key={idx} onClick={() => onOpenModal('booking')} className="hotel-card" style={{
                background: 'var(--white)',
                border: '1px solid var(--border-primary)',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}>
                <div style={{ height: '140px', background: hotel.bg, display: 'flex', alignItems: 'center', justify: 'center', fontSize: '40px' }}>🏨</div>
                <div style={{ padding: '18px' }}>
                  <div style={{ fontWeight: 800, fontSize: '16px' }}>{hotel.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)', margin: '4px 0 8px' }}>📍 {hotel.loc}</div>
                  <div style={{ color: '#F59E0B', fontSize: '13px', marginBottom: '8px' }}>{hotel.stars}</div>
                  <div>
                    <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--accent-periwinkle)' }}>{hotel.price}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '4px' }}>/ night</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Holiday Packages */}
          <div className="t-sec-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
            <h2 className="t-sec-h2" style={{ fontFamily: 'var(--font-display)', fontSize: '22px', fontWeight: 800 }}>🏖️ Holiday Packages</h2>
            <span className="t-see-all" onClick={() => onOpenModal('booking')} style={{ fontSize: '11px', fontWeight: 700, color: 'var(--accent-periwinkle)', cursor: 'pointer', letterSpacing: '1px' }}>SEE ALL →</span>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '60px'
          }}>
            {[
              { name: 'Goa Beach Getaway', label: 'BEST SELLER', tags: ['✈️ Flights', '🏨 4 Nights', '🚕 Transfers'], price: '₹15,999', bg: 'linear-gradient(135deg, #1E9438, #2DB84B)' },
              { name: 'Kerala Backwaters', label: 'TRENDING', tags: ['✈️ Flights', '🏨 5 Nights', '🚤 Houseboat'], price: '₹21,500', bg: 'linear-gradient(135deg, #15803D, #2DB84B)' },
              { name: 'Dubai City & Desert', label: 'INTERNATIONAL', tags: ['✈️ Flights', '🏨 4 Nights', '🏛️ Tours'], price: '₹45,000', bg: 'linear-gradient(135deg, #D97706, #F59E0B)' }
            ].map((pkg, idx) => (
              <div key={idx} onClick={() => onOpenModal('booking')} className="pkg-card" style={{
                background: 'var(--white)',
                border: '1px solid var(--border-primary)',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s',
                position: 'relative'
              }}>
                <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--orange)', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '4px 10px', borderRadius: '50px', zIndex: 1 }}>{pkg.label}</div>
                <div style={{ height: '150px', background: pkg.bg, display: 'flex', alignItems: 'center', justify: 'center', fontSize: '44px' }}>🏖️</div>
                <div style={{ padding: '18px' }}>
                  <div style={{ fontWeight: 800, fontSize: '16px', marginBottom: '8px' }}>{pkg.name}</div>
                  <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '12px' }}>
                    {pkg.tags.map((tag, tIdx) => (
                      <span key={tIdx} style={{ fontSize: '10px', background: 'var(--surf-1)', border: '1px solid var(--border-primary)', padding: '2px 8px', borderRadius: '50px', color: 'var(--text-secondary)' }}>{tag}</span>
                    ))}
                  </div>
                  <div>
                    <span style={{ fontWeight: 800, fontSize: '18px', color: 'var(--accent-periwinkle)' }}>{pkg.price}</span>
                    <span style={{ fontSize: '11px', color: 'var(--text-secondary)', marginLeft: '4px' }}>/ person</span>
                  </div>
                </div>
              </div>
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
              <div key={idx} style={{
                background: 'var(--white)',
                border: '1px solid var(--border-primary)',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                transition: 'all 0.3s'
              }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: feat.bg, display: 'flex', alignItems: 'center', justify: 'center', fontSize: '22px', margin: '0 auto 16px' }}>{feat.icon}</div>
                <h4 style={{ fontSize: '14.5px', fontWeight: 800, marginBottom: '6px' }}>{feat.t}</h4>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{feat.d}</p>
              </div>
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
