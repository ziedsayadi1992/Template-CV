import { useState, useRef } from 'react';
import CVTemplate from './components/CVTemplate';
import CVEditor from './components/CVEditor';
import { useCVData } from './hooks/useCVData';
import { processPDFToCV } from './utils/pdfExtractor';
import { useLanguage } from './contexts/LanguageContext';
import Spinner from './components/Spinner';
import { translationCache } from './utils/translationCache';
import { Edit, FileText, Upload, Sparkles } from 'lucide-react';
import { getCVTemplate } from './data/cvTemplates';


function App() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isProcessingPDF, setIsProcessingPDF] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { cvData, updateCVData, saveCVData, resetCVData, loadCVData, hasUnsavedChanges } = useCVData();
  const { t, translatedCV, setTranslatedCV, currentLanguage, setCvSourceLanguage } = useLanguage();

  const displayData = translatedCV || cvData;

  // ✅ NEW: Handle template updates from CVTemplate
  const handleTemplateUpdate = (newData: typeof cvData) => {
    console.log('📝 Template updated by CVTemplate component');
    loadCVData(newData);
    // Don't clear cvSourceLanguage here - CVTemplate already handles it
  };

  // Clear translation cache when CV data changes (only if user edits)
  const handleCVUpdate = (newData: typeof cvData) => {
    updateCVData(newData);
    // Clear translation cache and mark as user-edited
    translationCache.clear();
    setTranslatedCV(null);
    setCvSourceLanguage(null); // CV is now user-modified
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
      setCvSourceLanguage(null);
      setTranslatedCV(null);
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
      // Get template in the currently selected language
      const template = getCVTemplate(currentLanguage);
      
      // Load the template
      loadCVData(template);
      
      // Mark the CV as coming from a template in this language
      setCvSourceLanguage(currentLanguage);
      
      // Clear any existing translations
      setTranslatedCV(null);
      translationCache.clear();
      
      // Switch to edit mode
      setIsEditMode(true);
      
      console.log(`✅ Loaded ${currentLanguage} template`);
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
      
      // Mark as PDF source (no source language)
      setCvSourceLanguage(null);
      setTranslatedCV(null);
      
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
    <div className="App min-h-screen bg-gradient-to-br from-blue-50/30 via-white to-cyan-50/30">
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
          {/* Modern Navigation Bar */}
          <nav className="no-print sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200/60 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                {/* Logo Section - Enhanced */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl blur-sm opacity-75"></div>
                    <div className="relative w-11 h-11 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg">
                      <Sparkles className="text-white" size={22} strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="hidden sm:block">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
                      {displayData.personalInfo?.fullName || 'Professional CV'}
                    </h1>
                    <p className="text-xs text-neutral-500 font-medium">AI-Powered CV Builder</p>
                  </div>
                </div>

                {/* Action Buttons - Modernized */}
                <div className="flex items-center gap-2.5">
                  {/* Edit Button */}
                  <button
                    onClick={handleToggleMode}
                    className="group relative flex items-center gap-2 px-4 py-2.5 bg-white text-neutral-700 rounded-xl border border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-medium text-sm"
                    title={t('edit')}
                  >
                    <Edit size={18} className="group-hover:rotate-12 transition-transform duration-200" />
                    <span className="hidden sm:inline">{t('edit')}</span>
                  </button>

                  {/* New CV Button */}
                  <button
                    onClick={handleNewCV}
                    className="group relative flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-medium text-sm"
                    title={t('newCv')}
                  >
                    <FileText size={18} className="group-hover:scale-110 transition-transform duration-200" />
                    <span className="hidden sm:inline">{t('newCv')}</span>
                  </button>

                  {/* Import PDF Button - Featured */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="group relative flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white rounded-xl shadow-md hover:shadow-lg transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] font-semibold text-sm"
                    title={t('uploadPdf')}
                  >
                    <Upload size={18} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
                    <span className="hidden sm:inline">{t('uploadPdf')}</span>
                    <div className="absolute inset-0 rounded-xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
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

          {/* CV Template - ✅ NOW WITH CALLBACK */}
          <CVTemplate 
            data={cvData} 
            onUpdateData={handleTemplateUpdate}
          />
        </div>
      )}
    </div>
  );
}

export default App;