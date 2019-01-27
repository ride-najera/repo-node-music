'use strict';
$(function(){

var audio=$('audio');

function cargarCanciones(){


$.ajax({
url:'/canciones'	
}).done(function(canciones){
var lista=$('.lista-canciones');

lista.empty();

canciones.forEach(function(cancion){
var nuevo_elemento=$(`<li class="cancion">${cancion.nombre}</li>`);
nuevo_elemento
.on('click',cancion,play)
.appendTo(lista);

});

}).fail(function(){
alert("No se pudo cargar las funciones!");
});


}



function play(evento){
audio[0].pause();
audio.attr('src',`/canciones/${evento.data.nombre}`);
audio[0].play();
}

cargarCanciones();

});