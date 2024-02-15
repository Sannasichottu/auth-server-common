const mongoose = require('mongoose');

mongoose.set("strictQuery", false);
const connectDatabase = () => {
    // mongoose.connect(process.env.ATLAS_URI, {
    //     useNewUrlParser : true,
       
    // }).then((con) => {
    //     console.log("Database Connect SuccessFully")
    // });

    mongoose.connect(process.env.ATLAS_URI);
}

module.exports = connectDatabase;