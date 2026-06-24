import React, { useState, useEffect } from 'react';
import { Shield, Key, Eye, EyeOff, Plus, Trash2, Edit3, ArrowLeftRight, Settings, Check, Copy } from 'lucide-react';
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
    { id: 'tx_1', target: 'pay_vendor_abc', amount: '₹14,500.00', type: 'PAYOUT', status: 'SUCCESS', date: '2026-06-23 20:30' },
    { id: 'tx_2', target: 'charge_user_123', amount: '₹2,499.00', type: 'INCOMING', status: 'SUCCESS', date: '2026-06-23 18:15' }
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
      // Toggle visibility off
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
      alert("Decryption failed. Please verify your Master Key session is active. " + err.message);
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
      id: 'tx_' + Math.random().toString(36).substr(2, 9),
      target: mockTarget,
      amount: '₹' + parseFloat(mockAmount).toLocaleString('en-IN', { minimumFractionDigits: 2 }),
      type: 'PAYOUT',
      status: 'SUCCESS',
      date: new Date().toISOString().replace('T', ' ').substr(0, 16)
    };

    setTransactions([newTx, ...transactions]);
    setMockAmount('');
    setMockTarget('');
    alert("Mock Payout completed successfully via IMPS routing node!");
  };

  return (
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '120px 4% 80px',
      minHeight: '85vh'
    }}>
      
      {/* Upper header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        paddingBottom: '24px',
        marginBottom: '40px'
      }}>
        <div>
          <span style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--accent-green)' }}>
            verified merchant portal
          </span>
          <h2 style={{ fontSize: '32px', color: '#fff', marginTop: '6px' }}>Dashboard</h2>
        </div>
        
        {/* Connection state */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '8px 16px',
          borderRadius: '10px'
        }}>
          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 10px var(--accent-green)' }} />
          <span style={{ fontSize: '12px', color: '#fff' }}>Session Key Active (E2EE unlocked)</span>
        </div>
      </div>

      {/* Grid Layout: Left Sidebar tabs, Right Workspace */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        gap: '40px',
        alignItems: 'start'
      }}>
        
        {/* Left Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('vault')}
            className={activeTab === 'vault' ? "btn-cred" : "btn-cred-outline"}
            style={{ width: '100%', justifyContent: 'flex-start', padding: '12px 20px', gap: '10px', textTransform: 'none', letterSpacing: 'normal' }}
          >
            <Key size={16} /> Secure E2EE Vault
          </button>
          <button 
            onClick={() => setActiveTab('payouts')}
            className={activeTab === 'payouts' ? "btn-cred" : "btn-cred-outline"}
            style={{ width: '100%', justifyContent: 'flex-start', padding: '12px 20px', gap: '10px', textTransform: 'none', letterSpacing: 'normal' }}
          >
            <ArrowLeftRight size={16} /> Payouts Simulator
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={activeTab === 'settings' ? "btn-cred" : "btn-cred-outline"}
            style={{ width: '100%', justifyContent: 'flex-start', padding: '12px 20px', gap: '10px', textTransform: 'none', letterSpacing: 'normal' }}
          >
            <Settings size={16} /> Profile & Settings
          </button>
        </div>

        {/* Right Workspace */}
        <div className="card-cred" style={{ minHeight: '500px', position: 'relative' }}>
          
          {/* Messages */}
          {error && (
            <div style={{ background: 'rgba(255,72,72,0.08)', border: '1px solid rgba(255,72,72,0.2)', padding: '12px', borderRadius: '8px', color: '#ff4d4d', fontSize: '13px', marginBottom: '20px' }}>
              {error}
            </div>
          )}
          {success && (
            <div style={{ background: 'rgba(0,230,118,0.08)', border: '1px solid rgba(0,230,118,0.2)', padding: '12px', borderRadius: '8px', color: 'var(--accent-green)', fontSize: '13px', marginBottom: '20px' }}>
              {success}
            </div>
          )}

          {/* TAB 1: SECURE VAULT */}
          {activeTab === 'vault' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <div>
                  <h3 style={{ fontSize: '20px', color: '#fff' }}>E2EE Credentials Vault</h3>
                  <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                    Encrypt API keys, access secrets, and webhook tokens client-side. The server stores only ciphertext.
                  </p>
                </div>
              </div>

              {/* Add New Item Form */}
              <form onSubmit={handleSaveItem} style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '32px'
              }}>
                <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Plus size={16} color="var(--accent-green)" /> Add Secure Item
                </h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '16px' }}>
                  <div className="form-group-cred" style={{ marginBottom: 0 }}>
                    <label>Item Name / Label</label>
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
                      type="text" 
                      placeholder="e.g. sk_test_51Nz..."
                      className="form-control-cred"
                      value={newItemValue}
                      onChange={(e) => setNewItemValue(e.target.value)}
                    />
                  </div>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button type="submit" className="btn-cred" style={{ padding: '8px 20px', fontSize: '12px' }}>
                    Encrypt & Save
                  </button>
                </div>
              </form>

              {/* Items List */}
              <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '14px' }}>Stored Secrets</h4>
              {loading ? (
                <div className="skeleton" style={{ height: '120px', borderRadius: '8px' }} />
              ) : vaultItems.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '48px 0',
                  border: '1px dashed rgba(255,255,255,0.05)',
                  borderRadius: '12px',
                  color: 'var(--text-secondary)',
                  fontSize: '13.5px'
                }}>
                  No secure credentials stored yet. Add one above.
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {vaultItems.map((item) => (
                    <div key={item.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      background: 'rgba(255,255,255,0.01)',
                      border: '1px solid rgba(255,255,255,0.04)',
                      padding: '16px 20px',
                      borderRadius: '10px',
                      transition: 'border-color 0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'}
                    >
                      <div>
                        <span style={{ fontSize: '14px', fontWeight: 700, color: '#fff', display: 'block' }}>{item.itemName}</span>
                        <div style={{
                          fontFamily: 'monospace',
                          fontSize: '12.5px',
                          color: decryptedValues[item.id] ? 'var(--accent-green)' : 'var(--text-muted)',
                          marginTop: '6px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          {decryptedValues[item.id] ? (
                            <>
                              <span>{decryptedValues[item.id]}</span>
                              <button 
                                onClick={() => {
                                  navigator.clipboard.writeText(decryptedValues[item.id]);
                                  alert("Secret copied to clipboard!");
                                }}
                                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'inline-flex' }}
                              >
                                <Copy size={12} />
                              </button>
                            </>
                          ) : (
                            <span>••••••••••••••••••••••••••••</span>
                          )}
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px' }}>
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
                          {decryptedValues[item.id] ? <EyeOff size={12} /> : <Eye size={12} />}
                          {decryptedValues[item.id] ? 'Hide' : 'Decrypt'}
                        </button>
                        <button 
                          onClick={() => handleDeleteItem(item.id)}
                          style={{
                            background: 'transparent',
                            border: '1px solid rgba(255, 72, 72, 0.2)',
                            color: '#ff4848',
                            borderRadius: '8px',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255,72,72,0.1)'; }}
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

          {/* TAB 2: MOCK PAYOUTS */}
          {activeTab === 'payouts' && (
            <div>
              <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '6px' }}>Mock Payout Simulator</h3>
              <p style={{ fontSize: '12.5px', color: 'var(--text-secondary)', marginBottom: '28px' }}>
                Simulate bulk money transfers and payment gateway checkouts using our virtual IMPS routing engine.
              </p>

              {/* Simulator Form */}
              <form onSubmit={handleCreateMockPayout} style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
                padding: '24px',
                borderRadius: '12px',
                marginBottom: '32px'
              }}>
                <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '16px' }}>Trigger Virtual IMPS Payout</h4>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '16px' }}>
                  <div className="form-group-cred" style={{ marginBottom: 0 }}>
                    <label>Target Account / UPI ID</label>
                    <input 
                      type="text" 
                      placeholder="e.g. vendor@okaxis or 9988776655@upi"
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
                  <button type="submit" className="btn-cred" style={{ padding: '8px 20px', fontSize: '12px' }}>
                    Process Instantly
                  </button>
                </div>
              </form>

              {/* Transactions Log */}
              <h4 style={{ fontSize: '14px', color: '#fff', marginBottom: '14px' }}>Transaction Log</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {transactions.map((tx) => (
                  <div key={tx.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    padding: '14px 18px',
                    borderRadius: '8px'
                  }}>
                    <div>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff' }}>{tx.target}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block', marginTop: '3px' }}>{tx.date} | ID: {tx.id}</span>
                    </div>

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '14px', fontWeight: 800, color: tx.type === 'PAYOUT' ? '#fff' : 'var(--accent-green)' }}>
                        {tx.type === 'PAYOUT' ? '-' : '+'}{tx.amount}
                      </span>
                      <span style={{
                        display: 'block',
                        fontSize: '9px',
                        fontWeight: 700,
                        color: 'var(--accent-green)',
                        background: 'rgba(0, 230, 118, 0.08)',
                        border: '1px solid rgba(0, 230, 118, 0.2)',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        marginTop: '3px',
                        textAlign: 'center'
                      }}>
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SETTINGS */}
          {activeTab === 'settings' && (
            <div>
              <h3 style={{ fontSize: '20px', color: '#fff', marginBottom: '24px' }}>Profile & Security Settings</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  paddingBottom: '16px'
                }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Merchant Account ID</span>
                  <p style={{ fontSize: '14px', color: '#fff', marginTop: '4px', fontFamily: 'monospace' }}>merchant_usr_{user.id || '9834'}</p>
                </div>

                <div style={{
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  paddingBottom: '16px'
                }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Login Username (Email)</span>
                  <p style={{ fontSize: '14px', color: '#fff', marginTop: '4px' }}>{user.email}</p>
                </div>

                <div style={{
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  paddingBottom: '16px'
                }}>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Access Token Role</span>
                  <p style={{ fontSize: '14px', color: '#fff', marginTop: '4px', color: 'var(--accent-green)' }}>{user.role || 'ROLE_USER'}</p>
                </div>

                <div>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Browser Security State</span>
                  <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                    <div style={{
                      background: 'rgba(0, 230, 118, 0.05)',
                      border: '1px solid rgba(0, 230, 118, 0.2)',
                      padding: '12px 18px',
                      borderRadius: '8px',
                      flex: 1
                    }}>
                      <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block' }}>Key Agreement Type</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginTop: '2px', display: 'block' }}>PBKDF2 SHA-256</span>
                    </div>

                    <div style={{
                      background: 'rgba(0, 176, 255, 0.05)',
                      border: '1px solid rgba(0, 176, 255, 0.2)',
                      padding: '12px 18px',
                      borderRadius: '8px',
                      flex: 1
                    }}>
                      <span style={{ fontSize: '10px', color: 'var(--text-secondary)', display: 'block' }}>Encryption Standard</span>
                      <span style={{ fontSize: '13px', fontWeight: 700, color: '#fff', marginTop: '2px', display: 'block' }}>AES-GCM-256</span>
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
