import React from 'react'
import styled from 'styled-components'
import { pictureEngine } from '../utils/pictureEngine'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Spin, Button, Alert } from 'antd'
import { fakeApi } from '../utils/fakeAPIcall'
import { toNumber } from 'lodash'

const StyledColourBoardWrapper = styled.div``
const StyledHeaderWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 34px;
	margin: 10px 0;
	font-size: 24px;
`
const StyledBodyWrapper = styled.div`
	padding: 10px;
`
const StyledCanvasWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: 128px;
	margin: 0 0 20px 0;
`
const StyledButtonGroupWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 34px;
`
const StyledButton = styled(Button)`
	margin: 0 15px;
`

const StyledSpin = styled(Spin)`
	position: absolute;
`
const StyledAlert = styled(Alert)`
	position: fixed;
	bottom: 25px;
	left: 40%;
`

const StyledCanvas = styled.canvas<{ isLoading: boolean; canvasWidth: number }>`
	width: ${(props) => `${props.canvasWidth}px`};
	height: ${(props) => `${props.canvasWidth / 2}px`};
	opacity: ${(props) => (props.isLoading ? 0.2 : 1)};
`

interface IState {
	isLoading: boolean
	canvasWidth: number
	ctx: CanvasRenderingContext2D | null
	isError: boolean
	showToast: boolean
}

class ColourBoard extends React.Component<RouteComponentProps, IState> {
	canvas: React.RefObject<HTMLCanvasElement>
	constructor(props: RouteComponentProps) {
		super(props)
		this.state = {
			isLoading: false,
			canvasWidth: 512,
			ctx: null,
			isError: false,
			showToast: false,
		}
		this.canvas = React.createRef()
	}

	componentDidMount() {
		const params: any = this.props.match.params
		this.setState({ isLoading: true })
		const canvas = this.canvas.current!
		const ctx = canvas.getContext('2d')!
		pictureEngine(ctx, false, this.state.canvasWidth)
		if (params['size']) {
			this.setState({
				isLoading: false,
				ctx,
				canvasWidth: toNumber(params['size']),
			})
		} else {
			this.setState({ isLoading: false, ctx })
		}
	}

	toastAutoDisappear = () => {
		setTimeout(() => {
			this.setState({ showToast: false })
		}, 3000)
	}

	onButtonClick = async (
		isApiCall: boolean,
		shuffle: boolean,
		isError?: boolean
	) => {
		try {
			this.setState({ isLoading: true })
			isApiCall
				? await fakeApi(
						this.state.ctx!,
						shuffle,
						isError!,
						this.state.canvasWidth
				  )
				: pictureEngine(this.state.ctx!, shuffle, this.state.canvasWidth)
		} catch (error) {
			console.error(error)
			this.setState({ isError: true })
		} finally {
			this.setState({ isLoading: false, showToast: true })
			this.toastAutoDisappear()
		}
	}

	render() {
		return (
			<StyledColourBoardWrapper>
				<StyledHeaderWrapper>
					Try to Generate one Image by clicking a button below
				</StyledHeaderWrapper>
				<StyledBodyWrapper>
					<StyledCanvasWrapper>
						{this.state.isLoading && (
							<StyledSpin tip={'Loading'} size={'large'} />
						)}
						<StyledCanvas
							ref={this.canvas}
							isLoading={this.state.isLoading}
							canvasWidth={this.state.canvasWidth}
						/>
					</StyledCanvasWrapper>
					<StyledButtonGroupWrapper>
						<StyledButton onClick={() => this.onButtonClick(false, false)}>
							Reset Image
						</StyledButton>
						<StyledButton onClick={() => this.onButtonClick(false, true)}>
							Generate Image Without an ApiCall
						</StyledButton>
						<StyledButton
							type={'primary'}
							onClick={() => this.onButtonClick(true, true, false)}
						>
							Successfully Generate Image
						</StyledButton>
						<StyledButton
							type={'primary'}
							danger
							onClick={() => this.onButtonClick(true, true, true)}
						>
							Unsuccessfully Generate Image
						</StyledButton>
					</StyledButtonGroupWrapper>
					{this.state.showToast &&
						(this.state.isError ? (
							<StyledAlert
								message="Error: Api call failed"
								type="error"
								closable
								afterClose={() => {
									this.setState({ isError: false, showToast: false })
								}}
							/>
						) : (
							<StyledAlert
								message="Successfully Generated Image"
								type="success"
								closable
								afterClose={() => {
									this.setState({ isError: false, showToast: false })
								}}
							/>
						))}
				</StyledBodyWrapper>
			</StyledColourBoardWrapper>
		)
	}
}

export default withRouter(ColourBoard)
