import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { onInputChangeAsync } from './redux/actions';

export class FilterWords extends Component {
  static propTypes = {
    koyla: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  render() {
    const { onInputChangeAsync } = this.props.actions;
    return (
      <input className="koyla-filter-words" 
      placeholder='Type in a word'
      onChange={ e => onInputChangeAsync(e.target.value)} />
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
    actions: bindActionCreators({ onInputChangeAsync }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterWords);
