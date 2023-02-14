// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
//Si queremos los id´s de mongo, no hace falta poner el id
var tiendaSchema = new Schema({
    nombre_tienda:{type:String,required:true},
    ciudad:{type:String,required:true},
    posts: [{
        type: Schema.ObjectId,
        ref: 'Post',
        default: null
        }]
})