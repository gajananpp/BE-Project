import React from 'react';
import DropDownMenu  from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';

class NavigationBox extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			value: 2
		};
	}

	handleChange = (event, index, value) => {
		this.setState({
			value
		});
		browserHistory.push(`/node-${value}`);
	};

	render() {
		return (
			<div style={{marginTop: 20, zIndex: 100}}>
				<DropDownMenu value={this.state.value} onChange={this.handleChange}>
					<MenuItem value={1} primaryText="Node 1" />
					<MenuItem value={2} primaryText="Node 2" />
				</DropDownMenu>
			</div>
		);
	}
}

export default NavigationBox;