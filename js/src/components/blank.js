define(
  [ 'jquery' ],
  function( $ )
  {
    var signals;

    function init( config )
    {
      console.log( "  === name ===" );
      signals = config.signals;
    }

    return { init: init };
  }
);
