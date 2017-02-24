
import express from 'express';
import appDocuments from './app-documents';

// create app
const app = express();

// attach mounts
app.use(appDocuments);

// start app on 8080
app.listen(5050, () => console.log('listening on 5050'));
