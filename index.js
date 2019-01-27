'use strict';
const express=require('express');
const app=express();
const path=require('path');
const fs=require('fs');
const mediaserver=require('mediaserver');
const multer=require('multer');



const index=path.join(__dirname,'index.html');
var archivoCanciones=path.join(__dirname,'canciones.json');


var opcionesMulter=multer.diskStorage({
destination:function(req,file,cb){
cb(null,path.join(__dirname,'canciones'));


},
filename:function(req,file,cb){
cb(null,file.originalname);

}

});


var upload=multer({storage:opcionesMulter});





app.use(express.static('public'));
app.use('/jquery',express.static(path.join(__dirname,'node_modules','jquery','dist')));


app.get('/',function(req,res,next){
res.sendFile(index);

});


app.get('/canciones',function(req,res,next){
fs.readFile(archivoCanciones,'utf8',function(err,canciones){
if(err) throw err;

res.json(JSON.parse(canciones));

});


});


app.get('/canciones/:nombre',function(req,res,next){
var cancion=path.join(__dirname,'canciones',req.params.nombre);


console.log("llamada al servicio...Cancion elegida: "+req.params.nombre);
mediaserver.pipe(req,res,cancion);
console.log("fin----------------------->")
});



app.post('/canciones',upload.single('cancion'),function(req,res,next){
var nombre=req.file.originalname;


fs.readFile(archivoCanciones,'utf8',function(err,archivo){

if(err) throw err;

var canciones=JSON.parse(archivo);
canciones.push({nombre:nombre});
fs.writeFile(archivoCanciones,JSON.stringify(canciones),function(err){
if(err) throw err;

res.redirect('/');


});


});

});

app.listen(3000,function(){
console.log(`App correiendo correctamente en el puerto 3000...`);
});