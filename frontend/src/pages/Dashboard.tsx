import React, { useState, useEffect } from 'react';
import SettingsSidebar from '../components/SettingsSidebar';
import SettingDetails from '../components/SettingDetails';
import CreateSettingModal from '../components/CreateSettingModal';

// Define the interface here
interface Setting {
  _id: string;
  name: string;
  value: any;
  createdAt?: string;
  updatedAt?: string;
}

interface DashboardProps {
  initialSettings: Setting[];
  initialMeta: any;
}

const Dashboard: React.FC<DashboardProps> = ({ initialSettings, initialMeta }) => {
  const [settings, setSettings] = useState<Setting[]>(initialSettings);
  const [selectedId, setSelectedId] = useState<string | null>(initialSettings.length > 0 ? initialSettings[0]._id : null);
  const selectedSetting = settings.find(s => s._id === selectedId) || null;
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Check URL for "new=true" param to enable auto-edit
  const [autoEdit, setAutoEdit] = useState(() => new URLSearchParams(window.location.search).get('new') === 'true');
  
  // Pagination State
  const [page, setPage] = useState(initialMeta?.page || 1);
  const [hasMore, setHasMore] = useState(initialMeta?.hasMore || false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    // Clean up the URL query param if it exists
    if (new URLSearchParams(window.location.search).get('new')) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleCreateSuccess = (newSetting: Setting) => {
    setSettings((prev) => [newSetting, ...prev]);
    setSelectedId(newSetting._id);
    setAutoEdit(true); // Toggle auto-edit on for new creation
    setIsModalOpen(false);
  };

  const handleUpdateSuccess = (updatedSetting: Setting) => {
     setSettings((prev) => prev.map(s => s._id === updatedSetting._id ? updatedSetting : s));
     setAutoEdit(false);
  };

  const handleDeleteSuccess = (deletedId: string) => {
      const newSettings = settings.filter(s => s._id !== deletedId);
      
      if (newSettings.length === 0) {
          window.location.reload(); // Reload to trigger App.tsx -> LandingPage
      } else {
          setSettings(newSettings);
          // Select the first one available
          if (selectedId === deletedId) {
             setSelectedId(newSettings[0]._id);
          }
          setAutoEdit(false);
      }
  };



  const handleLoadMore = async () => {
    if (isLoadingMore || !hasMore) return;
    setIsLoadingMore(true);
    try {
      const { getSettings } = await import('../services/api');
      const nextPage = page + 1;
      const response = await getSettings(nextPage);
      
      setSettings((prev) => [...prev, ...response.data]);
      setPage(response.meta.page);
      setHasMore(response.meta.hasMore);
    } catch (error) {
      console.error("Failed to load more settings", error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100vw', 
      overflow: 'hidden',
      backgroundColor: '#121212',
      color: '#ffffff'
    }}>
      <SettingsSidebar 
        settings={settings} 
        selectedId={selectedId} 
        onSelect={(s) => {
            setSelectedId(s._id);
            setAutoEdit(false);
        }} 
        onCreateNew={() => setIsModalOpen(true)}
        hasMore={hasMore}
        onLoadMore={handleLoadMore}
        isLoadingMore={isLoadingMore}
      />
      <SettingDetails 
        setting={selectedSetting} 
        initialEditMode={autoEdit}
        onUpdateSuccess={handleUpdateSuccess}
        onDeleteSuccess={handleDeleteSuccess}
      />
      
      <CreateSettingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={handleCreateSuccess} 
      />
    </div>
  );
};

export default Dashboard;
