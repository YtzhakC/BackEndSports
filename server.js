const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3000;

// Reemplaza esta clave por la tuya real de Gemini o la API que estés usando
const GEMINI_API_KEY = 'AIzaSyD3vxPUThZOi20m8i2UdjzW8hdGGg9iSG0';

app.use(cors());
app.use(express.json());

app.post('/ask', async (req, res) => {
    const { message } = req.body;

    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + GEMINI_API_KEY, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: message }],
                    role: 'user'
                }]
            })
        });

        const data = await response.json();

        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'Hubo un problema al obtener respuesta';

        res.json({ reply });
    } catch (error) {
        console.error('Error al contactar al asistente:', error);
        res.status(500).json({ reply: 'Hubo un problema al contactar al asistente.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
