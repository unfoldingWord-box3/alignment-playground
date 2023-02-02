import React from 'react';
import './App.css';
import {sourceVerse, targetVerseText, verseAlignments} from './data/tit_1_1_alignment';
import {
  addAlignmentsToTargetVerseUsingUnmerge, addAlignmentsToVerseUSFM,
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

// extract alignments from target verse USFM
const alignedVerseText = alignedVerse[1];
const alignments_ = extractAlignmentsFromTargetVerse(alignedVerseText, sourceVerse);
// merge alignments into target verse and convert to USFM
const verseUsfm = addAlignmentsToTargetVerseUsingUnmerge(alignedVerseText, alignments_);
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
    console.log(`WordAligner() - alignment changed, results`, results);// merge alignments into target verse and convert to USFM
    const verseUsfm = addAlignmentsToVerseUSFM(results.wordListWords, results.verseAlignments, targetVerseText);
    console.log(verseUsfm);
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
