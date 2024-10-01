'use client';
import { useEffect, useRef, useState } from 'react';
import { Document, DocumentProps, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';

pdfjs.GlobalWorkerOptions.workerSrc =  '/pdf.worker.min.js';


interface TProps extends DocumentProps {
  customeClass?: {
    container: string;
  };
}

const PDFThumbnail = (props: TProps) => {
  const { ...attrsDocument } = props;
  const [containerSize, setContainerSize] = useState({ width: 0 });

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      setContainerSize({
        width: containerWidth,
      });
    }
  }, []);

  return (
    <div
      className={`border overflow-hidden flex items-center justify-center ${props.customeClass?.container || ''}`}
      ref={containerRef}
    >
      {containerSize.width > 0 && (
        <Document {...attrsDocument}>
          <Page
            pageNumber={1}
            width={containerSize.width} // Only set the width to ensure the page scales proportionally
            renderTextLayer={false}
          />
        </Document>
      )}
    </div>
  );
};

export default PDFThumbnail;
