import { connect } from 'react-redux';
import { updateReadingsNode2 } from '../actions/actions.js';
import Node2 from '../pages/Node2.jsx';

const mapStateToProps = (state) => {
	return {
		node2: state.node2
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		updateReadings: (readings) => {
			dispatch(updateReadingsNode2(readings))
		}
	};
};

const Node2Container  = connect(mapStateToProps, mapDispatchToProps)(Node2);

export default Node2Container;