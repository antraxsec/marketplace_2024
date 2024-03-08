"use client"
import React, { useEffect } from 'react';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.esm.js';



const HomePage = () => {
    useEffect(() => {
        Fancybox.bind('#gallery-wrap-a [data-fancybox]', {
            wheel: 'slide',
        });

        Fancybox.bind('#gallery-wrap-b [data-fancybox]', {
            wheel: 'close',
        });
    }, []);

    return (
        <div>
            <div id="gallery-wrap-a">
                <h1>Gallery #1</h1>
                <p>
                    <a data-fancybox="gallery" data-src="https://lipsum.app/id/1/1024x768">
                        <img src="https://lipsum.app/id/1/200x150" />
                    </a>
                    <a data-fancybox="gallery" data-src="https://lipsum.app/id/2/1024x768">
                        <img src="https://lipsum.app/id/2/200x150" />
                    </a>
                    <a data-fancybox="gallery" data-src="https://lipsum.app/id/3/1024x768">
                        <img src="https://lipsum.app/id/3/200x150" />
                    </a>
                </p>
            </div>
            <div id="gallery-wrap-b">
                <h1>Gallery #2</h1>
                <p>
                    <a data-fancybox="gallery" data-src="https://lipsum.app/id/4/1024x768">
                        <img src="https://lipsum.app/id/4/200x150" />
                    </a>
                    <a data-fancybox="gallery" data-src="https://lipsum.app/id/5/1024x768">
                        <img src="https://lipsum.app/id/5/200x150" />
                    </a>
                    <a data-fancybox="gallery" data-src="https://lipsum.app/id/67/1024x768">
                        <img src="https://lipsum.app/id/6/200x150" />
                    </a>
                </p>
            </div>
        </div>
    );
};

export default HomePage;