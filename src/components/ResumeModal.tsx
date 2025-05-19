import React, { useEffect, useState } from 'react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [isPdfSupported, setIsPdfSupported] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent scrolling on the body when modal is open
      document.body.style.overflow = 'hidden';
      checkMobile();
      window.addEventListener('resize', checkMobile);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      window.removeEventListener('resize', checkMobile);
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/resume_1.0.pdf';
    link.download = 'resume_1.0.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePdfError = () => {
    setIsPdfSupported(false);
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg w-full max-w-[90%] sm:max-w-4xl max-h-[80vh] sm:max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-2.5 sm:p-4 border-b">
          <h2 className="text-base sm:text-xl font-semibold">Resume</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* PDF Viewer or Fallback */}
        <div className="flex-1 overflow-auto p-2 sm:p-4">
          {isPdfSupported ? (
            <iframe
              src="/resume_1.0.pdf"
              className="w-full h-[40vh] sm:h-[60vh]"
              title="Resume Preview"
              onError={handlePdfError}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-[40vh] sm:h-[60vh] text-center p-4">
              <p className="text-gray-600 mb-4">
                Unable to preview PDF. Please download to view.
              </p>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
              >
                Download Resume
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 p-2.5 sm:p-4 border-t">
          <button
            onClick={handleDownload}
            className="w-full sm:w-auto px-3 py-1.5 sm:py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm sm:text-base"
          >
            Download Resume
          </button>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-3 py-1.5 sm:py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal; 