const {
  ytDonlodMp3,
  ytDonlodMp4,
  ytPlayMp3,
  ytPlayMp4,
  ytSearch
} = require("../lib/youtube");
const { cekKey, limitAdd, isLimit } = require('../database/db');

async function youtubePlay(req, res) {
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
    ytPlayMp3(query).then(result => {
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

async function youtubePlaymp4(req, res) {
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
    ytPlayMp4(query).then(result => {
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

async function youtubeMp3(req, res) {
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
    ytDonlodMp3(url).then(result => {
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

async function youtubeMp4(req, res) {
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
    ytDonlodMp4(url).then(result => {
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

async function ytPesquisa(req, res) {
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
    ytSearch(query).then(result => {
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

module.exports = { youtubePlay, youtubePlaymp4, youtubeMp3, youtubeMp4, ytPesquisa };