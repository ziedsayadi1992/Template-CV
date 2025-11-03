import React from 'react';
import SplitScreenEditor from './components/SplitScreenEditor';
import { useCVData } from './hooks/useCVData';

function App() {
  const { cvData, updateCVData, saveCVData, hasUnsavedChanges } = useCVData();

  const handleSave = () => {
    const success = saveCVData();
    if (success) {
      alert('CV saved successfully!');
    } else {
      alert('Error saving CV.');
    }
  };

  return (
    <div className="App">
      <SplitScreenEditor
        data={cvData}
        onUpdate={updateCVData}
        onSave={handleSave}
        hasUnsavedChanges={hasUnsavedChanges}
      />
    </div>
  );
}

export default App;