import { connect } from 'react-redux';
import { updateReadingsNode1 } from '../actions/actions.js';
import Node1 from '../pages/Node1.jsx';

const mapStateToProps = (state) => {
	return {
		node1: state.node1
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateReadings: (readings) => {
			dispatch(updateReadingsNode1(readings))
		}
	};
};

const Node1Container  = connect(mapStateToProps, mapDispatchToProps)(Node1);

export default Node1Container;