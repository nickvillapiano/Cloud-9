
define(
  [ 'src/components/button', 'jquery' ],
  function( Button, $ )
  {
    var signals;
    var elements;
    var prev_next_buttons;
    var selector = '.c9-button';
    var instances = [];

    function init( config )
    {
      console.log( "  === button-manager ===" );
      signals = config.signals;
      elements = $( selector );

      signals['button-click'].add( _onButtonClicked );
      signals['button-down'].add( _onButtonUpDown );
      signals['button-up'].add( _onButtonUpDown );
      signals['create-button'].add( _createNewButton );

      // _addInstances( elements );
    }

    // function _addInstances( elements )
    // {
    //   var len = elements.length;

    //   elements.each(function( index, el )
    //   {
    //     // console.log( "index, el", index, el );
    //     instances.push( new Button( signals, $( el ) ) );
    //   });
    // }

    function _createNewButton( contact )
    {
      // console.log( "_createNewButton", contact );

      // append to DOM
      var el = $( '<div class="c9-button '+contact.status+'" data-click-action="shout" data-dblclick-action="away">'+contact.name+'</div>' );
      $( '.contacts' ).append( el );

      // create new Button
      instances.push( new Button( signals, el ) );
    }

    function addNewButton()
    {
      console.log( "addNewButton" );
    }

    function _onButtonClicked( data )
    {
      console.log( "_onButtonClicked", data );
      var element = data.element;
      if( data.type == 'double' )
      {
        element.toggleClass( data.action );
      }
    }

    function _onButtonUpDown( data )
    {
      console.log( "_onButtonUpDown", data );
      var element = data.element;
      element.toggleClass( data.action );
    }

    return { init: init, addNewButton: addNewButton };
  }
);
