const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
const URI = "mongodb+srv://alemando:WJ94TvthTuJUwF3U@seguros-llnl8.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(db => console.log("DB is connected"))
        .catch(err => console.error(err));

module.exports = mongoose;
