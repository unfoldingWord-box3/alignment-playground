/* eslint-env jest */
import _ from 'lodash';
// import {describe, expect, test} from '@jest/globals'

import {updateAlignmentsToTargetVerse} from "../utils/alignmentHelpers";
import {usfmVerseToJson} from "../utils/usfmHelpers";

// const initialVerseObjects = [
//   {
//     "tag": "zaln",
//     "type": "milestone",
//     "strong": "G51030",
//     "lemma": "Τίτος",
//     "morph": "Gr,N,,,,,DMS,",
//     "occurrence": "1",
//     "occurrences": "1",
//     "content": "Τίτῳ",
//     "children": [
//       {
//         "text": "I",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "am",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "writing",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "to",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "5"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "you",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "4"
//       },
//       {
//         "type": "text",
//         "text": ", "
//       },
//       {
//         "text": "Titus",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       }
//     ],
//     "endTag": "zaln-e\\*"
//   },
//   {
//     "type": "text",
//     "text": "; "
//   },
//   {
//     "tag": "zaln",
//     "type": "milestone",
//     "strong": "G11030",
//     "lemma": "γνήσιος",
//     "morph": "Gr,AA,,,,DNS,",
//     "occurrence": "1",
//     "occurrences": "1",
//     "content": "γνησίῳ",
//     "children": [
//       {
//         "text": "you",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "2",
//         "occurrences": "4"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "have",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "become",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "like",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "a",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "2"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "real",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       }
//     ],
//     "endTag": "zaln-e\\*"
//   },
//   {
//     "type": "text",
//     "text": " "
//   },
//   {
//     "tag": "zaln",
//     "type": "milestone",
//     "strong": "G50430",
//     "lemma": "τέκνον",
//     "morph": "Gr,N,,,,,DNS,",
//     "occurrence": "1",
//     "occurrences": "1",
//     "content": "τέκνῳ",
//     "children": [
//       {
//         "text": "son",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "to",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "2",
//         "occurrences": "5"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "me",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       }
//     ],
//     "endTag": "zaln-e\\*"
//   },
//   {
//     "type": "text",
//     "text": " "
//   },
//   {
//     "tag": "zaln",
//     "type": "milestone",
//     "strong": "G25960",
//     "lemma": "κατά",
//     "morph": "Gr,P,,,,,A,,,",
//     "occurrence": "1",
//     "occurrences": "1",
//     "content": "κατὰ",
//     "children": [
//       {
//         "text": "because",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       }
//     ],
//     "endTag": "zaln-e\\*"
//   },
//   {
//     "type": "text",
//     "text": " "
//   },
//   {
//     "tag": "zaln",
//     "type": "milestone",
//     "strong": "G28390",
//     "lemma": "κοινός",
//     "morph": "Gr,AA,,,,AFS,",
//     "occurrence": "1",
//     "occurrences": "1",
//     "content": "κοινὴν",
//     "children": [
//       {
//         "text": "we",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "both",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "now",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       }
//     ],
//     "endTag": "zaln-e\\*"
//   },
//   {
//     "type": "text",
//     "text": " "
//   },
//   {
//     "tag": "zaln",
//     "type": "milestone",
//     "strong": "G41020",
//     "lemma": "πίστις",
//     "morph": "Gr,N,,,,,AFS,",
//     "occurrence": "1",
//     "occurrences": "1",
//     "content": "πίστιν",
//     "children": [
//       {
//         "text": "believe",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "in",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "Jesus",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "2"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "the",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "3"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "Messiah",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "2"
//       }
//     ],
//     "endTag": "zaln-e\\*"
//   },
//   {
//     "type": "text",
//     "text": ". "
//   },
//   {
//     "tag": "zaln",
//     "type": "milestone",
//     "strong": "G05750",
//     "lemma": "ἀπό",
//     "morph": "Gr,P,,,,,G,,,",
//     "occurrence": "1",
//     "occurrences": "1",
//     "content": "ἀπὸ",
//     "children": [
//       {
//         "tag": "zaln",
//         "type": "milestone",
//         "strong": "G23160",
//         "lemma": "θεός",
//         "morph": "Gr,N,,,,,GMS,",
//         "occurrence": "1",
//         "occurrences": "1",
//         "content": "Θεοῦ",
//         "children": [
//           {
//             "text": "May",
//             "tag": "w",
//             "type": "word",
//             "occurrence": "1",
//             "occurrences": "1"
//           },
//           {
//             "type": "text",
//             "text": " "
//           },
//           {
//             "text": "God",
//             "tag": "w",
//             "type": "word",
//             "occurrence": "1",
//             "occurrences": "1"
//           }
//         ],
//         "endTag": "zaln-e\\*"
//       }
//     ],
//     "endTag": "zaln-e\\*"
//   },
//   {
//     "type": "text",
//     "text": " "
//   },
//   {
//     "tag": "zaln",
//     "type": "milestone",
//     "strong": "G39620",
//     "lemma": "πατήρ",
//     "morph": "Gr,N,,,,,GMS,",
//     "occurrence": "1",
//     "occurrences": "1",
//     "content": "Πατρὸς",
//     "children": [
//       {
//         "text": "the",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "2",
//         "occurrences": "3"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "Father",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       }
//     ],
//     "endTag": "zaln-e\\*"
//   },
//   {
//     "type": "text",
//     "text": " "
//   },
//   {
//     "tag": "zaln",
//     "type": "milestone",
//     "strong": "G25320",
//     "lemma": "καί",
//     "morph": "Gr,CC,,,,,,,,",
//     "occurrence": "1",
//     "occurrences": "2",
//     "content": "καὶ",
//     "children": [
//       {
//         "text": "and",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "2"
//       }
//     ],
//     "endTag": "zaln-e\\*"
//   },
//   {
//     "type": "text",
//     "text": " "
//   },
//   {
//     "tag": "zaln",
//     "type": "milestone",
//     "strong": "G55470",
//     "lemma": "χριστός",
//     "morph": "Gr,N,,,,,GMS,",
//     "occurrence": "1",
//     "occurrences": "1",
//     "content": "Χριστοῦ",
//     "children": [
//       {
//         "text": "the",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "3",
//         "occurrences": "3"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "Messiah",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "2",
//         "occurrences": "2"
//       }
//     ],
//     "endTag": "zaln-e\\*"
//   },
//   {
//     "type": "text",
//     "text": " "
//   },
//   {
//     "tag": "zaln",
//     "type": "milestone",
//     "strong": "G24240",
//     "lemma": "Ἰησοῦς",
//     "morph": "Gr,N,,,,,GMS,",
//     "occurrence": "1",
//     "occurrences": "1",
//     "content": "Ἰησοῦ",
//     "children": [
//       {
//         "text": "Jesus",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "2",
//         "occurrences": "2"
//       }
//     ],
//     "endTag": "zaln-e\\*"
//   },
//   {
//     "type": "text",
//     "text": " "
//   },
//   {
//     "tag": "zaln",
//     "type": "milestone",
//     "strong": "G35880",
//     "lemma": "ὁ",
//     "morph": "Gr,EA,,,,GMS,",
//     "occurrence": "1",
//     "occurrences": "1",
//     "content": "τοῦ",
//     "children": [
//       {
//         "text": "who",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       }
//     ],
//     "endTag": "zaln-e\\*"
//   },
//   {
//     "type": "text",
//     "text": " "
//   },
//   {
//     "tag": "zaln",
//     "type": "milestone",
//     "strong": "G49900",
//     "lemma": "σωτήρ",
//     "morph": "Gr,N,,,,,GMS,",
//     "occurrence": "1",
//     "occurrences": "1",
//     "content": "Σωτῆρος",
//     "children": [
//       {
//         "text": "saves",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       }
//     ],
//     "endTag": "zaln-e\\*"
//   },
//   {
//     "type": "text",
//     "text": " "
//   },
//   {
//     "tag": "zaln",
//     "type": "milestone",
//     "strong": "G14730",
//     "lemma": "ἐγώ",
//     "morph": "Gr,RP,,,1G,P,",
//     "occurrence": "1",
//     "occurrences": "1",
//     "content": "ἡμῶν",
//     "children": [
//       {
//         "text": "us",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       }
//     ],
//     "endTag": "zaln-e\\*"
//   },
//   {
//     "type": "text",
//     "text": " "
//   },
//   {
//     "tag": "zaln",
//     "type": "milestone",
//     "strong": "G54850",
//     "lemma": "χάρις",
//     "morph": "Gr,N,,,,,NFS,",
//     "occurrence": "1",
//     "occurrences": "1",
//     "content": "χάρις",
//     "children": [
//       {
//         "text": "continue",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "to",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "3",
//         "occurrences": "5"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "be",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "kind",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "to",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "4",
//         "occurrences": "5"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "you",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "3",
//         "occurrences": "4"
//       }
//     ],
//     "endTag": "zaln-e\\*"
//   },
//   {
//     "type": "text",
//     "text": " "
//   },
//   {
//     "tag": "zaln",
//     "type": "milestone",
//     "strong": "G25320",
//     "lemma": "καί",
//     "morph": "Gr,CC,,,,,,,,",
//     "occurrence": "2",
//     "occurrences": "2",
//     "content": "καὶ",
//     "children": [
//       {
//         "text": "and",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "2",
//         "occurrences": "2"
//       }
//     ],
//     "endTag": "zaln-e\\*"
//   },
//   {
//     "type": "text",
//     "text": " "
//   },
//   {
//     "tag": "zaln",
//     "type": "milestone",
//     "strong": "G15150",
//     "lemma": "εἰρήνη",
//     "morph": "Gr,N,,,,,NFS,",
//     "occurrence": "1",
//     "occurrences": "1",
//     "content": "εἰρήνη",
//     "children": [
//       {
//         "text": "to",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "5",
//         "occurrences": "5"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "give",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "you",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "4",
//         "occurrences": "4"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "a",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "2",
//         "occurrences": "2"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "peaceful",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       },
//       {
//         "type": "text",
//         "text": " "
//       },
//       {
//         "text": "spirit",
//         "tag": "w",
//         "type": "word",
//         "occurrence": "1",
//         "occurrences": "1"
//       }
//     ],
//     "endTag": "zaln-e\\*"
//   },
//   {
//     "type": "text",
//     "text": ".\n"
//   },
//   {
//     "tag": "p",
//     "nextChar": "\n",
//     "type": "paragraph"
//   }
// ];
const initialText = 'I am writing to you, Titus; you have become like a real son to me because we both now believe in Jesus the Messiah. May God the Father and the Messiah Jesus who saves us continue to be kind to you and to give you a peaceful spirit.\n\\p\n';
const alignedInitialVerseText = '\\zaln-s |x-strong="G51030" x-lemma="Τίτος" x-morph="Gr,N,,,,,DMS," x-occurrence="1" x-occurrences="1" x-content="Τίτῳ"\\*\\w I|x-occurrence="1" x-occurrences="1"\\w* \\w am|x-occurrence="1" x-occurrences="1"\\w* \\w writing|x-occurrence="1" x-occurrences="1"\\w* \\w to|x-occurrence="1" x-occurrences="5"\\w* \\w you|x-occurrence="1" x-occurrences="4"\\w*, \\w Titus|x-occurrence="1" x-occurrences="1"\\w*\\zaln-e\\*; \\zaln-s |x-strong="G11030" x-lemma="γνήσιος" x-morph="Gr,AA,,,,DNS," x-occurrence="1" x-occurrences="1" x-content="γνησίῳ"\\*\\w you|x-occurrence="2" x-occurrences="4"\\w* \\w have|x-occurrence="1" x-occurrences="1"\\w* \\w become|x-occurrence="1" x-occurrences="1"\\w* \\w like|x-occurrence="1" x-occurrences="1"\\w* \\w a|x-occurrence="1" x-occurrences="2"\\w* \\w real|x-occurrence="1" x-occurrences="1"\\w*\\zaln-e\\* \\zaln-s |x-strong="G50430" x-lemma="τέκνον" x-morph="Gr,N,,,,,DNS," x-occurrence="1" x-occurrences="1" x-content="τέκνῳ"\\*\\w son|x-occurrence="1" x-occurrences="1"\\w* \\w to|x-occurrence="2" x-occurrences="5"\\w* \\w me|x-occurrence="1" x-occurrences="1"\\w*\\zaln-e\\* \\zaln-s |x-strong="G25960" x-lemma="κατά" x-morph="Gr,P,,,,,A,,," x-occurrence="1" x-occurrences="1" x-content="κατὰ"\\*\\w because|x-occurrence="1" x-occurrences="1"\\w*\\zaln-e\\* \\zaln-s |x-strong="G28390" x-lemma="κοινός" x-morph="Gr,AA,,,,AFS," x-occurrence="1" x-occurrences="1" x-content="κοινὴν"\\*\\w we|x-occurrence="1" x-occurrences="1"\\w* \\w both|x-occurrence="1" x-occurrences="1"\\w* \\w now|x-occurrence="1" x-occurrences="1"\\w*\\zaln-e\\* \\zaln-s |x-strong="G41020" x-lemma="πίστις" x-morph="Gr,N,,,,,AFS," x-occurrence="1" x-occurrences="1" x-content="πίστιν"\\*\\w believe|x-occurrence="1" x-occurrences="1"\\w* \\w in|x-occurrence="1" x-occurrences="1"\\w* \\w Jesus|x-occurrence="1" x-occurrences="2"\\w* \\w the|x-occurrence="1" x-occurrences="3"\\w* \\w Messiah|x-occurrence="1" x-occurrences="2"\\w*\\zaln-e\\*. \\zaln-s |x-strong="G05750" x-lemma="ἀπό" x-morph="Gr,P,,,,,G,,," x-occurrence="1" x-occurrences="1" x-content="ἀπὸ"\\*\\zaln-s |x-strong="G23160" x-lemma="θεός" x-morph="Gr,N,,,,,GMS," x-occurrence="1" x-occurrences="1" x-content="Θεοῦ"\\*\\w May|x-occurrence="1" x-occurrences="1"\\w* \\w God|x-occurrence="1" x-occurrences="1"\\w*\\zaln-e\\*\\zaln-e\\* \\zaln-s |x-strong="G39620" x-lemma="πατήρ" x-morph="Gr,N,,,,,GMS," x-occurrence="1" x-occurrences="1" x-content="Πατρὸς"\\*\\w the|x-occurrence="2" x-occurrences="3"\\w* \\w Father|x-occurrence="1" x-occurrences="1"\\w*\\zaln-e\\* \\zaln-s |x-strong="G25320" x-lemma="καί" x-morph="Gr,CC,,,,,,,," x-occurrence="1" x-occurrences="2" x-content="καὶ"\\*\\w and|x-occurrence="1" x-occurrences="2"\\w*\\zaln-e\\* \\zaln-s |x-strong="G55470" x-lemma="χριστός" x-morph="Gr,N,,,,,GMS," x-occurrence="1" x-occurrences="1" x-content="Χριστοῦ"\\*\\w the|x-occurrence="3" x-occurrences="3"\\w* \\w Messiah|x-occurrence="2" x-occurrences="2"\\w*\\zaln-e\\* \\zaln-s |x-strong="G24240" x-lemma="Ἰησοῦς" x-morph="Gr,N,,,,,GMS," x-occurrence="1" x-occurrences="1" x-content="Ἰησοῦ"\\*\\w Jesus|x-occurrence="2" x-occurrences="2"\\w*\\zaln-e\\* \\zaln-s |x-strong="G35880" x-lemma="ὁ" x-morph="Gr,EA,,,,GMS," x-occurrence="1" x-occurrences="1" x-content="τοῦ"\\*\\w who|x-occurrence="1" x-occurrences="1"\\w*\\zaln-e\\* \\zaln-s |x-strong="G49900" x-lemma="σωτήρ" x-morph="Gr,N,,,,,GMS," x-occurrence="1" x-occurrences="1" x-content="Σωτῆρος"\\*\\w saves|x-occurrence="1" x-occurrences="1"\\w*\\zaln-e\\* \\zaln-s |x-strong="G14730" x-lemma="ἐγώ" x-morph="Gr,RP,,,1G,P," x-occurrence="1" x-occurrences="1" x-content="ἡμῶν"\\*\\w us|x-occurrence="1" x-occurrences="1"\\w*\\zaln-e\\* \\zaln-s |x-strong="G54850" x-lemma="χάρις" x-morph="Gr,N,,,,,NFS," x-occurrence="1" x-occurrences="1" x-content="χάρις"\\*\\w continue|x-occurrence="1" x-occurrences="1"\\w* \\w to|x-occurrence="3" x-occurrences="5"\\w* \\w be|x-occurrence="1" x-occurrences="1"\\w* \\w kind|x-occurrence="1" x-occurrences="1"\\w* \\w to|x-occurrence="4" x-occurrences="5"\\w* \\w you|x-occurrence="3" x-occurrences="4"\\w*\\zaln-e\\* \\zaln-s |x-strong="G25320" x-lemma="καί" x-morph="Gr,CC,,,,,,,," x-occurrence="2" x-occurrences="2" x-content="καὶ"\\*\\w and|x-occurrence="2" x-occurrences="2"\\w*\\zaln-e\\* \\zaln-s |x-strong="G15150" x-lemma="εἰρήνη" x-morph="Gr,N,,,,,NFS," x-occurrence="1" x-occurrences="1" x-content="εἰρήνη"\\*\\w to|x-occurrence="5" x-occurrences="5"\\w* \\w give|x-occurrence="1" x-occurrences="1"\\w* \\w you|x-occurrence="4" x-occurrences="4"\\w* \\w a|x-occurrence="2" x-occurrences="2"\\w* \\w peaceful|x-occurrence="1" x-occurrences="1"\\w* \\w spirit|x-occurrence="1" x-occurrences="1"\\w*\\zaln-e\\*.\n' +
  '\\p\n';
const initialVerseObjects_ = usfmVerseToJson(alignedInitialVerseText);

describe('testing alignment updates', () => {
  test('should pass alignment unchanged', () => {
    const initialVerseObjects = _.cloneDeep(initialVerseObjects_);
    const newText = initialText;
    const results = updateAlignmentsToTargetVerse(initialVerseObjects, newText)
    expect(results.targetVerseText).toEqual(alignedInitialVerseText)
  });

  test('should pass alignment with zzz added', () => {
    const initialVerseObjects = _.cloneDeep(initialVerseObjects_);
    const newText = initialText + ' zzz';
    const results = updateAlignmentsToTargetVerse(initialVerseObjects, newText)
    const expectedFinalAlign = alignedInitialVerseText + ' \\w zzz|x-occurrence="1" x-occurrences="1"\\w*';
    expect(results.targetVerseText).toEqual(expectedFinalAlign)
  });

  test('should pass alignment with to added', () => {
    const initialVerseObjects = _.cloneDeep(initialVerseObjects_);
    const newText = initialText + ' to';
    const results = updateAlignmentsToTargetVerse(initialVerseObjects, newText)
    const expectedFinalAlign = alignedInitialVerseText + '\\w zzz|x-occurrence="1" x-occurrences="1"\\w*';
    expect(results.targetVerseText).toEqual(expectedFinalAlign)
  });
});

