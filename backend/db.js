const mongoose = require('mongoose');
const mongoURL = "mongodb+srv://ratnawatmanish031:FwIb9oMrafOkPUVv@cluster0.5mnak88.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const connectToDatabase = () => {
    mongoose.connect(mongoURL).then(() => console.log("Connected")).catch(err => console.error('Connection error:', err));
}
module.exports = connectToDatabase;