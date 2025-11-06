import { useState, useRef } from 'react';
import CVTemplate from './components/CVTemplate';
import CVEditor from './components/CVEditor';
import { useCVData } from './hooks/useCVData';
import { processPDFToCV } from './utils/pdfExtractor';
import { useLanguage } from './contexts/LanguageContext';
import Spinner from './components/Spinner';
import { translationCache } from './utils/translationCache';
import { Edit, FileText, Upload } from 'lucide-react';

function App() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isProcessingPDF, setIsProcessingPDF] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { cvData, updateCVData, saveCVData, resetCVData, createNewCV, loadCVData, hasUnsavedChanges } = useCVData();
  const { t, translatedCV, setTranslatedCV } = useLanguage();

  const displayData = translatedCV || cvData;

  // Clear translation cache when CV data changes
  const handleCVUpdate = (newData: typeof cvData) => {
    updateCVData(newData);
    translationCache.clear();
    setTranslatedCV(null);
  };

  const handleSave = () => {
    const success = saveCVData();
    if (success) {
      alert(t('save') + ' ✓');
    } else {
      alert('Error saving CV');
    }
  };

  const handleReset = () => {
    if (confirm(t('reset') + '?')) {
      resetCVData();
      alert(t('reset') + ' ✓');
    }
  };

  const handleToggleMode = () => {
    if (isEditMode && hasUnsavedChanges) {
      if (confirm('Unsaved changes. Continue?')) {
        setIsEditMode(!isEditMode);
      }
    } else {
      setIsEditMode(!isEditMode);
    }
  };

  const handleNewCV = () => {
    if (confirm(t('newCv') + '?')) {
      createNewCV();
      setIsEditMode(true);
    }
  };

  const handlePDFUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf') {
      alert('Please select a valid PDF file');
      return;
    }

    try {
      setIsProcessingPDF(true);
      const extractedData = await processPDFToCV(file);
      loadCVData(extractedData);
      setIsEditMode(true);
      alert('PDF extracted successfully!');
    } catch (error) {
      console.error('PDF processing error:', error);
      alert('Error extracting PDF. Make sure the server is running (npm run dev in server folder).');
    } finally {
      setIsProcessingPDF(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (isProcessingPDF) {
    return <Spinner />;
  }

  return (
    <div className="App min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {isEditMode ? (
        <CVEditor
          data={displayData}
          onUpdate={handleCVUpdate}
          onSave={handleSave}
          onReset={handleReset}
          onTogglePreview={handleToggleMode}
          isPreviewMode={false}
        />
      ) : (
        <div className="relative">
          {/* ✅ FIXED: Responsive navigation bar */}
          <nav className="no-print sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo/Title */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">CV</span>
                  </div>
                  <h1 className="hidden sm:block text-xl font-bold text-gray-800">
                    {displayData.personalInfo?.fullName || 'Professional CV'}
                  </h1>
                </div>

                {/* Action Buttons - Responsive */}
                <div className="flex items-center gap-2 sm:gap-3">
                  {/* Edit Button */}
                  <button
                    onClick={handleToggleMode}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-800 text-white rounded-lg shadow-md hover:bg-gray-900 transition-all duration-200 hover:scale-105 font-medium text-sm"
                    title={t('edit')}
                  >
                    <Edit size={18} />
                    <span className="hidden sm:inline">{t('edit')}</span>
                  </button>

                  {/* New CV Button */}
                  <button
                    onClick={handleNewCV}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition-all duration-200 hover:scale-105 font-medium text-sm"
                    title={t('newCv')}
                  >
                    <FileText size={18} />
                    <span className="hidden sm:inline">{t('newCv')}</span>
                  </button>

                  {/* Import PDF Button */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-all duration-200 hover:scale-105 font-medium text-sm"
                    title={t('uploadPdf')}
                  >
                    <Upload size={18} />
                    <span className="hidden sm:inline">{t('uploadPdf')}</span>
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handlePDFUpload}
                    className="hidden"
                  />
                </div>
              </div>
            </div>
          </nav>

          {/* CV Template */}
          <CVTemplate data={cvData} />
        </div>
      )}
    </div>
  );
}

export default App;