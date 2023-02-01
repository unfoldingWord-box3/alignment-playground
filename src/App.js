import React from 'react';
import './App.css';
import {targetVerseText, sourceVerse, verseAlignments} from './data/tit_1_1_alignment';
import {
  addAlignmentsToTargetVerse,
  extractAlignmentsFromTargetVerse,
  getLabeledTargetTokens
} from "./utils/alignmentHelpers";
import {NT_ORIG_LANG} from "./common/constants";
import WordAligner from "./components/WordAligner";
import {removeUsfmMarkers} from "./utils/usfmHelpers";
import Lexer from "wordmap-lexer";

const alignedVerse = require('./data/en_ult_tit_1_1.json');

const translate = (key) => {console.log(`translate(${key})`)};
let targetTokens = [];

if (targetVerseText) {
  targetTokens = Lexer.tokenize(removeUsfmMarkers(targetVerseText));
}

// TRICKY: do not show word list if there is no source bible.
let wordListWords = [];
if (sourceVerse) {
  wordListWords = getLabeledTargetTokens(targetTokens, verseAlignments);
}

// extract alignments from USFM
const alignedVerseText = alignedVerse[1];
const alignments_ = extractAlignmentsFromTargetVerse(alignedVerseText, sourceVerse);
const verseUsfm = addAlignmentsToTargetVerse(alignedVerseText, alignments_, sourceVerse);
console.log(`verseUsfm`, verseUsfm);

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
  
  function onChange(results) {
    console.log(`WordAligner() - alignment changed, results`, results);
  }

  return (
    <div >
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
      />
    </div>
  );
};

export default App;
