import React, { useState } from 'react';
import './LandingPage.css';

import { createSetting } from '../services/api';

const LandingPage: React.FC = () => {
  const [settingName, setSettingName] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = async () => {
    if (!settingName) return;
    setIsLoading(true);

    try {
      const newSetting = await createSetting(settingName, {});
      console.log('Created setting:', newSetting);
      window.location.search = 'new=true';
    } catch (error) {
      console.error('Failed to create setting:', error);
      alert('Error creating setting. Please try again later');
    } finally {
      setIsLoading(false);
      setSettingName('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCreate();
    }
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">Settings Management System</h1>
      <p className="landing-subtitle">Create and manage your setting entities here!</p>
      
      <div className="input-group">
        <input 
          type="text" 
          className="landing-input" 
          placeholder="Enter a name to create a new Setting" 
          value={settingName}
          onChange={(e) => setSettingName(e.target.value)}
          onKeyDown={(e) => {handleKeyDown(e)}}
        />
        <button className="create-btn" onClick={handleCreate} disabled={isLoading} aria-label="New Setting">
          {isLoading ? (
            <div style={{ width: '1.25rem', height: '1.25rem', border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
