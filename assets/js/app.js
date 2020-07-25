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
  })

  $(".split-the-secret .btn").on("click", function (event) {
    event.preventDefault()

    let data = ""

    let secretoType = $('.split-the-secret .btn').attr("data-secreto")

    if (secretoType == "text") {
      data = $('.entry-text textarea').val()
    }

    if (secretoType == "private-key") {
      data = $('.entry-private-key input').val()
    }

    if (secretoType == "seed") {
      var theSeed = new Array()

      $(".seed-input-group .input-group input").each( function( key, value ) {
        let num = key + 1
        let word = $(this).val()

        theSeed.push(num + ': ' + word)
      })

      data = theSeed.join("  ")
    }

    splitSecret(data)
  })


  $(".shares-input .clear-shares-input").on("click", function (event) {
    event.preventDefault()

    $('.shares-input .inputs').empty()

    $('.reconstruct-result').hide()
    $('.reconstruct-result textarea').empty()

    addSharesInput()
  })

  $(".shares-input .add-shares-input").on("click", function (event) {
    event.preventDefault()

    addSharesInput()
  })

  $(".reconstruct-the-secret").on("click", function (event) {
    event.preventDefault()

    combineSecret()
  })

})

function init() {
  $(".splitting").text(": Text")
  render('text')
}

function normalName(type) {
  switch (type) {
    case "seed":
      return "Mnemonic Seed"
      break
    case "private-key":
      return "Private Key"
      break
    case "text":
      return "Text"
      break
  }
}

function render(type) {
  $('.split-the-secret .btn').attr("data-secreto", type)
  
  switch (type) {
    case "seed":
      $('.entry-private-key').hide()
      $('.entry-text').hide()

      $('.entry-seed').show()
      break
    case "private-key":
      $('.entry-seed').hide()
      $('.entry-text').hide()

      renderPrivateKeyInput()
      break
    case "text":
      $('.entry-private-key').hide()
      $('.entry-seed').hide()

      renderTextInput()
      break
  }
}

function renderSeedInput(words) {
  $('.seed-input-group').empty()

  $.each(new Array(parseInt(words)), function(n) {
    let num = n + 1

    let temp = `
      <div class="col-md-4 mb-3">
        <div class="input-group">
          <span class="input-group-text">`+ num + `.</span>
          <input type="text" class="form-control" placeholder="enter word `+ num +`">
        </div>
      </div>
    `

    $('.seed-input-group').append(temp)
  })
}

function renderPrivateKeyInput() {
  $('.entry-private-key').show()
}

function renderTextInput() {
  $('.entry-text').show()
}

function splitSecret(secret) {
  let threshold = parseInt($('.threshold').val())
  let totalShares = parseInt($('.total-shares').val())
  let padLength = 1024
  
  // convert the text into a hex string
  var toHex = secrets.str2hex(secret)

  // split into shares, with a threshold
  var parts = secrets.share(toHex, totalShares, threshold, padLength)

  $('.split-parts').empty()

  $.each( parts, function( key, value ) {
    let num = key + 1

    $('.split-parts').append(`
      <div class="input-group mb-2">
        <span class="input-group-text">`+ num +`.</span>
        <input type="text" class="form-control" value="`+ value +`">
      </div>
    `)

    $('.parts').show()
  })
}

function combineSecret() {
  const theShares = new Array()

  $(".shares-input .inputs input").each( function( key, value ) {
    let share = $(this).val()

    theShares.push(share)
  })

  let comb = secrets.combine(theShares)

  let data = secrets.hex2str(comb)

  $('.reconstruct-result textarea').val(data)
  $('.reconstruct-result').show()
}

function addSharesInput() {
  $('.shares-input .inputs').append(`
    <input type="text" class="form-control mb-2" placeholder="enter a share">
  `)
}