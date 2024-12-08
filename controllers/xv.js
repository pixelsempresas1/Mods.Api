const { cekKey, limitAdd, isLimit } = require('../database/db');
const request = require('request');

function xvideos(req, res, apikey) {
  var text = req.query.text;
  var option = req.query.option;
  var apikey = req.query.apikey;    
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${apikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou volte amanhã ou compre o premium...'});
    limitAdd(apikey);
  if (!text) return res.send({
    status: false,
    message: 'nome não encontrado'
  });
  if (!option) return res.send({
    status: false,
    message: 'parametro não definido'
  });
  if (option != 'search' && option != 'download') return res.send({
    status: false,
    message: 'opção invalida'
  });
  
  if (option == 'search') {
    const start = (word) => {
      var normalize = word.split(' ').join('+').split('%20').join('');
      var search = normalize.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      var url = `https://www.xvideos.com/?k=${search}`;

      var data = [];
      var xv = [];

      request(url, (err, req, body) => {
        if (err) return console.log(err);

        const regExp = /<\/div><div class=\".+?\"><p class=\".+?\"><a href=\".+?\" .+? <span class=\".+?\"><\/span>/g;

        const datas = body.match(regExp);
        data.push(...datas);

        var regExp2 = /\"\/.+?\"/g;
        var regExp3 = /title=\".+?\">/g;
       // var regExp4 = /\"duration\">.+?/g;
        for (let index of data) {
          var reg = index.match(regExp2);
          var reg2 = index.match(regExp3);
          var reg3 = reg2[0].split('title=').join('').split('>').join('');

          var obj = {
            título: JSON.parse(reg3),
            link: 'https://www.xvideos.com' + JSON.parse(reg[0]),
          };
          xv.push(obj);
        }
        res.send({
          status: true,
          resultado: xv
        });
      });
    };
    start(text);
  } else if (option == 'download') {
    const isUrlX = (url) => {
      var valid = url.startsWith('https://www.xvideos.com/');
      return !valid;
    };
    const start = (url) => {
      if (isUrlX(url)) return res.send({
        status: false,
        invalidUrl: url,
        message: 'somente links do xvideos'
      });
      const data = [];

      request(url, (err, req, body) => {
        if (err) return console.log(err);
        try {
          var regExp = /html5player\.setVideoTitle\(\'.+?\'\)/g;
          var _title = body.match(regExp)[0].split('html5player.setVideoTitle(\'').join('').split('\')').join('');
          var url_video = /html5player\.setVideoUrlHigh\(\'.+?\'\)/g;
          var _url_video_raw = body.match(url_video)[0].split('html5player.setVideoUrlHigh').join('').split('(').join('').split(')').join('').split('\'').join('');
          var duration1 = /class=\"duration\">.+?<\/span>/g;
          var duration = body.match(duration1)[0].split('class=\"duration\">').join('').split('<').join('').split('span>').join('').split('/').join('');
          var MinOurSec = duration.endsWith(' min') ? ' minutes': '' || duration.endsWith(' sec') ? ' seconds': '';
          var _duration = duration.split(' ')[0] + MinOurSec;
          var viewsV = /class=\"mobile-hide\">.+?<\/strong>/g;
          var _views = body.match(viewsV)[0].split('class=\"mobile-hide\">').join('').split('</strong>').join('');
          var _owner = /html5player\.setUploaderName\(\'.+?\'\)/g;
          var _ownerVideo = body.match(_owner)[0].split('html5player.setUploaderName(\'').join('').split('\')').join('');

          var obj = {
            criador: _ownerVideo,
            título: _title,
            link: _url_video_raw,
            duração: _duration,
            visualizações: _views
          };
          data.push(obj);
        } catch (a) {
          return res.send({
            status: false,
            message: 'vídeo não encontrado'
          });
        }
        res.send({
          status: true,
          resultado: data
        });
      });
    };
    start(text);
  }
}

module.exports = { xvideos };