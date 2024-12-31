import React from 'react';
import  { createRoot } from 'react-dom/client';
import "./index.css"
import App from './App';
import AppStore from './Context/AppStore';

const root = createRoot(document.getElementById('root'));
root.render(
<AppStore>
<App />
</AppStore>
  
);

