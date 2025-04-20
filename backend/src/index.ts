import express from 'express';
import cors from 'cors';
import lostItemRoutes from './routes/lostItemRoutes';
import foundItemRoutes from './routes/foundItemRoutes';

const app = express();
const PORT = 5050;

app.use(cors());
app.use(express.json());

app.use('/api/lost-items', lostItemRoutes);
app.use('/api/found-items', foundItemRoutes);

app.get('/', (req, res) => res.send('Lost & Found Backend Running'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
