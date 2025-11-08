import React, { useRef, useEffect, useState } from 'react';
import { Download, Languages, RotateCcw } from 'lucide-react';
import { useReactToPrint } from 'react-to-print';
import PrintableCVContent from './PrintableCVContent';
import type { CVData } from '../types/cv';
import { useLanguage } from '../contexts/LanguageContext';
import { useImprovedTranslate } from '../hooks/useImprovedTranslate';
import { rebuildJSON } from '../utils/chunkHelpers';
import { getCVTemplate } from '../data/cvTemplates';

interface CVTemplateProps {
  data?: CVData;
  onUpdateData?: (data: CVData) => void; // Add callback to update parent data
}

const CVTemplate: React.FC<CVTemplateProps> = ({ data, onUpdateData }) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const { 
    currentLanguage, 
    setLanguage, 
    translatedCV, 
    setTranslatedCV, 
    t, 
    translationCache, 
    isTranslating, 
    setIsTranslating,
    cvSourceLanguage,
    setCvSourceLanguage,
  } = useLanguage();
  const { translateStream, progress } = useImprovedTranslate();
  const [previousLanguage, setPreviousLanguage] = useState<string>(currentLanguage);

  // ✅ FIX: Ensure data always has a fallback
  const safeData = React.useMemo(() => {
    if (!data) {
      console.error('❌ No data provided to CVTemplate');
      return null;
    }
    
    if (!data.personalInfo) {
      console.warn('⚠️ Missing personalInfo, using defaults');
      return {
        ...data,
        personalInfo: {
          fullName: '',
          professionalTitle: '',
          avatarUrl: ''
        }
      };
    }
    
    return data;
  }, [data]);

  const displayData = translatedCV || safeData;

  // ✅ NEW FIX: Handle template-to-template switching
  useEffect(() => {
    // Skip if this is the first render
    if (previousLanguage === currentLanguage) {
      return;
    }

    // Update previous language
    setPreviousLanguage(currentLanguage);

    // If no data, skip
    if (!safeData) {
      return;
    }

    console.log(`🔄 Language changed from ${previousLanguage} to ${currentLanguage}`);
    console.log(`📝 Current cvSourceLanguage: ${cvSourceLanguage}`);

    // ✅ NEW: If CV is from a template, load new template instead of translating
    if (cvSourceLanguage !== null) {
      console.log(`✅ CV is from ${cvSourceLanguage} template, loading ${currentLanguage} template instead of translating`);
      
      // Load the template for the target language
      const newTemplate = getCVTemplate(currentLanguage);
      
      // Update the CV data with the new template
      if (onUpdateData) {
        onUpdateData(newTemplate);
      }
      
      // Update source language to the new template language
      setCvSourceLanguage(currentLanguage);
      
      // Clear any translated CV
      setTranslatedCV(null);
      setIsTranslating(false);
      
      console.log(`✅ Loaded ${currentLanguage} template directly`);
      return;
    }

    // ✅ If CV is user-modified (cvSourceLanguage === null), then translate
    console.log(`🌍 CV is user-modified, translating to ${currentLanguage}...`);

    // Check cache first
    const cached = translationCache.get(safeData, currentLanguage);
    if (cached) {
      console.log(`✅ Using cached translation for ${currentLanguage}`);
      setTranslatedCV(cached);
      setIsTranslating(false);
      return;
    }

    // Translate the user-modified CV
    setIsTranslating(true);
    let assembledText = '';

    const abort = translateStream(
      currentLanguage,
      safeData,
      (partialText) => {
        assembledText = partialText;
        try {
          const partial = rebuildJSON(assembledText);
          setTranslatedCV(partial);
        } catch {
          // Not valid yet
        }
      },
      (result) => {
        setTranslatedCV(result);
        translationCache.set(safeData, currentLanguage, result);
        setIsTranslating(false);
        console.log(`✅ Translation complete for ${currentLanguage}`);
      },
      (error) => {
        console.error('Translation error:', error);
        setIsTranslating(false);
      }
    );

    return () => {
      if (abort) abort();
    };
  }, [currentLanguage, cvSourceLanguage]); // ✅ Dependencies

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${displayData?.personalInfo?.fullName || 'CV'} - CV`,
    pageStyle: `
      @page {
        size: A4;
        margin: 0.75in;
        @bottom-center {
          content: "Page " counter(page) "/" counter(pages);
          font-size: 10px;
          color: #666;
        }
      }
      html { counter-reset: page; }
      @media print {
        body { -webkit-print-color-adjust: exact; }
        .no-print { display: none !important; }
        .print\\:break-before-page { page-break-before: always !important; }
        .print\\:m-0 { margin: 0 !important; }
        .page-number {
          position: fixed;
          bottom: 0.5in;
          right: 0.75in;
          font-size: 10px;
          color: #666;
        }
        .page-number::after { content: counter(page); }
        * { box-sizing: border-box; }
      }
    `
  });

  const handleResetLanguage = () => {
    setLanguage('Français');
    setTranslatedCV(null);
  };

  // Show loading only during translation with progress
  if (isTranslating && progress.percentage < 10) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="mt-4 text-gray-600">{t('translating')}</p>
          {progress.total > 0 && (
            <p className="text-sm text-gray-500 mt-2">
              {progress.current} / {progress.total} chunks ({progress.percentage}%)
            </p>
          )}
        </div>
      </div>
    );
  }

  if (!displayData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Initializing CV...</p>
          <p className="text-sm text-gray-400 mt-2">If this persists, try clearing your browser cache</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {/* ✅ FIXED: Better responsive CV controls bar */}
      <div className="no-print sticky top-16 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 py-3">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <Languages size={18} className="text-gray-600" />
              <select
                value={currentLanguage}
                onChange={(e) => setLanguage(e.target.value)}
                disabled={isTranslating}
                className="px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium text-gray-700 cursor-pointer hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <option value="Français">Français</option>
                <option value="English">English</option>
                <option value="Arabic">العربية</option>
                <option value="German">Deutsch</option>
                <option value="Spanish">Español</option>
              </select>
              {/* Show indicator if CV is from template */}
              {cvSourceLanguage !== null && (
                <span className="text-xs text-green-600 font-medium">
                  ✓ Template
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Reset Language Button (visible only when translated) */}
              {currentLanguage !== 'Français' && translatedCV && (
                <button
                  onClick={handleResetLanguage}
                  disabled={isTranslating}
                  className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all duration-200 hover:scale-105 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <RotateCcw size={16} />
                  <span className="hidden sm:inline">{t('reset')}</span>
                </button>
              )}

              {/* PDF Export Button */}
              <button
                onClick={handlePrint}
                disabled={isTranslating}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg shadow-md hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 hover:scale-105 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                title={t('exportPdf')}
              >
                <Download size={16} />
                <span>{t('exportPdf')}</span>
              </button>
            </div>
          </div>

          {/* Translation Progress Bar */}
          {isTranslating && progress.percentage >= 10 && (
            <div className="pb-3">
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span>{t('translating')}</span>
                <span>{progress.percentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress.percentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-20 left-10 w-40 h-40 bg-cyan-100 rounded-full opacity-20 blur-3xl"></div>
      </div>

      {/* CV Content */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100">
          <div ref={componentRef}>
            <PrintableCVContent data={displayData} />
          </div>
        </div>
      </main>
    </div>
  );
};

export default CVTemplate;