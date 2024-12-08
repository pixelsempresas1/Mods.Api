const { cekKey, limitAdd, isLimit } = require('../database/db');
const { recognize } = require("../lib/ocr");

async function lerimg(req, res) {
    const apikey = req.query.apikey;
    const img = req.query.img;
    if (apikey === undefined || img === undefined) return res.status(404).send({
        status: 404,
        message: `insira o parâmetro apikey & img`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${apikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou volte amanhã ou compre o premium...'});
    await recognize(img, {lang: 'eng+pt', oem: 1, psm: 3})
    .then(teks => {
        limitAdd(apikey);    
        res.status(200).send({status: 200, resultado: teks.trim()});
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            mensagem: 'Erro no Servidor Interno'
        })
    });
}

module.exports = { lerimg };