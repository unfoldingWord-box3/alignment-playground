import React from 'react';
import './App.css';
import Lexer from "wordmap-lexer";
import {removeUsfmMarkers} from "./utils/usfmHelpers";
import {tokenizeVerseObjects} from "./utils/verseObjects";
import {targetVerseText, sourceVerse, verseAlignments} from './data/tit_1_1_alignment';
import WordList from './components/WordList/index';
import AlignmentGrid from "./components/AlignmentGrid";
import {NT_ORIG_LANG, OT_ORIG_LANG} from "./common/constants";

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    // width: '100vw',
    // height: '100%',
    width: '800px',
    height: '500px',
    fontSize: '14px',
  },
  groupMenuContainer: {
    width: '250px',
    height: '100%',
  },
  wordListContainer: {
    minWidth: '150px',
    maxWidth: '400px',
    height: '100%',
    display: 'flex',
  },
  alignmentAreaContainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: 'calc(100vw - 650px)',
    height: '100%',
  },
  scripturePaneWrapper: {
    minHeight: '250px',
    marginBottom: '20px',
    maxHeight: '310px',
  },
  alignmentGridWrapper: {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 1 auto',
    overflow: 'auto',
    boxSizing: 'border-box',
    margin: '0 10px 6px 10px',
    boxShadow: '0 3px 10px var(--background-color)',
  },
  wordStyle: {
    backgroundColor: 'lightblue',
    margin: '20px 25%',
    textAlign: 'center',
    fontSize: '40px'
  },
};

const translate = (key) => {console.log(`translate(${key})`)};
const verse = '1', chapter = '1';
let targetTokens = [];
let sourceTokens = [];

if (targetVerseText) {
  targetTokens = Lexer.tokenize(removeUsfmMarkers(targetVerseText));
}

if (sourceVerse) {
  sourceTokens = tokenizeVerseObjects(sourceVerse.verseObjects);
}

// TRICKY: do not show word list if there is no source bible.
let wordListWords = [];

if (sourceVerse) {
  wordListWords = getLabeledTargetTokens(targetTokens, verseAlignments);
  // for (let i = 0, l = wordListWords.length; i < l; i++) {
  //   wordListWords[i].disabled = !! (i % 2);
  // }
}

const App = () => {

  // const dragItem = useRef();
  // const dragOverItem = useRef();
  // const [list, setList] = useState(['Item 1','Item 2','Item 3','Item 4','Item 5','Item 6']);
  //
  // const dragStart = (e, position) => {
  //   dragItem.current = position;
  //   console.log(e.target.innerHTML);
  // };
  //
  // const dragEnter = (e, position) => {
  //   dragOverItem.current = position;
  //   console.log(e.target.innerHTML);
  // };
  //
  // const drop = (e) => {
  //   const copyListItems = [...list];
  //   const dragItemContent = copyListItems[dragItem.current];
  //   copyListItems.splice(dragItem.current, 1);
  //   copyListItems.splice(dragOverItem.current, 0, dragItemContent);
  //   dragItem.current = null;
  //   dragOverItem.current = null;
  //   setList(copyListItems);
  // };

  const over = false;
  const targetDirection = 'ltr';
  const sourceDirection = 'ltr';
  const toolsSettings = {};
  const setToolSettings = () => {
    console.log('setToolSettings')
  };
  const connectDropTarget = () => {
    console.log('connectDropTarget')
  };
  const handleUnalignTargetToken = () => {
    console.log('handleUnalignTargetToken')
  };
  const handleAlignTargetToken = () => {
    console.log('handleAlignTargetToken')
  };
  const handleAlignPrimaryToken = () => {
    console.log('handleAlignPrimaryToken')
  };
  const handleRemoveSuggestion = () => {
    console.log('handleRemoveSuggestion')
  };
  const handleAcceptTokenSuggestion = () => {
    console.log('handleAcceptTokenSuggestion')
  };
  const targetLanguageFont = '';
  const resetWordList = false;
  const sourceLanguage = NT_ORIG_LANG;
  const lexicons = {};
  const contextId = {
    "reference": {
      "bookId": "tit",
      "chapter": 1,
      "verse": 1
    },
    "tool": "wordAlignment",
    "groupId": "chapter_1"
  };
  const showPopover = (key) => {console.log(`showPopover(${key})`)};
  const loadLexiconEntry = (key) => {console.log(`loadLexiconEntry(${key})`)};
  
  // TRICKY: make hebrew text larger
  let sourceStyle = { fontSize: '100%' };
  const isHebrew = sourceLanguage === OT_ORIG_LANG;

  if (isHebrew) {
    sourceStyle = {
      fontSize: '175%', paddingTop: '2px', paddingBottom: '2px', lineHeight: 'normal', WebkitFontSmoothing: 'antialiased',
    };
  }

  return (
    <div style={styles.container}>
      <div style={styles.wordListContainer}>
        <WordList
          words={wordListWords}
          verse={contextId.reference.verse}
          isOver={over}
          chapter={contextId.reference.chapter}
          direction={targetDirection}
          toolsSettings={toolsSettings}
          reset={resetWordList}
          setToolSettings={setToolSettings}
          connectDropTarget={connectDropTarget}
          targetLanguageFont={targetLanguageFont}
          onDropTargetToken={handleUnalignTargetToken}
        />
      </div>
      {sourceVerse ? (
        <AlignmentGrid
          sourceStyle={sourceStyle}
          sourceDirection={sourceDirection}
          targetDirection={targetDirection}
          alignments={verseAlignments}
          translate={translate}
          lexicons={lexicons}
          toolsSettings={toolsSettings}
          onDropTargetToken={handleAlignTargetToken}
          onDropSourceToken={handleAlignPrimaryToken}
          onCancelSuggestion={handleRemoveSuggestion}
          onAcceptTokenSuggestion={handleAcceptTokenSuggestion}
          contextId={contextId}
          isHebrew={isHebrew}
          showPopover={showPopover}
          loadLexiconEntry={loadLexiconEntry}
          targetLanguageFont={targetLanguageFont}
        />
      ) : (
        'MissingBibleError'
      )}

    </div>

  // <>
  //     {
  //       list&&
  //       list.map((item, index) => {
  //         return (
  //           <div style={wordStyle}
  //                onDragStart={(e) => dragStart(e, index)}
  //                onDragEnter={(e) => dragEnter(e, index)}
  //                onDragEnd={drop}
  //                key={index}
  //                draggable>
  //             {item}
  //           </div>
  //         );
  //       })}
  //   </>
  );
};

function  getLabeledTargetTokens(targetTokens, alignments) {
  return targetTokens.map(token => {
    let isUsed = false;

    for (const alignment of alignments) {
      for (const usedToken of alignment.targetNgram) {
        if (token.text.toString() === usedToken.text.toString()
          && token.occurrence === usedToken.occurrence
          && token.occurrences === usedToken.occurrences) {
          isUsed = true;
          break;
        }
      }
      if (isUsed) {
        break;
      }
    }
    token.disabled = isUsed;
    return token;
  });
}

export default App;
