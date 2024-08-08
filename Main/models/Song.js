const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
    Songname: String,
    Film: String,
    Music_director: String,
    singer: String,
    Actor: String,
    Actress: String
});
//name rollno wad cc dsbda values and : number/integer

module.exports = mongoose.model('Song', songSchema); // Model name should be consistent with the collection name
