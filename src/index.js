let express = require('express');
let envCfg = require('dotenv').config();
let app = express();

const PORT = process.env.XPORT || 3000;

app.listen(PORT, () => {
    console.info(`Server is running at ${PORT}`);
})
