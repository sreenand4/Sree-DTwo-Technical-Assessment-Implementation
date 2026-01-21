import React, { useState } from 'react';
import { createSetting } from '../services/api';

interface CreateSettingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (newSetting: any) => void;
}

const CreateSettingModal: React.FC<CreateSettingModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const newSetting = await createSetting(name.trim(), {});
      onSuccess(newSetting);
      setName('');
    } catch (err) {
      console.error('Failed to create setting:', err);
      setError('Failed to create setting. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.7)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000
    }}>
      <div style={{
        backgroundColor: '#1e1e1e',
        padding: '2rem',
        borderRadius: '8px',
        width: '100%',
        maxWidth: '400px',
        border: '1px solid #333',
        position: 'relative'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: '#6b7280',
            cursor: 'pointer',
            fontSize: '1.25rem'
          }}
        >
          ✕
        </button>

        <h2 style={{ color: 'white', marginTop: 0, marginBottom: '1.5rem' }}>Create New Setting</h2>

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.5rem' }}>
            <label style={{ display: 'block', color: '#9ca3af', marginBottom: '0.5rem', fontSize: '0.9rem' }}>
              Setting Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Dark Mode Config"
              autoFocus
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: '#27272a',
                border: '1px solid #3f3f46',
                borderRadius: '6px',
                color: 'white',
                fontSize: '1rem',
                outline: 'none'
              }}
            />
          </div>

          {error && (
            <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.9rem' }}>
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading || !name.trim()}
            style={{
              width: '100%',
              padding: '0.75rem',
              backgroundColor: isLoading || !name.trim() ? '#374151' : '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '1rem',
              fontWeight: 500,
              cursor: isLoading || !name.trim() ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.2s'
            }}
          >
            {isLoading ? 'Creating...' : 'Create'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSettingModal;
