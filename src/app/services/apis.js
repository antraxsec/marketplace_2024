export const fetchProductosApi = async () => {
    const response = await fetch("https://multilaptops.net/api/productosdisp?token=j6UWgtktboQBFD4G");
    const data = await response.json();
    return Object.values(data.datos);
};
