import React, { useEffect, useRef, useState } from 'react';

import { CABINS, MAX_SEATS, travellersLabel } from '../data/travellers';

/**
 * Travellers and cabin class picker.
 *
 * Replaces a free-text box that a visitor had to type "1 Adult, Economy" into
 * by hand, which meant the enquiry reaching the team was whatever they felt
 * like writing. Now it is structured: counts that respect airline rules, and a
 * cabin chosen from a fixed set.
 *
 * Rules enforced here rather than left to the reader:
 *   - at least one adult
 *   - nine seats maximum, the usual single-booking cap
 *   - infants travel on a lap, so never more infants than adults
 */

function Stepper({ title, note, value, onDec, onInc, canDec, canInc }) {
  const btn = (enabled) => ({
    width: '30px', height: '30px', borderRadius: '50%', flex: 'none',
    border: `1.5px solid ${enabled ? 'var(--accent-periwinkle)' : 'var(--border-primary)'}`,
    background: '#fff',
    color: enabled ? 'var(--accent-periwinkle)' : 'var(--text-muted)',
    cursor: enabled ? 'pointer' : 'not-allowed',
    fontSize: '16px', fontWeight: 700, lineHeight: 1,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'inherit',
  });

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', padding: '9px 0' }}>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--text-primary)' }}>{title}</div>
        <div style={{ fontSize: '10.5px', color: 'var(--text-muted)' }}>{note}</div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flex: 'none' }}>
        <button type="button" style={btn(canDec)} disabled={!canDec} onClick={onDec} aria-label={`Remove one ${title}`}>&minus;</button>
        <span style={{ minWidth: '18px', textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
          {value}
        </span>
        <button type="button" style={btn(canInc)} disabled={!canInc} onClick={onInc} aria-label={`Add one ${title}`}>+</button>
      </div>
    </div>
  );
}

export default function TravellersField({ label = 'Travellers & Class', value, onChange, variant = 'boxed' }) {
  const bare = variant === 'bare';
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const set = (patch) => onChange({ ...value, ...patch });
  const seats = value.adults + value.children;

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <div
        className="sf"
        style={
          bare
            ? {
                background: open ? 'rgba(94, 92, 230, 0.06)' : 'transparent',
                padding: '14px 18px', minHeight: '74px', transition: 'background .15s',
              }
            : {
                background: '#F8FAFF',
                border: `1.5px solid ${open ? 'var(--accent-periwinkle)' : 'var(--border-dark)'}`,
                boxShadow: open ? '0 0 0 3px rgba(94, 92, 230, 0.14)' : 'none',
                borderRadius: '12px', padding: '10px 16px',
                transition: 'border-color .15s, box-shadow .15s',
              }
        }
      >
        <div
          className="sf-lbl"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700,
            color: 'var(--text-secondary)', textTransform: 'uppercase',
            letterSpacing: '1px', marginBottom: '4px',
          }}
        >
          {label}
        </div>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-haspopup="dialog"
          style={{
            width: '100%', textAlign: 'left', border: 'none', background: 'transparent',
            padding: 0, cursor: 'pointer', fontWeight: 700, fontSize: '13.5px',
            fontFamily: 'inherit', color: 'var(--text-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px',
          }}
        >
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {travellersLabel(value)}
          </span>
          <span style={{ flex: 'none', fontSize: '10px', color: 'var(--text-muted)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .15s' }}>▾</span>
        </button>
      </div>

      {open && (
        <div
          role="dialog"
          aria-label="Choose travellers and cabin class"
          style={{
            position: 'absolute', top: 'calc(100% + 8px)', right: 0,
            width: 'max(100%, 306px)', zIndex: 60,
            background: '#fff', border: '1px solid var(--border-primary)',
            borderRadius: '14px', padding: '6px 16px 14px',
            boxShadow: '0 22px 60px rgba(27, 42, 107, 0.20), 0 2px 8px rgba(27, 42, 107, 0.06)',
          }}
        >
          <Stepper
            title="Adults" note="12 years and over"
            value={value.adults}
            canDec={value.adults > 1}
            canInc={seats < MAX_SEATS}
            onDec={() => set({ adults: value.adults - 1, infants: Math.min(value.infants, value.adults - 1) })}
            onInc={() => set({ adults: value.adults + 1 })}
          />
          <div style={{ height: '1px', background: 'var(--border-dim)' }} />
          <Stepper
            title="Children" note="2 to 11 years"
            value={value.children}
            canDec={value.children > 0}
            canInc={seats < MAX_SEATS}
            onDec={() => set({ children: value.children - 1 })}
            onInc={() => set({ children: value.children + 1 })}
          />
          <div style={{ height: '1px', background: 'var(--border-dim)' }} />
          <Stepper
            title="Infants" note="Under 2, on an adult's lap"
            value={value.infants}
            canDec={value.infants > 0}
            canInc={value.infants < value.adults}
            onDec={() => set({ infants: value.infants - 1 })}
            onInc={() => set({ infants: value.infants + 1 })}
          />

          <div
            style={{
              fontFamily: 'var(--font-mono)', fontSize: '9px', fontWeight: 700,
              letterSpacing: '1.4px', textTransform: 'uppercase', color: 'var(--text-muted)',
              margin: '14px 0 8px',
            }}
          >
            Cabin
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '7px' }}>
            {CABINS.map((c) => {
              const on = value.cabin === c;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => set({ cabin: c })}
                  aria-pressed={on}
                  style={{
                    padding: '7px 13px', borderRadius: '50px', cursor: 'pointer',
                    fontSize: '11.5px', fontWeight: 700, fontFamily: 'inherit',
                    border: `1.5px solid ${on ? 'var(--accent-periwinkle)' : 'var(--border-primary)'}`,
                    background: on ? 'var(--accent-periwinkle)' : '#fff',
                    color: on ? '#fff' : 'var(--text-secondary)',
                  }}
                >
                  {c}
                </button>
              );
            })}
          </div>

          {seats >= MAX_SEATS && (
            <div style={{ marginTop: '12px', fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.45 }}>
              {MAX_SEATS} seats is the limit for one booking. For a larger group, send us the details and we will quote it.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
