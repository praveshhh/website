import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, Eye, Shield, Cpu } from 'lucide-react';

// 3D Geometric Node Map Animation
function GeometricNodeMap() {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      height: '320px',
      background: 'linear-gradient(135deg, #0D1638 0%, #1B2A6B 100%)',
      borderRadius: '24px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: 'var(--shadow-xl)',
      border: '1px solid rgba(255, 255, 255, 0.08)'
    }}>
      {/* Decorative ambient flows */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle at 80% 20%, rgba(94, 92, 230, 0.15) 0%, transparent 50%), radial-gradient(circle at 10% 80%, rgba(45, 184, 75, 0.12) 0%, transparent 50%)',
        zIndex: 0
      }} />

      <svg width="280" height="200" viewBox="0 0 280 200" style={{ position: 'relative', zIndex: 1 }}>
        {/* Connection Lines */}
        <motion.line x1="50" y1="100" x2="140" y2="40" stroke="rgba(94,92,230,0.4)" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }} />
        <motion.line x1="50" y1="100" x2="140" y2="160" stroke="rgba(94,92,230,0.4)" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.2, repeat: Infinity, repeatType: "reverse" }} />
        <motion.line x1="140" y1="40" x2="230" y2="100" stroke="rgba(45,184,75,0.4)" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.8, repeat: Infinity, repeatType: "reverse" }} />
        <motion.line x1="140" y1="160" x2="230" y2="100" stroke="rgba(45,184,75,0.4)" strokeWidth="2"
          initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, repeat: Infinity, repeatType: "reverse" }} />
        <motion.line x1="140" y1="40" x2="140" y2="160" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="4 4" />

        {/* Center node */}
        <motion.circle cx="140" cy="100" r="28" fill="rgba(255, 255, 255, 0.05)" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1"
          animate={{ scale: [1, 1.05, 1] }} transition={{ duration: 3, repeat: Infinity }} />
        <motion.circle cx="140" cy="100" r="18" fill="rgba(94, 92, 230, 0.15)" stroke="var(--accent-periwinkle)" strokeWidth="2" />
        <text x="140" y="104" textAnchor="middle" fontSize="10" fontWeight="900" fill="#fff" fontFamily="var(--font-mono)">B2B</text>

        {/* Node 1 */}
        <motion.circle cx="50" cy="100" r="14" fill="rgba(13, 22, 56, 0.8)" stroke="var(--accent-periwinkle)" strokeWidth="2"
          animate={{ y: [100, 95, 100] }} transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }} />
        <text x="50" y="103" textAnchor="middle" fontSize="9" fill="var(--accent-periwinkle)" fontWeight="bold">💻</text>

        {/* Node 2 */}
        <motion.circle cx="140" cy="40" r="14" fill="rgba(13, 22, 56, 0.8)" stroke="#2DB84B" strokeWidth="2"
          animate={{ y: [40, 44, 40] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }} />
        <text x="140" y="43" textAnchor="middle" fontSize="9" fill="#2DB84B" fontWeight="bold">💳</text>

        {/* Node 3 */}
        <motion.circle cx="230" cy="100" r="14" fill="rgba(13, 22, 56, 0.8)" stroke="var(--accent-periwinkle)" strokeWidth="2"
          animate={{ y: [100, 105, 100] }} transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }} />
        <text x="230" y="103" textAnchor="middle" fontSize="9" fill="var(--accent-periwinkle)" fontWeight="bold">🌍</text>

        {/* Node 4 */}
        <motion.circle cx="140" cy="160" r="14" fill="rgba(13, 22, 56, 0.8)" stroke="#2DB84B" strokeWidth="2"
          animate={{ y: [160, 156, 160] }} transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }} />
        <text x="140" y="163" textAnchor="middle" fontSize="9" fill="#2DB84B" fontWeight="bold">⚙️</text>
      </svg>
      
      {/* Brand Label Overlay */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        fontSize: '11px',
        fontWeight: 800,
        letterSpacing: '3px',
        color: 'rgba(255,255,255,0.7)',
        textTransform: 'uppercase',
        fontFamily: 'var(--font-display)'
      }}>
        BillsPay24X7✓
      </div>
    </div>
  );
}

export function AboutPage() {
  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Glow overlays */}
      <div className="glow-overlay-green" style={{ top: '5%', left: '-5%', opacity: 0.15 }} />
      <div className="glow-overlay-blue" style={{ top: '40%', right: '-5%', opacity: 0.15 }} />

      {/* Hero */}
      <div style={{
        padding: '100px 8% 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Grid Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(94, 92, 230, 0.08) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          opacity: 0.8,
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(94, 92, 230, 0.15)',
              background: 'rgba(94, 92, 230, 0.04)',
              padding: '6px 14px',
              borderRadius: '50px',
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-periwinkle)',
              marginBottom: '20px'
            }}
          >
            🏢 Who We Are
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.02em' }}
          >
            About Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: '18px', fontWeight: 700, color: '#2DB84B', marginBottom: '16px' }}
          >
            Building India's Digital Future
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.8' }}
          >
            BillsPay24X7✓ is a Lucknow-based fintech and technology company powering digital payments, travel, and enterprise software.
          </motion.p>
        </div>
      </div>

      {/* Story */}
      <div style={{ padding: '80px 8%', background: 'var(--surf-1)', borderTop: '1px solid var(--border-primary)', borderBottom: '1px solid var(--border-primary)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="grid-responsive-process">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GeometricNodeMap />
          </motion.div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '28px', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '16px' }}>Our Story</h2>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '16px' }}>
              Founded in 2026, BillsPay Technologies Private Limited started with a simple mission: make digital financial services accessible to every business in India. From our head office in Lucknow, we have grown into a trusted platform serving thousands of merchants, agents, and enterprises.
            </p>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.8' }}>
              We combine deep fintech expertise with cutting-edge technology to deliver payment solutions, travel APIs, and custom software that help businesses grow faster and operate smarter.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div style={{ padding: '80px 8%', background: 'var(--bg-primary)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '24px' }}>
            {[
              { icon: <Target size={22} />, t: 'Mission', d: 'Empower every business with seamless digital financial and technology services.', glow: 'rgba(45,184,75,0.15)' },
              { icon: <Eye size={22} />, t: 'Vision', d: 'Become India\'s most trusted platform for fintech, travel, and IT solutions.', glow: 'rgba(94,92,230,0.15)' },
              { icon: <Shield size={22} />, t: 'Integrity', d: 'We operate with transparency, security, and compliance at every level.', glow: 'rgba(14,165,233,0.15)' },
              { icon: <Cpu size={22} />, t: 'Innovation', d: 'We constantly evolve our technology to stay ahead of market needs.', glow: 'rgba(236,72,153,0.15)' }
            ].map((val, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--white)',
                  padding: '30px 24px',
                  borderRadius: '20px',
                  border: '1.5px solid var(--border-primary)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.01)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-periwinkle)';
                  e.currentTarget.style.boxShadow = `0 16px 40px ${val.glow}`;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-primary)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.01)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  background: 'rgba(94, 92, 230, 0.06)',
                  color: 'var(--accent-periwinkle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px'
                }} className="pulse-glow">
                  {val.icon}
                </div>
                <h4 style={{ fontWeight: 800, fontSize: '16px', marginBottom: '8px', color: 'var(--text-primary)' }}>{val.t}</h4>
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>{val.d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PricingPage() {
  const handleWA = (plan) => {
    window.open(`https://wa.me/919278403522?text=${encodeURIComponent(`Hi BillsPay24X7!\nI want to subscribe/inquire about the ${plan} Plan.`)}`, '_blank');
  };

  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--surf-1)' }}>
      {/* Hero */}
      <div style={{ padding: '80px 8% 40px', background: 'linear-gradient(180deg, #F0F4FF 0%, #FFFFFF 100%)', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: '#1B2A6B', marginBottom: '16px' }}>Pricing</h1>
        <p style={{ fontSize: '18px', fontWeight: 600, color: '#2DB84B', marginBottom: '8px' }}>Simple, Transparent Pricing</p>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Choose the plan that fits your business. No hidden fees, no surprises.
        </p>
      </div>

      {/* Grid */}
      <div style={{ padding: '60px 8%', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          
          {/* Plan 1 */}
          <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid var(--border-primary)', padding: '36px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1B2A6B', marginBottom: '8px' }}>Starter</h3>
            <div style={{ fontSize: '32px', fontWeight: 900, margin: '14px 0', color: '#1B2A6B' }}>₹0 <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>/ month</span></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', flex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>✓ Basic Payment Gateway</li>
              <li style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>✓ BBPS Bill Payments</li>
              <li style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>✓ UPI QR Collections</li>
              <li style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>✓ Email Support</li>
              <li style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>✓ Up to ₹50K Daily Volume</li>
            </ul>
            <button onClick={() => handleWA('Starter')} className="btn-cred-outline" style={{ width: '100%', padding: '12px', fontSize: '13px' }}>Get Started</button>
          </div>

          {/* Plan 2 */}
          <div style={{ background: '#fff', borderRadius: '20px', border: '2px solid #2DB84B', padding: '36px', textAlign: 'center', position: 'relative', display: 'flex', flexDirection: 'column', boxShadow: '0 8px 32px rgba(45,184,75,0.06)' }}>
            <span style={{ position: 'absolute', top: '-12px', right: '20px', background: '#2DB84B', color: '#fff', fontSize: '9px', fontWeight: 700, padding: '4px 12px', borderRadius: '50px' }}>POPULAR</span>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1B2A6B', marginBottom: '8px' }}>Business</h3>
            <div style={{ fontSize: '32px', fontWeight: 900, margin: '14px 0', color: '#1B2A6B' }}>₹2,999 <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-secondary)' }}>/ month</span></div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', flex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>✓ Everything in Starter</li>
              <li style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>✓ AEPS & DMT Services</li>
              <li style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>✓ Payout API Integration</li>
              <li style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>✓ Travel API Access</li>
              <li style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>✓ Priority Phone Support</li>
              <li style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>✓ Up to ₹5L Daily Volume</li>
            </ul>
            <button onClick={() => handleWA('Business')} className="btn-cred-neon" style={{ width: '100%', padding: '12px', fontSize: '13px' }}>Get Started</button>
          </div>

          {/* Plan 3 */}
          <div style={{ background: '#fff', borderRadius: '20px', border: '1px solid var(--border-primary)', padding: '36px', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '18px', fontWeight: 800, color: '#1B2A6B', marginBottom: '8px' }}>Enterprise</h3>
            <div style={{ fontSize: '32px', fontWeight: 900, margin: '14px 0', color: '#1B2A6B' }}>Custom</div>
            <ul style={{ listStyle: 'none', padding: 0, margin: '20px 0', flex: 1, textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>✓ Everything in Business</li>
              <li style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>✓ Custom IT Solutions</li>
              <li style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>✓ Dedicated Account Manager</li>
              <li style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>✓ White-Label Options</li>
              <li style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>✓ 24/7 Priority Support</li>
              <li style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>✓ Unlimited Volume</li>
            </ul>
            <button onClick={() => handleWA('Enterprise')} className="btn-cred-outline" style={{ width: '100%', padding: '12px', fontSize: '13px' }}>Contact Sales</button>
          </div>

        </div>
      </div>
    </div>
  );
}

export function BlogPage() {
  const [selectedTag, setSelectedTag] = useState('All');

  const blogPosts = [
    { tag: 'UPI', date: 'Jan 15, 2026', title: 'UPI 2.0: What\'s New for Merchants', excerpt: 'Exploring the new features in UPI 2.0 and how merchants can leverage them for better customer experience.', readTime: '5 min read', category: 'Fintech', img: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&h=320&fit=crop&q=80' },
    { tag: 'API', date: 'Jan 10, 2026', title: 'Building Resilient Payment APIs', excerpt: 'Best practices for designing payment APIs that handle high throughput with 99.99% uptime.', readTime: '7 min read', category: 'Development', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=320&fit=crop&q=80' },
    { tag: 'AI', date: 'Jan 5, 2026', title: 'AI in Travel: Personalization at Scale', excerpt: 'How artificial intelligence is transforming travel booking experiences and customer retention.', readTime: '6 min read', category: 'AI', img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=320&fit=crop&q=80' },
    { tag: 'BBPS', date: 'Dec 28, 2025', title: 'BBPS Expansion: New Bill Categories', excerpt: 'RBI\'s expanded BBPS scope now includes insurance premiums, municipal taxes, and more.', readTime: '4 min read', category: 'Fintech', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=320&fit=crop&q=80' },
    { tag: 'ERP', date: 'Dec 20, 2025', title: 'Custom ERP for Indian SMEs', excerpt: 'Why Indian SMEs are moving from off-the-shelf ERP to custom-built solutions tailored to local needs.', readTime: '8 min read', category: 'Development', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=320&fit=crop&q=80' },
    { tag: 'Sec', date: 'Dec 15, 2025', title: 'PCI-DSS 4.0: What You Need to Know', excerpt: 'The latest PCI-DSS standards and how they affect payment gateway providers and merchants.', readTime: '6 min read', category: 'Security', img: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=600&h=320&fit=crop&q=80' }
  ];

  const categories = ['All', 'Fintech', 'Development', 'AI', 'Security'];

  const filteredPosts = selectedTag === 'All' 
    ? blogPosts 
    : blogPosts.filter(p => p.category === selectedTag);

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', overflowX: 'hidden' }}>
      
      {/* Glow overlays */}
      <div className="glow-overlay-green" style={{ top: '5%', left: '-5%', opacity: 0.15 }} />
      <div className="glow-overlay-blue" style={{ top: '40%', right: '-5%', opacity: 0.15 }} />

      {/* Hero */}
      <div style={{
        padding: '100px 8% 60px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Grid Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(94, 92, 230, 0.08) 1.5px, transparent 1.5px)',
          backgroundSize: '24px 24px',
          opacity: 0.8,
          zIndex: 0
        }} />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(94, 92, 230, 0.15)',
              background: 'rgba(94, 92, 230, 0.04)',
              padding: '6px 14px',
              borderRadius: '50px',
              fontFamily: 'var(--font-display)',
              fontSize: '11px',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-periwinkle)',
              marginBottom: '20px'
            }}
          >
            📚 Knowledge Hub
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 900, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.02em' }}
          >
            Blog
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ fontSize: '18px', fontWeight: 700, color: '#2DB84B', marginBottom: '16px' }}
          >
            Insights & Updates
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.8' }}
          >
            Latest trends in fintech, travel technology, and digital transformation.
          </motion.p>
        </div>
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px', flexWrap: 'wrap', padding: '0 8%' }}>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedTag(cat)}
            style={{
              padding: '10px 22px',
              borderRadius: '50px',
              border: selectedTag === cat ? '1px solid var(--accent-periwinkle)' : '1px solid var(--border-primary)',
              background: selectedTag === cat ? 'var(--accent-periwinkle)' : 'var(--white)',
              color: selectedTag === cat ? '#fff' : 'var(--text-secondary)',
              fontSize: '12px',
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.25s ease'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div style={{ padding: '0 8% 80px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          
          {/* Featured Post (Only shown when 'All' is selected) */}
          {selectedTag === 'All' && blogPosts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{
                background: 'var(--white)',
                border: '1px solid var(--border-primary)',
                borderRadius: '24px',
                overflow: 'hidden',
                marginBottom: '40px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.02)',
                display: 'grid',
                gridTemplateColumns: '1.2fr 0.8fr',
                cursor: 'pointer'
              }}
              className="grid-responsive-process"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--accent-periwinkle)';
                e.currentTarget.style.boxShadow = '0 16px 40px rgba(94,92,230,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-primary)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.02)';
              }}
            >
              <div style={{ height: '360px', overflow: 'hidden' }}>
                <img src={blogPosts[0].img} alt={blogPosts[0].title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '14px' }}>
                  <span style={{ fontSize: '9px', background: 'rgba(94,92,230,0.08)', color: 'var(--accent-periwinkle)', padding: '4px 10px', borderRadius: '50px', fontWeight: 800 }}>{blogPosts[0].tag}</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{blogPosts[0].date}</span>
                </div>
                <h2 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '12px', lineHeight: '1.3', color: 'var(--text-primary)' }}>{blogPosts[0].title}</h2>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>{blogPosts[0].excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-primary)', paddingTop: '16px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{blogPosts[0].readTime}</span>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--accent-periwinkle)' }}>Read Article →</span>
                </div>
              </div>
            </motion.div>
          )}

          {/* Grid Layout for other posts */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '24px'
          }}>
            {(selectedTag === 'All' ? filteredPosts.slice(1) : filteredPosts).map((post, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                style={{
                  background: 'var(--white)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.01)',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-periwinkle)';
                  e.currentTarget.style.boxShadow = '0 16px 40px rgba(94,92,230,0.05)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border-primary)';
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.01)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div style={{ height: '170px', overflow: 'hidden', position: 'relative' }}>
                  <img src={post.img} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position: 'absolute', top: '14px', left: '14px',
                    fontSize: '9px', background: 'rgba(27,42,107,0.8)', color: '#fff',
                    padding: '3px 10px', borderRadius: '50px', fontWeight: 800
                  }}>{post.tag}</span>
                </div>
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginBottom: '8px' }}>{post.date}</span>
                  <h3 style={{ fontSize: '16px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '10px', lineHeight: '1.4' }}>{post.title}</h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.6', flex: 1, marginBottom: '18px' }}>{post.excerpt}</p>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-primary)', paddingTop: '14px', marginTop: 'auto' }}>
                    <span style={{ fontSize: '11.5px', color: 'var(--text-muted)' }}>{post.readTime}</span>
                    <span style={{ fontSize: '11.5px', fontWeight: 700, color: 'var(--accent-periwinkle)' }}>Read More →</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function PartnersPage() {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--surf-1)' }}>
      {/* Hero */}
      <div style={{ padding: '80px 8% 40px', background: 'linear-gradient(180deg, #F0F4FF 0%, #FFFFFF 100%)', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: '#1B2A6B', marginBottom: '16px' }}>Our Partners</h1>
        <p style={{ fontSize: '18px', fontWeight: 600, color: '#2DB84B', marginBottom: '8px' }}>Trusted Network</p>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          We work with leading banks, technology providers, and service partners to deliver the best experience.
        </p>
      </div>

      {/* Grid */}
      <div style={{ padding: '60px 8%', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          {[
            { name: 'SBI', label: 'State Bank of India', desc: 'Banking Partner' },
            { name: 'ICICI', label: 'ICICI Bank', desc: 'API Banking' },
            { name: 'NPCI', label: 'NPCI', desc: 'UPI & BBPS' },
            { name: 'RBI', label: 'RBI Regulated', desc: 'Compliance' },
            { name: 'AWS', label: 'AWS Cloud', desc: 'Infrastructure' },
            { name: 'IRCTC', label: 'IRCTC', desc: 'Rail Booking' },
            { name: 'MMT', label: 'MakeMyTrip', desc: 'Travel Inventory' },
            { name: 'Visa', label: 'Visa', desc: 'Card Network' }
          ].map((partner, idx) => (
            <div key={idx} style={{ background: '#fff', border: '1px solid var(--border-primary)', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
              <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'linear-gradient(135deg, #1B2A6B, #2DB84B)', display: 'flex', alignItems: 'center', justify: 'center', color: '#fff', fontSize: '18px', fontWeight: 800, margin: '0 auto 16px' }}>{partner.name}</div>
              <h4 style={{ fontWeight: 800, fontSize: '14.5px', marginBottom: '4px' }}>{partner.label}</h4>
              <p style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{partner.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
