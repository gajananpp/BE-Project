import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import AppHeader from './AppHeader.jsx';
import NavigationBox from './NavigationBox.jsx';


injectTapEventPlugin();

class AppLayout extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					<AppHeader />
					{this.props.children}
					<NavigationBox />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default AppLayout;