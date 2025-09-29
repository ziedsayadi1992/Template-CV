import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { 
  Download
} from 'lucide-react';
import { CV_DATA } from '../data/cvData';
import PrintableCVContent from './PrintableCVContent';
import type { CVData } from '../types/cv';

interface CVTemplateProps {
  data?: CVData;
}

const CVTemplate: React.FC<CVTemplateProps> = ({ data = CV_DATA }) => {
  const componentRef = useRef<HTMLDivElement>(null);

  const handlePrintPDF = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${data.personalInfo.fullName} - CV`,
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
      html {
        counter-reset: page;
      }
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
        .page-number::after {
          content: counter(page);
        }
        * {
          box-sizing: border-box;
        }
      }
    `
  });


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background Geometric Shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 right-10 w-32 h-32 bg-blue-100 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-24 h-24 bg-indigo-100 rounded-full opacity-30"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-blue-200 transform rotate-45 opacity-25"></div>
        <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-indigo-200 transform rotate-12 opacity-20"></div>
      </div>

      {/* Export Buttons */}
      <div className="no-print fixed top-6 right-6 z-50">
        <button
          onClick={handlePrintPDF}
          className="flex items-center gap-2 px-4 py-2 bg-[#4590e6] text-white rounded-lg shadow-lg hover:bg-blue-600 transition-all duration-200 hover:scale-105"
          title="Exporter en PDF"
        >
          <Download size={18} />
          PDF
        </button>
      </div>

      {/* CV Content */}
      <div className="flex justify-center items-center py-10">
        <PrintableCVContent ref={componentRef} data={data} />
      </div>
    </div>
  );
};

export default CVTemplate;