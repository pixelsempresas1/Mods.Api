const { cekKey, limitAdd, isLimit } = require('../database/db');
const { xnxxsearch, xnxxdl } = require("../lib/xnxx");

async function xnxxsearchr(req, res) {
    const query = req.query.nome;
    const apikey = req.query.apikey;
    if (query === undefined || apikey === undefined) return res.status(404).send({
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
    xnxxsearch(query).then(result => {
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

async function xnxxdlr(req, res) {
    const link = req.query.link;
    const apikey = req.query.apikey;
    if (link === undefined || apikey === undefined) return res.status(404).send({
        status: 404,
        message: `insira o parâmetro link & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        mensagem: `apikey: ${apikey} não encontrada, por favor registre-se primeiro!`
    });
    let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou volte amanhã ou compre o premium...'});
    xnxxdl(link).then(result => {
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

module.exports = { xnxxsearchr, xnxxdlr };