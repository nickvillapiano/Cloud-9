define(
  [ 'jquery' ],
  function( $ )
  {
    var DELAY = 300;

    var clickAction, dblClickAction, _clicks, _timer;

    function Button( signals, element )
    {
      // element is a jQuery object
      console.log( "  == new Button", element );

      _clicks = 0;

      clickAction = element.data( 'click-action' );
      dblClickAction = element.data( 'dblclick-action' );

      element.click( _onClick );

      element.mousedown( _onMouseDown );
      element.mouseup( _onMouseUp );
      // element.dblclick( _onDblClick );

      function _onClick( $evt )
      {
        _clicks++;
        if( _clicks === 1 )
        {
          _timer = setTimeout(function()
          {
            // var signalData = {
            //   element: element,
            //   type: 'single',
            //   action: clickAction
            // };
            // signals['button-click'].dispatch( signalData );

            _clicks = 0;
          }, DELAY );
        }else
        {
          //prevent single-click action
          clearTimeout( _timer );
          var signalData = {
            element: element,
            type: 'double',
            action: dblClickAction
          };
          signals['button-click'].dispatch( signalData );

          _clicks = 0;
        }
      }

      function _onMouseDown( $evt )
      {
        var signalData = {
          element: element,
          action: clickAction
        };
        signals['button-down'].dispatch( signalData );
      }

      function _onMouseUp( $evt )
      {
        var signalData = {
          element: element,
          action: clickAction
        };
        signals['button-up'].dispatch( signalData );
      }

      // function _onDblClick( $evt )
      // {
      //   console.log( "_onDblClick", dblClickAction );
      //   signals['button-click'].dispatch( dblClickAction );
      // }
    }

    return Button;
  }
);
