const chai = require('chai');
const assert = chai.assert;

const Translator = require('../components/translator.js');

suite('Unit Tests', () => {
  let translator;

  setup(() => {
    translator = new Translator();
  });

  suite('American to British English', () => {
    test('Translate Mangoes are my favorite fruit.', (done) => {
      const input = 'Mangoes are my favorite fruit.';
      const expected = 'Mangoes are my favourite fruit.';
      assert.equal(translator.translateToBritish(input), expected);
      done();
    });

    test('Translate I ate yogurt for breakfast.', (done) => {
      const input = 'I ate yogurt for breakfast.';
      const expected = 'I ate yoghurt for breakfast.';
      assert.equal(translator.translateToBritish(input), expected);
      done();
    });

    test('Translate We had a party at my friend\'s condo.', (done) => {
      const input = 'We had a party at my friend\'s condo.';
      const expected = 'We had a party at my friend\'s flat.';
      assert.equal(translator.translateToBritish(input), expected);
      done();
    });

    test('Translate Can you toss this in the trashcan for me?', (done) => {
      const input = 'Can you toss this in the trashcan for me?';
      const expected = 'Can you toss this in the bin for me?';
      assert.equal(translator.translateToBritish(input), expected);
      done();
    });

    test('Translate The parking lot was full.', (done) => {
      const input = 'The parking lot was full.';
      const expected = 'The car park was full.';
      assert.equal(translator.translateToBritish(input), expected);
      done();
    });

    test('Translate Like a high tech Rube Goldberg machine.', (done) => {
      const input = 'Like a high tech Rube Goldberg machine.';
      const expected = 'Like a high tech Heath Robinson device.';
      assert.equal(translator.translateToBritish(input), expected);
      done();
    });

    test('Translate To play hooky means to skip class or work.', (done) => {
      const input = 'To play hooky means to skip class or work.';
      const expected = 'To bunk off means to skip class or work.';
      assert.equal(translator.translateToBritish(input), expected);
      done();
    });

    test('Translate No Mr. Bond, I expect you to die.', (done) => {
      const input = 'No Mr. Bond, I expect you to die.';
      const expected = 'No Mr Bond, I expect you to die.';
      assert.equal(translator.translateToBritish(input), expected);
      done();
    });

    test('Translate Dr. Grosh will see you now.', (done) => {
      const input = 'Dr. Grosh will see you now.';
      const expected = 'Dr Grosh will see you now.';
      assert.equal(translator.translateToBritish(input), expected);
      done();
    });

    test('Translate Lunch is at 12:15 today.', (done) => {
      const input = 'Lunch is at 12:15 today.';
      const expected = 'Lunch is at 12.15 today.';
      assert.equal(translator.translateToBritish(input), expected);
      done();
    });
  });

  suite('British to American English', () => {
    test('Translate We watched the footie match for a while.', (done) => {
      const input = 'We watched the footie match for a while.';
      const expected = 'We watched the soccer match for a while.';
      assert.equal(translator.translateToAmerican(input), expected);
      done();
    });

    test('Translate Paracetamol takes up to an hour to work.', (done) => {
      const input = 'Paracetamol takes up to an hour to work.';
      const expected = 'Tylenol takes up to an hour to work.';
      assert.equal(translator.translateToAmerican(input), expected);
      done();
    });

    test('Translate First, caramelise the onions.', (done) => {
      const input = 'First, caramelise the onions.';
      const expected = 'First, caramelize the onions.';
      assert.equal(translator.translateToAmerican(input), expected);
      done();
    });

    test('Translate I spent the bank holiday at the funfair.', (done) => {
      const input = 'I spent the bank holiday at the funfair.';
      const expected = 'I spent the public holiday at the carnival.';
      assert.equal(translator.translateToAmerican(input), expected);
      done();
    });

    test('Translate I had a bicky then went to the chippy.', (done) => {
      const input = 'I had a bicky then went to the chippy.';
      const expected = 'I had a cookie then went to the fish-and-chip shop.';
      assert.equal(translator.translateToAmerican(input), expected);
      done();
    });

    test('Translate I\'ve just got bits and bobs in my bum bag.', (done) => {
      const input = 'I\'ve just got bits and bobs in my bum bag.';
      const expected = 'I\'ve just got odds and ends in my fanny pack.';
      assert.equal(translator.translateToAmerican(input), expected);
      done();
    });

    test('Translate The car boot sale at Boxted Airfield was called off.', (done) => {
      const input = 'The car boot sale at Boxted Airfield was called off.';
      const expected = 'The swap meet at Boxted Airfield was called off.';
      assert.equal(translator.translateToAmerican(input), expected);
      done();
    });

    test('Translate Have you met Mrs Kalyani?', (done) => {
      const input = 'Have you met Mrs Kalyani?';
      const expected = 'Have you met Mrs. Kalyani?';
      assert.equal(translator.translateToAmerican(input), expected);
      done();
    });

    test('Translate Prof Joyner of King\'s College, London.', (done) => {
      const input = 'Prof Joyner of King\'s College, London.';
      const expected = 'Prof. Joyner of King\'s College, London.';
      assert.equal(translator.translateToAmerican(input), expected);
      done();
    });

    test('Translate Tea time is usually around 4 or 4.30.', (done) => {
      const input = 'Tea time is usually around 4 or 4.30.';
      const expected = 'Tea time is usually around 4 or 4:30.';
      assert.equal(translator.translateToAmerican(input), expected);
      done();
    });
  });

  suite('Highlight translation', () => {
    test('Highlight translation in Mangoes are my favorite fruit.', (done) => {
      const input = 'Mangoes are my favorite fruit.';
      const expected = 'Mangoes are my <span class="highlight">favourite</span> fruit.';
      assert.equal(translator.translateToBritishWithHighlights(input), expected);
      done();
    });

    test('Highlight translation in I ate yogurt for breakfast.', (done) => {
      const input = 'I ate yogurt for breakfast.';
      const expected = 'I ate <span class="highlight">yoghurt</span> for breakfast.';
      assert.equal(translator.translateToBritishWithHighlights(input), expected);
      done();
    });

    test('Highlight translation in We watched the footie match for a while.', (done) => {
      const input = 'We watched the footie match for a while.';
      const expected = 'We watched the <span class="highlight">soccer</span> match for a while.';
      assert.equal(translator.translateToAmericanWithHighlights(input), expected);
      done();
    });

    test('Highlight translation in Paracetamol takes up to an hour to work.', (done) => {
      const input = 'Paracetamol takes up to an hour to work.';
      const expected = '<span class="highlight">Tylenol</span> takes up to an hour to work.';
      assert.equal(translator.translateToAmericanWithHighlights(input), expected);
      done();
    });
  });
});
