const { ytPlay, ytMp3, ytMp4 } = require("../lib/youtubev2");
const { cekKey, limitAdd, isLimit } = require('../database/db');

async function youtubePlayv2(req, res) {
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
    ytPlay(query).then(result => {
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

async function youtubeMp3v2(req, res) {
    const url = req.query.link;
    const apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
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
    ytMp3(url).then(result => {
        limitAdd(apikey);
        res.status(200).send({status: 200, resultado: result});
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Erro no Servidor Interno'
        })
    });
}

async function youtubeMp4v2(req, res) {
    const url = req.query.link;
    const apikey = req.query.apikey;
    if (url === undefined || apikey === undefined) return res.status(404).send({
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
    ytMp4(url).then(result => {
        limitAdd(apikey);
        res.status(200).send({
            status: 200, 
            resultado: result
        });
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            message: 'Erro no Servidor Interno'
        })
    });
}


module.exports = { youtubePlayv2, youtubeMp3v2, youtubeMp4v2 };