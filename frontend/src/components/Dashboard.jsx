import React, { useState, useEffect } from 'react';
import { Shield, Key, Eye, EyeOff, Plus, Trash2, ArrowLeftRight, Settings, Copy } from 'lucide-react';
import axios from 'axios';
import { encryptData, decryptData } from '../utils/cryptoHelper';

export default function Dashboard({ user, masterPassword, backendUrl }) {
  const [activeTab, setActiveTab] = useState('vault');
  const [vaultItems, setVaultItems] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // New item form state
  const [newItemName, setNewItemName] = useState('');
  const [newItemValue, setNewItemValue] = useState('');
  
  // Decrypted values state (maps item.id -> string)
  const [decryptedValues, setDecryptedValues] = useState({});
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Mock transactions state
  const [transactions, setTransactions] = useState([
    { id: 'tx_839f28', target: 'pay_vendor_node_abc', amount: '₹14,500.00', type: 'PAYOUT', status: 'SUCCESS', date: '2026-06-23 20:30' },
    { id: 'tx_120d93', target: 'charge_subscriber_123', amount: '₹2,499.00', type: 'INCOMING', status: 'SUCCESS', date: '2026-06-23 18:15' }
  ]);
  const [mockAmount, setMockAmount] = useState('');
  const [mockTarget, setMockTarget] = useState('');

  // Fetch items from backend
  const fetchVaultItems = async () => {
    setLoading(true);
    setError(null);
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const response = await axios.get(`${backendUrl}/api/vault`, config);
      setVaultItems(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch secure vault items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVaultItems();
  }, []);

  // Save new E2EE item
  const handleSaveItem = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!newItemName || !newItemValue) {
      setError("Please fill in both name and secret value.");
      return;
    }

    try {
      // 1. Encrypt locally in browser
      const cryptoResult = await encryptData(newItemValue, masterPassword);
      
      // 2. Prepare payload
      const payload = {
        itemName: newItemName,
        encryptedPayload: cryptoResult.encryptedPayload,
        iv: cryptoResult.iv,
        salt: cryptoResult.salt
      };

      // 3. POST to backend
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.post(`${backendUrl}/api/vault`, payload, config);

      setSuccess("Credential encrypted and saved successfully!");
      setNewItemName('');
      setNewItemValue('');
      
      // Refresh list
      fetchVaultItems();
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to save item.');
    }
  };

  // Decrypt an item in memory
  const handleDecryptItem = async (item) => {
    if (decryptedValues[item.id]) {
      const updated = { ...decryptedValues };
      delete updated[item.id];
      setDecryptedValues(updated);
      return;
    }

    try {
      // Decrypt locally
      const plaintext = await decryptData(item.encryptedPayload, item.iv, item.salt, masterPassword);
      setDecryptedValues({
        ...decryptedValues,
        [item.id]: plaintext
      });
    } catch (err) {
      alert("Decryption failed. " + err.message);
    }
  };

  // Delete item
  const handleDeleteItem = async (itemId) => {
    if (!window.confirm("Are you sure you want to delete this secure item?")) return;
    setError(null);
    setSuccess(null);

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.delete(`${backendUrl}/api/vault/${itemId}`, config);
      setSuccess("Item deleted successfully.");
      fetchVaultItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete item.');
    }
  };

  // Payout Simulator Submit
  const handleCreateMockPayout = (e) => {
    e.preventDefault();
    if (!mockAmount || !mockTarget) return;

    const newTx = {
      id: 'tx_' + Math.random().toString(36).substr(2, 6),
      target: mockTarget,
      amount: '₹' + parseFloat(mockAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 }),
      type: 'PAYOUT',
      status: 'SUCCESS',
      date: new Date().toISOString().replace('T', ' ').substr(0, 16)
    };

    setTransactions([newTx, ...transactions]);
    setMockAmount('');
    setMockTarget('');
    alert("Payout simulation completed successfully via virtual IMPS node!");
  };

  // Left vertical navigation styles
  const getTabStyle = (tab) => {
    const isActive = activeTab === tab;
    return {
      width: '100%',
      justifyContent: 'flex-start',
      padding: '12px 18px',
      gap: '12px',
      background: isActive ? 'rgba(94, 92, 230, 0.05)' : 'transparent',
      color: isActive ? 'var(--accent-periwinkle)' : 'var(--text-secondary)',
      border: 'none',
      borderLeft: isActive ? '3px solid var(--accent-periwinkle)' : '3px solid transparent',
      borderRadius: '0px',
      cursor: 'pointer',
      fontFamily: 'var(--font-display)',
      fontSize: '13.5px',
      fontWeight: isActive ? 700 : 500,
      display: 'flex',
      alignItems: 'center',
      transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      textAlign: 'left',
      userSelect: 'none'
    };
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '120px 4% 80px',
      minHeight: '85vh'
    }}>
      
      {/* Upper Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
        paddingBottom: '24px',
        marginBottom: '40px'
      }}>
        <div>
          <span style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)' }}>
            verified merchant portal
          </span>
          <h2 style={{ fontSize: '32px', color: 'var(--text-primary)', marginTop: '6px', fontWeight: 800 }}>Merchant Dashboard</h2>
        </div>
        
        {/* Connection state */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: '#FFFFFF',
          border: '1px solid rgba(0, 0, 0, 0.05)',
          padding: '8px 16px',
          borderRadius: '50px',
          boxShadow: '0 4px 12px rgba(94, 92, 230, 0.03)'
        }}>
          <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-periwinkle)', boxShadow: '0 0 10px var(--accent-periwinkle)' }} />
          <span style={{ fontSize: '11.5px', color: 'var(--text-primary)', fontWeight: 700 }}>E2EE Session Active</span>
        </div>
      </div>

      {/* Grid Layout: Left Sidebar tabs, Right Workspace */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '240px 1fr',
        gap: '40px',
        alignItems: 'start'
      }}>
        
        {/* Left Sidebar Navigation */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          borderRight: '1px solid rgba(0, 0, 0, 0.05)',
          paddingRight: '16px'
        }}>
          <button onClick={() => setActiveTab('vault')} style={getTabStyle('vault')}>
            <Key size={15} /> Cryptographic Vault
          </button>
          <button onClick={() => setActiveTab('payouts')} style={getTabStyle('payouts')}>
            <ArrowLeftRight size={15} /> Payouts Simulator
          </button>
          <button onClick={() => setActiveTab('settings')} style={getTabStyle('settings')}>
            <Settings size={15} /> Account Settings
          </button>
        </div>

        {/* Right Workspace Panel */}
        <div className="card-cred" style={{ minHeight: '520px', padding: '32px', background: '#FFFFFF' }}>
          
          {/* Action Messages */}
          {error && (
            <div style={{ background: 'rgba(255,72,72,0.04)', border: '1px solid rgba(255,72,72,0.12)', padding: '12px 16px', borderRadius: '8px', color: '#ff4d4d', fontSize: '13px', marginBottom: '24px' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ background: 'rgba(36,178,99,0.04)', border: '1px solid rgba(36,178,99,0.12)', padding: '12px 16px', borderRadius: '8px', color: 'var(--accent-green)', fontSize: '13px', marginBottom: '24px' }}>
              {success}
            </div>
          )}

          {/* TAB 1: SECURE CRYPTO VAULT */}
          {activeTab === 'vault' && (
            <div>
              <div style={{ marginBottom: '28px' }}>
                <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', fontWeight: 800 }}>Credentials Cryptographic Vault</h3>
                <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  Secure payment credentials, webhook secrets, and standard API keys client-side. The plain key derived standards ensure zero-knowledge server storage.
                </p>
              </div>

              {/* Add New Item Form */}
              <form onSubmit={handleSaveItem} style={{
                background: 'rgba(94, 92, 230, 0.01)',
                border: '1px solid rgba(94, 92, 230, 0.08)',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '32px'
              }}>
                <h4 style={{ fontSize: '13.5px', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 800 }}>
                  <Plus size={15} color="var(--accent-periwinkle)" /> Add Secure Vault Item
                </h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px' }}>
                  <div className="form-group-cred" style={{ marginBottom: 0 }}>
                    <label>Label / Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Stripe Sandbox Key"
                      className="form-control-cred"
                      value={newItemName}
                      onChange={(e) => setNewItemName(e.target.value)}
                    />
                  </div>
                  
                  <div className="form-group-cred" style={{ marginBottom: 0 }}>
                    <label>Secret Value</label>
                    <input 
                      type="password" 
                      placeholder="e.g. sk_test_..."
                      className="form-control-cred"
                      value={newItemValue}
                      onChange={(e) => setNewItemValue(e.target.value)}
                    />
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button type="submit" className="btn-cred-neon" style={{ padding: '8px 20px', fontSize: '12px' }}>
                    Encrypt & Save
                  </button>
                </div>
              </form>

              {/* Secrets Table Ledger */}
              <h4 style={{ fontSize: '13.5px', color: 'var(--text-primary)', marginBottom: '14px', fontWeight: 800 }}>Vault Entries</h4>
              
              {loading ? (
                <div className="skeleton" style={{ height: '140px', borderRadius: '8px' }} />
              ) : vaultItems.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '48px 0',
                  border: '1px dashed rgba(0, 0, 0, 0.08)',
                  borderRadius: '12px',
                  color: 'var(--text-muted)',
                  fontSize: '13.5px'
                }}>
                  No secure credentials stored yet. Add an entry above.
                </div>
              ) : (
                <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', borderRadius: '8px', overflow: 'hidden' }}>
                  {/* Ledger Header */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: '1.2fr 2fr 1fr',
                    padding: '12px 20px',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                    background: 'rgba(0, 0, 0, 0.01)',
                    color: 'var(--text-muted)',
                    fontSize: '10.5px',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    <div>Label / Name</div>
                    <div>Decrypted Secret Payload</div>
                    <div style={{ textAlign: 'right' }}>Actions</div>
                  </div>

                  {/* Ledger Rows */}
                  {vaultItems.map((item) => (
                    <div key={item.id} style={{
                      display: 'grid',
                      gridTemplateColumns: '1.2fr 2fr 1fr',
                      padding: '16px 20px',
                      borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
                      alignItems: 'center',
                      background: '#FFFFFF',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = 'rgba(94, 92, 230, 0.01)'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#FFFFFF'}
                    >
                      <div style={{ fontWeight: 700, fontSize: '13px', color: 'var(--text-primary)' }}>
                        {item.itemName}
                      </div>

                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '12.5px' }}>
                        {decryptedValues[item.id] ? (
                          <span style={{ color: 'var(--accent-green)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                            {decryptedValues[item.id]}
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText(decryptedValues[item.id]);
                                alert("Credential copied to clipboard!");
                              }}
                              style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: 0 }}
                            >
                              <Copy size={12} />
                            </button>
                          </span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)' }}>••••••••••••••••••••••••••••</span>
                        )}
                      </div>

                      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                        <button 
                          onClick={() => handleDecryptItem(item)}
                          className="btn-cred-outline"
                          style={{
                            padding: '6px 12px',
                            fontSize: '11px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                        >
                          {decryptedValues[item.id] ? <EyeOff size={11} /> : <Eye size={11} />}
                          {decryptedValues[item.id] ? 'Hide' : 'Decrypt'}
                        </button>
                        <button 
                          onClick={() => handleDeleteItem(item.id)}
                          style={{
                            background: 'transparent',
                            border: '1px solid rgba(255, 72, 72, 0.15)',
                            color: '#ff4848',
                            borderRadius: '6px',
                            width: '26px',
                            height: '26px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,72,72,0.05)'; }}
                          onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
                        >
                          <Trash2 size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 2: PAYOUTS SIMULATOR */}
          {activeTab === 'payouts' && (
            <div>
              <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '6px', fontWeight: 800 }}>Payout Simulator Node</h3>
              <p style={{ fontSize: '13.5px', color: 'var(--text-secondary)', marginBottom: '28px' }}>
                Simulate bulk money transfers and payment gateway checkouts using our virtual IMPS routing engine.
              </p>

              {/* Simulator Form */}
              <form onSubmit={handleCreateMockPayout} style={{
                background: 'rgba(94, 92, 230, 0.01)',
                border: '1px solid rgba(94, 92, 230, 0.08)',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '32px'
              }}>
                <h4 style={{ fontSize: '13.5px', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 800 }}>Trigger Mock IMPS Payout</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
                  <div className="form-group-cred" style={{ marginBottom: 0 }}>
                    <label>Recipient UPI ID / Bank Node</label>
                    <input 
                      type="text" 
                      placeholder="e.g. merchant@okaxis"
                      className="form-control-cred"
                      value={mockTarget}
                      onChange={(e) => setMockTarget(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group-cred" style={{ marginBottom: 0 }}>
                    <label>Amount (INR)</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 5000"
                      className="form-control-cred"
                      value={mockAmount}
                      onChange={(e) => setMockAmount(e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button type="submit" className="btn-cred-neon" style={{ padding: '8px 18px', fontSize: '12px' }}>
                    Process Instantly
                  </button>
                </div>
              </form>

              {/* Transactions Ledger Table */}
              <h4 style={{ fontSize: '13.5px', color: 'var(--text-primary)', marginBottom: '14px', fontWeight: 800 }}>Simulation Transaction Log</h4>
              <div style={{ border: '1px solid rgba(0, 0, 0, 0.06)', borderRadius: '8px', overflow: 'hidden' }}>
                {/* Ledger Header */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr',
                  padding: '12px 18px',
                  borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                  background: 'rgba(0, 0, 0, 0.01)',
                  color: 'var(--text-muted)',
                  fontSize: '10.5px',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em'
                }}>
                  <div>Target Account</div>
                  <div>Transaction ID</div>
                  <div>Amount</div>
                  <div style={{ textAlign: 'right' }}>Status</div>
                </div>

                {/* Ledger Rows */}
                {transactions.map((tx) => (
                  <div key={tx.id} style={{
                    display: 'grid',
                    gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr',
                    padding: '14px 18px',
                    borderBottom: '1px solid rgba(0, 0, 0, 0.04)',
                    alignItems: 'center',
                    fontSize: '13px',
                    background: '#FFFFFF'
                  }}>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{tx.target}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', fontSize: '12px' }}>{tx.id}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: tx.type === 'PAYOUT' ? 'var(--text-primary)' : 'var(--accent-green)' }}>
                      {tx.type === 'PAYOUT' ? '-' : '+'}{tx.amount}
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{
                        display: 'inline-block',
                        fontSize: '9px',
                        fontWeight: 700,
                        color: 'var(--accent-green)',
                        background: 'rgba(36, 178, 99, 0.05)',
                        border: '1px solid rgba(36, 178, 99, 0.15)',
                        padding: '2px 8px',
                        borderRadius: '4px'
                      }}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PROFILE SETTINGS */}
          {activeTab === 'settings' && (
            <div>
              <h3 style={{ fontSize: '20px', color: 'var(--text-primary)', marginBottom: '24px', fontWeight: 800 }}>Account Node Profile</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                  paddingBottom: '16px'
                }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Merchant Account ID</span>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-primary)', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>merchant_usr_{user.id || '9834'}</p>
                </div>

                <div style={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                  paddingBottom: '16px'
                }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Login Username (Email)</span>
                  <p style={{ fontSize: '13.5px', color: 'var(--text-primary)', marginTop: '4px' }}>{user.email}</p>
                </div>

                <div style={{
                  borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
                  paddingBottom: '16px'
                }}>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Access Authorization Role</span>
                  <p style={{ fontSize: '13.5px', color: 'var(--accent-periwinkle)', marginTop: '4px', fontWeight: 700 }}>{user.role || 'ROLE_USER'}</p>
                </div>

                <div>
                  <span style={{ fontSize: '10px', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>Client Security Context</span>
                  <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                    <div style={{
                      background: 'rgba(0, 0, 0, 0.01)',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      padding: '12px 18px',
                      borderRadius: '8px',
                      flex: 1
                    }}>
                      <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'block' }}>Key Agreement</span>
                      <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px', display: 'block', fontFamily: 'var(--font-mono)' }}>PBKDF2 SHA-256</span>
                    </div>

                    <div style={{
                      background: 'rgba(0, 0, 0, 0.01)',
                      border: '1px solid rgba(0, 0, 0, 0.05)',
                      padding: '12px 18px',
                      borderRadius: '8px',
                      flex: 1
                    }}>
                      <span style={{ fontSize: '9px', color: 'var(--text-muted)', display: 'block' }}>Encryption Standard</span>
                      <span style={{ fontSize: '12.5px', fontWeight: 700, color: 'var(--text-primary)', marginTop: '2px', display: 'block', fontFamily: 'var(--font-mono)' }}>AES-GCM-256</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
