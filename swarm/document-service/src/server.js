
import express from 'express';
import diagnosticApi from './api-diagnostics';
import documentsApi from './api-documents';

const PORT = 8000;

// create app
const app = express();

// mount sub apps
app.use(diagnosticApi);
app.use(documentsApi);

// listen
app.listen(PORT, () => console.log('service started on port ' + PORT));
