$(function () {
  setAdBanner();
  setAdSticky();
});

function setAdBanner() {
  let refContainer = $(".meetOurteamcontainer");
  let adBanner = document.createElement("div");
  let adBannerCloseBtn = document.createElement("div");

  $(adBanner).insertBefore(refContainer);
  $(adBanner).append(adBannerCloseBtn);

  $(adBanner).attr("class", "addedBanner container");
  $(adBannerCloseBtn).attr("class", "addedBannerCloseBtn");

  $(adBannerCloseBtn).click(function (){
    $(adBanner).hide(300);
  });
}

function setAdSticky() {
  let refContainer = $(".mainContainer");
  let adSticky = document.createElement("div");
  let adStickyCloseBtn = document.createElement("div");
  let cube = document.createElement("div");
  let left = document.createElement("div");
  let front = document.createElement("div");
  let right = document.createElement("div");

  $(refContainer).append(adSticky);
  $(adSticky).append(adStickyCloseBtn);
  $(adSticky).append(cube);
  $(cube).append(left);
  $(cube).append(front);
  $(cube).append(right);

  $(adSticky).attr("class", "addedSticky");
  $(adStickyCloseBtn).attr("class", "addedStickyCloseBtn");
  $(cube).attr("class", "cube showLeft");
  $(left).attr("class", "cubeFace cubeLeft");
  $(front).attr("class", "cubeFace cubeFront");
  $(right).attr("class", "cubeFace cubeRight");

  $(adStickyCloseBtn).click(function (){
    $(adSticky).hide(300);
  });

  loadContent();
  startAnimation();
}

async function loadContent() {
  try {
    let response = await fetch("https://v2.jokeapi.dev/joke/Any");
    if (!response.ok) {
      throw new Error("Here we go again");
    }
    let jsonData = await response.json();
    $(".cubeLeft").html("<p> Category <br>" + jsonData.category + "</p>");
    $(".cubeFront").html("<p> Type <br>" + jsonData.type + "</p>");
    $(".cubeRight").html("<p> Id <br>" + jsonData.id + "</p>");
  }
  catch (err) {
    console.log(err.message);
  }
}

function startAnimation() {

  setInterval(function () {
    currClass = $(".cube").attr("class");
    currClass = currClass.split(" ").pop();

    switch (currClass) {
      case "showLeft":
        $(".cube").removeClass("showLeft").addClass("showFront");
        break;
      case "showFront":
        $(".cube").removeClass("showFront").addClass("showRight");
        break;
      case "showRight":
        $(".cube").removeClass("showRight").addClass("showLeft");
        break;
      default:
        console.log("currClass = " + currClass);
    }
  }, 3000);
}
