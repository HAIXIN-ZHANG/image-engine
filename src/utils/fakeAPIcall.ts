import { pictureEngine } from './pictureEngine'

export const fakeApi = (
	ctx: CanvasRenderingContext2D,
	shuffle: boolean,
	isError: boolean,
	canvasWidth: number
): Promise<string> => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (!isError) {
				pictureEngine(ctx, shuffle, canvasWidth)
				resolve('200')
			} else {
				reject('Error: Api call failed')
			}
		}, 1000)
	})
}
