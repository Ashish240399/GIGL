const express = require('express');
const cors = require('cors');
const connection = require('./database/db');
const authRouter = require('./routes/authRoute/authRoute');
const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth",authRouter)



const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});