const cheerio = require("cheerio");
const axios = require("axios");

function hentaigif(nome) {
return new Promise((resolve, reject) => {
  axios.get(`https://thehentaigif.com/?s=${nome}&s_type=all`).then( tod => {
  const $ = cheerio.load(tod.data)  
  var postagem = [];
$("div.image-wrapper").each((_, say) => {
    var titulo = $(say).find("div.image-post-title.card-title.title-overlay").text().trim();
    var img = $(say).find("img").attr('src');
    var gif = $(say).find("img").attr('data-src');    
    var resultado = {
      titulo: titulo,
      img: img,
      gif: gif
    }
    postagem.push(resultado)
  })
  resolve(postagem)
  }).catch(reject)
  });
}

module.exports.hentaigif = hentaigif