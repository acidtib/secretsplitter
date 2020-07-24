$(document).ready(function(){

  init()

  $(".split-btns .split-type").on("click", function (event) {
    event.preventDefault()

    let type = $(this).data("split")
    let normal = ""
    let seedSize = 0

    if (type == "seed") {
      seedSize = $(this).text()
      $(".seed-size").text(": " + seedSize)
      renderSeedInput(seedSize)
    }

    normal = normalName(type)

    $(".splitting").text(": " + normal)

    render(type)
  });

  $(".split-the-secret .btn").on("click", function (event) {
    event.preventDefault()

    splitSecret("helllo")
  });

});

function init() {
  $(".splitting").text(": Mnemonic Seed")
  $(".seed-size").text(": 12")
  renderSeedInput(12)
  render('seed')
}

function normalName(type) {
  switch (type) {
    case "seed":
      return "Mnemonic Seed"
      break;
    case "private-key":
      return "Private Key"
      break;
    case "text":
      return "Text"
      break;
  }
}

function render(type) {
  $('.split-the-secret').attr("data-secreto", type)
  
  switch (type) {
    case "seed":
      $('.entry-private-key').hide()
      $('.entry-text').hide()

      $('.entry-seed').show()
      break;
    case "private-key":
      $('.entry-seed').hide()
      $('.entry-text').hide()

      renderPrivateKeyInput()
      break;
    case "text":
      $('.entry-private-key').hide()
      $('.entry-seed').hide()

      renderTextInput()
      break;
  }
}

function renderSeedInput(words) {
  $('.seed-input-group').empty();

  $.each(new Array(parseInt(words)), function(n) {
    let num = n + 1

    let temp = `
      <div class="col-md-4 mb-3">
        <div class="input-group">
          <span class="input-group-text">`+ num + `.</span>
          <input type="text" class="form-control">
        </div>
      </div>
    `

    $('.seed-input-group').append(temp)
  });
}

function renderPrivateKeyInput() {
  $('.entry-private-key').show()
}

function renderTextInput() {
  $('.entry-text').show()
}

function splitSecret(secret) {
  // convert the text into a hex string
  var toHex = secrets.str2hex(secret) // => hex string

  // split into 5 shares, with a threshold of 3
  var parts = secrets.share(toHex, 5, 3)


  $('.split-parts').append(parts)


  console.log(parts)
}