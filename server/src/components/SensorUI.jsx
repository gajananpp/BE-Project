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

class SensorUI extends React.Component {
	constructor(props) {
		super(props);
		
	}

	componentWillUpdate(nextProps, nextState) {
		console.log("SensorUI updated");
		console.log(this.props.nodeReadings);
	}

	render() {
		let lastReading;
		if (this.props.nodeReadings.length !== 0) {
			lastReading = this.props.nodeReadings[this.props.nodeReadings.length - 1];
			console.log(lastReading);
		}
		return (
			<div>
				{
					this.props.nodeReadings.length === 0 ? null :
						this.props.nodeReadings[0].map((obj, index) => (
						<Card key={index} style={{width: '95%', marginTop: 30, margin: 'auto'}}>
							<CardHeader 
								title={`${obj.sensor}`}
								subtitle={`${lastReading[index].value}`}
								actAsExpander={true}
								showExpandableButton={true}
							/>
							<Divider />
							<CardMedia
								overlay={<CardTitle title={`${obj.quantity.toUpperCase()}: ${lastReading[index].value}`} />}
								overlayContainerStyle={{pointerEvents: 'none'}}
								expandable={true}
							>
								<RTC reading={lastReading[index]} />
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
										/>
										<Toggle 
											label="Motor On/Off"
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