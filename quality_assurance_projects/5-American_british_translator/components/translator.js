const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
  constructor() {
    this.americanOnly = americanOnly;
    this.americanToBritishSpelling = americanToBritishSpelling;
    this.americanToBritishTitles = americanToBritishTitles;
    this.britishOnly = britishOnly;
    this.britishToAmericanSpelling = Object.fromEntries(
      Object.entries(americanToBritishSpelling).map(([k, v]) => [v, k])
    );
    this.britishToAmericanTitles = Object.fromEntries(
      Object.entries(americanToBritishTitles).map(([k, v]) => [v, k])
    );
  }

  // Helper to wrap in highlight span
  highlight(str) {
    return `<span class="highlight">${str}</span>`;
  }

  // Helper to match case of replacement to original
  matchCase(replacement, original) {
    if (original === original.toUpperCase()) return replacement.toUpperCase();
    if (original[0] === original[0].toUpperCase()) return replacement[0].toUpperCase() + replacement.slice(1);
    return replacement.toLowerCase();
  }

  // American to British
  translateToBritish(text) {
    if (!text) return text;
    let translated = text;
    // Time
    translated = translated.replace(/\b(\d{1,2}):(\d{2})\b/g, (match, h, m) => `${h}.${m}`);
    // Titles
    for (const [american, british] of Object.entries(this.americanToBritishTitles)) {
      const base = american.replace('.', '');
      const regex = new RegExp(`(^|\\s)(${base}\\.?)(?=\\s[A-Z])`, 'gi');
      translated = translated.replace(regex, (match, pre, abbr) => `${pre}${this.matchCase(british, abbr)}`);
    }
    // American-only terms
    const americanOnlySorted = Object.keys(this.americanOnly).sort((a, b) => b.length - a.length);
    for (const american of americanOnlySorted) {
      const regex = new RegExp(`\\b${this.escapeRegExp(american)}\\b`, 'gi');
      translated = translated.replace(regex, (match) => this.matchCase(this.americanOnly[american], match));
    }
    // Spelling differences
    const spellingSorted = Object.keys(this.americanToBritishSpelling).sort((a, b) => b.length - a.length);
    for (const american of spellingSorted) {
      const regex = new RegExp(`\\b${this.escapeRegExp(american)}\\b`, 'gi');
      translated = translated.replace(regex, (match) => this.matchCase(this.americanToBritishSpelling[american], match));
    }
    return translated;
  }

  // American to British (with highlights)
  translateToBritishWithHighlights(text) {
    if (!text) return text;
    let translated = text;
    translated = translated.replace(/\b(\d{1,2}):(\d{2})\b/g, (match, h, m) => this.highlight(`${h}.${m}`));
    for (const [american, british] of Object.entries(this.americanToBritishTitles)) {
      const base = american.replace('.', '');
      const regex = new RegExp(`(^|\\s)(${base}\\.?)(?=\\s[A-Z])`, 'gi');
      translated = translated.replace(regex, (match, pre, abbr) => `${pre}${this.highlight(this.matchCase(british, abbr))}`);
    }
    const americanOnlySorted = Object.keys(this.americanOnly).sort((a, b) => b.length - a.length);
    for (const american of americanOnlySorted) {
      const regex = new RegExp(`\\b${this.escapeRegExp(american)}\\b`, 'gi');
      translated = translated.replace(regex, (match) => this.highlight(this.matchCase(this.americanOnly[american], match)));
    }
    const spellingSorted = Object.keys(this.americanToBritishSpelling).sort((a, b) => b.length - a.length);
    for (const american of spellingSorted) {
      const regex = new RegExp(`\\b${this.escapeRegExp(american)}\\b`, 'gi');
      translated = translated.replace(regex, (match) => this.highlight(this.matchCase(this.americanToBritishSpelling[american], match)));
    }
    return translated;
  }

  // British to American
  translateToAmerican(text) {
    if (!text) return text;
    let translated = text;
    // Time
    translated = translated.replace(/\b(\d{1,2})\.(\d{2})\b/g, (match, h, m) => `${h}:${m}`);
    // Titles
    for (const [british, american] of Object.entries(this.britishToAmericanTitles)) {
      const regex = new RegExp(`(^|\\s)(${this.escapeRegExp(british)})(?=\\s[A-Z])`, 'gi');
      translated = translated.replace(regex, (match, pre, abbr) => `${pre}${this.matchCase(american, abbr)}`);
    }
    // British-only terms
    const britishOnlySorted = Object.keys(this.britishOnly).sort((a, b) => b.length - a.length);
    for (const british of britishOnlySorted) {
      const regex = new RegExp(`\\b${this.escapeRegExp(british)}\\b`, 'gi');
      translated = translated.replace(regex, (match) => this.matchCase(this.britishOnly[british], match));
    }
    // Spelling differences (reverse)
    const spellingSorted = Object.keys(this.britishToAmericanSpelling).sort((a, b) => b.length - a.length);
    for (const british of spellingSorted) {
      const regex = new RegExp(`\\b${this.escapeRegExp(british)}\\b`, 'gi');
      translated = translated.replace(regex, (match) => this.matchCase(this.britishToAmericanSpelling[british], match));
    }
    return translated;
  }

  // British to American (with highlights)
  translateToAmericanWithHighlights(text) {
    if (!text) return text;
    let translated = text;
    // Time
    translated = translated.replace(/\b(\d{1,2})\.(\d{2})\b/g, (match, h, m) => this.highlight(`${h}:${m}`));
    // Titles
    for (const [british, american] of Object.entries(this.britishToAmericanTitles)) {
      const regex = new RegExp(`(^|\\s)(${this.escapeRegExp(british)})(?=\\s[A-Z])`, 'gi');
      translated = translated.replace(regex, (match, pre, abbr) => `${pre}${this.highlight(this.matchCase(american, abbr))}`);
    }
    // British-only terms
    const britishOnlySorted = Object.keys(this.britishOnly).sort((a, b) => b.length - a.length);
    for (const british of britishOnlySorted) {
      const regex = new RegExp(`\\b${this.escapeRegExp(british)}\\b`, 'gi');
      translated = translated.replace(regex, (match) => this.highlight(this.matchCase(this.britishOnly[british], match)));
    }
    // Spelling differences (reverse)
    const spellingSorted = Object.keys(this.britishToAmericanSpelling).sort((a, b) => b.length - a.length);
    for (const british of spellingSorted) {
      const regex = new RegExp(`\\b${this.escapeRegExp(british)}\\b`, 'gi');
      translated = translated.replace(regex, (match) => this.highlight(this.matchCase(this.britishToAmericanSpelling[british], match)));
    }
    return translated;
  }

  // Escape special regex characters
  escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }
}

module.exports = Translator;