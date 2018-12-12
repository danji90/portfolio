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
    GitHubCalendar("#github-graph", "IonicaBizau");


    /* Github Activity Feed - https://github.com/caseyscarborough/github-activity */
    GitHubActivity.feed({ username: "caseyscarborough", selector: "#ghfeed" });

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

    ///////////////////////Map object + Features/////////////////////////

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

    // places loaded from external json file
    //console.log(places[0].features[1].geometry.coordinates[0])

    console.log(places)

    var markers = L.geoJson(places, {
      pointToLayer: function(feature, latlng) {
        var marker = L.marker(latlng, {});
          //marker.bindPopup("Station ID: " + feature.properties.id + '<br/>' + "Station name: " + feature.properties.Station + '<br/>' + "Station type: " + feature.properties.Type);
          // marker.on('mouseover', function (e) {
          //   this.openPopup();
          // });
          // marker.on('mouseout', function (e) {
          //   this.closePopup();
          // });
          return marker;
        }
        // for (i==0; i < places.features.length; i++) {
        //   var newMarker = L.marker(places.features[i].geometry.coordinates[1], places.features[i].geometry.coordinates[0])
        //   newMarker.addTo(map)
        // }
    })

    var placeLayer = L.markerClusterGroup({
      name: "Places"
    });

    console.log(markers)

    placeLayer.addLayer(markers);

    // var markers = L.geoJson(places, {})
    // for (i=0; i < places[0].features.length; i++){
    //   var newMarker = L.marker(places[0].features[i].geometry.coordinates[1], places[0].features[i].geometry.coordinates[0])
    //   newMarker.addTo(map)
    //   // markers.push(newMarker)
    // }

    // console.log(markers)


    L.control.layers(baseLayers, placeLayer).addTo(map);


/* ////HERE////
    console.log(places)
    console.log(places[0].features[1].geometry.coordinates[0])

    //Step 1: initialize communication with the platform
    var platform = new H.service.Platform({
      app_id: 'tH9gFt1ePJJuFYTnGXS8',
      app_code: 'X-TFCPoxzXyBYzh57KlaKg',
      useHTTPS: true
    });
    var pixelRatio = window.devicePixelRatio || 1;
    var defaultLayers = platform.createDefaultLayers({
      tileSize: pixelRatio === 1 ? 256 : 512,
      ppi: pixelRatio === 1 ? undefined : 320
    });

    //Step 2: initialize a map  - not specificing a location will give a whole world view.
    var map = new H.Map(document.getElementById('map'),
      defaultLayers.normal.map, {pixelRatio: pixelRatio});

    //map.setBaseLayer(defaultLayers.satellite.traffic);

    function addMarkersToMap(map) {
      // var parisMarker = new H.map.Marker({lat:48.8567, lng:2.3508});
      // map.addObject(parisMarker);
      var markers = []

      for (i=0; i < places[0].features.length; i++){
        var newMarker =  new H.map.Marker({lat:places[0].features[i].geometry.coordinates[1], lng:places[0].features[i].geometry.coordinates[0]})
        map.addObject(newMarker);
        // markers.push(newMarker)
      }

      // console.log(markers)
    }

    //Step 3: make the map interactive
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components
    var ui = H.ui.UI.createDefault(map, defaultLayers);

    addMarkersToMap(map)
    // Now use the map as required...
    // moveMapToBolzano(map);
*/
});
