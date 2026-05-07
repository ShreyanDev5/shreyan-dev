import { useEffect, useState, type FC } from 'react';
import { X, Download } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const resumeHighlights = [
  "Java and Spring Boot projects with SQL, JDBC, JPA, and REST APIs",
  "JUnit 5, Postman, DTOs, and Redis when needed",
  "Learning system design, messaging, observability, CI/CD, Kubernetes, and cloud tools",
];

const ResumeModal: FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const [isPdfSupported, setIsPdfSupported] = useState(true);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/Resume_3.0.pdf';
    link.download = 'Resume_3.0.pdf';
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
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-2 sm:p-4"
      onClick={onClose}
    >
      <div
        className="bg-[#1F1F1F] border border-white/[0.08] rounded-2xl w-full max-w-[90%] sm:max-w-4xl max-h-[80vh] sm:max-h-[90vh] flex flex-col shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-3 sm:p-4 border-b border-white/[0.08]">
          <h2 className="text-base sm:text-xl font-bold text-white">Resume</h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* PDF Viewer or Fallback */}
        <div className="flex-1 overflow-auto p-2 sm:p-4">
          <div className="mb-4 rounded-2xl border border-white/[0.08] bg-white/[0.03] p-4 sm:p-5">
            <p className="text-white text-sm sm:text-base font-semibold mb-2">Quick Intro</p>
            <p className="text-gray-400 text-sm sm:text-[15px] leading-relaxed mb-4">
              I&apos;m a recent CSE graduate focused on Java backend development with Spring Boot and Hibernate. I&apos;ve built full-stack projects with REST APIs and relational databases, and I practice DSA consistently. I&apos;m currently in the top 7% globally on LeetCode.
            </p>
            <div className="flex flex-wrap gap-2">
              {resumeHighlights.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 text-xs sm:text-sm font-medium tracking-wide rounded-full bg-white/[0.04] text-gray-300 border border-white/[0.08]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {isPdfSupported ? (
            <iframe
              src="/Resume_3.0.pdf"
              className="w-full h-[40vh] sm:h-[60vh] rounded-lg"
              title="Resume Preview"
              onError={handlePdfError}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-[40vh] sm:h-[60vh] text-center p-4">
              <p className="text-gray-400 mb-4 font-light">
                Preview is not available here. Please download the PDF to view it.
              </p>
              <button
                onClick={handleDownload}
                className="px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors duration-300 text-sm font-medium"
              >
                Download PDF
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 p-3 sm:p-4 border-t border-white/[0.08]">
          <button
            onClick={handleDownload}
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-full border-1.75 border-white/30 text-white text-sm font-medium bg-transparent hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            <Download size={16} className="text-white group-hover:text-emerald-400 transition-colors duration-300" />
            Download PDF
          </button>
          <button
            onClick={onClose}
            className="group w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 rounded-full border-1.75 border-white/30 text-white text-sm font-medium bg-transparent hover:border-red-500/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            <X size={16} className="text-white group-hover:text-red-400 transition-colors duration-300" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;