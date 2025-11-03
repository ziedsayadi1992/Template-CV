import React, { useState } from 'react';
import CVTemplate from './components/CVTemplate';
import CVEditor from './components/CVEditor';
import { useCVData } from './hooks/useCVData';

function App() {
  const [isEditMode, setIsEditMode] = useState(false);
  const { cvData, updateCVData, saveCVData, resetCVData, hasUnsavedChanges } = useCVData();

  const handleSave = () => {
    const success = saveCVData();
    if (success) {
      alert('CV sauvegardé avec succès!');
    } else {
      alert('Erreur lors de la sauvegarde du CV.');
    }
  };

  const handleReset = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser toutes les modifications?')) {
      resetCVData();
      alert('CV réinitialisé aux valeurs par défaut.');
    }
  };

  const handleToggleMode = () => {
    if (isEditMode && hasUnsavedChanges) {
      if (confirm('Vous avez des modifications non sauvegardées. Voulez-vous continuer?')) {
        setIsEditMode(!isEditMode);
      }
    } else {
      setIsEditMode(!isEditMode);
    }
  };

  return (
    <div className="App">
      {isEditMode ? (
        <CVEditor
          data={cvData}
          onUpdate={updateCVData}
          onSave={handleSave}
          onReset={handleReset}
          onTogglePreview={handleToggleMode}
          isPreviewMode={false}
        />
      ) : (
        <div className="relative">
          <button
            onClick={handleToggleMode}
            className="no-print fixed top-6 left-6 z-50 flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg shadow-lg hover:bg-gray-900 transition-all duration-200 hover:scale-105"
            title="Mode Édition"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
            Éditer
          </button>
          <CVTemplate data={cvData} />
        </div>
      )}
    </div>
  );
}

export default App;