'use strict';

const Translator = require('../components/translator.js');

module.exports = function (app) {
  
  const translator = new Translator();

  app.route('/api/translate')
    .post((req, res) => {
      const { text, locale } = req.body;
      
      // Check if text is provided
      if (typeof text === 'undefined') {
        return res.json({ error: 'Required field(s) missing' });
      }
      
      // Check if locale is provided
      if (!locale) {
        return res.json({ error: 'Required field(s) missing' });
      }
      
      // Check if text is empty (after checking if it exists)
      if (text.trim() === '') {
        return res.json({ error: 'No text to translate' });
      }
      
      // Check if locale is valid
      if (locale !== 'american-to-british' && locale !== 'british-to-american') {
        return res.json({ error: 'Invalid value for locale field' });
      }
      
      let rawTranslation, highlightedTranslation;
      
      if (locale === 'american-to-british') {
        rawTranslation = translator.translateToBritish(text);
        highlightedTranslation = translator.translateToBritishWithHighlights(text);
      } else {
        rawTranslation = translator.translateToAmerican(text);
        highlightedTranslation = translator.translateToAmericanWithHighlights(text);
      }
      
      // If no translation occurred, return the original text
      if (rawTranslation === text) {
        return res.json({ 
          text: text,
          translation: 'Everything looks good to me!'
        });
      }
      
      return res.json({
        text: text,
        translation: highlightedTranslation
      });
    });
};
