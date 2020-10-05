const express = require('express');

const bodyParser = require('body-parser');
const cors = require('cors');
const { ObjectID } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
const password = "hasib110";
require('dotenv').config()

console.log()
const port = 5000;

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://hasib:hasib110@cluster0.lcyjp.mongodb.net/mydata?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const bookings = client.db("hasib").collection("data");

    app.post('/addevent', (req, res) => {
        const newbooking = req.body;
        bookings.insertOne(newbooking)
        console.log(newbooking)
            .then(result => {
                res.send(result.insertedCount > 0);
            })
    });
    app.post('/event', (req, res) => {
            const event = req.body;
            console.log(event);
            bookings.insertMany(event)
                .then(result => {
                    console.log(result.insertedCount);
                    res.send(result.insertedCount);
                })
        })
        //////////////data read from server////////////
    app.get('/event/', (req, res) => {
        bookings.find({ email: req.query.email })
            .toArray((err, documents) => {
                res.send(documents);
            })
    })
    app.get('/admin/', (req, res) => {
            bookings.find({})
                .toArray((err, documents) => {
                    res.send(documents);
                })
        })
        ///////////Delete Opatation////////////
    app.delete('/delete/:id', (req, res) => {
        bookings.deleteOne({ _id: ObjectId(req.params.id) })
            .then((result) => {
                res.send(result.deletedCount > 0);
            })
    })
    app.get('/', (req, res) => {
        res.send("hello i am in work")
    });
});




app.listen(process.env.PORT || port);