import React, { useState, useEffect } from 'react';

function EmbeddedPage({ authToken }) {
    const [iframeSrc, setIframeSrc] = useState('');

    useEffect(() => {
        const url = new URL('https://citysense.ai/index/realtime-overview/device-list');
        // url.searchParams.append('auth_token', authToken); 
        setIframeSrc(url.href);
    }//, [authToken]
    );

    return (
        <iframe src={iframeSrc} width="50%" height="1000px" />
    );
}

export default EmbeddedPage;