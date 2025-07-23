const express = require('express');
const cors = require('cors');
const app = express();
const router = require('./router/router');

app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
