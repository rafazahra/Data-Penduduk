const express = require('express');
const mysql = require('mysql');
const hbs = require('hbs');
const bodyParser = require('body-parser')

const app = express ();
const port = 5000;

//setting engine view bhs
app.set('view engine', 'hbs');

//setting parser data dari mysql ke appjs
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const koneksi = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'DB_PENDUDUK'
}); 

koneksi.connect((err) => {
    if(err) throw err;
    console.log('Koneksi Database Berhasil Disambung');
});

app.get('/', (req, res) => {
    koneksi.query('SELECT * FROM data_penduduk', (err, hasil) => {
        if(err) throw err;
        res.render('home.hbs', {
            judulHalaman: 'Data Penduduk',
            data: hasil
        });
    });
});

app.post('/tambahdata', (req, res) => {
    var nama = req.body.inputnama;
    var alamat = req.body.inputalamat;
    var ttl = req.body.inputttl;
    var golongandarah = req.body.inputgolongandarah;
    var telepon = req.body.inputtelepon;
    koneksi.query('INSERT INTO data_penduduk(NAMA, ALAMAT, TTL, GOLONGAN_DARAH, TELEPON) VALUES(?, ?, ?, ?, ?)',
    [ nama, alamat, ttl, golongandarah, telepon ],
    (err, hasil) => {
        if(err) throw err;
        res.redirect('/');
    }
    )
});

app.get('/hapus-NAMA/:NIK', (req, res) => {
    var NIK = req.params.NIK;
    koneksi.query('DELETE FROM data_penduduk WHERE NIK=?', 
        [NIK], (err, hasil) => {
            if(err) throw err;
            res.redirect('/');
        }
    )
});

app.listen(port, () => {
    console.log(`App berjalan pada port ${port}`);
});