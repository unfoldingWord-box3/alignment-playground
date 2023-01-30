import {usfmVerseToJson} from "./usfmHelpers";
import wordaligner from "word-aligner";
import * as UsfmFileConversionHelpers from "./UsfmFileConversionHelpers";
import {convertVerseDataToUSFM} from "./UsfmFileConversionHelpers";

/**
 * get all the alignments for verse from nested array (finds zaln objects)
 * @param {array} verseSpanAlignments
 * @return {*[]}
 */
export function getVerseAlignments(verseSpanAlignments) {
  let alignments = [];

  if (verseSpanAlignments) {
    for (let alignment of verseSpanAlignments) {
      if (alignment.tag === 'zaln') {
        alignments.push(alignment);
      }

      if (alignment.children) {
        const subAlignments = getVerseAlignments(alignment.children);

        if (subAlignments.length) {
          alignments = alignments.concat(subAlignments);
        }
      }
    }
  }
  return alignments;
}

/**
 * search through verseAlignments for word and get occurrences
 * @param {object} verseAlignments
 * @param {string|number} matchVerse
 * @param {string} word
 * @return {number}
 */
export function getWordCountInVerse(verseAlignments, matchVerse, word) {
  let matchedAlignment = null;

  for (let alignment of verseAlignments[matchVerse]) {
    for (let topWord of alignment.topWords) {
      if (topWord.word === word) {
        matchedAlignment = topWord;
        break;
      }
    }

    if (matchedAlignment) {
      break;
    }
  }

  const wordCount = matchedAlignment && matchedAlignment.occurrences;
  return wordCount || 0;
}

/**
 * convert to number if string
 * @param {string|number} value
 * @returns {number|*}
 */
function parseStrToNumber(value) {
  if (typeof value === 'string') {
    const number = parseInt(value);
    return number;
  }
  return value;
}

/**
 * for each item in word list convert occurrences to numbers
 * @param {array} wordlist
 * @returns {array}
 */
function convertOccurrences(wordlist) {
  const wordlist_ = wordlist.map(item => {
    const occurrence = parseStrToNumber(item.occurrence);
    const occurrences = parseStrToNumber(item.occurrences);
    return {
      ...item,
      occurrence,
      occurrences,
    }
  })
  return wordlist_;
}

export function extractAlignmentsFromTargetVerse(alignedVerseElement, sourceVerse) {
  const targetVerse = usfmVerseToJson(alignedVerseElement);
  const alignments = wordaligner.unmerge(targetVerse, sourceVerse);
  if (alignments.alignment) { // for compatibility change alignment to alignments
    // convert occurrence(s) from string to number
    const alignments_ = alignments.alignment.map(alignment => {
      const topWords = convertOccurrences(alignment.topWords);
      const bottomWords = convertOccurrences(alignment.bottomWords);
      return {
        ...alignment,
        topWords,
        bottomWords,
      }
    })
    alignments.alignments = alignments_;
  }
  return alignments;
}

export function addAlignmentsToTargetVerse(targetVerseText, verseAlignments, sourceVerse) {
  const verseString = UsfmFileConversionHelpers.cleanAlignmentMarkersFromString(targetVerseText);
  let verseObjects;

  try {
    verseObjects = wordaligner.merge(
      verseAlignments.alignments, verseAlignments.wordBank, verseString, true,
    );
  } catch (e) {
    console.log(`addAlignmentsToTargetVerse() - invalid alignment`, e);
  }

  if (verseObjects) {
    const targetVerse = convertVerseDataToUSFM(verseObjects);
    return targetVerse;
  }

  return null;
}

