const { cekKey, limitAdd, isLimit } = require('../database/db');
const fetch = require('node-fetch');

async function simih(req, res) {
    const apikey = req.query.apikey;
    const msg = req.query.msg;
   if (apikey === undefined || msg === undefined) return res.status(404).send({
        status: 404,
        message: `insira o parâmetro msg & apikey`
    });
    const check = await cekKey(apikey);
    if (!check) return res.status(403).send({
        status: 403,
        message: `apikey ${apikey} não encontrada, por favor registre-se primeiro!`
    });
     let limit = await isLimit(apikey);
    if (limit) return res.status(403).send({status: 403, message: 'seu limit acabou volte amanhã ou compre o premium...'});
    fetch(encodeURI(`https://api.simsimi.net/v2/?text=${msg}&lc=pt`))
        .then(response => response.json())
        .then(data => {
    res.json({
    resultado: {
    criador: `Paulo`,
    mensagem: `${msg}`,
    resposta: `${data.success}`
    },
    });
    limitAdd(apikey);
});
}

module.exports = { simih };