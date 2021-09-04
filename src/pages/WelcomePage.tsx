import { Button, Radio } from 'antd'
import styled from 'styled-components'
import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

const StyledHeaderWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	height: 34px;
	margin: 10px 0;
	font-size: 28px;
`
const StyledWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	margin: 20px 0;
`
function WelcomePage(props: RouteComponentProps) {
	const [size, setSize] = React.useState<number>(512)
	const onChange = (e: any) => {
		setSize(e.target.value)
	}

	const openColourBoard = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault()
		e.ctrlKey
			? window.open(`/colour-board/${size}`, '_blank')
			: props.history.push(`/colour-board/${size}`)
	}

	return (
		<div>
			<StyledHeaderWrapper>Welcome my code test</StyledHeaderWrapper>
			<StyledWrapper>
				<h3 style={{ color: 'rgb(0, 0, 0, 0.6)' }}>
					Please select one screen size option
				</h3>
			</StyledWrapper>
			<StyledWrapper>
				<Radio.Group onChange={onChange} value={size}>
					<Radio value={256}>Min size</Radio>
					<Radio value={512}>Mid size</Radio>
					<Radio value={1024}>Large size</Radio>
				</Radio.Group>
			</StyledWrapper>
			<StyledWrapper>
				<Button onClick={openColourBoard}>Conform</Button>
			</StyledWrapper>
		</div>
	)
}

export default withRouter(WelcomePage)
