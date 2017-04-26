require.config({
  baseUrl: 'js/lib',
  urlArgs: "bust=v1" + (+new Date),
  paths: {
    jquery: 'jquery-2.1.4.min',
    signal: 'signals.min',
    packery: 'packery.pkgd.min',
    draggabilly: 'draggabilly.pkgd.min',
    datgui: 'dat.gui.min',
    siriwave: 'siriwave',
    vivus: 'vivus.min',
    src: '../src',
    components: '../src/components'
  },
  shim:{
    packery : ["jquery"],
    draggabilly : ["packery"]
  }
});

require(
  [
    // 'components/sub'
    'src/button-manager',
    'src/server-manager',
    'src/home',
    'datgui',
    'signal',
    'jquery'
  ],
  function(
    buttonManager,
    serverManager,
    home,
    datgui,
    Signal,
    $
  )
  {
    $( document ).ready( init );

    function init()
    {
      console.log( "=== init ===" );
      var config = {
        signals: {
          'button-click'     : new Signal(),
          'button-down'      : new Signal(),
          'button-up'        : new Signal(),
          'data-loaded'      : new Signal(),
          'create-button'    : new Signal(),
          'dom-ready'        : new Signal()
        }
      };

      config.signals['dom-ready'].add( _onDomReady );
      config.signals['data-loaded'].add( _onDataLoaded );

      var gui = new dat.GUI();
      var appData;

      // sk: initialize all main modules. add config object.
      home.init( config );
      buttonManager.init( config );
      serverManager.init( config );

      // DAT GUI
      var fileFolder = gui.addFolder( 'File' );
      fileFolder.add( buttonManager, 'addNewButton' );
      fileFolder.open();

      // _onDomReady();
    }

    function _onDataLoaded( data )
    {
      appData = data;
      console.log( "_onDataLoaded", appData );

      home.addContacts( appData.contacts );
      // $( 'body' ).addClass( 'in' );
    }
    function _onDomReady()
    {
      $( 'body' ).addClass( 'in' );
    }
  }
);
