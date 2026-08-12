import { useEffect, useState, type FC } from 'react';
import { X, Download } from 'lucide-react';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfPath: string;
  downloadName: string;
  downloadLabel?: string;
  defaultZoom?: number;
}

const PdfModal: FC<PdfModalProps> = ({ isOpen, onClose, title, pdfPath, downloadName, downloadLabel, defaultZoom }) => {
  const [isPdfSupported, setIsPdfSupported] = useState(true);
  const [pdfUrl, setPdfUrl] = useState('');

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      setIsPdfSupported(true); // Reset PDF support check on modal open
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      const zoomFragment = defaultZoom ? `#zoom=${defaultZoom}` : '';
      setPdfUrl(`${pdfPath}?t=${Date.now()}${zoomFragment}`);
    }
  }, [isOpen, pdfPath, defaultZoom]);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = downloadName;
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
        className="bg-[#18191c] border border-white/10 rounded-2xl w-full max-w-[94%] sm:max-w-3xl max-h-[88vh] flex flex-col shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-3 sm:p-4 border-b border-white/[0.08]">
          <h2 className="text-base sm:text-xl font-bold text-white">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-gray-400 hover:text-white hover:bg-white/10 transition-all duration-300"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>
        </div>

        {/* PDF Viewer or Fallback */}
        <div className="flex-1 overflow-auto p-2 sm:p-4">
          {isPdfSupported ? (
            pdfUrl ? (
              <iframe
                src={pdfUrl}
                className="w-full h-[40vh] sm:h-[60vh] rounded-lg"
                title={`${title} Preview`}
                onError={handlePdfError}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-[40vh] sm:h-[60vh] text-center p-4 text-gray-400 font-light">
                Loading preview...
              </div>
            )
          ) : (
            <div className="flex flex-col items-center justify-center h-[40vh] sm:h-[60vh] text-center p-4">
              <p className="text-gray-400 mb-4 font-light">
                Preview is not available here. Download the PDF to view it.
              </p>
              <button
                type="button"
                onClick={handleDownload}
                className="px-4 py-2 bg-emerald-500 text-white rounded-full hover:bg-emerald-600 transition-colors duration-300 text-sm font-medium"
              >
                Download PDF
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-row justify-end gap-2 p-2.5 sm:p-3.5 border-t border-white/[0.08]">
          <button
            type="button"
            onClick={handleDownload}
            className="group flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 text-white text-xs font-mono font-medium bg-transparent hover:border-emerald-500/50 transition-all duration-200"
          >
            <Download size={13} className="text-white group-hover:text-emerald-400 transition-colors duration-200" />
            {downloadLabel || "Download PDF"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="group flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 text-white text-xs font-mono font-medium bg-transparent hover:border-red-500/50 transition-all duration-200"
          >
            <X size={13} className="text-white group-hover:text-red-400 transition-colors duration-200" />
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PdfModal;
