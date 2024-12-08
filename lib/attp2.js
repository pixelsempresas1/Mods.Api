const wordwrap = require('word-wrapper')
const text2png = require('text2png')
const GIFEncoder = require('gifencoder')
const canvas = require('canvas')

exports.create = async (text) => {

	// Cria uma animação em GIF
	const attp = new GIFEncoder(512, 512)
	attp.start()
	attp.setRepeat(1)
	attp.setDelay(60)
	attp.setQuality(1000)
	attp.setTransparent()

	// Cria uma imagem no canvas
	const canvaImage = canvas.createCanvas(512, 512);
	const ctx = canvaImage.getContext('2d')

	// Cores, se quiser adicionar mais use nomes em ingles
	const namecolor = [
		'red',
		'cyan',
		'magenta',
		'yellow',
		'white',
		'blue'
	]

	// Gera varias imagens diferentes de cores diferentes e as transforma em GIF
	for (let color of namecolor) {
		let anitxt = await text2png(wordwrap(text, {
			width: 50
		}), {
			font: '49px sans-serif',
			color: 'white',
			strokeWidth: 2,
			strokeColor: color,
			textAlign: 'center',
			lineSpacing: 10,
			padding: 20,
			backgroundColor: 'transparent',
			output: 'dataURL'
		})
		const avatar = await canvas.loadImage(anitxt)
		ctx.drawImage(avatar, 0, 0, canvaImage.width, canvaImage.height)
		attp.addFrame(ctx)
	}

	// Finaliza e retorna o GIF encodado para o envio
	attp.finish()
	return attp.out.getData()
}