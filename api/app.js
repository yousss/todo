import express from 'express';
import bodyParser from 'body-parser';
import { routes } from './routes';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

routes(app);

app.get('/', (req, res) => res.send({ message: 'Welcome to TODO App' }));

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server ready at port http://localhost:${port}`));
