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

//listar productos
app.get('/api/productos', (req, res) => {
    res.json(productos);
});

//obtener un producto
app.get('/api/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === Number(req.params.id));

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    res.json(producto);
});

//crear producto
app.post('/api/productos', (req, res) => {
    const { nombre, precio, stock } = req.body;

    if (!nombre || precio === undefined) {
        return res.status(400).json({ error: 'Nombre y precio son obligatorios' });
    }

    const nuevo = { id: siguienteId++, nombre, precio, stock: stock || 0 };
    productos.push(nuevo);

    res.status(201).json(nuevo);
});

//actualizar producto
app.put('/api/productos/:id', (req, res) => {
    const producto = productos.find(p => p.id === Number(req.params.id));

    if (!producto) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const { nombre, precio, stock } = req.body;

    if (nombre !== undefined) producto.nombre = nombre;
    if (precio !== undefined) producto.precio = precio;
    if (stock !== undefined) producto.stock = stock;

    res.json(producto);
});

//eliminar producto
app.delete('/api/productos/:id', (req, res) => {
    const indice = productos.findIndex(p => p.id === Number(req.params.id));

    if (indice === -1) {
        return res.status(404).json({ error: 'Producto no encontrado' });
    }

    const eliminado = productos.splice(indice, 1)[0];

    res.json({ mensaje: 'Producto eliminado', producto: eliminado });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));