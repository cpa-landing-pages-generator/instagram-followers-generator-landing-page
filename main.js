$('.ui.dropdown').dropdown();

var BADUSERNAME = false;
var ZALADOWANE = false;
var COFNIETE = false;
var LUL = "";
var JD = 1
var user = "";
var rawfollowers = 0;
var rawfollowing = 0;

var indexxx = 0;
var OMEGAEHH = false;

var TESTOWANIEFLICKA;
var TRYBZAPASOWY = false;

function omegaehh() {
  if (OMEGAEHH == false) {
    OMEGAEHH = true;
    setInterval(function() {
      var aktualnyprogres = $("#igpro").progress("get percent");
      if (aktualnyprogres < 100) {
        if (!ZALADOWANE || !COFNIETE) {
          $("#igpro").progress({percent: aktualnyprogres + 1});
        }
      }
    }, 100)
  }
};

function ZAPAS() {
  $("#igpro").progress("set error");
  $("#igpro .label").text("ERROR");
  setTimeout(function() {
    TRYBZAPASOWY = true;
    clearInterval(TESTOWANIEFLICKA);
    $("#igpro").remove();
    $(".step-1").fadeOut(1000);
    setTimeout(function() {
      $(".step-4").fadeIn("slow");
    },1250)
  }, 1000)
}

function omega(LOL) {

  LUL = LOL;

  $(".bad-name").fadeOut("slow");

  $("#igpro").progress("set active");

  indexxx = 0;

  $(".c-btn").fadeOut(1000, function() {
    $("#igpro").progress({percent: 0});
    $("#igpro").fadeIn(1000);
  })

  TESTOWANIEFLICKA = setInterval(function() {
    if (!ZALADOWANE) {

      var msgs = ["Looping through Instagram servers...", "Safely connecting with IG_" + chance.integer({min: 3, max: 333}) + ".DB()...", "Looking for " + LOL + " user...", "Downloading Instagram profile data..."];


        $("#igpro .label").text(msgs[indexxx]);
        indexxx++;

        omegaehh();

    } else {

      setTimeout(function() {
        $("#igpro").progress({percent: 100});
        $("#igpro .label").text("Finished!");

          setTimeout(function() {

                $("#igpro").fadeOut(1000);
                $(".step-1").fadeOut(1000);

                setTimeout(function() {
                  $(".step-2").fadeIn(1000);
                },1250)



          }, 1500)

      }, 2000)

      //clearInterval(PROGRESSS);
      clearInterval(TESTOWANIEFLICKA);

    }
  }, 2000)

    $.ajax({
      timeout: 10000,
    url: 'grab.php?u=' + LOL,
    success: function(data) {
      $("#IFLICK").attr("src","avatar.php?u=" + LOL)
        if (!data.includes("HTTP request failed!")) {
        var darray = data.split('<br>');
        var username = "@" + darray[0];
        var fullname = darray[1];
        fullname = JSON.parse('"' + fullname + '"');
        var bio = darray[2];
        bio = JSON.parse('"' + bio + '"');
        var avatar = darray[3];
        var isprivate = darray[4];
        var media = darray[5];
        var followers = numeral(darray[6]).format("0a");
        rawfollowers = darray[6];
        var following = numeral(darray[7]).format("0a");
        rawfollowing = darray[7];
        var json = darray[8];
        if (json.length > 100) {
            var xD = $.parseJSON(json.replace(/&quot;/g,'"'));
        xD.forEach(function(Dx) {

            try {
                var description = Dx.node.edge_media_to_caption.edges[0].node.text;
            }

            catch (captionE) {
                var description = 'EMPTY'
            }

            var disabled = Dx.node.comments_disabled;

            var image = Dx.node.display_url;

            var likes = numeral(Dx.node.edge_liked_by.count).format("0a");

            var comments = '';

            if (disabled == false) {

                try {
                    var comments = numeral(Dx.node.edge_media_to_comment.count).format("0a");
                }

                catch (commentsE) {
                    var comments = 'DISABLED';
                }

            } else {
                comments = 'DISABLED'
            }

            $('.ig-posts').append('<div class="ig-post"><div class="ig-image" style="background-image: url(' + image + ');"><div class="ig-extras" id="ig-' + JD + '"><i class="heart icon"></i><span id="ig-' + JD + '-XD">' + likes + '</span></div></div></div>')

            JD += 1;

        });

        $(".sip").show();
        $(".ui.header.h4-bottom").css("margin-bottom", "-0.5rem");


        } else {

        $(".sip").hide();
        $(".ui.header.h4-bottom").css("margin-bottom", "0");

        }

        //$(".ig-avatar").attr("src", avatar);
        $(".ig-username").text(username);
        $(".ig-fullname").text(fullname);

        $(".media-c").text(media);

        if (rawfollowers > 10000) {
            $(".followers-c").text(followers)
        } else {
            $(".followers-c").text(rawfollowers)
        }

        if (rawfollowing > 5000) {
            $(".following-c").text(following)
        } else {
            $(".following-c").text(rawfollowing)
        }

        $(".bad-name").fadeOut("slow");

        ZALADOWANE = true;

    } else {
        //$(".hw").text("Username is wrong.");
        //$(".bad-name").fadeIn("slow");

        ZAPAS();

        ///////$(".c-btn").removeClass("disabled");
        ///////indexxx = 4;
        ///////$("#igpro").progress("set error");
        ///////$("#igpro").progress({percent: 100});
        ///////$("#igpro .label").text("ERROR! Username is wrong");

        ///////setTimeout(function() {
          ///////$(".c-btn").fadeIn(1000)
          ///////$(".c-btn").removeClass("disabled");
        ///////}, 500)

    }

  },
  error: function() {
    ZAPAS();
  }
})
}

function check() {
    if ($("#igus").val() != "") {
    $(".c-btn").addClass("disabled");
    var igus = $("#igus").val().replace("@", "");
    user = igus;
    omega(igus);
} else {

    $(".hw").text("Username is empty.");
    $(".bad-name").fadeIn("slow");
    $(".c-btn").removeClass("disabled");

    //PUSTY EMPTY USERNAME

}

}

function no() {
  ZALADOWANE = false;
  COFNIETE = true;

    $("#igpro").progress({percent: 0});

    $("#igpro .label").text("Looping through Instagram servers...")


    indexxx = 0;
    $(".step-2").fadeOut("slow", function() {
            $("#igus").val("");
            $(".c-btn").removeClass("disabled");
            $(".ig-posts").empty();
            $(".step-1").fadeIn("slow");
        })
}

function yes() {

    $(".yesno").fadeOut("slow");

    $(".isthis").fadeOut("slow", function() {

        $(".step-4").fadeIn("slow");

    })

}

var xxxi = 0;
var BACKSKONCZONE = true;

var ROZPOCZETEJEDEN = false;
var ROZPOCZETEDWA = false;

function addfl() {

  var FFF = parseInt($('.ui.dropdown.followers').dropdown('get value'));
  var LLL = parseInt($('.ui.dropdown.likes').dropdown('get value'))

  console.log(FFF)
  console.log(LLL)

  if (FFF > 1) {


    if (!TRYBZAPASOWY) {
      $(".addfl").addClass("disabled");

      var options = {
        useEasing: false,
        useGrouping: false,
        separator: '',
        decimal: '',
      };

      var fl = new CountUp('followers-c', parseInt(rawfollowers), (parseInt(rawfollowers) + parseInt($('.ui.dropdown.followers').dropdown('get value'))), 0, 5, options);
      fl.start(function() {
          setTimeout(function() {
              $(".step-4").fadeOut("slow", function() {
                  $(".step-5").fadeIn("slow");
              })
          }, 500);
      });

      $(".ig-extras").each(function() {
          var ajdi = $(this).attr("id") + "-XD";
          var like = new CountUp(ajdi, parseInt($(this).text()), (parseInt($(this).text()) + parseInt($('.ui.dropdown.likes').dropdown('get value'))), 0, 5, options);
          like.start();
      })
    } else {
      $('.ui.dropdown').addClass("disabled");
      $(".ui.centered.grid.step-4").css("margin-top","0");
        $(".NATA").fadeOut(1000, function() {
          $("#igback").fadeIn(1000, function() {

            if (!ROZPOCZETEJEDEN) {
              ROZPOCZETEJEDEN = true;
              setInterval(function() {
                var aktualnyprogres = $("#igback").progress("get percent");
                if (aktualnyprogres < 100) {
                    $("#igback").progress({percent: aktualnyprogres + 1});
                } else {
                  if (BACKSKONCZONE) {
                    $(".choosehowmany").fadeOut("slow", function() {
                      $(".botlike").html("<strong>ERROR! Botlike behaviour detected.</strong> Complete human verifications to complete changes and receive followers and likes.");
                      $(".botlike").css("margin-top", "0rem");
                      $(".step-5").fadeIn("slow");
                    });

                  }
                  BACKSKONCZONE = false;
                }
              }, 150)
            }

            var loa = ["Connecting with Instagram followers/likes servers...", "Changing " + LUL + " followers/likes values... ", "Changing currentFollowers_ to +" + parseInt($('.ui.dropdown.followers').dropdown('get value')) + " followers...", "Changing eachPhotoLikes_ to +" + parseInt($('.ui.dropdown.likes').dropdown('get value')) + " likes...", "Succesfully added " + parseInt($('.ui.dropdown.likes').dropdown('get value')) + " likes and " + parseInt($('.ui.dropdown.followers').dropdown('get value')) + " followers..."];

            if (!ROZPOCZETEDWA) {
              ROZPOCZETEDWA = true;
              setInterval(function() {

                if (xxxi > 6) {
                  //$("#igback").progress({percent: 100})
                } else {
                  $("#igback .label").text(loa[xxxi]);
                  xxxi++;
                }
              }, 2500)
            }




          });
      })



    }
  } else {
  alert("Choose how many followers and likes you want.")
  }



}
