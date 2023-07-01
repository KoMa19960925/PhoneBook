const express = require('express');
const cors = require('cors');
const connectDb = require('./mongodb/connect');
require('dotenv').config();

const appPhoneRouter = require('./routes/addPhone.route');
const updatePhoneRouter = require('./routes/updatePhone.route');
const deletePhoneRouter = require('./routes/deletePhone.route');
const viewPhoneRouter = require('./routes/viewPhone.route');

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 8080;

connectDb(process.env.MONGODB_URL);

  
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
});

app.use('/new-phone', appPhoneRouter);
app.use('/update-phone', updatePhoneRouter);
app.use('/delete-phone', deletePhoneRouter);
app.use('/view-phone', viewPhoneRouter);