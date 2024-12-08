const { cekKey, limitAdd, isLimit } = require('../database/db');
const { create } = require('../lib/attp.js');
const { towebp, tomp3, sticker, sticker2, togif } = require('./convert');
const fs = require('fs');

async function attpr(req, res) {
const texto = req.query.nome;
const apikey = req.query.apikey;
req.setTimeout(1000*3600)
if (texto === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `insira o parâmetro nome & apikey`
    });
     const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${apikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou volte amanhã ou compre o premium...'});
    limitAdd(apikey);
   imgr = await create(texto)
   ran = '../tmp/attp.gif'
   rano = '../tmp/attp.gif'
   fs.writeFileSync(ran, imgr)
   figuresultado = await fs.readFileSync(ran)
  await fs.writeFileSync('../tmp/attp.webp', figuresultado)
  await res.sendFile('../tmp/attp.webp')
   }

module.exports = { attpr };