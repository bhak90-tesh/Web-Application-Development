const express = require('express');
const router = express.Router();  
const Song = require('./models/Song');

// Route to insert 5 song documents

router.post('/insertSongs', async (req, res) => {
    const songs = [
        { Songname: 'Song1', Film: 'Film1', Music_director: 'MD1', singer: 'Singer1', Actor:'Hello1', Actress:'hey1'},
        { Songname: 'Song2', Film: 'Film2', Music_director: 'MD2', singer: 'Singer2', Actor:'Hello2', Actress:'hey2'},
        { Songname: 'Song3', Film: 'Film3', Music_director: 'MD1', singer: 'Singer3', Actor:'Hello3', Actress:'hey3'},
        { Songname: 'Song4', Film: 'Film4', Music_director: 'MD3', singer: 'Singer1', Actor:'Hello4', Actress:'hey4'},
        { Songname: 'Song5', Film: 'Film5', Music_director: 'MD2', singer: 'Singer4', Actor:'Hello5', Actress:'hey5'}
    ];
   
    try {
        const insertedSongs = await Song.insertMany(songs);
        console.log("Inserted songs:", insertedSongs);
        res.send(`Inserted ${insertedSongs.length} songs successfully`); //
    } catch (err) {    
        console.error('Error inserting songs:', err);
        res.status(500).send('Error inserting songs');
    }
});

//total count of songs (d)
router.get('/totalSongs', async (req, res) => {
    try {
        const count = await Song.countDocuments();
        res.send(`Total songs: ${count}`);
    } catch (err) {
        console.error('Error fetching total songs:', err);
        res.status(500).send('Error fetching total songs');
    }
});

// Route to list all documents
router.get('/listSongs', async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (err) {
        console.error('Error listing songs:', err);
        res.status(500).send('Error listing songs');
    }
});

// Route to list specified Music Director songs (e)

router.get('/directorSongs/:musicDirector', async (req, res) => {
    const musicDirector = req.params.musicDirector;
    try {
        const songs = await Song.find({ Music_director: musicDirector });
        res.json(songs);
    } catch (err) {
        console.error('Error listing director songs:', err);
        res.status(500).send('Error listing director songs');
    }
});

// Route to list specified Music Director songs sung by specified Singer (f)

router.get('/directorSongs/:musicDirector/:singer', async (req, res) => {
    const musicDirector = req.params.musicDirector;
    const singer = req.params.singer;
    try {
        const songs = await Song.find({ Music_director: musicDirector, singer: singer });
        res.json(songs);
    } catch (err) {
        console.error('Error listing director songs by singer:', err);
        res.status(500).send('Error listing director songs by singer');
    }
});

// Route to delete the song which you don’t like(g)

router.delete('/deleteSong/:songId', async (req, res) => {
    const songId = req.params.songId;
    try {
        const deletedSong = await Song.findByIdAndDelete(songId);
        if (!deletedSong) {
            return res.status(404).send('Song not found');
        }
        res.send('Song deleted successfully');
    } catch (err) {
        console.error('Error deleting song:', err);
        res.status(500).send('Error deleting song');
    }
});

// Route to add a new song which is your favorite(h)

router.post('/addFavouriteSong', async (req, res) => {
    const { Songname, Film, Music_director, singer, Actor, Actress } = req.body;
    try {
        const newSong = new Song({ Songname, Film, Music_director, singer, Actor, Actress });
        await newSong.save();
        res.send('Favorite song added successfully');
    } catch (err) {
        console.error('Error adding favorite song:', err);
        res.status(500).send('Error adding favorite song');
    }
});

// Route to list songs sung by specified Singer from specified films (i)

router.get('/singerSongs/:singer/:films', async (req, res) => {
    const singer = req.params.singer;
    const films = req.params.films.split(',');
    try {
        const songs = await Song.find({ singer: singer, Film: { $in: films } });
        res.json(songs);
    } catch (err) {
        console.error('Error listing singer songs from films:', err);
        res.status(500).send('Error listing singer songs from films');
    }
});

// Route to update the document by adding Actor and Actress name (j)

router.put('/updateSong/:songId', async (req, res) => {
    const songId = req.params.songId;
    const { Actor, Actress } = req.body;
    try {
        const updatedSong = await Song.findByIdAndUpdate(songId, { Actor, Actress }, { new: true });
        if (!updatedSong) {
            return res.status(404).send('Song not found');
        }
        res.send('Song updated successfully');
    } catch (err) {
        console.error('Error updating song:', err);
        res.status(500).send('Error updating song');
    }
});

// Route to display the data in Browser in tabular format (k)
// Route to display the data in Browser in tabular format

router.get('/songsTable', async (req, res) => {
    try {
        const songs = await Song.find();
        res.send(`
            <style>
                table {
                    border-collapse: collapse;
                    width: 100%;
                }
                th, td {
                    border: 1px solid black;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
            <table>
                <tr>
                    <th>Song Name</th>
                    <th>Film</th>
                    <th>Music Director</th>
                    <th>Singer</th>
                    <th>Actor</th>
                    <th>Actress</th>
                </tr>
                ${songs.map(song => `
                    <tr>
                        <td>${song.Songname}</td>
                        <td>${song.Film}</td>
                        <td>${song.Music_director}</td>
                        <td>${song.singer}</td>
                        <td>${song.Actor}</td>
                        <td>${song.Actress}</td>
                    </tr>
                `).join('')}
            </table>
        `);
    } catch (err) {
        console.error('Error displaying songs in tabular format:', err);
        res.status(500).send('Error displaying songs in tabular format');
    }
});

module.exports = router;


// Define other routes for remaining tasks (p to v)

module.exports = router;
