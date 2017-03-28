import React from 'react';
import RTChart from '../react-rt-chart';

class RTC extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		let data = {
			date: new Date(),
			[this.props.reading.quantity]: this.props.reading.value,			
		};
		let flow: {
			duration: 1000
		};
		let chart: {
			point: {
				show: true,
				focus: {
					expand: {
						enabled: true
					}
				}
			},
		};
		return (
			<div style={{marginTop: 10}}>
				<RTChart 
					fields={[`${this.props.reading.quantity}`]}
					chart={chart}
					data={data}
					maxValues={30}
					flow={flow}
				/>
			</div>
		);
	}
}

export default RTC;