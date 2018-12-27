jQuery(document).ready(function($) {


    /*======= Skillset *=======*/

    $('.level-bar-inner').css('width', '0');

    $(window).on('load', function() {

        $('.level-bar-inner').each(function() {

            var itemWidth = $(this).data('level');

            $(this).animate({
                width: itemWidth
            }, 800);

        });

    });

    /* Bootstrap Tooltip for Skillset */
    $('.level-label').tooltip();

    /* Toggle button color shift */
    $("button").click(function(){
      $("button").removeClass("active");
      $(this).addClass("active");
    });

    /* jQuery RSS - https://github.com/sdepold/jquery-rss */

    $("#rss-feeds").rss(

        //Change this to your own rss feeds
        "https://feeds.feedburner.com/TechCrunch/startups",

        {
        // how many entries do you want?
        // default: 4
        // valid values: any integer
        limit: 3,

        // the effect, which is used to let the entries appear
        // default: 'show'
        // valid values: 'show', 'slide', 'slideFast', 'slideSynced', 'slideFastSynced'
        effect: 'slideFastSynced',

        // will request the API via https
	    // default: false
	    // valid values: false, true
	    ssl: true,

        // outer template for the html transformation
        // default: "<ul>{entries}</ul>"
        // valid values: any string
        layoutTemplate: "<div class='items'>{entries}</div>",

        // inner template for each entry
        // default: '<li><a href="{url}">[{author}@{date}] {title}</a><br/>{shortBodyPlain}</li>'
        // valid values: any string
        entryTemplate: '<div class="item"><h3 class="title"><a href="{url}" target="_blank">{title}</a></h3><div><p>{shortBodyPlain}</p><a class="more-link" href="{url}" target="_blank"><i class="fas fa-external-link-alt"></i>Read more</a></div></div>'

        }
    );

    /* Github Calendar - https://github.com/IonicaBizau/github-calendar */
    GitHubCalendar("#github-graph", "danji90");


    /* Github Activity Feed - https://github.com/caseyscarborough/github-activity */
    GitHubActivity.feed({ username: "danji90", selector: "#ghfeed" });


    ///////////////////////Map object + Features/////////////////////////

    ////Leaflet////

    // Define map attribution variable
    var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
      '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery � <a href="http://mapbox.com">Mapbox</a>'

    // Define basemap source URL
    var mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmdhdmlzaCIsImEiOiJjaXFheHJmc2YwMDdoaHNrcWM4Yjhsa2twIn0.8i1Xxwd1XifUU98dGE9nsQ';

    // Define baselayers
    var grayscale = L.tileLayer(mbUrl, {
      id: 'mapbox.light',
      attribution: mbAttr,
      maxZoom: 22,
      maxNativeZoom: 18
    })
    var streets = L.tileLayer(mbUrl, {
      id: 'mapbox.streets',
      attribution: mbAttr,
      maxZoom: 22,
      maxNativeZoom: 18
    })
    var outdoors = L.tileLayer(mbUrl, {
      id: 'mapbox.outdoors',
      attribution: mbAttr,
      maxZoom: 22,
      maxNativeZoom: 18
    })
    var satellite = L.tileLayer(mbUrl, {
      id: 'mapbox.satellite',
      attribution: mbAttr,
      maxZoom: 22,
      maxNativeZoom: 18
    })
    var dark = L.tileLayer(mbUrl, {
      id: 'mapbox.dark',
      attribution: mbAttr,
      maxZoom: 22,
      maxNativeZoom: 18
    })
    var satellitestreets = L.tileLayer(mbUrl, {
      id: 'mapbox.streets-satellite',
      attribution: mbAttr,
      maxZoom: 22,
      maxNativeZoom: 18
    });

    // Main map object
    var map = L.map('map', {
      center: [40, -20],
      zoom: 2,
      layers: [streets],
      maxZoom: 22,
      maxNativeZoom: 18
    });

    // disable default scroll
    map.scrollWheelZoom.disable();

    // Ctrl+Scroll enable
    $("#map").on('mousewheel DOMMouseScroll', function (event) {
      event.stopPropagation();
       if (event.ctrlKey == true) {
               event.preventDefault();
           map.scrollWheelZoom.enable();
             $('#map').removeClass('map-scroll');
           setTimeout(function(){
               map.scrollWheelZoom.disable();
           }, 1000);
       } else {
           map.scrollWheelZoom.disable();
           $('#map').addClass('map-scroll');
       }
     });

    $(window).on('mousewheel DOMMouseScroll', function (event) {
         $('#map').removeClass('map-scroll');
      })

    // Map markers & layers

    var baseLayers = {
      "Streets": streets,
      "Gray": dark,
      "Imagery": satellite
    };

    if ($("#eduBtn").hasClass("active")){
      for (i=0;i<education.features.length; i++){
        L.geoJSON(education.features[i]).addTo(map);
      }
    }



});