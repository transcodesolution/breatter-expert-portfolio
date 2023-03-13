
import React, { useRef, useState } from "react";    
import { usePdf } from '@mikecousins/react-pdf';
import PDF from './Dipak.pdf'
export default function PdfComponent({pdf}) {
    const [page, setPage] = useState(1);
    const canvasRef = useRef(null);
    const { pdfDocument, pdfPage } = usePdf({
        file: 'https://www.africau.edu/images/default/sample.pdf',
        page,
        canvasRef,
    });
    return (
        <>
            <div>
                {!pdfDocument && <span>Loading...</span>}
                <canvas ref={canvasRef} />
                {Boolean(pdfDocument && pdfDocument.numPages) && (
                    <nav>
                        <ul className="pager">
                            <li className="previous">
                                <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                                    Previous
                                </button>
                            </li>
                            <li className="next">
                                <button
                                    disabled={page === pdfDocument.numPages}
                                    onClick={() => setPage(page + 1)}
                                >
                                    Next
                                </button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </>
    );
}
