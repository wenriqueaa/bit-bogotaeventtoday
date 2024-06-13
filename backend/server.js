// server.js
const express = require('express');
const connectDB = require('./utils/db');
const eventRoutes = require('./routes/eventRoutes');

const app = express();
connectDB();

app.use(express.json());
app.use('/api', eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


const express = require('express');
const mongoose = require('mongoose');
const axios = require('axios');
const cron = require('node-cron');
const Event = require('./models/Event'); // Esquema del evento

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a MongoDB
mongoose.connect('mongodb://localhost:27017/eventsdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Middleware
app.use(express.json());

// Rutas
app.get('/events', async (req, res) => {
    const events = await Event.find({});
    res.json(events);
});

app.get('/events/:id', async (req, res) => {
    const event = await Event.findById(req.params.id);
    res.json(event);
});

app.get('/events/search', async (req, res) => {
    const query = req.query.query;
    const events = await Event.find({ name: { $regex: query, $options: 'i' } });
    res.json(events);
});

// Función para actualizar eventos
async function updateEvents() {
    try {
        const response = await axios.get('URL_DE_DATOS_PUBLICOS');
        const data = response.data;
        await Event.deleteMany({});
        await Event.insertMany(data);
    } catch (error) {
        console.error("Error actualizando eventos: ", error);
    }
}

// Cron job para actualizar cada 30 minutos
cron.schedule('*/30 * * * *', updateEvents);

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`);
});
