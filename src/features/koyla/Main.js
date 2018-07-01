import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getWords, dismissGetWordsError, onInputChangeAsync } from './redux/actions';
import { Card, FilterWords } from './';

export class Main extends Component {
  static propTypes = {
    koyla: PropTypes.object.isRequired,
    actions: PropTypes.object.isRequired,
  };

  // Initialize data
  componentDidMount() {
    this.props.actions.getWords('a');
  }

  render() {
    const { words, visibleCards } = this.props.koyla;
    const { onInputChangeAsync } = this.props.actions;

    return (
      <div className="koyla-main">
        <FilterWords inputHandler={onInputChangeAsync}/>

        {words.length > 0 ? (
          <ul className="examples-reddit-list">
            {visibleCards.map(item => {
              let word = item.attributes;

              return <Card key={item.id} card={word}/>;
            })}
          </ul>
        ) : (
          <div className="no-items-tip">No items yet.</div>
        )}
      </div>
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
    actions: bindActionCreators({ getWords, dismissGetWordsError, onInputChangeAsync }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
