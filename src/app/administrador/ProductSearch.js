"use client"
// components/ProductSearch.js
import React, { useState } from 'react';
import ProductTable from './ProductTable';
import { useProductos } from '@/context/Context';

const ProductSearch = () => {
    const { productos, isLoaded, productosFiltrados, verPrecio, preciosG } = useProductos()
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(productos);

    const handleSearchChange = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        if (!term) {
            setFilteredProducts(productos);
        } else {
            const filtered = productos.filter((product) =>
                product.referencia_producto.toLowerCase().includes(term.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Buscar producto..."
                className="p-2 border rounded"
            />
            <ProductTable products={filteredProducts} verPrecio={verPrecio} preciosG={preciosG} />
        </div>
    );
};

export default ProductSearch;
