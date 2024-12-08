const cheerio = require("cheerio");
const axios = require("axios");


const WAMods = async (search) => {
  if (!search) return "Cadê o query? bakaa>\/\/<";
  try {
  const res = await axios.request(`https://www.whatsappmods.net/search?q=${search}`, {
    method: "GET",
    headers: {
      "User-Agent": "Mozilla/5.0 (Linux; Android 9; Redmi 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.77 Mobile Safari/537.36"
    }
  });
  let hasil = [];
  const $ = cheerio.load(res.data);
  $('div.gmr-clearfix').each(function(a, b) {
    let apk_name = $(b).find('h2.post-title.entry-title > a').text();
    let apk_url = $(b).find('a').attr('href');
    let apk_image = $(b).find('img.post-thumbnail').attr('src');
    let apk_desc = $(b).find('div.post-item.entry-content').text().split(/[\n]|-|  /g).join("");
    const result = {
      status: res.status,
      criador: "@Paulo",
      apk_nome: apk_name,
      apk_link: apk_url,
      apk_img: apk_image,
      apk_descrição: apk_desc
    };
    hasil.push(result);
  });
  akhir = hasil.filter(v => v.apk_name !== '');
  return akhir;
  } catch (error404) {
    return "=> Error =>" + error404;
  }
}

module.exports.WAMods = WAMods