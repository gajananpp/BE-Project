import React from 'react';
import {
	Card,
	CardHeader,
	CardMedia,
	CardActions,
	CardTitle,
	CardText
} from 'material-ui/Card';
import Divider from 'material-ui/Divider';
import Slider from 'material-ui/Slider';
import Toggle from 'material-ui/Toggle';
import RTC from  './RTC.jsx';
import getUnit from '../utils/getUnit.js';
import node2Res from '../../responses/node2Res.js';

class SensorUI extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isToggled: true,
			manualControl: false,
			speed: 1023
		};
		
	}

	handleToggle = (event, isInputChecked) => {
		isInputChecked ? node2Res.motorStatus = 1 : node2Res.motorStatus = 0;
		socket.emit('toggle-motor', node2Res);
		this.setState({
			isToggled: isInputChecked
		});
	};

	toggleManualControl = (event, isInputChecked) => {
		isInputChecked ? node2Res.manualControl = 1 : node2Res.manualControl = 0;
		socket.emit('toggle-manual-control', node2Res);
		this.setState({
			manualControl: isInputChecked
		});
	};

	handleSpeed = (event, newValue) => {
		console.log(newValue);
		node2Res.motorSpeed = newValue;
		socket.emit('update-motor-speed', node2Res);
		this.setState({
			speed: newValue
		});
	};

	componentWillUpdate(nextProps, nextState) {
	}

	render() {
		const colors = ['#1f77b4', '#2ca02c'];
		let lastReading;
		if (this.props.nodeReadings.length !== 0) {
			lastReading = this.props.nodeReadings[this.props.nodeReadings.length - 1];
		}
		return (
			<div>
				{
					this.props.nodeReadings.length === 0 ? null :
						this.props.nodeReadings[0].map((obj, index) => (
						<Card key={index} style={{width: '95%', margin: 'auto', marginTop: 30}}>
							<CardHeader 
								title={`${obj.sensor}`}
								subtitle={`${lastReading[index].value} ${getUnit(lastReading[index].quantity)}`}
								actAsExpander={true}
								showExpandableButton={true}
							/>
							<Divider />
							<CardMedia
								overlay={<CardTitle title={`${obj.quantity.toUpperCase()}: ${lastReading[index].value} ${getUnit(lastReading[index].quantity)}`} />}
								overlayContainerStyle={{pointerEvents: 'none'}}
								expandable={true}
							>
								<RTC reading={lastReading[index]} color={colors[index]} />
							</CardMedia>
							<Divider />
							{ lastReading[index].quantity !== 'force' ?
								(
									<CardActions expandable={true}>
										<CardText>Load: N/A</CardText>
									</CardActions>
								) :
								(
									<CardActions expandable={true}>
										<Slider 
											style={{width: '95%', margin: 'auto', marginBottom: -30}}
											min={0}
											max={1023}
											step={1}
											value={this.state.speed}
											onChange={this.handleSpeed}
										/>
										<Toggle 
											label="Motor On/Off"
											toggled={this.state.isToggled}
											onToggle={this.handleToggle}
											style={{width: '50%'}}
										/>
										<Toggle 
											label="Manual Control"
											toggled={this.state.manualControl}
											onToggle={this.toggleManualControl}
											style={{width: '50%'}}
										/>
									</CardActions>
								)
							}
						</Card>
					))
				}				
			</div>

		);
	}
}

export default SensorUI;