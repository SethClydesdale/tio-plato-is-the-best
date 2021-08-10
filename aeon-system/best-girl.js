(function (window, document) {
  'use strict';
  
  window.bestGirl = { // that would be Tio of course
    tio : [], // slides
    index : -1, // slide show index
    placeholder : document.getElementById('tio-placeholder'), // temp placeholder for loading and stating who best girl is among other things
    duration : 6000, // image duration (1000ms is dedicated to fading in/out, so actual visible duration is DURATION-1000)
    
    // Tio's music assets
    music : document.getElementById('music'), // music player
    sprite : document.getElementById('tio').getElementsByTagName('IMG')[0], // our cute little tio sitting on the bottom right
    track : 0, // current track (for the playlist below)
    playlist : [ // some of my most favorite tracks from Zero/Ao (+CSIV's mystic core remix, cause mystic core is literally the best)
      'A Light Illuminating The Depths -Super Arrange-',
      'A Light Illuminating The Depths',
      'Advancing Bravery',
      'Aoi Kiseki',
      'Aoki Shizuku',
      'Conflicting Passions',
      'Formidable Enemy -Super Arrange-',
      'Formidable Enemy',
      'Geo-Front',
      'Get Over The Barrier! -Roaring Version-',
      'Get Over The Barrier!',
      'Inevitable Struggle -Super Arrange-',
      'Inevitable Struggle',
      'Intense Chase -Super Arrange-',
      'Intense Chase',
      'Mystic Core -SenVer-',
      'Mystic Core',
      'Seize The Truth!',
      'Unfathomed Force',
      'way of life -Full Version-',
      'Zero no Kiseki'
    ],
    
    
    // slide show initialization
    startShow : function () {
      var tios = Array.prototype.slice.call(document.querySelectorAll('.tio')), // get all tios on the page and place them into an array for sorting
          playlist = [], // temp playlist for sorting
          n; // random index
      
      // randomize order of the slide show so it is different each time
      while (tios.length) {
        n = Math.floor(Math.random() * tios.length);
        
        bestGirl.tio.push(tios[n]);
        
        tios.splice(n, 1);
      }
      
      // wait until assets are loaded before fading out the placeholder
      window.onload = function () {
        // then wait a few (3s) before fading out the placeholder, so they have time to read the texts
        setTimeout(function() {
          bestGirl.placeholder.className += ' loaded'; // hide placeholder texts
          bestGirl.nexTio(true); // show next tio

          // initialize interval for showing tios every X seconds (see duration at top of script)
          bestGirl.isEternal = setInterval(function() {
            bestGirl.nexTio();
          }, bestGirl.duration);
        }, 3000);
      };
      
      
      // randomize playlist order
      while (bestGirl.playlist.length) {
        n = Math.floor(Math.random() * bestGirl.playlist.length);
        
        playlist.push(bestGirl.playlist[n]);
        
        bestGirl.playlist.splice(n, 1);
      }
      
      // update playlist with new order and set default track + handlers
      bestGirl.playlist = playlist;
      bestGirl.music.src = 'aeon-system/audio/' + bestGirl.playlist[bestGirl.track] + '.mp3';
      bestGirl.music.onended = function () {
        var track = bestGirl.playlist[++bestGirl.track];
        
        // reset track if at playlist end
        if (!track) {
          bestGirl.track = 0;
          track = bestGirl.playlist[bestGirl.track];
        }
        
        // play next track
        this.src = 'aeon-system/audio/' + track + '.mp3';
        this.play();
      };
      
      
      // hide the mouse during inactive periods
      bestGirl.setMouseCountdown();
      
      // show and keep the mouse visible when moving it
      document.body.onmousemove = function () {
        bestGirl.setMouseCountdown(); // timeout is automatically cleared by this bad boy
        document.body.style.cursor = 'auto';
      };
    },
    
    
    // endlessly loops to the next tio (seriously, it never ends, it just starts over because best girl is eternal)
    nexTio : function (init) {
      // hides the last tio
      if (!init) {
        bestGirl.tio[bestGirl.index].className = bestGirl.tio[bestGirl.index].className.replace('actiove', '');
      }
      
      // get the next tio
      var nexTio = bestGirl.tio[++bestGirl.index];
      
      // check if the next tio exists
      if (!nexTio) {
        // reset if tio not found
        bestGirl.index = 0;
        nexTio = bestGirl.tio[bestGirl.index];
      }
      
      // finally show our beloved tio
      nexTio.className += ' actiove'; // acTIOve, yes a terrible pun, I know
    },
    
    
    // Tio plays us some of the best songs from Zero and Azure + that 1 CSIV remix
    playMusic : function () {
      if (bestGirl.music.paused) { // play if paused
        bestGirl.music.play();
        // light up Tio's cat ear sensors to show she's using the aeon system to play us some awesome tracks
        bestGirl.sprite.src = 'aeon-system/images/sitting-tio-aeon-system.png';
        
      } else { // pause if playing
        bestGirl.music.pause();
        bestGirl.sprite.src = 'aeon-system/images/sitting-tio.png';
      }
    },
    
    
    // sets a countdown for the mouse and hides it when inactive
    // this way you can view Tio without that pesky thing getting in her way
    setMouseCountdown : function () {
      // clear old timeout
      if (bestGirl.mouseHide) {
        clearTimeout(bestGirl.mouseHide);
      }
      
      // hides the mouse after 1 second of inactivity
      bestGirl.mouseHide = setTimeout(function () {
        document.body.style.cursor = 'none';
        delete bestGirl.mouseHide;
      }, 1000);
    },
    
    
    // info on best girl
    // thank you kiseki wiki (https://kiseki.fandom.com/wiki/Tio_Plato)
    tio_plato : {
      va : {
        ja : 'Kaori Mizuhashi',
        en : 'Kayli Mills'
      },
      
      birthday : 'S.1190',
      birthplace : 'Remiferia',
      
      hobbies : 'Collecting Goodies, Browsing the Orbal Web, Pomtto!',
      likes : 'Mishy, Kagemaru',
      
      gender : 'female',
      height : '150cm',
      sizes : { // for us people of culture
        B : 72,
        W : 51,
        H : 75
      },
      
      bloodtype : 'AB',
      
      weapon : 'Orbal Staff',
      
      orbment_type : {
        zero_ao : 'Water',
        sen_3 : 'Water, Mirage',
        sen_4 : 'Water, Time',
        haji : 'Water, Time'
      },
      
      unbalance : {
        slash : 'A',
        thrust : 'B',
        pierce : 'B',
        strike : 'B'
      },
      
      // The man, the legend, the scholar and translator of all things Tio, and of course, fellow Tiofriend.
      // Thank you for all you do to bring us EVERYTHING Tio in English <3
      biggest_fan : 'kitsune547'
    }
    
  };
  
  // start the slide show
  bestGirl.startShow();
  
  // console log easter egg for fellow developers
  var img = new Image(),
      tio = 'https://sethclydesdale.github.io/tio-plato-is-the-best/aeon-system/images/tio-double-ok.png';
  
  img.onload = function () {
    // texts
    console.log('%cTio Plato is the Best!',
      'color:#39C;'+
      'font-family:Arial;'+
      'font-size:32px;'+
      'font-weight:bold;'+
      'text-shadow:#000 2px 2px 0px;'
    );
    
    // image
    console.log('%c ',
      'font-size:1px;'+
      'padding:' + this.height * .5 + 'px ' + this.width * .5 + 'px;'+
      'background-size:' + this.width + 'px ' + this.height + 'px;'+
      'background:url('+ tio +');'
    );
    
    // additional info
    console.log('You can see all of best girl\'s properties and functions by typing `bestGirl` or `bestGirl.tio_plato` in the console!');
    console.log('For more detailed information, you can view the entire code on GitHub!\nhttps://github.com/SethClydesdale/tio-plato-is-the-best');
    console.log('エンジョーイ☆ティオ～！');
  };
  
  img.src = tio;
}(window, document));
