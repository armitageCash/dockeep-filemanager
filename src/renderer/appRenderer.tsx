import { createRoot } from 'react-dom/client';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Auth from './views/auth';
import Workspace from './views/workspace';
import { ConfigProvider } from 'antd/es';

console.log('[ERWT] : Renderer execution started');

const App = () => (
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#505050',
        colorPrimaryBg: '#f5f5f5',
        colorPrimaryBgHover: '#e8e8e8',
        colorPrimaryBorder: '#d9d9d9',
        colorPrimaryBorderHover: '#505050',
        colorPrimaryHover: '#666666',
        colorPrimaryActive: '#404040',
        colorPrimaryTextHover: '#666666',
        colorPrimaryText: '#505050',
        colorPrimaryTextActive: '#404040',
      },
    }}
  >
    <Router>
      <Routes>
        <Route path='/' element={<Auth />} />
        <Route path='/workspace' element={<Workspace />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </Router>
  </ConfigProvider>
);

createRoot(document.getElementById('app')).render(<App />);
