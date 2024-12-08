const { cekKey, limitAdd, isLimit } = require('../database/db');
const { gpwhatsapp } = require("../lib/api");

async function gpwhatsappr(req, res) {
    const apikey = req.query.apikey;
    if (apikey === undefined) return res.status(404).send({
        status: 404,
        message: `insira o parâmetro apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${apikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou volte amanhã ou compre o premium...'});
    gpwhatsapp().then(result => {
        limitAdd(apikey);
    const gpr = result[Math.floor(Math.random() * result.length)]
        res.status(200).send({status: 200, resultado: gpr});
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            mensagem: 'Erro no Servidor Interno'
        })
    });
}

module.exports = { gpwhatsappr };