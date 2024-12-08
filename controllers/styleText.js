const { cekKey, limitAdd, isLimit } = require('../database/db');
const { styletext } = require("../lib/api");

async function styleTextr(req, res) {
    const apikey = req.query.apikey;
    const texto = req.query.texto;
     if (texto === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `insira o parâmetro texto & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${apikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou volte amanhã ou compre o premium...'});
styletext(texto).then(result => {
        limitAdd(apikey);
        res.status(200).send({status: 200, resultado: result});
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            mensagem: 'Erro no Servidor Interno'
        })
    });
}

module.exports = { styleTextr };