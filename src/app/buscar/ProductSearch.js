
import { useState } from 'react';
import Link from 'next/link';


const ProductSearch = () => {
    const [searchInput, setSearchInput] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async () => {
        if (!searchInput) {
            setError('Por favor, ingresa un número de serie');
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://multistore-back-antraxsecs-projects.vercel.app/producto/numeroserie?id=${searchInput}`);
            if (!response.ok) {
                throw new Error('Error fetching product');
            }
            const data = await response.json();
            setProducts(data);
        } catch (err) {
            setError('Error al obtener el producto');
        } finally {
            setLoading(false);
        }
    };
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-xl font-bold text-center mb-4">Buscar Producto por Número de Serie</h1>
            <div className="mb-4">
                <input
                    type="text"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ingresa el número de serie"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </div>
            <div className="text-center">
                <button
                    onClick={handleSearch}
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                    Buscar
                </button>
            </div>

            {loading && <p className="text-center mt-2">Buscando...</p>}
            {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            {products.length > 0 && (
                <div className="mt-4">

                    {products.map((product, index) => (
                        <div key={index} className="border border-gray-300 p-4 rounded-lg mb-2">
                            <center>  <h1 className=' font-bold text-gray-600 text-3xl my-2'>SKU {product.producto_n.id_producto}</h1></center>
                            <p><strong>ID del Item:</strong> {product.id_item}</p>
                            <p><strong>Número de Serie:</strong> {product.numero_serie_item}</p>

                            <p>{product.producto_n.referencia_producto || product.producto_n.descripcion_producto}</p>

                        </div>
                    ))}


                </div>
            )}

            <div className="text-center my-5">
                <Link href="/productos"

                    className="text-gray-500"
                >
                    Regresar
                </Link>
            </div>
        </div>
    );
};

export default ProductSearch;
