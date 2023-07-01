const { default: mongoose } = require('mongoose');
const mongodb = require('mongoose');

const connectDb = (url) => {
    mongoose.set('strictQuery',true);

    mongoose.connect(url)
    .catch()
    .then(() => console.log("mongoDB connected"))
    .catch((error) => console.log(error));
}

module.exports = connectDb;

//use name:komathy - e1t4XrRb7BqHXPxB
