import { useEffect, useState, memo, type FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ExternalLink, FileText, Check, Loader2 } from 'lucide-react';

interface PdfModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  pdfPath: string;
  downloadName: string;
  downloadLabel?: string;
  defaultZoom?: number | string;
  newTabZoom?: number | string;
}

const PdfModal: FC<PdfModalProps> = ({
  isOpen,
  onClose,
  title,
  pdfPath,
  downloadName,
  downloadLabel,
  defaultZoom,
  newTabZoom = 98,
}) => {
  const [isPdfSupported, setIsPdfSupported] = useState(true);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');

  // Lock body scroll when modal is open and cleanly restore when closed
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    const previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    setIsPdfSupported(true);
    const zoomParam = defaultZoom ? `#zoom=${defaultZoom}` : '#view=FitH';
    setPdfUrl(`${pdfPath}${zoomParam}`);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = previousBodyOverflow || '';
    };
  }, [isOpen, onClose, pdfPath, defaultZoom]);

  // Robust, reliable download via fetch + Blob with fallback
  const handleDownload = async () => {
    if (isDownloading) return;
    setIsDownloading(true);

    try {
      const response = await fetch(pdfPath);
      if (!response.ok) throw new Error('Network fetch failed');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = downloadName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } catch {
      // Fallback direct anchor click
      const link = document.createElement('a');
      link.href = pdfPath;
      link.download = downloadName;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 2000);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleOpenInNewTab = () => {
    const zoomParam = newTabZoom ? `#zoom=${newTabZoom}` : '#zoom=98';
    window.open(`${pdfPath}${zoomParam}`, '_blank', 'noopener,noreferrer');
  };

  const handlePdfError = () => {
    setIsPdfSupported(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-3 pt-12 pb-3 sm:p-4 sm:pt-16 sm:pb-6"
          role="dialog"
          aria-modal="true"
          aria-label={title}
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container - Responsive, touch-friendly, and ergonomically sized */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 bg-[#121316] border border-white/[0.08] rounded-xl sm:rounded-2xl w-[94%] max-w-[440px] sm:max-w-[760px] sm:w-full h-[58vh] max-h-[500px] min-h-[340px] sm:h-[80vh] sm:max-h-[740px] sm:min-h-[460px] flex flex-col shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden my-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-3 py-2 sm:px-4.5 sm:py-3 border-b border-white/[0.08] bg-[#15161a] shrink-0">
              <div className="flex items-center gap-2 min-w-0 pr-2">
                <div className="p-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-neutral-400 shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <h2 className="text-sm sm:text-[15px] font-heading font-semibold text-white tracking-tight truncate">
                  {title}
                </h2>
              </div>

              {/* Top Quick Actions */}
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={handleOpenInNewTab}
                  className="w-7 h-7 sm:w-auto sm:h-7 sm:px-2.5 rounded-md text-neutral-400 hover:text-neutral-200 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/15 transition-all flex items-center justify-center gap-1.5 text-xs font-mono touch-manipulation"
                  title="Open in new tab"
                  aria-label="Open in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden sm:inline text-xs font-mono">Open in new tab</span>
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-7 h-7 sm:w-7 sm:h-7 flex items-center justify-center rounded-md text-neutral-400 hover:text-neutral-200 bg-white/[0.03] hover:bg-white/[0.07] border border-white/[0.06] hover:border-white/15 transition-all touch-manipulation"
                  aria-label="Close modal"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Viewer Body */}
            <div className="relative flex-1 min-h-0 bg-[#0b0c0e] overflow-hidden">
              {isPdfSupported ? (
                pdfUrl && (
                  <iframe
                    src={pdfUrl}
                    className="w-full h-full border-none bg-[#0e0f12]"
                    title={`${title} Preview`}
                    onError={handlePdfError}
                  />
                )
              ) : (
                /* Fallback View */
                <div className="flex flex-col items-center justify-center h-full text-center p-4 sm:p-6 space-y-3">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                    <FileText className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-400" />
                  </div>
                  <div className="max-w-xs space-y-1">
                    <p className="text-xs sm:text-sm font-heading font-medium text-white">
                      Document Preview
                    </p>
                    <p className="text-[11px] sm:text-xs text-neutral-400 font-sans leading-relaxed">
                      Inline viewer is not available on this browser. Open or download directly below.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={handleOpenInNewTab}
                      className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full border sm:border-2 border-white/15 bg-transparent text-neutral-200 text-xs font-mono font-medium hover:border-white/40 transition-all duration-200 touch-manipulation"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Open Full PDF
                    </button>
                    <button
                      type="button"
                      onClick={handleDownload}
                      className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-3.5 sm:py-1 rounded-full border sm:border-2 border-emerald-500/40 text-emerald-400 bg-transparent hover:border-emerald-600 font-mono text-xs font-medium transition-all duration-200 touch-manipulation"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download PDF
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between gap-2.5 px-3 py-2 sm:px-4.5 sm:py-2.5 border-t border-white/[0.08] bg-[#15161a] shrink-0">
              {/* Document Filename Meta - Full name displayed without premature cutoff */}
              <div className="flex items-center gap-1 min-w-0 flex-1">
                <span className="text-[10.5px] sm:text-xs font-mono text-neutral-400 truncate select-all">
                  {downloadName}
                </span>
              </div>

              {/* Action Button */}
              <div className="flex items-center shrink-0">
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={`group inline-flex items-center justify-center gap-1.5 h-7 sm:h-7 px-2.5 sm:px-3.5 rounded-full text-[11px] sm:text-xs font-mono font-medium transition-all duration-200 border sm:border-2 bg-transparent whitespace-nowrap touch-manipulation ${
                    downloadSuccess
                      ? 'border-emerald-500/60 text-emerald-400'
                      : 'border-emerald-500/40 text-emerald-400 hover:border-emerald-600'
                  }`}
                  aria-label={downloadLabel || 'Download PDF'}
                >
                  {isDownloading ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400 shrink-0" />
                  ) : downloadSuccess ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  ) : (
                    <Download className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  )}
                  <span>
                    {isDownloading
                      ? 'Saving...'
                      : downloadSuccess
                      ? 'Downloaded'
                      : downloadLabel || 'Download PDF'}
                  </span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default memo(PdfModal);
