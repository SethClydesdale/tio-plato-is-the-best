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
    playlist : [ // some of my most favorite tracks from Zero/Ao/Haji (+CSIV's mystic core remix, cause mystic core is literally the best)
      // Zero/Ao
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
      'Mystic Core -SenVer-', // CS4
      'Mystic Core',
      'Seize The Truth!',
      'Unfathomed Force',
      'way of life -Full Version-',
      'Zero no Kiseki',
      // Hajimari
      'Aim a Gun at the Bullet',
      'Bad Dream Invasion',
      'Be Caught Up!',
      'Elegant Prowess',
      'Emergency Order',
      'Flash Your Fighting Spirit',
      'NO END NO WORLD -Instrumental-',
      'NO END NO WORLD',
      'Now, At the Beginning',
      'Stand Up Again and Again!',
      'Sword of Swords',
      'The Destination of FATE'
    ],
    
    
    // slide show initialization
    startShow : function () {
      // our tios and their background positions (the bg position applies focus to tio at lower resolutions)
      var tios = [
        '001|80% 5%',
        '002|20% 10%',
        '003|60% 20%',
        '004|30% 0%',
        '005|75% 0%',
        '006|69% 30%',
        '007|5% 15%',
        '008|80% 45%',
        '009|70% 90%',
        '010|50% 0%',
        '011|50% 80%',
        '012|85% 15%',
        '013|100% 20%',
        '014|50% 0%',
        '015|50% 0%',
        '016|90% 100%',
        '017|100% 35%',
        '018|100% 30%',
        '019|25% 30%',
        '020|0% 60%',
        '021|100% 35%',
        '022|100% 70%',
        '023|100% 35%',
        '024|25% 50%',
        '025|50% 20%',
        '026|50% 75%',
        '027|45% 15%',
        '028|50% 25%',
        '029|65% 35%',
        '030|100% 40%',
        '031|50% 50%',
        '032|60% 50%',
        '033|15% 60%',
        '034|0% 60%',
        '035|50% 30%',
        '036|80% 50%',
        '037|50% 50%',
        '038|50% 0%',
        '039|50% 15%',
        '040|40% 30%',
        '041|60% 25%',
        '042|60% 30%',
        '043|50% 50%',
        '044|100% 55%',
        '045|70% 80%',
        '046|100% 55%',
        '047|25% 60%',
        '048|100% 35%',
        '049|50% 50%',
        '050|70% 65%',
        '051|50% 50%',
        '052|13% 45%',
        '053|70% 10%',
        '054|80% 80%',
        '055|85% 60%',
        '056|50% 60%',
        '057|40% 20%',
        '058|100% 35%',
        '059|95% 30%',
        '060|45% 25%',
        '061|10% 80%',
        '062|35% 50%',
        '063|40% 80%',
        '064|50% 50%',
        '065|30% 0%',
        '066|0% 65%',
        '067|60% 50%',
        '068|50% 50%',
        '069|50% 90%',
        '070|90% 0%',
        '071|35% 45%',
        '072|70% 30%',
        '073|66% 65%',
        '074|60% 30%',
        '075|100% 25%',
        '076|50% 50%',
        '077|80% 40%',
        '078|100% 30%',
        '079|40% 20%',
        '080|50% 50%',
        '081|70% 50%',
        '082|15% 75%',
        '083|86% 24%',
        '084|20% 50%',
        '085|5% 24%',
        '086|15% 60%',
        '087|0% 35%',
        '088|35% 35%',
        '089|60% 25%',
        '090|85% 25%',
        '091|15% 15%',
        '092|20% 7%',
        '093|55% 50%',
        '094|50% 70%',
        '095|50% 50%',
        '096|50% 40%',
        '097|55% 35%',
        '098|60% 36%',
        '099|66% 25%',
        '100|55% 35%',
        '101|85% 5%',
        '102|30% 25%',
        '103|35% 20%',
        '104|60% 10%',
        '105|90% 25%',
        '106|85% 20%',
        '107|50% 25%',
        '108|44% 50%',
        '109|82% 62%',
        '110|60% 35%',
        '111|20% 80%',
        '112|46% 25%',
        '113|18% 40%',
        '114|68% 40%',
        '115|47% 43%',
        '116|6% 60%',
        '117|4% 35%',
        '118|55% 5%',
        '119|33% 50%',
        '120|90% 35%',
        '121|15% 25%',
        '122|30% 35%',
        '123|60% 60%',
        '124|75% 30%',
        '125|15% 30%',
        '126|25% 20%',
        '127|75% 50%',
        '128|75% 50%',
        '129|65% 25%',
        '130|37% 45%',
        '131|45% 55%',
        '132|55% 50%',
        '133|95% 50%',
        '134|15% 20%',
        '135|15% 50%',
        '136|100% 80%',
        '137|27% 70%',
        '138|50% 40%',
        '139|60% 20%',
        '140|30% 100%',
        '141|48% 60%',
        '142|52% 27%',
        '143|52% 45%',
        '144|25% 45%',
        '145|80% 20%',
        '146|40% 10%',
        '147|50% 10%',
        '148|50% 10%',
        '149|30% 10%',
        '150|40% 10%'
        
      ], // get all tios on the page and place them into an array for sorting
      TioPlato = document.createDocumentFragment(),
      slideshow = document.getElementById('tio-plato'),
      playlist = [], // temp playlist for sorting
      n, newTio, data;
      
      // randomize order of the slide show so it is different each time
      while (tios.length) {
        n = bestGirl.debug ? 0 : Math.floor(Math.random() * tios.length);
        data = tios[n].split('|');
        
        // creates a new div with the following mark up to display our cute little tio
        // <div class="tio" style="background-image:url(tios/tio-001.jpg); background-position:80% 5%;"></div>
        newTio = document.createElement('DIV');
        newTio.className = 'tio';
        newTio.style.backgroundImage = 'url(tios/tio-' + data[0] + '.jpg)';
        newTio.style.backgroundPosition = data[1];
        TioPlato.appendChild(newTio);
        
        // add this tio to the slides
        bestGirl.tio.push(newTio);
        
        // removes the newly added tio from the creation queue
        tios.splice(n, 1);
      }
      
      // adds all of the tios to the document and begins preloading
      slideshow.appendChild(TioPlato);
      
      // wait until assets are fully loaded or partially, before fading out the placeholder
      window.onload = bestGirl.stopLoading;
      
      // maximum load time will be 30 seconds, afterwhich the slide show will start even if assets are still loading
      bestGirl.loadingTimeout = setTimeout(bestGirl.stopLoading, 30000);
      
      // hide the tiotip after 5 seconds
      setTimeout(function () {
        var tio = document.getElementById('tio');
        
        if (/tiotip/.test(tio.className)) {
          tio.className = '';
        }
      }, 5000);
      
      
      // randomize playlist order
      while (bestGirl.playlist.length) {
        n = Math.floor(Math.random() * bestGirl.playlist.length);
        
        playlist.push(bestGirl.playlist[n]);
        
        bestGirl.playlist.splice(n, 1);
      }
      
      // update playlist with new order and set default track
      bestGirl.playlist = playlist;
      bestGirl.music.getElementsByTagName('SOURCE')[0].src = 'aeon-system/audio/' + bestGirl.playlist[bestGirl.track] + '.mp3';
      bestGirl.music.load();
      
      // handler for changing to the next song in the playlist
      bestGirl.music.onended = function () {
        var track = bestGirl.playlist[++bestGirl.track];
        
        // reset track if at playlist end
        if (!track) {
          bestGirl.track = 0;
          track = bestGirl.playlist[bestGirl.track];
        }
        
        // play next track
        this.pause();
        this.getElementsByTagName('SOURCE')[0].src = 'aeon-system/audio/' + track + '.mp3';
        this.load();
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
    
    
    // stops preloading and begins the slide show
    stopLoading : function () {
      if (/loading/.test(document.body.className)) {
        document.body.className = document.body.className.replace('loading', '');
        
        // wait a few (3s) before fading out the placeholder, so they have time to read the texts
        setTimeout(function() {
          bestGirl.placeholder.className += ' loaded'; // hide placeholder texts
          bestGirl.nexTio(true); // show next tio

          // initialize interval for showing tios every X seconds (see duration at top of script)
          bestGirl.isEternal = bestGirl.debug ? null : setInterval(function() {
            bestGirl.nexTio();
          }, bestGirl.duration);
        }, 3000);
        
        // clear fallback timeout
        if (bestGirl.loadingTimeout) {
          clearTimeout(bestGirl.loadingTimeout);
          delete bestGirl.loadingTimeout;
        }
      }
    },
    
    
    // Tio plays us some of the best songs from Zero and Azure + that 1 CSIV remix
    playMusic : function (tio) {
      if (bestGirl.music.paused) { // play if paused
        if (bestGirl.music.readyState == 0) {
          bestGirl.music.load(); // attempt loading audio again if failed (had it happen before, but cannot replicate, hopefully this fixes it)
        }
        
        bestGirl.music.play();
        // light up Tio's cat ear sensors to show she's using the aeon system to play us some awesome tracks
        bestGirl.sprite.src = 'aeon-system/images/sitting-tio-aeon-system.png';
        
      } else { // pause if playing
        bestGirl.music.pause();
        bestGirl.sprite.src = 'aeon-system/images/sitting-tio.png';
      }
      
      // hide the tiotip
      if (/tiotip/.test(tio.parentNode.className)) {
        tio.parentNode.className = '';
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
    },
    
    // tells best girl if debug mode should be enabled
    // debug mode places all images in numerical order and disables image rotation
    // primarily, it's used for manually adjusting the background position of images, but may serve another purpose in the future, maybe.
    debug : /\?debug/.test(window.location.search)
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
    
    // debug mode easter egg
    if (bestGirl.debug) {
      console.log('%c\nTio: Aeon system, active debug mode.', 'color:#39C;font-weight:bold;');
      setTimeout(function() {
        console.log('%cTio: Access database.', 'color:#39C;font-weight:bold;');
        
        setTimeout(function() {
          console.log('%cTio: Search "Tio Plato"', 'color:#39C;font-weight:bold;');
          
          setTimeout(function() {
            console.log('%cNow performing search...', 'color:#F00;font-weight:bold;');
            
            setTimeout(function() {
              console.log('%cPlease standby.', 'color:#F00;font-weight:bold;');
              
              setTimeout(function() {
                console.log('%c.', 'color:#F00;font-weight:bold;');
                
                setTimeout(function() {
                  console.log('%c.', 'color:#F00;font-weight:bold;');
                  
                  setTimeout(function() {
                    console.log('%c.', 'color:#F00;font-weight:bold;');
                    
                    setTimeout(function() {
                      console.log('%cInformation on "Tio Plato" acquired.', 'color:#F00;font-weight:bold;');
                      
                      setTimeout(function() {
                        console.log('%cNow printing...', 'color:#F00;font-weight:bold;');
                        
                        var time = 0, n = -1, k = [], i;
                        
                        for (i in bestGirl.tio_plato) {
                          time += 1000;
                          k.push(i);
                          setTimeout(function() {
                            console.log(k[++n] + ':', bestGirl.tio_plato[k[n]]);
                          }, time);
                        }
                        
                        setTimeout(function() {
                          console.log('%cTio: ...', 'color:#39C;font-weight:bold;');
                          
                          setTimeout(function() {
                            console.log('%cTio: W-Why are my sizes in here!?', 'color:#39C;font-weight:bold;');
                            
                            setTimeout(function() {
                              console.log('%cTio: ..Chief Roberts has some explaining to do...!', 'color:#39C;font-weight:bold;');
                            }, 4000);
                          }, 3000);
                        }, time + 1000);
                      }, 1000);
                    }, 1000);
                  }, 1000);
                }, 1000);
              }, 1000);
            }, 1000);
          }, 3000);
        }, 3000);
      }, 3000);
    }
  };
  
  img.src = tio;
}(window, document));
