import React, { PropTypes, Component } from 'react';
<<<<<<< HEAD
=======
import { FetchDisabledActions, FetchDisastersData, FetchPriorityFreeze, FetchTaskCredits } from '../../actions/api/disasters';
>>>>>>> task_credits
import { connect } from 'react-redux';
import rootComponent from '../../rootComponent';
import Utils from '../../utils';
import DisabledActions from './DisabledActions';
import ManageDisasters from './ManageDisasters';
import DisasterStats from './DisasterStats';
import { refresh } from '../../actions/ui/disasters';

class Disasters extends Component {
  static propTypes = {
    disastersData: PropTypes.shape({
      stats: PropTypes.arrayOf(PropTypes.shape({
        timestamp: PropTypes.number.isRequired,
        numActiveTasks: PropTypes.number.isRequired,
        numPendingTasks: PropTypes.number.isRequired,
        numLateTasks: PropTypes.number.isRequired,
        avgTaskLagMillis: PropTypes.number.isRequired,
        numLostTasks: PropTypes.number.isRequired,
        numActiveSlaves: PropTypes.number.isRequired,
        numLostSlaves: PropTypes.number.isRequired
      })).isRequired,
      disasters: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.string.isRequired,
        active: PropTypes.bool
      })).isRequired,
      automatedActionsDisabled: PropTypes.bool.isRequired
    }).isRequired,
    taskCredits: PropTypes.object,
    priorityFreeze: PropTypes.object,
    user: PropTypes.string,
    fetchDisabledActions: PropTypes.func.isRequired,
    fetchDisastersData: PropTypes.func.isRequired,
    fetchPriorityFreeze: PropTypes.func.isRequired,
    fetchTaskCredits: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <DisabledActions disabledActions={this.props.disabledActions} user={this.props.user} />
        <ManageDisasters 
          disasters={this.props.disastersData.disasters}
          priorityFreeze={this.props.priorityFreeze}
          user={this.props.user}
          automatedActionsDisabled={this.props.disastersData.automatedActionsDisabled}
          taskCredits={this.props.taskCredits}
        />
        <DisasterStats stats={this.props.disastersData.stats} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const user = Utils.maybe(state, ['api', 'user', 'data', 'user', 'name']);
  const priorityFreeze = Utils.maybe(state.api.priorityFreeze, ['data'], {});
  return {
    user,
    disastersData: state.api.disastersData.data,
    disabledActions: state.api.disabledActions.data,
    taskCredits: state.api.taskCredits.data,
    priorityFreeze: _.isEmpty(priorityFreeze) ? {} : priorityFreeze
  };
}

<<<<<<< HEAD
export default connect(mapStateToProps)(rootComponent(Disasters, refresh));
=======
function mapDispatchToProps(dispatch) {
  return {
    fetchDisastersData: () => dispatch(FetchDisastersData.trigger()),
    fetchDisabledActions: () => dispatch(FetchDisabledActions.trigger()),
    fetchPriorityFreeze: () => dispatch(FetchPriorityFreeze.trigger([404])),
    fetchTaskCredits: () => dispatch(FetchTaskCredits.trigger())
  };
}

function refresh(props) {
	const promises = [];
	promises.push(props.fetchDisastersData());
	promises.push(props.fetchDisabledActions());
  promises.push(props.fetchPriorityFreeze());
  promises.push(props.fetchTaskCredits());
  return Promise.all(promises);
}


export default connect(mapStateToProps, mapDispatchToProps)(rootComponent(Disasters, refresh));
>>>>>>> task_credits
