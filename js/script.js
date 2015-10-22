const photosList = ["1.jpg", 
                    "2.jpg", 
                    "3.jpg", 
                    "4.jpg", 
                    "5.jpg", 
                    "6.jpg",
                    "7.jpg",
                    "7.JPG",
                    "8.jpg",
                    "9.jpg",
                    "10.jpg",
                    "11.jpg",
                    "12.jpg",
                    "13.jpg",
                    "14.jpg",
                    "15.jpg",
                    "16.jpg",
                    "17.jpg",
                    "18.jpg",
                    "19.jpg",
                    "20.jpg",
                    "21.jpg",
                    "22.jpg",
                    "23.jpg",
                    "24.jpg",
                    "25.jpg",
                    "o1.JPG", 
                    "o2.JPG", 
                    "o3.JPG", 
                    "o4.JPG", 
                    "o5.PNG", 
                    "o6.JPG",
                    "26.JPG",
                    "a.jpg",
                    "b.jpg",
                    "c.jpg",
                    "d.jpg",
                    "david.png", "10_05l-1.jpg","10_05l-2.jpg","10_05l-3.jpg","10_05l-4.jpg","10_05l-5.jpg","10_05l-6.jpg","10_05l-7.jpg","10_05l-8.jpg","10_05l-9.jpg","10_05l-10.jpg","10_05l-11.jpg","10_05l-12.jpg","10_05l-13.jpg","10_05l-14.jpg"];

const photosShowMoreList = [
                    ];
const quotes = [
  { handle: "@009minions", 
    message: "Let's get it... we'll call it 2.00b research" },
  { handle: "@009minions", 
    message: "They're cute, they look like mice with wings!" },
  { handle: "@009minions", 
    message: "I might steal your pants, David" },
  { handle: "Overheard in Pappalardo", 
    message: "You should try a little harder" },
  { handle: "@009minions", 
    message: "Here, bring this meowth with you" },
  { handle: "@009minions", 
    message: "2.009 is my exercise" },
  { handle: "Tweet Tweet!", 
    message: "Follow @PappalardoLab on Twitter!" },
  { handle: "Instagram!", 
    message: "Use #009mit to see your picture here!" },
  { handle: "@009minions", 
    message: "We can fit a lot of tongues on one bed" },
  { handle: "#009mit", 
    message: "Use our hash tag #009mit on Instagram!" },
  { handle: "send us content!", 
    message: "email exciting photos/videos to 2009ta@mit.edu :)" },
  ]

const colors = ["rgba(255, 0, 0, 0.7)",
                "rgba(58, 47, 204, 0.7)",
                "rgba(24, 160, 118, 0.7)",
                "rgba(103, 32, 206, 0.7)",
                "rgba(211, 182, 13, 0.7)",
                "rgba(229, 136, 0, 0.7)"]

const videosList = ["plotter.mp4", "mounting.mp4", "hardhatassembly.mp4", "safetyglasses.mp4", "assemblinghardhats.mp4"];

const slideSpeed = 1500;
const pauseTime = 10000 // 10000;

quoteWeight = 1;
instaWeight = 5;
liveFeedWeight = 2;
showMoreWeight = 4;
timeWeight = 2;
videoWeight = 1 // 2;
regPhotoWeight = 1;

weightSum = quoteWeight + instaWeight + liveFeedWeight + showMoreWeight + videoWeight + regPhotoWeight + timeWeight;

var quoteProb = (quoteWeight / weightSum);
var instaProb = quoteProb + (instaWeight / weightSum);
var liveFeedProb = instaProb + (liveFeedWeight / weightSum);
var showMoreProb = liveFeedProb + (showMoreWeight / weightSum);
var timeProb = showMoreProb + (timeWeight / weightSum);
var videoProb = timeProb + (videoWeight / weightSum);

var instaList = [];
var counter = 1;
var prevSlide = '';
var timeClosing;

function checkReload() {
  $.get('reload', function(data) {
    console.log('checking reload...', data)
    if (data != localStorage.getItem("reloadCheck")) {
      localStorage.setItem("reloadCheck", data)
      console.log('reloading...')
      location.reload();  
    }
  });
}

function moveSlide(id) {
  $('.container').animate({left: "-=100%"}, slideSpeed, function() {
    $('#' + (id-1)).remove();
    $(this).css("left", 0);
  });
}

function getRandomImage() {
  return 'images/' + photosList[Math.floor(Math.random()*photosList.length)]
}

function getRandomVideo() {
  return 'videos/' + videosList[Math.floor(Math.random()*videosList.length)]
}

function getRandomShowMoreImage() {
  for (i = 1; i < 32; i++) {
    photosShowMoreList.push(('b'+i+'.jpg'));
  }
  return 'images/showmore/' + photosShowMoreList[Math.floor(Math.random()*photosShowMoreList.length)]
}

function getRandomQuote() {
  return quotes[Math.floor(Math.random()*quotes.length)]
}

function getRandomColor() {
  return colors[Math.floor(Math.random()*colors.length)]
}

function getRandomInsta() {
  return instaList[Math.floor(Math.random()*instaList.length)]
}

function formatQuote(handle, message) {
  return '<h1>'+handle+'</h1><h2>'+message+'</h2>'
}

function updateCountdownClock() {
  t = new Date();
  h = t.getHours();
  m = t.getMinutes();
  s = t.getSeconds();
  totalSeconds = m*60+s;
  secondsLeft = 60*60 - totalSeconds;
  mLeft = Math.floor(secondsLeft / 60);
  sLeft = secondsLeft % 60
  mLeft = Math.max(mLeft, 0)
  sLeft = Math.max(sLeft, 0)
  // overflow
  if (mLeft > 15) {
    clearInterval(timeClosing);
    $('.lab-closing').hide();
    $('.lab-closed').show();
  }
  if (sLeft < 10) {
    sLeft = '0' + sLeft;
  }
  $('.time-closing').text(mLeft+':'+sLeft);
}
function makeSlide() {

  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  // reminder to add 12 to hour

  console.log(m, h);

  su = '';
  if (h == 14) {
    if (m >= 50) {
      su = getSlideUpload(2)
    } else if (m >= 40) {
      su = getSlideUpload(1)
    }
  } else if (h == 15) {
    if (m >= 50) {
      su = getSlideUpload(8)
    } else if (m >= 40) {
      su = getSlideUpload(7)
    } else if (m >= 30) {
      su = getSlideUpload(6)
    } else if (m >= 20) {
      su = getSlideUpload(5)
    } else if (m >= 10) {
      su = getSlideUpload(4)
    } else {
      su = getSlideUpload(3)
    }
  } else if (h == 16) {
    if (m >= 50) {
      su = getSlideUpload(14)
    } else if (m >= 40) {
      su = getSlideUpload(13)
    } else if (m >= 30) {
      su = getSlideUpload(12)
    } else if (m >= 20) {
      su = getSlideUpload(11)
    } else if (m >= 10) {
      su = getSlideUpload(10)
    } else {
      su = getSlideUpload(9)
    }
  } else if (h == 17) {
    if (m < 10) {
      su = getSlideUpload(15)
    } else if (m < 20) {
      su = getSlideUpload(16)
    }
  }

  if (su != '') {
    $('.slide-upload').show();
    $('.slide-upload').find('.lab-closed-msg').html('<span class="heading">SLIDE UPLOAD:</span> <br />' + su)
  }
  /*
  if (m >= 45 && m < 60 && h == 16) {
    // lab is about to close
    $('.lab-closing').show();
    timeClosing = setInterval(updateCountdownClock, 200)
  } else if ((h >= 17 && h < 18) || h == 21) {
    clearInterval(timeClosing);
    $('.lab-closing').hide();
    $('.lab-closed').show();
  } else {
    $('.lab-closing').hide();
    $('.lab-closed').hide();
  }
  */
  var $newSlide = $('<div id="'+counter+'" class="slide"></div>');
  // $newSlide.css('-webkit-filter', 'grayscale(1)')

  var nextSlide = '';
  while (nextSlide == '' || nextSlide == prevSlide) {
    var r = Math.random();
    if (r < quoteProb) {
      nextSlide = 'QUOTE';
    } else if (r < instaProb) {
      nextSlide = 'INSTA';
    } else if (r < liveFeedProb) {
      nextSlide = 'LIVEFEED';
    } else if (r < showMoreProb) {
      nextSlide = 'SHOWMOREPHOTO'
    } else if (r < timeProb) {
      nextSlide = 'TIME'
    } else if (r < videoProb) {
      nextSlide = 'VIDEO'
    } else {
      nextSlide = 'PHOTO';
    }
  }

  prevSlide = nextSlide;

  if (nextSlide == 'QUOTE') {
    // Generate a Random Quote

    var q = getRandomQuote();
    $quoteBox = $('<div class="quotebox" style="background-color: ' + getRandomColor() + ';"><div class="quotecenter">' + formatQuote(q.handle, q.message) + '</div></div>');
    $newSlide.append($quoteBox)
    $newSlide.css('background-image', 'url("' + getRandomImage() + '")');

  } else if (nextSlide == 'INSTA') {
    // Generate an Instagram Post

    var insta = getRandomInsta();
    var height = $(window).height();

    //$quoteBox = $('<div class="quotebox instagram"><div class="quotecenter">' + formatQuote('#009 Instagram', insta.instaCaption) + '</div></div>');
    // $newSlide.append($quoteBox)
    $instaImage = $('<div class="instaContainer"></div>')
    $instaImage.css('height', height)
      .css('width', height)
      .css('background-image', 'url("' + insta.img + '")');
    $newSlide.addClass('instaImage');
    $newSlide.append($instaImage);
    $newSlide.append('<div class="instaTextContainer">' + formatQuote('#009 Instagram', insta.instaCaption) + '</div>');

  } else if (nextSlide == 'LIVEFEED') {
    var cameraIDList = ['Wu9P2I', 'as1hHV', 'Xr6ruW', '4MkaKg'];
    var cameraID = cameraIDList[Math.floor(Math.random()*cameraIDList.length)];
    $newSlide.append('<iframe style="top: -5%; left: -30%; position: relative;" type="text/html" frameborder="0" width="160%" height="110%" src="//video.nest.com/embedded/live/' + cameraID + '?autoplay=1" /></iframe>');
  } else if (nextSlide == 'SHOWMOREPHOTO') {
    // Generate just a plain ol' photo
    $newSlide.css('background-image', 'url("' + getRandomShowMoreImage() + '")');

  } else if (nextSlide == 'TIME') {
    // Generate the time
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var ampm = (h >= 12) ? "PM" : "AM";
    h = h%12;
    if (h == 0) {
      h = 12;
    }
    if (m < 10) {
      m = '0' + m;
    }
    $quoteBox = $('<div class="quotebox"><div class="quotecenter time-display">' + h + ':' + m + ' ' + ampm + '</div></div>');
    $newSlide.append($quoteBox)
    $newSlide.css('background-image', 'url("' + getRandomImage() + '")');

  } else if (nextSlide == 'VIDEO') {
    // Generate the time

    $videoBox = $('<video autoplay><source src="' + getRandomVideo() + '" type="video/mp4"><source src="' + getRandomVideo() + '" type="video/mp4"></video>');
    $newSlide.append($videoBox)

  } else {
    // Generate just a plain ol' photo
    $newSlide.css('background-image', 'url("' + getRandomImage() + '")');
  }

  $('.container').append($newSlide)
}

function makeAndMoveSlides() {


  makeSlide();
  counter ++;
  // if (counter < 3) { //debugging
    setTimeout(function() {
      checkReload();
      moveSlide(counter-1);
      setTimeout(function() {
        makeAndMoveSlides();
      }, (pauseTime + slideSpeed));
    }, pauseTime);
  // }
}

// Returns Slide Upload Cover
function getSlideUpload(i) {
  var sectionOrder = ['Red B', 'Blue B', 'Blue A', 'Pink A', 'Pink B', 'Yellow B', 'Red A', 'Silver A', 'Purple A', 'Orange B', 'Green A', 'Purple B', 'Green B', 'Yellow A', 'Orange A', 'Silver B'];
  return sectionOrder[(i-1)]
}

function init() {
  // generate slide 1

  $('#instafeed div').each(function() {
    instaList.push({
      img: $(this).find('.img').text(),
      instaCaption: $(this).find('.caption').text()
    })
  })

  makeSlide();

  counter ++;
  console.log('making initial slide');

  // Set Hard Refresh after 5 minutes
  setTimeout(function() {
    location.reload(); 
  }, 300000);

  setTimeout(function() {
    makeAndMoveSlides();
  }, pauseTime);

}

$(function() {
  var feed = new Instafeed({
      get: 'tagged',
      tagName: '009mit',
      clientId: '580b83bbc229433f8dd23c1806f9e7d8',
      resolution: 'standard_resolution',
      template: '<div><span class="img">{{image}}</span><span class="caption">{{caption}}</span></div>',
      after: function() {
        init();
      }
  });
  feed.run();
  checkReload();


})