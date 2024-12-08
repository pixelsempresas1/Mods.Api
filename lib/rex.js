const cheerio = require("cheerio");
const axios = require("axios");
const qs = require("qs")

const rexdl = async (query) => {
	return new Promise((resolve) => {
		axios.get('https://rexdl.com/?s=' + query)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const judul = [];
				const jenis = [];
				const date = [];
				const desc = [];
				const link = [];
				const thumb = [];
				const result = [];
				$('div > div.post-content').each(function(a, b) {
					judul.push($(b).find('h2.post-title > a').attr('title'))
					jenis.push($(b).find('p.post-category').text())
					date.push($(b).find('p.post-date').text())
					desc.push($(b).find('div.entry.excerpt').text())
					link.push($(b).find('h2.post-title > a').attr('href'))
				})
				$('div > div.post-thumbnail > a > img').each(function(a, b) {
					thumb.push($(b).attr('data-src'))
				})
				for (let i = 0; i < judul.length; i++) {
					result.push({
						criador: '@Paulo',
						título: judul[i],
						categoria: jenis[i],
						data_upload: date[i],
						descrição: desc[i],
						capa: thumb[i],
						link: link[i]
					})
				}
				resolve(result)
			})
	})
}
const rexdldown = async (link) => {
	return new Promise((resolve) => {
		axios.get(link)
			.then(({
				data
			}) => {
				const $ = cheerio.load(data)
				const link = [];
				const url = [];
				const link_name = [];
				const judul = $('#page > div > div > div > section > div:nth-child(2) > article > div > h1.post-title').text();
				const plink = $('#page > div > div > div > section > div:nth-child(2) > center:nth-child(3) > h2 > span > a').attr('href')
				axios.get(plink)
					.then(({
						data
					}) => {
						const $$ = cheerio.load(data)
						$$('#dlbox > ul.dl > a > li > span').each(function(a, b) {
							deta = $$(b).text();
							link_name.push(deta)
						})
						$$('#dlbox > ul.dl > a').each(function(a, b) {
							url.push($$(b).attr('href'))
						})
						for (let i = 0; i < link_name.length; i++) {
							link.push({
								nome_link: link_name[i],
								url: url[i]
							})
						}
						resolve({
							criador: '@Paulo',
							título: judul,
							data_upload: $$('#dlbox > ul.dl-list > li.dl-update > span:nth-child(2)').text(),
							versão: $$('#dlbox > ul.dl-list > li.dl-version > span:nth-child(2)').text(),
							tamanho: $$('#dlbox > ul.dl-list > li.dl-size > span:nth-child(2)').text(),
							download: link
						})
					})
			})
	})
}
      
  module.exports.rexdldown = rexdldown
  module.exports.rexdl = rexdl