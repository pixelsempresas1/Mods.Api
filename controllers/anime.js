const { cekKey, limitAdd, isLimit } = require('../database/db');
const { anime, manga } = require("../lib/anime");

async function animer(req, res) {
    const nome = req.query.nome;
    const apikey = req.query.apikey;
    if (nome === undefined || apikey === undefined) return res.status(404).send({
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
    anime(nome).then(data => {
        limitAdd(apikey);
        res.status(200).send({status: 200, resultado: data});
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            mensagem: 'Erro no Servidor Interno'
        })
    });
}

async function mangar(req, res) {
    const nome = req.query.nome;
    const apikey = req.query.apikey;
    if (nome === undefined || apikey === undefined) return res.status(404).send({
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
    manga(nome).then(data => {
        limitAdd(apikey);
        res.status(200).send({status: 200, resultado: data});
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            mensagem: 'Erro no Servidor Interno'
        })
    });
}

module.exports = { animer,mangar };