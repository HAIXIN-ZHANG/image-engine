import { cloneDeep } from 'lodash'

const getColourIndexOption = () => {
	const indexValuePool = []
	let i = 0
	while (i <= 255) {
		if (i % 8 === 0) {
			indexValuePool.push(i)
		}
		i++
	}

	return indexValuePool
}

const generateColourRenderPlan = (shuffle: boolean) => {
	const renderPlan = []
	const redIndexValuePool = getColourIndexOption()
	const greenIndexValuePool = cloneDeep(redIndexValuePool)
	const blueIndexValuePool = cloneDeep(redIndexValuePool)

	for (let redIndex = 0; redIndex < redIndexValuePool.length; redIndex++) {
		for (
			let greenIndex = 0;
			greenIndex < greenIndexValuePool.length;
			greenIndex++
		) {
			for (
				let blueIndex = 0;
				blueIndex < blueIndexValuePool.length;
				blueIndex++
			) {
				renderPlan.push(
					`rgb(${redIndexValuePool[redIndex]},${greenIndexValuePool[greenIndex]},${blueIndexValuePool[blueIndex]})`
				)
			}
		}
	}

	if (shuffle) {
		renderPlan.sort(() => {
			return 0.5 - Math.random()
		})
	}

	return renderPlan
}

const pictureEngine = (
	ctx: CanvasRenderingContext2D,
	shuffle: boolean,
	canvasWidth: number
) => {
	const start = new Date().getTime()
	let end
	const renderPlan = generateColourRenderPlan(shuffle)
	renderPlan.forEach((e, i) => {
		const squareSize = canvasWidth / 256

		const x = (i % 256) * squareSize
		const y = Math.floor(i / 256) * squareSize

		ctx.fillStyle = e
		ctx.fillRect(x, y, squareSize, squareSize)
	})

	end = new Date().getTime()
	console.log('fn finished in', `${end - start}ms`)
}

export { pictureEngine }
