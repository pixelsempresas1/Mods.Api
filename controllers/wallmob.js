const { cekKey, limitAdd, isLimit } = require('../database/db');
const { wallmob } = require("../lib/api");
const { getBuffer , getRandom} = require("../lib/buff");

async function wallmobr(req, res) {
    const apikey = req.query.apikey;
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${apikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou volte amanhã ou compre o premium...'});
    wallmob().then(k => {
    limitAdd(apikey);
        res.status(200).send({status: 200, resultado: k});
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            mensagem: 'Erro no Servidor Interno'
        })
    });
}

module.exports = { wallmobr };