import React from 'react';
import AppBar from 'material-ui/AppBar';

class AppHeader extends React.Component {
	constructor(props) {
		super(props);
		

	}

	render() {
		return (
			<div>
				<AppBar 
					title={<span>WSN</span>}
					iconClassNameLeft="fa fa-microchip"
				/>
			</div>
		);
	}
}

export default AppHeader;