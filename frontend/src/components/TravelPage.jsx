import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Users, Search, CheckCircle, Phone, ArrowRight, Heart } from 'lucide-react';
import TiltCard from './TiltCard';

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
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      {/* Travel Hero — matches homepage light theme */}
      <div className="t-hero" style={{
        minHeight: '480px',
        position: 'relative',
        overflow: 'hidden',
        padding: '96px 8% 40px',
        background: 'radial-gradient(circle at 12% 20%, rgba(94, 92, 230, 0.06) 0%, transparent 55%), radial-gradient(circle at 90% 80%, rgba(36, 178, 99, 0.04) 0%, transparent 55%)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
        color: 'var(--text-primary)',
        textAlign: 'center'
      }}>
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

        {/* Left Travel Visuals */}
        <div className="t-hero-visual-left" style={{
          position: 'absolute',
          left: '4%',
          top: '80px',
          zIndex: 1,
          width: '240px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          pointerEvents: 'none'
        }}>
          {/* 1. Globe Orbit Card */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'rgba(255, 255, 255, 0.82)',
              border: '1px solid rgba(94, 92, 230, 0.1)',
              borderRadius: '16px',
              padding: '14px 18px',
              boxShadow: '0 8px 32px rgba(27, 42, 107, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-periwinkle)', opacity: 0.9 }}>
              Global Flights
            </span>
            <svg width="120" height="120" viewBox="0 0 150 150" fill="none">
              <defs>
                <mask id="globeMask">
                  <circle cx="75" cy="75" r="50" fill="#ffffff" />
                </mask>
                <radialGradient id="sphereShading" cx="30%" cy="30%" r="70%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="rgba(0,0,0,0.2)" />
                  <stop offset="85%" stopColor="rgba(0,0,0,0.7)" />
                  <stop offset="100%" stopColor="rgba(0,0,0,0.95)" />
                </radialGradient>
                <radialGradient id="globeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="rgba(94, 92, 230, 0.18)" />
                  <stop offset="100%" stopColor="rgba(255, 255, 255, 0)" />
                </radialGradient>
                <linearGradient id="glossLight" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
                  <stop offset="40%" stopColor="rgba(255,255,255,0.05)" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
              {/* Outer Glow */}
              <circle cx="75" cy="75" r="62" fill="url(#globeGlow)" />
              
              {/* 3D Rotating Earth Sphere */}
              <g mask="url(#globeMask)">
                {/* Deep ocean background — light blue */}
                <circle cx="75" cy="75" r="50" fill="#EEF3F9" />
                {/* Lat/Long grid background lines */}
                <circle cx="75" cy="75" r="50" stroke="rgba(94,92,230,0.1)" strokeWidth="0.8" fill="none" />
                
                {/* Seamlessly Scrolling Continent landmass group */}
                <motion.g
                  animate={{ x: [-150, 0] }}
                  transition={{ ease: "linear", duration: 12, repeat: Infinity }}
                  style={{ display: 'flex' }}
                >
                  {/* Landmass Set 1 */}
                  <g fill="rgba(36, 178, 99, 0.75)" opacity="1">
                    {/* North America / Greenland */}
                    <path d="M20,25 Q30,18 45,28 T35,50 T15,35 Z" />
                    {/* South America */}
                    <path d="M28,52 Q40,60 35,80 T25,95 T18,70 Z" />
                    {/* Eurasia / Africa */}
                    <path d="M60,20 Q80,15 100,28 T115,45 T90,75 T70,60 T60,40 Z" />
                    {/* Australia */}
                    <path d="M105,75 Q120,78 115,90 T98,88 Z" />
                  </g>
                  {/* Landmass Set 2 (Duplicate, offset by 150px) */}
                  <g fill="rgba(36, 178, 99, 0.75)" opacity="1" transform="translate(150, 0)">
                    {/* North America / Greenland */}
                    <path d="M20,25 Q30,18 45,28 T35,50 T15,35 Z" />
                    {/* South America */}
                    <path d="M28,52 Q40,60 35,80 T25,95 T18,70 Z" />
                    {/* Eurasia / Africa */}
                    <path d="M60,20 Q80,15 100,28 T115,45 T90,75 T70,60 T60,40 Z" />
                    {/* Australia */}
                    <path d="M105,75 Q120,78 115,90 T98,88 Z" />
                  </g>
                </motion.g>

                {/* Drifting Clouds over Earth */}
                {/* Cloud 1 (Left to Right) */}
                <motion.g
                  animate={{ x: [-40, 140] }}
                  transition={{ ease: "linear", duration: 16, repeat: Infinity }}
                  opacity="0.55"
                >
                  <path d="M15,45 Q21,39 27,45 Q33,41 39,45 L39,48 L15,48 Z" fill="#ffffff" />
                </motion.g>
                {/* Cloud 2 (Right to Left) */}
                <motion.g
                  animate={{ x: [140, -40] }}
                  transition={{ ease: "linear", duration: 20, repeat: Infinity }}
                  opacity="0.45"
                >
                  <path d="M20,65 Q26,59 32,65 Q38,61 44,65 L44,68 L20,68 Z" fill="#ffffff" />
                </motion.g>
                
                {/* 3D Spherical Shadow overlay */}
                <circle cx="75" cy="75" r="50" fill="url(#sphereShading)" />
                {/* Gloss reflection overlay */}
                <circle cx="75" cy="75" r="50" fill="url(#glossLight)" opacity="0.3" />
              </g>
              
              {/* Outer latitude/longitude decorative axis grid */}
              <ellipse cx="75" cy="75" rx="50" ry="15" stroke="rgba(94,92,230,0.1)" strokeWidth="0.8" />
              <ellipse cx="75" cy="75" rx="18" ry="50" stroke="rgba(94,92,230,0.1)" strokeWidth="0.8" />
              
              {/* Orbit track */}
              <ellipse cx="75" cy="75" rx="70" ry="22" stroke="rgba(94,92,230,0.25)" strokeWidth="0.8" strokeDasharray="4,4" transform="rotate(-15 75 75)" />
              
              {/* Slanted orbit orbiting plane */}
              <g transform="translate(75, 75) rotate(-15)">
                <g className="orbit-plane-group">
                  {/* Detailed 3D Airliner Vector */}
                  <g transform="translate(70, 0) rotate(-90)">
                    {/* Fuselage shadow */}
                    <ellipse cx="0" cy="1.5" rx="14" ry="4" fill="rgba(0,0,0,0.35)" />
                    {/* Fuselage body */}
                    <ellipse cx="0" cy="0" rx="14" ry="4" fill="#ffffff" />
                    <path d="M-14,0 Q0,4 14,0 Q0,1 -14,0" fill="#E2E8F0" />
                    {/* Cockpit window */}
                    <path d="M8,-2 C9,-1 11,-1 12,0 C11,1 9,1 8,2 Z" fill="#1E3A8A" opacity="0.85" />
                    {/* Back wing (top side) — periwinkle branded */}
                    <polygon points="-3,-3 -12,-16 -7,-16 2,-3" fill="#8B89F5" />
                    {/* Front wing (bottom side, shaded) */}
                    <polygon points="-3,3 -12,18 -7,18 2,3" fill="#5E5CE6" />
                    {/* Tail fin vertical */}
                    <polygon points="-11,0 -14,-8 -9,-8 -7,0" fill="#5E5CE6" />
                    {/* Tail plane horizontal */}
                    <polygon points="-10,0 -13,6 -10,6 -7,0" fill="#8B89F5" />
                    {/* Engines */}
                    <rect x="-6" y="6" width="5" height="2" rx="1" fill="#475569" />
                    <rect x="-6" y="-8" width="5" height="2" rx="1" fill="#64748B" />
                  </g>
                </g>
              </g>
            </svg>
          </motion.div>

          {/* 2. Goa Beach Card */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'rgba(255, 255, 255, 0.82)',
              border: '1px solid rgba(94, 92, 230, 0.1)',
              borderRadius: '16px',
              padding: '14px 18px',
              boxShadow: '0 8px 32px rgba(27, 42, 107, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-periwinkle)', opacity: 0.9 }}>
              Goa Beach Sunset
            </span>
            <svg width="120" height="70" viewBox="0 0 120 70" fill="none" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <defs>
                <linearGradient id="sunset" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#BAE6FD" />
                  <stop offset="55%" stopColor="#FED7AA" />
                  <stop offset="100%" stopColor="#FDE68A" />
                </linearGradient>
              </defs>
              {/* Background Pastel Sunset sky */}
              <rect width="120" height="70" fill="url(#sunset)" />
              
              {/* Glowing Sun */}
              <motion.circle 
                cx="60" cy="38" r="10" 
                fill="#F97316" 
                animate={{ scale: [1, 1.07, 1], opacity: [0.85, 1, 0.85] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ filter: 'drop-shadow(0 0 6px #F97316)' }}
              />
              
              {/* Swaying Palm Tree */}
              <g transform="translate(10, 10)">
                <path d="M5,50 Q12,30 8,10" fill="none" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
                <motion.g
                  animate={{ rotate: [-3, 3, -3] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  transformOrigin="8px 10px"
                >
                  <path d="M8,10 Q2,8 -4,11 M8,10 Q14,8 20,11 M8,10 Q6,3 4,-4 M8,10 Q13,4 18,2 M8,10 Q3,15 -1,22 M8,10 Q11,15 15,22" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
                </motion.g>
              </g>

              {/* Rolling Waves — sea blue */}
              <motion.path 
                d="M0,58 Q30,55 60,58 T120,58 L120,70 L0,70 Z" 
                fill="rgba(94, 92, 230, 0.15)" 
                animate={{ x: [-8, 8, -8] }} 
                transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }} 
              />
              <motion.path 
                d="M-10,61 Q25,58 60,61 T130,61 L130,70 L-10,70 Z" 
                fill="rgba(0, 122, 255, 0.2)" 
                animate={{ x: [8, -8, 8] }} 
                transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }} 
              />
            </svg>
          </motion.div>
        </div>

        {/* Right Travel Visuals */}
        <div className="t-hero-visual-right" style={{
          position: 'absolute',
          right: '4%',
          top: '80px',
          zIndex: 1,
          width: '240px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          pointerEvents: 'none'
        }}>
          {/* 1. Train Route Card */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'rgba(255, 255, 255, 0.82)',
              border: '1px solid rgba(94, 92, 230, 0.1)',
              borderRadius: '16px',
              padding: '14px 18px',
              boxShadow: '0 8px 32px rgba(27, 42, 107, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-periwinkle)', opacity: 0.9 }}>
              J&K to South Train
            </span>
            <svg width="100" height="100" viewBox="0 0 120 120" fill="none">
              {/* Abstract India Map Outline */}
              <path 
                d="M60,10 L68,22 L68,32 L60,38 L56,46 L52,52 L45,59 L48,66 L42,72 L38,79 L48,84 L52,92 L48,102 L58,114 L60,118 L70,105 L72,95 L76,85 L80,75 L84,65 L88,58 L95,58 L98,45 L88,40 L78,45 L72,35 L75,25 L70,18 L62,15 Z" 
                fill="rgba(94, 92, 230, 0.05)" 
                stroke="rgba(27, 42, 107, 0.12)" 
                strokeWidth="1.2" 
              />
              
              {/* Track Line (Kashmir to Kanyakumari) */}
              <path 
                id="train-track"
                d="M60,10 C58,35 48,65 52,90 C56,105 60,110 60,118" 
                fill="none" 
                stroke="rgba(27, 42, 107, 0.12)" 
                strokeWidth="1.2" 
                strokeDasharray="3,3" 
              />
              
              {/* Animated Bullet Train — periwinkle glow */}
              <motion.path 
                d="M60,10 C58,35 48,65 52,90 C56,105 60,110 60,118" 
                fill="none" 
                stroke="#5E5CE6" 
                strokeWidth="2.5" 
                strokeLinecap="round"
                strokeDasharray="25 120"
                animate={{ strokeDashoffset: [145, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{ filter: 'drop-shadow(0 0 4px #5E5CE6)' }}
              />
            </svg>
          </motion.div>

          {/* 2. Highway Bus & Hotel Card */}
          <motion.div
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            style={{
              background: 'rgba(255, 255, 255, 0.82)',
              border: '1px solid rgba(94, 92, 230, 0.1)',
              borderRadius: '16px',
              padding: '14px 18px',
              boxShadow: '0 8px 32px rgba(27, 42, 107, 0.07), inset 0 1px 0 rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <span style={{ fontSize: '9px', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--accent-periwinkle)', opacity: 0.9 }}>
              Highway & Hotels
            </span>
            <svg width="120" height="70" viewBox="0 0 120 70" fill="none" style={{ borderRadius: '8px', overflow: 'hidden' }}>
              <defs>
                <linearGradient id="daySky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E0F2FE" />
                  <stop offset="100%" stopColor="#F1F5F9" />
                </linearGradient>
              </defs>
              {/* Light day-sky background */}
              <rect width="120" height="70" fill="url(#daySky)" />

              {/* Stylized hotel silhouette — light mode */}
              <g transform="translate(10, 12)">
                <rect x="0" y="8" width="18" height="30" fill="#CBD5E1" stroke="rgba(94,92,230,0.12)" strokeWidth="0.8" />
                <polygon points="9,0 0,8 18,8" fill="#5E5CE6" />
                {/* Windows lit */}
                <rect x="3" y="12" width="3" height="3" fill="#FBBF24" opacity="0.9" />
                <rect x="11" y="12" width="3" height="3" fill="#FBBF24" opacity="0.4" />
                <rect x="3" y="20" width="3" height="3" fill="#FBBF24" opacity="0.6" />
                <rect x="11" y="20" width="3" height="3" fill="#FBBF24" opacity="1" />
                <rect x="3" y="28" width="3" height="3" fill="#FBBF24" opacity="0.3" />
                <rect x="11" y="28" width="3" height="3" fill="#FBBF24" opacity="0.8" />
              </g>

              {/* Perspective Road — light asphalt */}
              <line x1="35" y1="70" x2="58" y2="40" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
              <line x1="105" y1="70" x2="72" y2="40" stroke="rgba(0,0,0,0.08)" strokeWidth="1.5" />
              <polygon points="35,70 58,40 72,40 105,70" fill="rgba(94,92,230,0.04)" />

              {/* Road center dashes */}
              <motion.line 
                x1="65" y1="70" x2="65" y2="40" 
                stroke="#F59E0B" 
                strokeWidth="1" 
                strokeDasharray="6,8"
                animate={{ strokeDashoffset: [14, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              />

              {/* Bobbing periwinkle Bus */}
              <motion.g
                animate={{ y: [0, -1.2, 0] }}
                transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
                transform="translate(10, 0)"
              >
                <ellipse cx="58" cy="59" rx="14" ry="2.5" fill="rgba(0,0,0,0.08)" />
                {/* Bus body — periwinkle branded */}
                <rect x="44" y="44" width="28" height="13" rx="2" fill="#5E5CE6" />
                <rect x="47" y="47" width="5" height="4" fill="rgba(255,255,255,0.9)" />
                <rect x="55" y="47" width="5" height="4" fill="rgba(255,255,255,0.9)" />
                <rect x="63" y="47" width="5" height="4" fill="rgba(255,255,255,0.9)" />
                <circle cx="70" cy="53" r="0.8" fill="#FBBF24" />
                <circle cx="50" cy="57" r="2.2" fill="#334155" />
                <circle cx="66" cy="57" r="2.2" fill="#334155" />
              </motion.g>
            </svg>
          </motion.div>
        </div>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '640px', margin: '0 auto' }}>
          <div className="t-hero-tag" style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(94, 92, 230, 0.08)',
            border: '1px solid rgba(94, 92, 230, 0.2)',
            color: 'var(--accent-periwinkle)',
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
            color: 'var(--text-secondary)',
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <CheckCircle size={14} color="#5E5CE6" /> 500+ Airlines
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <CheckCircle size={14} color="#5E5CE6" /> 1M+ Hotels
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <CheckCircle size={14} color="#5E5CE6" /> 1000+ Bus Operators
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              <CheckCircle size={14} color="#5E5CE6" /> IRCTC Integrated
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
                img: 'https://images.unsplash.com/photo-1477587458883-47145ed94c7b?w=480&h=280&fit=crop&q=80',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '60px'
          }}>
            {[
              { name: 'Taj Mahal Palace', loc: 'Mumbai, India', stars: '★★★★★', price: '₹12,500', bg: 'linear-gradient(135deg, #1B2A6B, #243080)' },
              { name: 'Kumarakom Lake Resort', loc: 'Kerala, India', stars: '★★★★★', price: '₹8,200', bg: 'linear-gradient(135deg, #065F46, #059669)' },
              { name: 'Rambagh Palace', loc: 'Jaipur, Rajasthan', stars: '★★★★★', price: '₹14,800', bg: 'linear-gradient(135deg, #B91C1C, #DC2626)' }
            ].map((hotel, idx) => (
              <TiltCard key={idx} style={{ height: '100%' }}>
                <div onClick={() => onOpenModal('booking')} className="hotel-card" style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  height: '100%',
                  width: '100%'
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '60px'
          }}>
            {[
              { name: 'Goa Beach Getaway', label: 'BEST SELLER', tags: ['✈️ Flights', '🏨 4 Nights', '🚕 Transfers'], price: '₹15,999', bg: 'linear-gradient(135deg, #1E9438, #2DB84B)' },
              { name: 'Kerala Backwaters', label: 'TRENDING', tags: ['✈️ Flights', '🏨 5 Nights', '🚤 Houseboat'], price: '₹21,500', bg: 'linear-gradient(135deg, #15803D, #2DB84B)' },
              { name: 'Dubai City & Desert', label: 'INTERNATIONAL', tags: ['✈️ Flights', '🏨 4 Nights', '🏛️ Tours'], price: '₹45,000', bg: 'linear-gradient(135deg, #D97706, #F59E0B)' }
            ].map((pkg, idx) => (
              <TiltCard key={idx} style={{ height: '100%' }}>
                <div onClick={() => onOpenModal('booking')} className="pkg-card" style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  position: 'relative',
                  height: '100%',
                  width: '100%'
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
