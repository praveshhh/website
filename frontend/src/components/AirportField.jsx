import React, { useEffect, useId, useMemo, useRef, useState } from 'react';

import { AIRPORTS, airportPlace, searchAirports } from '../data/airports';

/**
 * Airport picker for the flight search.
 *
 * Clicking the field opens a panel with the popular airports already listed,
 * so the common case is one click and no typing. Typing filters by IATA code,
 * city, airport name or state.
 *
 * The value is an airport code, not free text. The old field was a bare text
 * input, which meant a visitor could send the team "mumbaii" or leave the
 * default untouched and nobody downstream could tell.
 *
 * Keyboard: ArrowUp/ArrowDown move, Enter picks, Escape closes, Tab leaves.
 */
export default function AirportField({
  label,
  value,
  onChange,
  excludeCode,
  placeholder = 'City or airport',
  // "bare" drops the individual box so the field can sit as one cell inside a
  // single divided search bar. Boxed fields inside a white card were invisible:
  // --border-primary is a white border, which disappears on a light ground.
  variant = 'boxed',
  align = 'left',
}) {
  const bare = variant === 'bare';
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);

  const wrapRef = useRef(null);
  const inputRef = useRef(null);
  const listId = useId();

  const selected = useMemo(() => AIRPORTS.find((a) => a.code === value) || null, [value]);
  const results = useMemo(
    () => searchAirports(query, { exclude: excludeCode }),
    [query, excludeCode]
  );

  // Keep the highlight inside the list whenever the results change.
  useEffect(() => { setCursor(0); }, [query, excludeCode]);

  // Close on outside click and on scroll away.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const choose = (airport) => {
    onChange(airport.code);
    setQuery('');
    setOpen(false);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Escape') { setOpen(false); return; }
    if (e.key === 'Tab') { setOpen(false); return; }
    if (!results.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCursor((c) => (c + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCursor((c) => (c - 1 + results.length) % results.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      choose(results[cursor]);
    }
  };

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <div
        className="sf"
        onClick={() => setOpen(true)}
        style={
          bare
            ? {
                background: open ? 'rgba(94, 92, 230, 0.06)' : 'transparent',
                padding: '14px 18px',
                cursor: 'text',
                minHeight: '74px',
                transition: 'background .15s',
              }
            : {
                background: '#F8FAFF',
                border: `1.5px solid ${open ? 'var(--accent-periwinkle)' : 'var(--border-dark)'}`,
                boxShadow: open ? '0 0 0 3px rgba(94, 92, 230, 0.14)' : 'none',
                borderRadius: '12px',
                padding: '10px 16px',
                cursor: 'text',
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

        {open ? (
          <input
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-label={`${label} — search airports`}
            value={query}
            placeholder={selected ? `${selected.city} (${selected.code})` : placeholder}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            style={{
              width: '100%', border: 'none', background: 'transparent', outline: 'none',
              fontWeight: 700, fontSize: '14.5px', fontFamily: 'inherit', padding: 0,
            }}
          />
        ) : (
          <button
            type="button"
            onClick={() => setOpen(true)}
            style={{
              width: '100%', minWidth: 0, textAlign: 'left', border: 'none',
              background: 'transparent', padding: 0, cursor: 'pointer', fontFamily: 'inherit',
            }}
          >
            <span style={{ display: 'block', fontWeight: 700, fontSize: '14.5px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', color: selected ? 'var(--text-primary)' : 'var(--text-muted)' }}>
              {selected ? `${selected.city} ` : placeholder}
              {selected && (
                <span style={{ color: 'var(--accent-periwinkle)', fontFamily: 'var(--font-mono)' }}>
                  {selected.code}
                </span>
              )}
            </span>
            {selected && (
              <span style={{ display: 'block', fontSize: '10.5px', color: 'var(--text-muted)', fontWeight: 500, marginTop: '1px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {selected.name}
              </span>
            )}
          </button>
        )}
      </div>

      {open && (
        <div
          id={listId}
          role="listbox"
          aria-label={`${label} airports`}
          style={{
            position: 'absolute', top: 'calc(100% + 8px)', zIndex: 60,
            [align === 'right' ? 'right' : 'left']: 0,
            width: 'max(100%, 330px)',
            background: '#fff',
            border: '1px solid var(--border-primary)',
            borderRadius: '14px',
            boxShadow: '0 22px 60px rgba(27, 42, 107, 0.20), 0 2px 8px rgba(27, 42, 107, 0.06)',
            overflow: 'hidden',
            maxHeight: '340px', overflowY: 'auto',
          }}
        >
          <div
            style={{
              padding: '10px 16px 8px', fontFamily: 'var(--font-mono)', fontSize: '9px',
              fontWeight: 700, letterSpacing: '1.4px', textTransform: 'uppercase',
              color: 'var(--text-muted)', borderBottom: '1px solid var(--border-dim)',
            }}
          >
            {query ? `${results.length} match${results.length === 1 ? '' : 'es'}` : 'Popular airports'}
          </div>

          {results.length === 0 && (
            <div style={{ padding: '18px 16px', fontSize: '13px', color: 'var(--text-secondary)' }}>
              No airport matches &ldquo;{query}&rdquo;. Try a city name or a 3-letter code.
            </div>
          )}

          {results.map((a, i) => (
            <button
              key={a.code}
              type="button"
              role="option"
              aria-selected={i === cursor}
              onMouseEnter={() => setCursor(i)}
              onClick={() => choose(a)}
              style={{
                display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
                padding: '10px 16px', border: 'none', textAlign: 'left', cursor: 'pointer',
                background: i === cursor ? 'rgba(94, 92, 230, 0.07)' : 'transparent',
                fontFamily: 'inherit',
              }}
            >
              <span
                style={{
                  flex: 'none', width: '42px', textAlign: 'center', padding: '5px 0',
                  borderRadius: '7px', background: 'var(--accent-periwinkle)', color: '#fff',
                  fontFamily: 'var(--font-mono)', fontSize: '11px', fontWeight: 700,
                  letterSpacing: '0.5px',
                }}
              >
                {a.code}
              </span>
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {airportPlace(a)}
                </span>
                <span style={{ display: 'block', fontSize: '11px', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {a.name}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
