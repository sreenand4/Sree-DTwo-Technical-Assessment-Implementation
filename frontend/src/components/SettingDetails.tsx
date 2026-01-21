import React, { useState, useEffect } from 'react';
import { updateSetting } from '../services/api';

interface Setting {
  _id: string;
  name: string;
  value: any;
  createdAt?: string;
  updatedAt?: string;
}

interface SettingDetailsProps {
  setting: Setting | null;
  initialEditMode?: boolean;
  onUpdate?: (updatedSetting: Setting) => void;
  onDelete?: (id: string) => void;
}

const SettingDetails: React.FC<SettingDetailsProps> = ({ setting, initialEditMode = false, onUpdate, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [jsonValue, setJsonValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsEditing(initialEditMode);
    if (setting) {
      setJsonValue(JSON.stringify(setting.value, null, 2));
    }
    setError(null);
  }, [setting, initialEditMode]);

  const handleSave = async () => {
    if (!setting) return;
    try {
      const parsedValue = JSON.parse(jsonValue);
      const updated = await updateSetting(setting._id, parsedValue);
      if (onUpdate) onUpdate(updated);
      setIsEditing(false);
      setError(null);
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Invalid JSON format');
      } else {
        setError('Failed to save setting');
        console.error(err);
      }
    }
  };

  if (!setting) {
    return (
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        color: '#6b7280' 
      }}>
        Select a setting to view details
      </div>
    );
  }

  return (
    <div style={{ flex: 1, padding: '2rem', overflowY: 'auto', backgroundColor: '#121212' }}>
      <header style={{ marginBottom: '2rem', borderBottom: '1px solid #333', paddingBottom: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: 'white' }}>
            {setting.name}
          </h1>
          <div style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
            <span>ID: {setting._id}</span>
            {setting.updatedAt && <span>Updated: {new Date(setting.updatedAt).toLocaleDateString()}</span>}
          </div>
        </div>
        {!isEditing ? (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => onDelete && setting && onDelete(setting._id)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'transparent',
                  color: '#ef4444',
                  border: '1px solid #7f1d1d',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
              <button 
                onClick={() => setIsEditing(true)}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#3b82f6',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Edit
              </button>
            </div>
        ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button 
                onClick={() => {
                  setIsEditing(false);
                  setJsonValue(JSON.stringify(setting.value, null, 2));
                  setError(null);
                }}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: 'transparent',
                  color: '#9ca3af',
                  border: '1px solid #4b5563',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Cancel
              </button>
              <button 
                onClick={handleSave}
                style={{
                  padding: '0.5rem 1rem',
                  backgroundColor: '#16a34a',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Save
              </button>
            </div>
        )}
      </header>

      <section>
        <h3 style={{ color: '#e5e7eb', marginBottom: '1rem' }}>Configuration (JSON)</h3>
        {error && <div style={{ color: '#ef4444', marginBottom: '1rem' }}>{error}</div>}
        
        {isEditing ? (
          <textarea
            value={jsonValue}
            onChange={(e) => setJsonValue(e.target.value)}
            autoFocus
            style={{
              width: '100%',
              minHeight: '400px',
              backgroundColor: '#1e1e1e',
              padding: '1.5rem',
              borderRadius: '8px',
              border: error ? '1px solid #ef4444' : '1px solid #3b82f6',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              color: 'white',
              resize: 'vertical',
              outline: 'none',
              lineHeight: '1.5'
            }}
          />
        ) : (
          <div style={{
            backgroundColor: '#1e1e1e',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid #333',
            fontFamily: 'monospace',
            fontSize: '0.9rem',
            color: '#a5f3fc',
            whiteSpace: 'pre-wrap',
            overflowX: 'auto'
          }}>
            {JSON.stringify(setting.value, null, 2)}
          </div>
        )}
      </section>
    </div>
  );
};


export default SettingDetails;
