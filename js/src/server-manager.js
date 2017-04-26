define(
  [ 'jquery' ],
  function( $ )
  {
    var signals;

    function init( config )
    {
      console.log( "  === server-manager ===" );
      signals = config.signals;

      loadData( 'server/contacts.json' );
    }

    function loadData( url )
    {
      console.log( "loadData", url );
      $.getJSON( url, _onDataLoaded );
    }

    function _onDataLoaded( data )
    {
      signals['data-loaded'].dispatch( data );
    }

    return { init: init, loadData: loadData };
  }
);
