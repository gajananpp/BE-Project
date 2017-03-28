import React from 'react';
import {
	Router,
	IndexRoute,
	Route,
	browserHistory
} from 'react-router';
import AppLayout from './components/AppLayout.jsx';
import Node1Container from './containers/Node1Container.jsx';
import Node2Container from './containers/Node2Container.jsx';


class AppRoutes extends React.Component {
	constructor(props) {
		super(props);
		
	}

	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={AppLayout}>
					<IndexRoute component={Node2Container} />
					<Route path="/node-1" component={Node1Container} />
					<Route path="/node-2" component={Node2Container} />
				</Route>
			</Router>
		);
	}
}

export default AppRoutes;