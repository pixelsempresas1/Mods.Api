const mediafire = require("../lib/mediafire");
const { cekKey, limitAdd, isLimit } = require('../database/db');

async function mDo(req, res) {
    const apikey = req.query.apikey;
    const link = req.query.link;
    if(apikey === undefined) return res.status(404).send({
        status: 404,
        message: `insira os parâmetros link & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${apikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou volte amanhã ou compre o premium...'});
    mediafire(link).then(data => {
        limitAdd(apikey);
        res.status(200).send({status: 200, resultado: data});
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Erro no Servidor Interno'
        })
    });
}

module.exports = { mDo }