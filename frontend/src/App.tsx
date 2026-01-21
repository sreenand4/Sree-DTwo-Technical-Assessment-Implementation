import { useEffect, useState } from 'react';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import { getSettings } from './services/api';

function App() {
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState<any[]>([]);
  const [meta, setMeta] = useState<any>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const response = await getSettings(1); // Fetch page 1
        setSettings(response.data);
        setMeta(response.meta);
      } catch (error) {
        console.error("Failed to load settings", error);
        // Fallback or error state could go here
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  if (loading) {
    return (
        <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#121212', color: 'white' }}></div>
    );
  }

  // If we have some settings, render dashboard. Else render Landing Page
  if (settings.length > 0) {
    return <Dashboard initialSettings={settings} initialMeta={meta} />;
  }

  return <LandingPage />;
}

export default App;
