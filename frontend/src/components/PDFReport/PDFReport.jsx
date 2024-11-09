import React from 'react';
import jsPDF from 'jspdf';
import { Button } from '@mui/material';
import { generatePDFContent } from './pdfUtils';

const PDFReport = ({ chartData }) => {
    const handleGeneratePDF = async () => {
        const doc = new jsPDF();
        
        // Generar contenido PDF usando utilidades
        await generatePDFContent(doc, chartData);
        
        // Descargar el archivo PDF
        doc.save('Informe_Graficos.pdf');
    };

    return (
        <Button variant="contained" color="primary" onClick={handleGeneratePDF}>
            Generar Informe PDF
        </Button>
    );
};

export default PDFReport;
