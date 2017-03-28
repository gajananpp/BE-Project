import React from 'react';
import SensorUI from '../components/SensorUI.jsx';


class Node2 extends React.Component {
	constructor(props) {
		super(props);

	}
	componentDidMount() {
		socket.on('node2_reading', (data) => {
			this.props.updateReadings(data);
			console.log(data);
		});
	}

	render() {
		return (
			<div style={{marginTop: 30}}>
				<SensorUI nodeReadings={this.props.node2} />
			</div>
		);
	}
}

export default Node2;