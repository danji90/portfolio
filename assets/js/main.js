jQuery(document).ready(function($) {
//  ===== Navigation =====
/* Collapse nav-bar on click */
  $(function() {
    $('.navbar-nav li a').click(function(event) {
      /* Colla  pse if not a dropdpwn menu */
      if (!$(this).hasClass('dropdown-toggle')) {
        $('.navbar-collapse').collapse('hide');
      }
    });
  });

  /* Scroll animations */
  $('#navHome').click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $('#home').offset().top,
    }, 1000);
  });

  $('#navAbout').click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $('#about').offset().top,
    }, 1000);
  });

  $('#navXP').click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $('#xp').offset().top,
    }, 1000);
  });

  $('#navMap').click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $('#mapSec').offset().top,
    }, 1000);
  });

  $('#navProjects').click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $('#projects').offset().top,
    }, 1000);
  });

  $('#navGithub').click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $('#githubSec').offset().top,
    }, 1000);
  });

  $('#navEdu').click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $('#education').offset().top,
    }, 1000);
  });

  $('#navSkills').click(function() {
    $([document.documentElement, document.body]).animate({
      scrollTop: $('#skills').offset().top,
    }, 1000);
  });


  /* ======= Skillset *=======*/
  $('.level-bar-inner').css('width', '0');

  $('.level-bar-inner').each(function() {
    var itemWidth = $(this).data('level');
    // $(this).css('width', itemWidth)
    $(this).animate({
      width: itemWidth,
    }, 800);
  });

  /* Bootstrap Tooltip for Skillset */
  $('.level-label').tooltip();

  /* jQuery RSS - https://github.com/sdepold/jquery-rss */

  /*
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
  */


  /* Github Calendar - https://github.com/IonicaBizau/github-calendar */
  GitHubCalendar('#github-graph', 'danji90');


  /* Github Activity Feed - https://github.com/caseyscarborough/github-activity */
  // GitHubActivity.feed({ username: "danji90", selector: "#ghfeed" });


  // /////////////////////Map object + Features/////////////////////////

  // //Leaflet////

  // Define map attribution variable
  let mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery � <a href="http://mapbox.com">Mapbox</a>';

  // Define basemap source URL
  let mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibmdhdmlzaCIsImEiOiJjaXFheHJmc2YwMDdoaHNrcWM4Yjhsa2twIn0.8i1Xxwd1XifUU98dGE9nsQ';

  // Define baselayers
  let grayscale = L.tileLayer(mbUrl, {
    id: 'mapbox.light',
    attribution: mbAttr,
    maxZoom: 22,
    maxNativeZoom: 18,
  });
  let streets = L.tileLayer(mbUrl, {
    id: 'mapbox.streets',
    attribution: mbAttr,
    maxZoom: 22,
    maxNativeZoom: 18,
  });
  let outdoors = L.tileLayer(mbUrl, {
    id: 'mapbox.outdoors',
    attribution: mbAttr,
    maxZoom: 22,
    maxNativeZoom: 18,
  });
  let satellite = L.tileLayer(mbUrl, {
    id: 'mapbox.satellite',
    attribution: mbAttr,
    maxZoom: 22,
    maxNativeZoom: 18,
  });
  let dark = L.tileLayer(mbUrl, {
    id: 'mapbox.dark',
    attribution: mbAttr,
    maxZoom: 22,
    maxNativeZoom: 18,
  });
  let satellitestreets = L.tileLayer(mbUrl, {
    id: 'mapbox.streets-satellite',
    attribution: mbAttr,
    maxZoom: 22,
    maxNativeZoom: 18,
  });

  // Main map object
  let map = L.map('map', {
    center: [40, -20],
    zoom: 2,
    layers: [streets],
    maxZoom: 22,
    maxNativeZoom: 18,
  });

  // disable default scroll
  map.scrollWheelZoom.disable();

  // Ctrl+Scroll enable
  $('#map').on('mousewheel DOMMouseScroll', function(event) {
    event.stopPropagation();
    if (event.ctrlKey == true) {
      event.preventDefault();
      map.scrollWheelZoom.enable();
      $('#map').removeClass('map-scroll');
      setTimeout(function() {
        map.scrollWheelZoom.disable();
      }, 1000);
    } else {
      map.scrollWheelZoom.disable();
      $('#map').addClass('map-scroll');
    }
  });

  $(window).on('mousewheel DOMMouseScroll', function(event) {
    $('#map').removeClass('map-scroll');
  });


  // // Map markers & legend

  // time slider

  let dt_from = '1990/09/12 23:59:00';
  let dt_to = '2019/05/02 00:00:00';

  $('.slider-time').html(dt_from);
  $('.slider-time2').html(dt_to);

  let startDate = Date.parse(dt_from);
  let endDate = Date.parse(dt_to);

  let min_val = startDate/1000;
  let max_val = endDate/1000;

  function zeroPad(num, places) {
    let zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join('0') + num;
  }
  function formatDT(__dt) {
    var year = __dt.getFullYear();
    var month = zeroPad(__dt.getMonth()+1, 2);
    var date = zeroPad(__dt.getDate(), 2);
    var hours = zeroPad(__dt.getHours(), 2);
    var minutes = zeroPad(__dt.getMinutes(), 2);
    var seconds = zeroPad(__dt.getSeconds(), 2);
    return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds;
  };


  $('#slider-range').slider({
    range: true,
    min: min_val,
    max: max_val,
    step: 10,
    values: [min_val, max_val],
    stop: function(e, ui) {
      var dt_cur_from = new Date(ui.values[0]*1000); // .format("yyyy-mm-dd hh:ii:ss");
      console.log(dt_cur_from.getTime());
      $('.slider-time').html(formatDT(dt_cur_from));
      var dt_cur_to = new Date(ui.values[1]*1000); // .format("yyyy-mm-dd hh:ii:ss");
      $('.slider-time2').html(formatDT(dt_cur_to));

      startDate = dt_cur_from;
      endDate = dt_cur_to

      eduLayer.clearLayers()
      workLayer.clearLayers()
      residentLayer.clearLayers()

      addFilteredLayer(education, eduLayer, startDate, endDate)
      addFilteredLayer(work, workLayer, startDate, endDate)
      addFilteredLayer(residence, residentLayer, startDate, endDate)
      // map.removeLayer(workLayer)
      // workLayer = L.featureGroup.subGroup(mcg);
      // map.removeLayer(residentLayer)
      // residentLayer = L.featureGroup.subGroup(mcg);
      //
      // addFilteredLayer(education, eduLayer, dt_cur_from, dt_cur_to)
      // addFilteredLayer(work, workLayer, dt_cur_from, dt_cur_to)
      // addFilteredLayer(residence, residentLayer, dt_cur_from, dt_cur_to)
    },
  });

  // function for filtering life events according to time slider

  function timeFilter(mappingGroup, slideStart, slideEnd) {
    let features = [];
    for (let i=0; i<mappingGroup.features.length; i++) {
      let eventStart = new Date(String(mappingGroup.features[i].properties.timestamp[0][0]));
      let eventEnd = new Date(String(mappingGroup.features[i].properties.timestamp[0][1]));
      if (eventStart.getTime()>slideStart && eventStart.getTime()<slideEnd || slideStart>eventStart.getTime() && slideEnd<eventEnd.getTime()) {
        features.push(mappingGroup.features[i]);
      }
    }
    let markerGroup = {
      'type': 'FeatureCollection',
      'features': features,
    };
    return markerGroup;
  }

  // Add general marker cluster group

  let mcg = L.markerClusterGroup({
    spiderfyOnMaxZoom: false,
    showCoverageOnHover: false,
  }).addTo(map);


  // function for adding marker layer

  function addFilteredLayer(markerArray, layer, start, end) {

    // data = timeFilter(markerArray, start, end)

    let subgroup = layer
    let markers = L.geoJSON(markerArray, {
      pointToLayer: function(feature, latlng) {
        var icon = L.divIcon({
          className: 'mapIcon',
          html: feature.properties.icon,
        });
        return L.marker(latlng, {icon: icon});
      },
      filter: function(feature, layer) {
        let eventStart = new Date(String(feature.properties.timestamp[0][0]));
        let eventEnd = new Date(String(feature.properties.timestamp[0][1]));
        if (eventStart.getTime()>startDate && eventStart.getTime()<endDate || startDate>eventStart.getTime() && endDate<eventEnd.getTime()) {
          return true;
        } else {
          return false
        }
      },
      onEachFeature: function(feature, layer) {
        // layer.bindPopup('<p align="center"><strong>'+ feature.properties.type + '</strong><p><h6>'+feature.properties.title+'</h6><p><a href="'+feature.properties.link+'" target="_blank">'+feature.properties.facility+'</a>, '+feature.properties.city+', '+feature.properties.country+'</p><p>'+feature.properties.timestamp+'</p><p><strong>Descripton</strong>: '+feature.properties.description);
        layer.bindPopup('<p align="center"><strong>'+ feature.properties.type + '</strong><p><h6>'+feature.properties.title+'</h6><p><a href="'+feature.properties.link+'" target="_blank">'+feature.properties.facility+'</a>, '+feature.properties.city+', '+feature.properties.country+'</p><p><strong>Descripton</strong>: '+feature.properties.description);
      },
    });

    subgroup.addLayer(markers);
    subgroup.addTo(map);
    subgroup.on('add', function() {
      map.fitBounds(mcg.getBounds());
    });

  }

  // Education

  let eduLayer = L.featureGroup.subGroup(mcg);

  // let eduMarkers = L.geoJSON(education, {
  //   pointToLayer: function(feature, latlng) {
  //     var icon = L.divIcon({
  //       className: 'mapIcon',
  //       html: feature.properties.icon,
  //     });
  //     return L.marker(latlng, {icon: icon});
  //   },
  //   filter: function(feature, layer) {
  //     let eventStart = new Date(String(feature.properties.timestamp[0][0]));
  //     let eventEnd = new Date(String(feature.properties.timestamp[0][1]));
  //     if (eventStart.getTime()>startDate && eventStart.getTime()<endDate || startDate>eventStart.getTime() && endDate<eventEnd.getTime()) {
  //       return true;
  //     } else {
  //       return false
  //     }
  //   },
  //   onEachFeature: function(feature, layer) {
  //     // layer.bindPopup('<p align="center"><strong>'+ feature.properties.type + '</strong><p><h6>'+feature.properties.title+'</h6><p><a href="'+feature.properties.link+'" target="_blank">'+feature.properties.facility+'</a>, '+feature.properties.city+', '+feature.properties.country+'</p><p>'+feature.properties.timestamp+'</p><p><strong>Descripton</strong>: '+feature.properties.description);
  //     layer.bindPopup('<p align="center"><strong>'+ feature.properties.type + '</strong><p><h6>'+feature.properties.title+'</h6><p><a href="'+feature.properties.link+'" target="_blank">'+feature.properties.facility+'</a>, '+feature.properties.city+', '+feature.properties.country+'</p><p><strong>Descripton</strong>: '+feature.properties.description);
  //   },
  // });
  // eduLayer.addLayer(eduMarkers);
  // eduLayer.addTo(map);
  // eduLayer.on('add', function() {
  //   map.fitBounds(mcg.getBounds());
  // });

  // Work

  let workLayer = L.featureGroup.subGroup(mcg);
  // let workMarkers = L.geoJSON(work, {
  //   pointToLayer: function(feature, latlng) {
  //     var icon = L.divIcon({
  //       className: 'mapIcon',
  //       html: feature.properties.icon,
  //     });
  //     return L.marker(latlng, {icon: icon});
  //   },
  //   filter: function(feature, layer) {
  //     let eventStart = new Date(String(feature.properties.timestamp[0][0]));
  //     let eventEnd = new Date(String(feature.properties.timestamp[0][1]));
  //     if (eventStart.getTime()>startDate && eventStart.getTime()<endDate || startDate>eventStart.getTime() && endDate<eventEnd.getTime()) {
  //       return true;
  //     } else {
  //       return false
  //     }
  //   },
  //   onEachFeature: function(feature, layer) {
  //     layer.bindPopup('<p align="center"><strong>'+ feature.properties.type + '</strong><p><h6>'+feature.properties.title+'</h6><p><a href="'+feature.properties.link+'" target="_blank">'+feature.properties.facility+'</a>, '+feature.properties.city+', '+feature.properties.country+'</p><p><strong>Descripton</strong>: '+feature.properties.description);
  //     // layer.bindPopup('<p align="center"><strong>'+ feature.properties.type + '</strong><p><h6>' + feature.properties.title+'</h6><p><a href="'+feature.properties.link+'" target="_blank">'+feature.properties.facility+'</a>, '+feature.properties.city+', '+feature.properties.country+'</p><p>'+feature.properties.timestamp+'</p><p><strong>Descripton</strong>: '+feature.properties.description);
  //   },
  // });
  // workLayer.addLayer(workMarkers);
  // workLayer.addTo(map);
  // workLayer.on('add', function() {
  //   map.fitBounds(mcg.getBounds());
  // });

  // Resident

  let residentLayer = L.featureGroup.subGroup(mcg);
  // let residentMarkers = L.geoJSON(residence, {
  //   pointToLayer: function(feature, latlng) {
  //     var icon = L.divIcon({
  //       className: 'mapIcon',
  //       html: feature.properties.icon,
  //     });
  //     return L.marker(latlng, {icon: icon});
  //   },
  //   filter: function(feature, layer) {
  //     let eventStart = new Date(String(feature.properties.timestamp[0][0]));
  //     let eventEnd = new Date(String(feature.properties.timestamp[0][1]));
  //     if (eventStart.getTime()>startDate && eventStart.getTime()<endDate || startDate>eventStart.getTime() && endDate<eventEnd.getTime()) {
  //       return true;
  //     } else {
  //       return false
  //     }
  //   },
  //   onEachFeature: function(feature, layer) {
  //     // layer.bindPopup('<p align="center"><strong>'+ feature.properties.type + '</strong><p>' + feature.properties.city+', '+feature.properties.country+'</p><p>'+feature.properties.timestamp+'</p><p><strong>Descripton</strong>: '+feature.properties.description);
  //     layer.bindPopup('<p align="center"><strong>'+ feature.properties.type + '</strong><p>' + feature.properties.city+', '+feature.properties.country+'</p><p><strong>Descripton</strong>: '+feature.properties.description);
  //   },
  // });
  // residentLayer.addLayer(residentMarkers);
  // residentLayer.addTo(map);
  // residentLayer.on('add', function() {
  //   map.fitBounds(mcg.getBounds());
  // });

  //Countries layer

  let countriesLayer = L.featureGroup();
  let countryPolygons = L.geoJSON(countries, {
    style: function(feature) {
    		return {
        color: '#FF6347'
      };
    	},
    onEachFeature: function(feature, layer) {
      layer.bindPopup('<p align="center"><strong>'+ feature.properties.sovereignt + '</strong><p>');
    },
  });
  countriesLayer.addLayer(countryPolygons);
  // countriesLayer.addTo(map)
  countriesLayer.on('add', function() {
    map.fitBounds(countriesLayer.getBounds());
  });

  // var remWork = map.on('overlayremove', function(a) { map.removeLayer(workLayer)});

  let overlays = {
    'Education': eduLayer,
    'Work': workLayer,
    'Resident': residentLayer,
    'Countries explored': countriesLayer,
  };

  let baseLayers = {
    'Topographic': streets,
    'Gray': dark,
    'Imagery': satellite,
  };

  // map.on('layeradd', function(e) {
  //   map.fitBounds(mcg.getBounds());
  // })

  L.control.layers(baseLayers, overlays, {
    autoZIndex: true,
  }).addTo(map);

  addFilteredLayer(education, eduLayer, startDate, endDate)
  addFilteredLayer(work, workLayer, startDate, endDate)
  addFilteredLayer(residence, residentLayer, startDate, endDate)

});
