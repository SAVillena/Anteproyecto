import html2canvas from 'html2canvas';
import INNTECHLogo from '../../assets/INNTECH.jpg';
import 'jspdf-autotable';

// Función para cargar el logo en base64
const loadLogo = async () => {
    const response = await fetch(INNTECHLogo);
    const blob = await response.blob();
    const reader = new FileReader();
    return new Promise((resolve) => {
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(blob);
    });
};

// Función para agregar encabezado y pie de página en cada página
const addHeaderAndFooter = (doc) => {
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(10);
        doc.text('INNTECH - Informe de Calidad del Aire', 105, 10, { align: 'center' });
        doc.text(`Página ${i} de ${pageCount}`, 105, 290, { align: 'center' });
    }
};

export const generatePDFContent = async (doc, chartData) => {
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;

    // Agregar el logo
    const logoData = await loadLogo();
    doc.addImage(logoData, 'JPEG', 10, 10, 40, 15);

    // Portada e índice
    doc.setFontSize(20);
    doc.text('Informe de Calidad del Aire', 105, 40, { align: 'center' });
    doc.setFontSize(14);
    doc.text(`Fecha de realización: ${formattedDate}`, 105, 50, { align: 'center' });
    doc.text('Plataforma: DustSense', 105, 60, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Análisis de partículas PM2.5 y PM10 en el aire', 105, 70, { align: 'center' });
    doc.addPage();

    // Índice
    doc.text('Índice', 10, 20);
    doc.setFontSize(12);
    doc.text('1. Introducción', 10, 30);
    doc.text('2. Análisis Gráfico de Partículas', 10, 40);
    doc.text('3. Estadísticas de PM2.5 y PM10', 10, 50);
    doc.text('4. Normativa Chilena', 10, 60);
    doc.text('5. Conclusiones', 10, 70);
    doc.addPage();

    // Introducción
    doc.setTextColor(0, 102, 204);
    doc.setFontSize(16);
    doc.text('Introducción', 10, 20);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text('Este informe presenta un análisis de la concentración de partículas PM2.5 y PM10, obtenidas a través de la plataforma DustSense.', 10, 30, { maxWidth: 190 });
    doc.text('Los datos han sido procesados y se muestran en los gráficos a continuación, junto con las estadísticas de valores mínimos, máximos y promedio.', 10, 40, { maxWidth: 190 });
    doc.addPage();

    // Captura de gráficos
    const chartsContainer = document.getElementById('chartsContainer');
    if (chartsContainer) {
        const canvas = await html2canvas(chartsContainer);
        const imgData = canvas.toDataURL('image/png');
        doc.setFontSize(16);
        doc.text('Análisis Gráfico de Partículas', 10, 20);
        doc.addImage(imgData, 'PNG', 10, 30, 190, 100);
        doc.addPage();
    }

    // Datos de máximos, mínimos y promedios en tabla
    const { min_ad_2, max_ad_2, avg_ad_2, min_ad_3, max_ad_3, avg_ad_3 } = chartData;
    doc.setFontSize(16);
    doc.text('Estadísticas de PM2.5 y PM10', 10, 20);
    doc.autoTable({
        head: [['Parámetro', 'Mínimo', 'Máximo', 'Promedio']],
        body: [
            ['PM2.5', min_ad_2, max_ad_2, avg_ad_2],
            ['PM10', min_ad_3, max_ad_3, avg_ad_3],
        ],
        startY: 30,
        theme: 'striped',
    });
    doc.addPage();

    // Normativa Chilena
    doc.setTextColor(0, 102, 204);
    doc.text('Normativa Chilena para Material Particulado', 10, 20);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text('De acuerdo con la normativa chilena:', 10, 30);
    doc.text('- PM2.5: No debe superar un promedio anual de 20 µg/m³ y un promedio diario de 50 µg/m³.', 10, 40);
    doc.text('- PM10: No debe superar un promedio anual de 50 µg/m³ y un promedio diario de 150 µg/m³.', 10, 50);
    doc.addPage();

    // Conclusiones
    doc.setTextColor(0, 102, 204);
    doc.setFontSize(16);
    doc.text('Conclusiones', 10, 20);
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(12);
    doc.text('En base a los resultados obtenidos, se recomienda continuar con el monitoreo de la calidad del aire.', 10, 30, { maxWidth: 190 });
    doc.text('Para reducir la exposición a partículas nocivas, es importante seguir las recomendaciones establecidas en la normativa chilena.', 10, 40, { maxWidth: 190 });

    // Información de contacto
    doc.text('Contacto:', 10, 70);
    doc.text('INNTECH', 10, 80);
    doc.text('Teléfono: +56 9 1234 5678', 10, 90);
    doc.text('Email: contacto@inntech.cl', 10, 100);

    // Agregar encabezado y pie de página
    addHeaderAndFooter(doc);
};
