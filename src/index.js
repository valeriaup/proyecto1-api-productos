const express = require('express');

const app = express();

app.use(express.json());

//healthcheck para docker
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', service: 'api-productos' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API en http://localhost:${PORT}`));