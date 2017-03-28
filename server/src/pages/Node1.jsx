import React from 'react';
import SensorUI from '../components/SensorUI.jsx';


class Node1 extends React.Component {
	constructor(props) {
		super(props);

	}

	componentDidMount() {
		socket.on('node1_reading', (data) => {
			this.props.updateReadings(data);
			console.log(data);
		});
	}

	render() {
		return (
			<div style={{marginTop: 30}}>
				<SensorUI nodeReadings={this.props.node1} />
			</div>
		);
	}
}

export default Node1;