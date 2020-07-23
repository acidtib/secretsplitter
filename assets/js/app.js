$(document).ready(function(){

  init()

  $(".split-btns .split-type").on("click", function (event) {
    event.preventDefault();

    let type = $(this).data("split")
    let normal = ""
    let seedSize = 0

    if (type == "seed") {
      seedSize = $(this).text()
      $(".seed-size").text(": " + seedSize)
    }

    normal = normalName(type)

    $(".splitting").text(": " + normal)

    console.log(type)
    console.log(seedSize)
  });

});

function init() {
  console.log("init")

  $(".splitting").text(": Mnemonic Seed")
  $(".seed-size").text(": 12")
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


