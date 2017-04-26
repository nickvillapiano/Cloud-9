define(
  [ 'jquery' ],
  function( $ )
  {
    var signals;

    function init( config )
    {
      console.log( "  === name ===" );
      signals = config.signals;

      // this isn't always needed
      // signals['dom-ready'].dispatch();
    }

    return { init: init };
  }
);
