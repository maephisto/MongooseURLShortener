/**
 * Created by mariusmischie on 6/24/14.
 */

var mockgoose = require('mockgoose');
var mongoose = require('mongoose');
mockgoose(mongoose);
mongoose.createConnection('mongodb://localhost:3001/Whatever');

var Shortener = require('../index').MongooseURLShortener;

var urlShortener = new Shortener(mongoose, {
    schema: {
        userId: String
    }
});

var promise = urlShortener.shorten(
    'http://ad.zanox.com/ppc/?26987918C95821855&ULP=[[/catalog/productdetail.jsp?id=5326408120010&parentid=MENS-TRAINERS-EU&LGWCODE=5326408120010;47903;2883&source=TPn',
    {userId: 'google'}
);

promise.then(function(url){
    console.log('short link', url.hash);
}).fail(function(err){
    console.error('Error creating short url', err);
});