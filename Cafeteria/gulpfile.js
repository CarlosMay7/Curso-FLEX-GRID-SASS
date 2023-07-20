const { src, dest, watch, series, parallel } = require("gulp");
//CSSS y SASS
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");

//Imagenes
// const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

function css(){

    return src("src/scss/app.scss") //De donde toma el archivo a compilar
        .pipe(sass({outputStyle: "compressed"})) //Compila, como argumentos puede recibir un objeto con valores como el tipo de output
        .pipe(postcss([autoprefixer()]))
        .pipe( dest("build/css")); //Donde lo guarda
}

function imagenes(){
    return src("src/img/**/*") //De donde toma el archivo a compilar
        // .pipe(imagemin({optimizationLevel: 3}))
        .pipe( dest("build/img")); //Donde lo guarda
}

function versionWebp(){
    const opciones = {
        quality: 50
    }
    return src("src/img/**/*.{png,jpg}")
        .pipe(webp(opciones))
        .pipe(dest("build/img"));
}

function versionAvif(){
    const opciones = {
        quality: 50
    }
    return src("src/img/**/*.{png,jpg}")
        .pipe(avif(opciones))
        .pipe(dest("build/img"));}

function dev(){
    watch("src/scss/**/*.scss", css); //Archivo al que va a estar atento y la funcion que ejecuta cuando cambie
    //El ** es para decir cualquier nombre y *.scss es que termine con .scss
    watch("src/img/**/*", imagenes);
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = dev;
exports.default = series(imagenes, versionWebp, versionAvif, css, dev);