var WordPOS = require('wordpos');

$(document).ready(() => {
  var wordpos = new WordPOS();
  let allResults = [];

  const readyToReturn = (results) => {
    if (results.indexOf(undefined) > -1) {
      return false;
    } else {
      return true;
    }
  };

  const processSentence = (sentence, index) => {
    var words = sentence.split(' ');
    var results = [];

    words.forEach((word, i) => {
      if (word.length <= 3) {
        results[i] = words[i];
        if (readyToReturn(results)) {
          allResults[index] = results.join(" ");
          if (readyToReturn(allResults)) {
            $('.raps').val(allResults.join("\n"));
          };
        };
      } else {
        let meaning = $('.meaning').val();
        wordpos.getPOS(word, (result) => {
          console.log(result);
        });

        $.ajax({
          url: `https://api.datamuse.com/words?ml=${meaning}&rel_rhy=${word}`
        }).then((data) => {
          if (data.length > 0) {
            results[i] = data[0].word;
            if (readyToReturn(results)) {
              allResults[index] = results.join(" ");
              if (readyToReturn(allResults)) {
                $('.raps').val(allResults.join("\n"));
              };
            };
          } else {
            results[i] = words[i];
            if (readyToReturn(results)) {
              allResults[index] = results.join(" ");
              if (readyToReturn(allResults)) {
                $('.raps').val(allResults.join("\n"));
              };
            };
          };
        });
      };
    });
  };

  $('.generate').on('click', () => {
    const lines = $('.raps').val().split('\n');
    lines.forEach((line, i) => {
      processSentence(line, i);
    });
  });
});
