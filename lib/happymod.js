const cheerio = require("cheerio");
const axios = require("axios");

function happymod(nome) {
  return new Promise((resolve, reject) => {
  axios.get(`https://www.happymod.com/search.html?q=${nome}`).then(async tod => {
  const $ = cheerio.load(tod.data)
  boxs_postagens = []
   $("div.pdt-app-box").each(function(c, d) {
        nome = $(d).find("a").text().trim();
        icon = $(d).find("img.lazy").attr('data-original');
        link = $(d).find("a").attr('href');
        link2 = `https://www.happymod.com${link}`
        const Data = {
          criador: "Paulo",
          icon: icon,
          nome: nome,
          link: link2
        }
        boxs_postagens.push(Data)
   })
   resolve(boxs_postagens);
  }).catch(reject)
  });
  }

module.exports.happymod = happymod