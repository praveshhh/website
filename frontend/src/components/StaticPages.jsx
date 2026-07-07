import React from 'react';
import { Target, Eye, Shield, Cpu } from 'lucide-react';

export function AboutPage() {
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--surf-1)' }}>
      {/* Hero */}
      <div style={{ padding: '80px 8% 40px', background: 'linear-gradient(180deg, #F0F4FF 0%, #FFFFFF 100%)', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: '#1B2A6B', marginBottom: '16px' }}>About Us</h1>
        <p style={{ fontSize: '18px', fontWeight: 600, color: '#2DB84B', marginBottom: '8px' }}>Building India's Digital Future</p>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          BillsPay24X7✓ is a Lucknow-based fintech and technology company powering digital payments, travel, and enterprise software.
        </p>
      </div>

      {/* Story */}
      <div style={{ padding: '60px 8%', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }} className="grid-responsive-process">
          <div style={{ height: '320px', background: 'linear-gradient(135deg, #1B2A6B, #243080)', borderRadius: '24px', display: 'flex', alignItems: 'center', justify: 'center', color: '#fff', fontSize: '28px', fontWeight: 800 }}>
            BillsPay24X7
          </div>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: '#1B2A6B', marginBottom: '14px' }}>Our Story</h2>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '14px' }}>
              Founded in 2026, BillsPay Technologies Private Limited started with a simple mission: make digital financial services accessible to every business in India. From our head office in Lucknow, we have grown into a trusted platform serving thousands of merchants, agents, and enterprises.
            </p>
            <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', lineHeight: '1.7' }}>
              We combine deep fintech expertise with cutting-edge technology to deliver payment solutions, travel APIs, and custom software that help businesses grow faster and operate smarter.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div style={{ padding: '60px 8%', background: 'var(--surf-1)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          {[
            { icon: <Target size={20} />, t: 'Mission', d: 'Empower every business with seamless digital financial and technology services.' },
            { icon: <Eye size={20} />, t: 'Vision', d: 'Become India\'s most trusted platform for fintech, travel, and IT solutions.' },
            { icon: <Shield size={20} />, t: 'Integrity', d: 'We operate with transparency, security, and compliance at every level.' },
            { icon: <Cpu size={20} />, t: 'Innovation', d: 'We constantly evolve our technology to stay ahead of market needs.' }
          ].map((val, idx) => (
            <div key={idx} style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-primary)', textAlign: 'center' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #1B2A6B, #243080)', display: 'flex', alignItems: 'center', justify: 'center', color: '#fff', margin: '0 auto 16px' }}>{val.icon}</div>
              <h4 style={{ fontWeight: 800, fontSize: '14.5px', marginBottom: '6px' }}>{val.t}</h4>
              <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>{val.d}</p>
            </div>
          ))}
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
  return (
    <div style={{ paddingTop: '100px', minHeight: '100vh', background: 'var(--surf-1)' }}>
      {/* Hero */}
      <div style={{ padding: '80px 8% 40px', background: 'linear-gradient(180deg, #F0F4FF 0%, #FFFFFF 100%)', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, color: '#1B2A6B', marginBottom: '16px' }}>Blog</h1>
        <p style={{ fontSize: '18px', fontWeight: 600, color: '#2DB84B', marginBottom: '8px' }}>Insights & Updates</p>
        <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
          Latest trends in fintech, travel technology, and digital transformation.
        </p>
      </div>

      {/* Grid */}
      <div style={{ padding: '60px 8%', background: '#fff' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {[
            { tag: 'UPI', date: 'Jan 15, 2026', title: 'UPI 2.0: What\'s New for Merchants', excerpt: 'Exploring the new features in UPI 2.0 and how merchants can leverage them for better customer experience.' },
            { tag: 'API', date: 'Jan 10, 2026', title: 'Building Resilient Payment APIs', excerpt: 'Best practices for designing payment APIs that handle high throughput with 99.99% uptime.' },
            { tag: 'AI', date: 'Jan 5, 2026', title: 'AI in Travel: Personalization at Scale', excerpt: 'How artificial intelligence is transforming travel booking experiences and customer retention.' },
            { tag: 'BBPS', date: 'Dec 28, 2025', title: 'BBPS Expansion: New Bill Categories', excerpt: 'RBI\'s expanded BBPS scope now includes insurance premiums, municipal taxes, and more.' },
            { tag: 'ERP', date: 'Dec 20, 2025', title: 'Custom ERP for Indian SMEs', excerpt: 'Why Indian SMEs are moving from off-the-shelf ERP to custom-built solutions tailored to local needs.' },
            { tag: 'Sec', date: 'Dec 15, 2025', title: 'PCI-DSS 4.0: What You Need to Know', excerpt: 'The latest PCI-DSS standards and how they affect payment gateway providers and merchants.' }
          ].map((post, idx) => (
            <div key={idx} style={{ background: '#fff', border: '1px solid var(--border-primary)', borderRadius: '16px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
              <div style={{ height: '140px', background: 'linear-gradient(135deg, #1B2A6B, #2DB84B)', display: 'flex', alignItems: 'center', justify: 'center', color: '#fff', fontSize: '24px', fontWeight: 800 }}>
                {post.tag}
              </div>
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{post.date}</span>
                <h3 style={{ fontSize: '15px', fontWeight: 800, color: '#1B2A6B', marginBottom: '8px', lineHeight: '1.3' }}>{post.title}</h3>
                <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', lineHeight: '1.5', flex: 1 }}>{post.excerpt}</p>
              </div>
            </div>
          ))}
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
