import React from 'react';

interface Setting {
  _id: string;
  name: string;
  value: any;
}

interface SettingsSidebarProps {
  settings: Setting[];
  selectedId: string | null;
  onSelect: (setting: Setting) => void;
  onCreateNew: () => void;
  hasMore?: boolean;
  onLoadMore?: () => void;
  isLoadingMore?: boolean;
}

const SettingsSidebar: React.FC<SettingsSidebarProps> = ({ 
  settings, 
  selectedId, 
  onSelect, 
  onCreateNew,
  hasMore = false,
  onLoadMore,
  isLoadingMore = false
}) => {
  return (
    <div className="sidebar" style={{
      width: '250px',
      backgroundColor: '#1e1e1e', // Darker background
      display: 'flex',
      flexDirection: 'column',
      borderRight: '1px solid #333'
    }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid #333' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: 'white', margin: 0 }}>Settings</h2>
      </div>

      <div style={{ padding: '1rem', borderBottom: '1px solid #333' }}>
        <button 
          onClick={onCreateNew}
          style={{
            width: '100%',
            padding: '0.75rem',
            backgroundColor: 'transparent',
            border: '1px dashed #4b5563',
            color: '#9ca3af',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem'
          }}
        >
          <span>+</span> Create New
        </button>
      </div>
      
      <div className="settings-list" style={{ flex: 1, overflowY: 'auto', padding: '0.5rem' }}>
        {settings.map((setting) => (
          <button
            key={setting._id}
            onClick={() => onSelect(setting)}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '0.75rem 1rem',
              backgroundColor: setting._id === selectedId ? '#3b82f6' : 'transparent',
              color: setting._id === selectedId ? 'white' : '#a1a1aa',
              border: 'none',
              borderRadius: '6px',
              marginBottom: '0.25rem',
              cursor: 'pointer',
              fontSize: '0.95rem',
              transition: 'all 0.2s',
            }}
          >
            {setting.name}
          </button>
        ))}

        
        {hasMore && (
          <button 
            onClick={onLoadMore}
            disabled={isLoadingMore}
            style={{
              width: '100%',
              marginTop: '1rem',
              padding: '0.5rem',
              backgroundColor: '#27272a',
              color: '#a1a1aa',
              border: '1px solid #3f3f46',
              borderRadius: '6px',
              fontSize: '0.875rem',
              cursor: isLoadingMore ? 'wait' : 'pointer'
            }}
          >
            {isLoadingMore ? 'Loading...' : 'Load More'}
          </button>
        )}
      </div>
    </div>
  );
};

export default SettingsSidebar;
