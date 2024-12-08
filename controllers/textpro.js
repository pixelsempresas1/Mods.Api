const { cekKey, limitAdd, isLimit } = require('../database/db');
const { zrapi } = require("zrapi");

async function natural_leaves(req, res) {
    const query = req.query.texto;
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
    zrapi 
  .textpro("https://textpro.me/natural-leaves-text-effect-931.html", [
    query,
  ])
  .then((data) => {
    res.json({
      status: true,
      código: 200,
      criador: `${creator}`,
      resultado: data
    })
    }).catch(error => {
        console.log(error);
        res.status(500).send({
            status: 500,
            mensagem: 'Erro no Servidor Interno'
        })
    });
}

module.exports = { 
natural_leaves
 };