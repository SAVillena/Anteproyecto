import React, { useState, useEffect } from 'react';

function EmbeddedPage({ authToken }) {
    const [iframeSrc, setIframeSrc] = useState('');

    useEffect(() => {
        const url = new URL('https://api.citysense.ai/api/userdevice-management/access_link?lick=902c4efea0272c574920168f92428208450788c63a91105f441e4c5918d326e3f9e663e99c15580bb89e4ef92021194e8fa6e5ef6a9c1b071bd84ff7318c59c3e8d7353efca0930a9caa08856a4ee02b119cca171d2b7dfbec63c6ac17d336701adb6e59334a92386588076a5762b725a14a5e3a7fd429e72d769e4c29afe3e1');
        // url.searchParams.append('auth_token', authToken); 
        setIframeSrc(url.href);
    }//, [authToken]
    );

    return (
        <div className='iframe-container'>  
        <iframe src={iframeSrc} width="100%" height="100%" />
        </div>
    );
}

export default EmbeddedPage;