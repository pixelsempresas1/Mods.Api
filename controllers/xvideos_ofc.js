const { cekKey, limitAdd, isLimit } = require('../database/db');
const { xvideoss, xvideosdl } = require("../lib/api");
//const request = require('request');

async function xvideossr(req, res) {
    const query = req.query.nome;
    const apikey = req.query.apikey;
    if (query === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        mensagem: `insira o parâmetro nome & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${apikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou volte amanhã ou compre o premium...'});
var xv = xvideoss(query)
res.json(xv);
limitAdd(apikey);
}

module.exports = { xvideossr };