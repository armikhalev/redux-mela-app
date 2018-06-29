import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from './redux/actions';

export class FilterWords extends Component {
  static propTypes = {
    koyla: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { onInputChange } = this.props.actions;
    return (
      <input className="koyla-filter-words" 
      placeholder='Type in a word'
      onChange={ e => onInputChange(e.target.value)} />
    );
  }
}

/* istanbul ignore next */
function mapStateToProps(state) {
  return {
    koyla: state.koyla,
  };
}

/* istanbul ignore next */
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ ...actions }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterWords);
