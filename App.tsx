
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Explainer from './components/Explainer';
import Dashboard from './components/Dashboard';
import Footer from './components/Footer';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import SecurityPolicy from './components/SecurityPolicy';
import { ViewState } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>({ type: 'home' });

  const handleNav = (type: ViewState['type']) => {
    setView({ type });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#F8E9DD] min-h-screen text-[#4A4A4A] flex flex-col relative overflow-x-hidden selection:bg-[#6A4FBF] selection:text-white">
      <Navbar onNavClick={handleNav} />
      
      {view.type === 'home' && (
        <main className="animate-fade-in-up">
          <Hero onBegin={() => handleNav('dashboard')} />
          <Explainer />
        </main>
      )}

      {view.type === 'dashboard' && (
        <main className="animate-fade-in-up">
          <Dashboard />
        </main>
      )}

      {view.type === 'privacy' && (
        <main className="animate-fade-in-up">
          <PrivacyPolicy />
        </main>
      )}

      {view.type === 'terms' && (
        <main className="animate-fade-in-up">
          <TermsOfService />
        </main>
      )}

      {view.type === 'security' && (
        <main className="animate-fade-in-up">
          <SecurityPolicy />
        </main>
      )}

      <Footer onNavClick={handleNav} />
    </div>
  );
};

export default App;
