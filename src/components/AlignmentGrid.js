import React, { Component } from 'react';
import PropTypes from 'prop-types';
// constants
import { getLexiconData } from '../utils/lexiconHelpers';
import { getFontClassName } from '../common/fontUtils';
import * as types from '../common/WordCardTypes';
// components
import AlignmentCard from './AlignmentCard';
// helpers

const makeStyles = props => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    height: '100%',
    backgroundColor: '#ffffff',
    padding: '0px 10px 10px',
    overflowY: 'auto',
    flexGrow: 2,
    direction: props.sourceDirection,
    alignContent: 'flex-start',
  },
  warning: {
    padding: '20px',
    backgroundColor: '#ccc',
    display: 'inline-block',
  },
});

/**
 * Renders a grid of word/phrase alignments
 */
class AlignmentGrid extends Component {
  constructor(props) {
    super(props);
    this.onDrag = this.onDrag.bind(this);
    this.state = {draggedAlignment: -1};
  }
  
  onDrag(token, alignmentIndex) {
    this.setState({draggedAlignment: alignmentIndex})
    this.props.setDragToken(token);
  }

  render() {
    const {
      translate,
      lexicons,
      onCancelSuggestion,
      sourceDirection,
      targetDirection,
      onAcceptTokenSuggestion,
      sourceStyle,
      alignments,
      contextId,
      isHebrew,
      showPopover,
      toolsSettings,
      loadLexiconEntry,
      targetLanguageFont,
      dragToken,
    } = this.props;

    if (!contextId) {
      return <div/>;
    }

    const styles = makeStyles(this.props);
    const draggedAlignment = dragToken ? this.state.draggedAlignment : -1;
    const targetLanguageFontClassName = getFontClassName(targetLanguageFont);
    const { fontSize } = toolsSettings['AlignmentGrid'] || {};

    if (fontSize) {
      styles.root.fontSize = `${fontSize}%`;
    }

    // TODO: add support for dragging to left of card. See utils/dragDrop.js
    return (
      <div id='AlignmentGrid' style={styles.root}>
        {
          alignments.map((alignment, key) => (
            <React.Fragment key={key}>
              {/* placeholder for un-merging primary words */}
              {/* TODO: cannot place this here due to this bug https://github.com/react-dnd/react-dnd/issues/735*/}
              {/*<AlignmentCard*/}
              {/*translate={translate}*/}
              {/*alignmentIndex={index}*/}
              {/*placeholderPosition="left"*/}
              {/*bottomWords={[]}*/}
              {/*topWords={[]}*/}
              {/*onDrop={item => this.handleDrop(index, item)}*/}
              {/*lexicons={lexicons}*/}
              {/*/>*/}

              <AlignmentCard
                translate={translate}
                sourceStyle={sourceStyle}
                sourceDirection={sourceDirection}
                targetDirection={targetDirection}
                onCancelTokenSuggestion={onCancelSuggestion}
                onAcceptTokenSuggestion={onAcceptTokenSuggestion}
                alignmentIndex={alignment.index}
                isSuggestion={alignment.isSuggestion}
                targetNgram={alignment.targetNgram}
                sourceNgram={alignment.sourceNgram}
                onDrop={(item) => this.handleDrop(key, item, this.state.draggedAlignment)}
                lexicons={lexicons}
                isHebrew={isHebrew}
                showPopover={showPopover}
                getLexiconData={getLexiconData}
                loadLexiconEntry={loadLexiconEntry}
                fontSize={fontSize}
                targetLanguageFontClassName={targetLanguageFontClassName}
                dragToken={dragToken}
                setDragToken={(token) => this.onDrag(token, key)}
              />
              {/* placeholder for un-merging primary words */}
              <AlignmentCard
                translate={translate}
                sourceDirection={sourceDirection}
                targetDirection={targetDirection}
                alignmentIndex={alignment.index}
                isSuggestion={alignment.isSuggestion}
                placeholderPosition="right"
                targetNgram={[]}
                sourceNgram={[]}
                onDrop={(item) => this.handleDrop(key, item, this.state.draggedAlignment, true)}
                showPopover={showPopover}
                getLexiconData={getLexiconData}
                loadLexiconEntry={loadLexiconEntry}
                lexicons={lexicons}
                isHebrew={isHebrew}
                fontSize={fontSize}
                targetLanguageFontClassName={targetLanguageFontClassName}
                dragToken={dragToken}
                setDragToken={(token) => this.onDrag(token, key)}
                showAsDrop={this.getShowAsDrop(draggedAlignment, key, alignment)}
              />
            </React.Fragment>
          ))
        }
      </div>
    );
  }

  getShowAsDrop(draggedAlignment, key, alignment) {
    const isCurrentKey = draggedAlignment === key;
    const moreTheOneItem = alignment.targetNgram.length > 1;
    const showDrop = isCurrentKey && moreTheOneItem;
    return showDrop;
  }

  handleDrop(alignmentIndex, item, srcAlignmentIndex, startNew) {
    const { onDropTargetToken, onDropSourceToken } = this.props;

    if (Array.isArray(item)) {
      // drop selected tokens
      for (let i = 0; i < item.length; i++) {
        onDropTargetToken(item[i], alignmentIndex, -1);
      }
    } else if (item.type === types.SECONDARY_WORD) {
      // drop single token
      onDropTargetToken(item, alignmentIndex, srcAlignmentIndex);
    } else if (item.type === types.PRIMARY_WORD) {
      onDropSourceToken(item, alignmentIndex, srcAlignmentIndex, startNew);
    }

    this.setState({draggedAlignment: -1});
  }
}

AlignmentGrid.propTypes = {
  onDropTargetToken: PropTypes.func.isRequired,
  onDropSourceToken: PropTypes.func.isRequired,
  onCancelSuggestion: PropTypes.func.isRequired,
  onAcceptTokenSuggestion: PropTypes.func.isRequired,
  sourceStyle: PropTypes.object.isRequired,
  alignments: PropTypes.array.isRequired,
  contextId: PropTypes.object,
  translate: PropTypes.func.isRequired,
  lexicons: PropTypes.object.isRequired,
  toolsSettings: PropTypes.object.isRequired,
  sourceDirection: PropTypes.oneOf(['ltr', 'rtl']),
  targetDirection: PropTypes.oneOf(['ltr', 'rtl']),
  isHebrew: PropTypes.bool.isRequired,
  showPopover: PropTypes.func.isRequired,
  loadLexiconEntry: PropTypes.func.isRequired,
  targetLanguageFont: PropTypes.string,
  dragToken: PropTypes.object.isRequired,
  setDragToken: PropTypes.func.isRequired,
};

AlignmentGrid.defaultProps = {
  sourceDirection: 'ltr',
  targetDirection: 'ltr',
  sourceStyle: { fontSize: '100%' },
};

export default AlignmentGrid;
