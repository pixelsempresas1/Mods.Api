const cheerio = require("cheerio");
const axios = require("axios");


const anime = async (query) => {
	return new Promise((resolve, reject) => {
		axios.get(`https://www.anime-planet.com/anime/all?name=${query}`)
			.then((data) => {
				const $ = cheerio.load(data.data)
				const resultadoado = [];
				const judul = [];
				const link = [];
				const thumb = [];
				$('#siteContainer > ul.cardDeck.cardGrid > li > a > h3').each(function(a, b) {
					deta = $(b).text();
					judul.push(deta)
				})
				$('#siteContainer > ul.cardDeck.cardGrid > li > a').each(function(a, b) {
					link.push('https://www.anime-planet.com' + $(b).attr('href'))
				})
				$('#siteContainer > ul.cardDeck.cardGrid > li > a > div.crop > img').each(function(a, b) {
					thumb.push('https://www.anime-planet.com' + $(b).attr('src'))
				})
				for (let i = 0; i < judul.length; i++) {
					resultadoado.push({
						titulo: judul[i],
						capa: thumb[i],
						link: link[i]
					})
				}
				resolve(resultadoado)
			})
			.catch(reject)
	})
}
const manga = async (query) => {
	return new Promise((resolve, reject) => {
		axios.get(`https://www.anime-planet.com/manga/all?name=${query}`)
			.then((data) => {
				const $ = cheerio.load(data.data)
				const resultado = [];
				const judul = [];
				const link = [];
				const thumb = [];
				$('#siteContainer > ul.cardDeck.cardGrid > li > a > h3').each(function(a, b) {
					deta = $(b).text();
					judul.push(deta)
				})
				$('#siteContainer > ul.cardDeck.cardGrid > li > a').each(function(a, b) {
					link.push('https://www.anime-planet.com' + $(b).attr('href'))
				})
				$('#siteContainer > ul.cardDeck.cardGrid > li > a > div.crop > img').each(function(a, b) {
					thumb.push('https://www.anime-planet.com' + $(b).attr('src'))
				})
				for (let i = 0; i < judul.length; i++) {
					resultado.push({
						titulo: judul[i],
						capa: thumb[i],
						link: link[i]
					})
				}
				resolve(resultado)
			})
			.catch(reject)
	})
}

module.exports.anime = anime
module.exports.manga = manga