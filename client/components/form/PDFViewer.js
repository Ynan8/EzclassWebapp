import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';

const PDFViewer = ({ fileUrl }) => {
    const [numPages, setNumPages] = useState(null);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    return (
        <div>
            <Document
                file={fileUrl}
                onLoadSuccess={onDocumentLoadSuccess}
            >
                {Array.from(new Array(numPages), (el, index) => (
                    <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                    />
                ))}
            </Document>
        </div>
    );
};

export default PDFViewer;