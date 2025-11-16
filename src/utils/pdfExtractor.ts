import * as pdfjsLib from 'pdfjs-dist';
import { CVData } from '../types';
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const extractTextFromPDF = async (file: File): Promise<string> => {
  try {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

    let fullText = '';

    for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
      const page = await pdf.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .map((item: any) => item.str)
        .join(' ');
      fullText += pageText + '\n\n';
    }

    return fullText.trim();
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    throw new Error('Failed to extract text from PDF');
  }
};

// Enhanced CV extraction with retry and better error handling
export const extractCVDataFromText = async (
  text: string,
  onRetry?: (attempt: number, delay: number) => void
): Promise<CVData> => {
  try {
    const response = await fetch('http://localhost:4000/api/extract-cv', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text }),
    });

    // Handle rate limit specifically
    if (response.status === 429) {
      const errorData = await response.json();
      const waitTime = errorData.retryAfter || 60;
      
      throw new Error(
        `Rate limit exceeded. The API has reached its request limit. ` +
        `Please wait ${waitTime} seconds before trying again. ` +
        `\n\nTip: Try uploading your PDF again in a minute.`
      );
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || 
        `Server error: ${response.status}. Please try again.`
      );
    }

    return (await response.json()) as CVData;
  } catch (err: any) {
    console.error('CV extraction API error:', err);
    
    // Provide user-friendly error messages
    if (err.message.includes('Rate limit')) {
      throw err; // Pass through rate limit errors with custom message
    } else if (err.message.includes('Failed to fetch')) {
      throw new Error(
        'Cannot connect to the server. Please make sure:\n' +
        '1. The server is running (npm run dev in server folder)\n' +
        '2. Server is accessible at http://localhost:4000'
      );
    } else {
      throw new Error(`CV extraction failed: ${err.message}`);
    }
  }
};

// Check if API is currently rate limited before attempting extraction
export const checkAPIStatus = async (): Promise<{
  available: boolean;
  message: string;
  waitTime?: number;
}> => {
  try {
    const response = await fetch('http://localhost:4000/api/rate-limit-status');
    const data = await response.json();
    
    if (response.status === 429) {
      return {
        available: false,
        message: data.message || 'API is currently rate limited',
        waitTime: data.suggestedWaitTime || 60
      };
    }
    
    return {
      available: true,
      message: 'API is available'
    };
  } catch (error) {
    return {
      available: false,
      message: 'Cannot connect to server'
    };
  }
};

export const processPDFToCV = async (
  file: File,
  onProgress?: (stage: string, progress: number) => void
): Promise<CVData> => {
  try {
    // Stage 1: Check API availability
    onProgress?.('Checking API availability...', 10);
    const apiStatus = await checkAPIStatus();
    
    if (!apiStatus.available && apiStatus.waitTime) {
      throw new Error(
        `⏱️ API is currently rate limited. ` +
        `Please wait ${apiStatus.waitTime} seconds before trying again.\n\n` +
        `The free tier of Google Gemini API has request limits. ` +
        `Your request will work after the wait time.`
      );
    }
    
    // Stage 2: Extract text from PDF
    onProgress?.('Extracting text from PDF...', 30);
    const text = await extractTextFromPDF(file);
    
    if (!text || text.length < 50) {
      throw new Error(
        'PDF appears to be empty or has very little text. ' +
        'Please ensure your PDF contains readable text (not just images).'
      );
    }
    
    // Stage 3: Parse CV data with AI
    onProgress?.('Parsing CV structure with AI...', 60);
    const cvData = await extractCVDataFromText(text);
    
    onProgress?.('Complete!', 100);
    return cvData;
    
  } catch (error: any) {
    console.error('PDF processing error:', error);
    throw error;
  }
};