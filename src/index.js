const express = require('express');

const app = express();

app.use(express.json());

//datos en memoria
let productos = [
    { id: 1, nombre: 'Teclado mecánico', precio: 180000, stock: 12 },
    { id: 2, nombre: 'Mouse inalámbrico', precio: 75000, stock: 30 },
    { id: 3, nombre: 'Monitor 24 pulgadas', precio: 620000, stock: 8 }
];

let siguienteId = 4;

//healthcheck para docker
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'api-productos' });
});

//Listar productos
app.get('/api/productos', (req, res) => {
    res.json(productos);
});

//Obtener un producto
app.get('/api/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === Number(req.params.id));

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));