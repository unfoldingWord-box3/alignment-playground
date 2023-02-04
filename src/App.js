import React from 'react';
import './App.css';
import {
  addAlignmentsToVerseUSFM,
  extractAlignmentsFromTargetVerse,
  getLabeledTargetTokens
} from "./utils/alignmentHelpers";
import {NT_ORIG_LANG} from "./common/constants";
import WordAligner from "./components/WordAligner";
import {removeUsfmMarkers, usfmVerseToJson} from "./utils/usfmHelpers";
import Lexer from "wordmap-lexer";

// const alignedVerseUSFM = require('./data/en_ult_tit_1_1.json');
const alignedVerseUSFM = require('./data/en_ult_tit_1_1_partial.json');
const originalVerseUSFM = require('./data/grk_tit_1_1.json');
// grk_tit_1_1.json
const LexiconData = require("./data/lexicons.json");

const translate = (key) => {console.log(`translate(${key})`)};
let targetTokens = [];

const targetVerseText = alignedVerseUSFM[1];
const sourceVerseText = originalVerseUSFM[1];

if (targetVerseText) {
  targetTokens = Lexer.tokenize(removeUsfmMarkers(targetVerseText));
}

// TRICKY: do not show word list if there is no source bible.
const sourceVerseObjects = usfmVerseToJson(sourceVerseText);
let wordListWords = [];
const targetVerseAlignments = extractAlignmentsFromTargetVerse(targetVerseText, sourceVerseObjects);
const verseAlignments = targetVerseAlignments.alignments;
if (sourceVerseObjects) {
  wordListWords = getLabeledTargetTokens(targetTokens, verseAlignments);
}

// extract alignments from target verse USFM
// const alignedVerseText = alignedVerseUSFM[1];
// const alignments_ = extractAlignmentsFromTargetVerse(alignedVerseText, sourceVerseObjects);
// // merge alignments into target verse and convert to USFM
// const verseUsfm = addAlignmentsToTargetVerseUsingUnmerge(alignedVerseText, alignments_);
// console.log(`verseUsfm`, verseUsfm);

const App = () => {
  const targetLanguageFont = '';
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
  const getLexiconData_ = (lexiconId, entryId) => {
    console.log(`loadLexiconEntry(${lexiconId}, ${entryId})`)
    const entryData = LexiconData?.[lexiconId]?.[entryId];
    return { [lexiconId]: { [entryId]: entryData } };
  };
  
  function onChange(results) {
    console.log(`WordAligner() - alignment changed, results`, results);// merge alignments into target verse and convert to USFM
    const verseUsfm = addAlignmentsToVerseUSFM(results.wordListWords, results.verseAlignments, targetVerseText);
    console.log(verseUsfm);
  }

  return (
    <div style={{height:'650px', width:'800px'}}>
      <WordAligner
        verseAlignments={verseAlignments}
        wordListWords={wordListWords}
        translate={translate}
        contextId={contextId}
        targetLanguageFont={targetLanguageFont}
        sourceLanguage={sourceLanguage}
        showPopover={showPopover}
        lexicons={lexicons}
        loadLexiconEntry={loadLexiconEntry}
        onChange={onChange}
        getLexiconData={getLexiconData_}
      />
    </div>
  );
};

export default App;
