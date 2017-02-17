
import express from 'express';
import diagnosticsApi from './api-diagnostics';
import documentsApi from './api-documents';

const PORT = 8001;

// create app
const app = express();

// attach apis
app.use(diagnosticsApi);
app.use(documentsApi);

// listen
app.listen(PORT, () => console.log('service started on port ' + PORT));