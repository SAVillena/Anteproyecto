import html2canvas from 'html2canvas';

export const generatePDFContent = async (doc, chartData) => {
    const today = new Date();
    const formattedDate = `${today.getDate()}-${today.getMonth() + 1}-${today.getFullYear()}`;
    
    // Portada
    doc.setFontSize(20);
    doc.text('Informe de Calidad del Aire', 105, 20, { align: 'center' });
    doc.setFontSize(14);
    doc.text(`Fecha de realización: ${formattedDate}`, 105, 30, { align: 'center' });
    doc.text('Plataforma: DustSense', 105, 40, { align: 'center' });
    doc.setFontSize(12);
    doc.text('Análisis de partículas PM2.5 y PM10 en el aire', 105, 50, { align: 'center' });
    doc.addPage(); // Nueva página

    // Introducción
    doc.setFontSize(16);
    doc.text('Introducción', 10, 20);
    doc.setFontSize(12);
    doc.text('Este informe presenta un análisis de la concentración de partículas PM2.5 y PM10, obtenidas a través de la plataforma DustSense.', 10, 30, { maxWidth: 190 });
    doc.text('Los datos han sido procesados y se muestran en los gráficos a continuación, junto con las estadísticas de valores mínimos, máximos y promedio.', 10, 40, { maxWidth: 190 });

    // Captura de gráficos
    const chartsContainer = document.getElementById('chartsContainer');
    if (chartsContainer) {
        const canvas = await html2canvas(chartsContainer);
        const imgData = canvas.toDataURL('image/png');
        doc.addPage(); // Nueva página para gráficos
        doc.setFontSize(16);
        doc.text('Análisis Gráfico de Partículas', 10, 20);
        doc.addImage(imgData, 'PNG', 10, 30, 190, 100);
    }

    // Datos de máximos, mínimos y promedios
    const { min_ad_2, max_ad_2, avg_ad_2, min_ad_3, max_ad_3, avg_ad_3 } = chartData;
    doc.addPage();
    doc.text('Estadísticas de PM2.5 y PM10', 10, 20);
    doc.setFontSize(12);
    doc.text(`PM2.5 - Mínimo: ${min_ad_2}, Máximo: ${max_ad_2}, Promedio: ${avg_ad_2}`, 10, 30);
    doc.text(`PM10 - Mínimo: ${min_ad_3}, Máximo: ${max_ad_3}, Promedio: ${avg_ad_3}`, 10, 40);

    // Normativa Chilena
    doc.setFontSize(16);
    doc.text('Normativa Chilena para Material Particulado', 10, 60);
    doc.setFontSize(12);
    doc.text('De acuerdo con la normativa chilena:', 10, 70);
    doc.text('- PM2.5: No debe superar un promedio anual de 20 µg/m³ y un promedio diario de 50 µg/m³.', 10, 80);
    doc.text('- PM10: No debe superar un promedio anual de 50 µg/m³ y un promedio diario de 150 µg/m³.', 10, 90);

    // Conclusiones
    doc.addPage();
    doc.setFontSize(16);
    doc.text('Conclusiones', 10, 20);
    doc.setFontSize(12);
    doc.text('En base a los resultados obtenidos, se recomienda continuar con el monitoreo de la calidad del aire.', 10, 30, { maxWidth: 190 });
    doc.text('Para reducir la exposición a partículas nocivas, es importante seguir las recomendaciones establecidas en la normativa chilena.', 10, 40, { maxWidth: 190 });
};
