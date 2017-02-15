///
/// Root level application.  This is where error handling and service setup can live.
///

import express from 'express';
//import apiDiagnostics from './api-diagnostics';
import apiService from './api-service';

const PORT = 4111;
const app = express();

// attach sub-modules
//app.use(apiDiagnostics);
app.use(apiService);

// start listening
app.listen(PORT, () => console.log(`Service started on port ${PORT}`));