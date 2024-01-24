"use client"
import React from 'react';
import styles from '../MultiLaptops3D.module.css'
// import LottieAnimation from './LottieAnimation';
// import url from '../Animation.json'
const MultiLaptops3D = () => {
    return (
        <div className=''>
            {/* <LottieAnimation path={url} /> */}
            <div className={styles.contenedor}>
                <span className={styles.multi}>Multi</span>
                <span className={styles.laptops}>laptops</span>
            </div>
        </div>
    );
};

export default MultiLaptops3D;
