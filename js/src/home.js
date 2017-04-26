define(
  [ 'jquery', 'packery', 'draggabilly', 'siriwave', 'vivus' ],
  function( $, Packery, Draggabilly, SiriWave, Vivus )
  {
    var signals, pckry, draggies, isActive;

    function init( config )
    {
      console.log( "  === home ===" );
      signals = config.signals;
      draggies = [];

      // signals['dom-ready'].dispatch();

    }

    // nv: start draggy
    function _createDrag()
    {
      pckry = new Packery( '#contact-list-ul', {
        itemSelector: '#contact-list-ul li',
        columnWidth: 375
      });

      $( '#contact-list-ul li' ).each( function( i, gridItem ) {
        var draggie = new Draggabilly( gridItem, { axis: 'y' } );
        pckry.bindDraggabillyEvents( draggie );
        draggies.push( draggie );
      });
    };

    // nv: end draggy
    function _destroyDrag()
    {
      if( pckry )
      {
        $.each( draggies, function( i, draggie ) {
          draggie.disable();
        });
        draggies = [];
        // pckry.destroy();
        // pckry = null;
      }
    };

    function addContacts( contacts )
    {
      $.each( contacts, function( index, contact )
      {
        // console.log( "index, contact", index, contact );
        signals['create-button'].dispatch( contact );
      });

      signals['dom-ready'].dispatch();
    }

    // nv: click tile to make it active
    $('.contact-list-li:nth-of-type(1), .contact-list-li:nth-of-type(2)').click(function(evt){
      // nv: don't add active states if we're reordering
      if ($('.contact-list-li').hasClass("reorder-state")) {
        return false;
      }

      else {
        // nv: don't fire if you click on the text-button
        if ( $(evt.target).hasClass('text-button') || $(evt.target).parent().parent().hasClass('text-button') ) {
          return;
        }
        $(this).toggleClass('shouting');
        $('.outgoing-call').toggleClass('contract');
        $('.outgoing-call').toggleClass('active');
        $('.empty').toggleClass('active');

        var siriWave = new SiriWave({
            container: $( '#siri-1' )[0],
            width: 375,
            height: 80,
            autostart: true,
            speed: 0.07,
            frequency: 5,
            amplitude: 0.001

        });
        // nv: looping in the Chat display
        $('.chat-area').toggleClass('outgoing');
      }
    });

    // nv: toggle broadcasts drawer
    $('.more-toggle').click(function(){
      if ($('.contact-list').hasClass('mini-player'))
        {
          $('.broadcasts').toggleClass('expand-mini');
          $('.more-toggle').toggleClass('active');
        }
        else
        {
          $('.broadcasts').toggleClass('expand');
          $('.more-toggle').toggleClass('active');
        }
    });

    // nv: play Market Bulletin
    $('.channel').click(function(){
      $(this).toggleClass('active');
      $('.broadcasts .header').addClass('active');
      $('.title .one-playing, .play-pause .pause').addClass('show');
      $('.title .default').removeClass('show');
    });

    // nv: Control Panel control for Multiple Broadcasts Playing
    $('.multiple-broadcasts-trigger').click(function(){
      $('.title .default, .title .one-playing').removeClass('show');
      $('.title .multiple-playing').addClass('show');
      // $('.now-playing-big').toggleClass('expand');
      // $('.more-toggle').addClass('move-up');
    });

    // nv: Broadcasts flow
    $('.minimize-control').click(function(){
      $('.broadcasts').toggleClass('expand');
      $('.more-toggle').toggleClass('active');
      $('.now-playing-big').toggleClass('expand');
      $('.more-toggle').addClass('move-up');
      $('.now-playing-small').toggleClass('show');
    });

    // nv: click on an individual contact tile to make a call
    $('.accepted-call-trigger').click(function(){
      $('.line-item.voice').removeClass('contract');
      $('.line-item.broadcast').removeClass('small');
      $('.incoming-call').addClass('active');
      $('.empty').removeClass('active');
      var siriWave = new SiriWave({
          container: $( '#siri-0' )[0],
          width: 600,
          height: 80,
          autostart: true,
          speed: 0.05,
          frequency: 5,
          amplitude: 0.5

      });
      // nv: looping in the Chat display
      $('.chat-area').toggleClass('outgoing');
      // nv: looping in the Dialpad display
      $('.dialpad').toggleClass('outgoing');
    });

    // nv: opens the Search panel when you click on the Command Center
    $('#search').click(function(){
      $('.panel1').toggleClass('expand');
      $('.search-controls').toggleClass('show');
    });

    // nv: open panel2 of the Search Panel when the user types "/people chloe"
    $("#search").keyup(function() {
        if (this.value == "/people chloe") {
            $('.panel2').addClass('expand');
        }
        else {
            console.log('nah');
        }
        if (this.value == "") {
            $('.panel2').removeClass('expand');
        }
        else {
            console.log('nah');
        }
    });

    // nv: close panel2 of the Search Panel when the user clicks on panel2
    $('.panel2').click(function(){
      $('.panel1').removeClass('expand');
      $('.panel2').removeClass('expand');
      $('.search-controls').toggleClass('show');
      $('#search').val('');
    });

    // on-tile notification flow
    $('.contact-tile-notification-trigger').click(function(){
      $('.notification-example').addClass('quick-reply-notification');
      $('.notification-example').addClass('messages-waiting');
      setTimeout(
          function() {
            $('.notification-example').removeClass('quick-reply-notification');
            $('.notification-example').addClass('shrink-notification');
          },
      700);
    });

    // nv: off-screen text-message notification
    $('.off-screen-notification-trigger').click(function() {
      $('.notification-bar').toggleClass('show-notification');
      $('.notification-bar').toggleClass('show-text-notification');
    });

    // nv: incoming voice communication
    $('.incoming-call-notification-trigger').click(function() {
      $('.notification-bar').toggleClass('show-notification');
      $('.notification-bar').toggleClass('incoming-call');
      // nv: looping in the Chat display
      $('.chat-area').toggleClass('incoming');
    });

    // nv: click on now playing volume trigger to slide in volume controls
    $('.volume-control-trigger').click(function(){
      $('.volume-control').toggleClass('expand');
    });

    // nv: click on now playing volume trigger to slide in volume controls
    $('.quick-reply-trigger').click(function(){
      $('.quick-reply-drawer').toggleClass('expand');
    });

    // nv: click on communication icon in Now Playing to toggle icon, volume controls height, and microphone visibility
    $('.incoming .communication-icon').click(function(){
      $('.incoming').toggleClass('engaged');
      $('.voice .volume-controls').toggleClass('engaged');
      $('.ringable').toggleClass('shouting');
      console.log('working');
    });

    // nv: toggle state via Outgoing Call trigger in Control Panel
    $('.outgoing-call-trigger').click(function(){
      $('.outgoing-call').toggleClass('contract');
      $('.outgoing-call').toggleClass('active');
      $('.empty').toggleClass('active');

      var siriWave = new SiriWave({
          container: $( '#siri-1' )[0],
          width: 375,
          height: 80,
          autostart: true,
          speed: 0.07,
          frequency: 5,
          amplitude: 0.001

      });
      // nv: looping in the Chat display
      $('.chat-area').toggleClass('outgoing');
    });

    // nv: toggle state via Declined Call trigger in Control Panel
    $('.outgoing-call .communication-icon, .declined-call-trigger').click(function(){
      $('.no-answer').toggleClass('contract');
      $('.no-answer').toggleClass('active');
      $('.outgoing-call').toggleClass('active');
      // nv: looping in the Chat display
      $('.chat-area').removeClass('outgoing');
      $('.chat-area').addClass('unavailable');
    });

    // nv: toggle Awesome menu via Awesome button
    $('.awesome-button').click(function(){
      if ($('.wrapper').hasClass("alfred"))
        {
          $('.alfred-panels').removeClass('hide');
          $('.alfred-panels').toggleClass('z');
          setTimeout(
              function() {
                $('.alfred-panels .two').toggleClass('show');
              },
          10);
        }
        else {
          $('.awesome-menu').toggleClass('expand');
          $('.awesome-button').toggleClass('active');
          $('.awesome-button').toggleClass('rotate');
          $('.alfred-panels').addClass('hide');
        }
    });
    $('.awesome-menu').click(function(){
      $('.awesome-menu').removeClass('expand');
      $('.awesome-button').removeClass('active');
      $('.awesome-button').removeClass('rotate');
    });

    // nv: show inline message response input from Now Playing area -> dismissed/missed call
    $('.message-reply-trigger, .message-reply .x-dismiss').click(function(){
      $('.message-reply-trigger').toggleClass('show');
      $('.message-reply').toggleClass('show');
      $('#now-playing-response').focus();
    });

    // nv: begin typing to activate the Send button
    $('#now-playing-response').keypress(function(){
      $('.send-button').addClass('active');
    });

    // nv: click send button to see Sent message
    $('.send-button').click(function(){
      $('.message-reply').removeClass('show');
      $('.sent-message').addClass('show');
    });

    // nv: toggle Reorder State, trigger draggy
    $('.reorder-state-trigger').click(function(){
      $('.contact-list li').toggleClass('reorder-state');
      $('.reorder-save').toggleClass('show');
      $('#call-history').toggleClass('hide');
      _createDrag();
    });

    // nv: toggle Call History view
    $('.view-call-history-trigger').click(function(){
      $('#contact-list-ul').toggleClass('show');
      $('#call-history').toggleClass('show');
    });

    // nv: toggle open state for Call History line items
    $('#call-history li .line-item').click(function(){
      $(this).parent().toggleClass('open');
    });

    // nv: toggle active state for Chat Tabs
    $('.tab').bind('click', function() {
        // remove the active class from all elements with active class
        $('.tab').removeClass('active')
        // add active class to clicked element
        $(this).addClass('active');
    });

    // nv: toggle the shrink function for Chat Tabs
    $('.tab.shrink').click(function(){
      $('.tab').toggleClass('shrink');
      setTimeout(
          function() {
            $('.tab:nth-of-type(3), .tab.control').toggleClass('shrink');
          },
      1);
    });

    // nv: toggle Tab Notification state via Tab Manager Notification Trigger
    $('.tab-manager-notification-trigger').click(function(){
      $('.chat-area').toggleClass('tab-notification');
    });

    // nv: toggle Tab Notification state via Tab Manager Notification Trigger
    $('.tab.control').click(function(){
      $('.tab-dropdown').toggleClass('view');
    });

    // nv: toggle Tab Notification state via Tab Manager Notification Trigger
    $('.one-tab-state-trigger').click(function(){
      $('.chat-area').toggleClass('one-tab-state');
    });

    // nv: show Bizmoji
    $('.bizmoji-trigger').click(function(){
      $('.bizmoji-window').toggleClass('show');
    });

    // nv: toggle Accepted call from Control Panel
    $('.accepted-call-responding-trigger').click(function(){
      $('.now-playing .incoming-call, .communication-icon, .volume-controls').toggleClass('engaged');
    });

    // nv: Create-A-Group toggle
    $('.create-a-group-trigger').click(function(){
      $('.create-a-group').toggleClass('show');
    });

    // nv: Search Results toggle
    $('.search-results-trigger').click(function(){
      $('.search-results').toggleClass('show');
    });

    // nv: Group Invite add members dropdown toggle
    $('.invite-members .text-field').click(function(){
      $('.members-dropdown, .ch').toggleClass('show');
      $('.suggested').toggleClass('show');
    });

    // nv: Search Panel toggle
    $('.search-panel-trigger').click(function(){
      $('.search-panel').toggleClass('show');
    });

    // nv: show "Chloe" search results on ch input
    $("#search").keyup(function() {
        if (this.value == "ch") {
            $('.search-panel').addClass('show');
        }
        else {
        }
        if (this.value == "") {
            $('.search-panel').removeClass('show');
        }
        else {
        }
    });

    // nv: Call flow from Awesome Menu
    $('.line-item.call').click(function(){
      $('.awesome-menu').toggleClass('expand');
      $('.search-prompt.call').toggleClass('show');
      $('#search').toggleClass('expand-call');
      $('#search').focus();
      $('.tooltips').toggleClass('slide');
      $('.tooltip.call').toggleClass('show');
    });

    // nv: Add Contact flow from Awesome Menu
    $('.line-item.add-contact').click(function(){
      $('.awesome-menu').toggleClass('expand');
      $('.search-prompt.add-contact').toggleClass('show');
      $('#search').toggleClass('expand-add-contact');
      $('#search').focus();
      $('.tooltips').toggleClass('slide');
      $('.tooltip.add-contact').toggleClass('show');
    });

    // nv: toggle Contact List view
    $('.contact-list-control').click(function(){
      $('#contact-list-ul').addClass('show');
      $('#call-history').removeClass('show');
      $(this).toggleClass('active');
      $('.call-history-control').removeClass('active');
    });

    // nv: toggle Call History view
    $('.call-history-control').click(function(){
      $('#contact-list-ul').removeClass('show');
      $('#call-history').addClass('show');
      $(this).toggleClass('active');
      $('.contact-list-control').removeClass('active');
    });

    // nv: Create-A-Group flow from Awesome Menu
    $('.line-item.create-group').click(function(){
      $('.awesome-menu').toggleClass('expand');
      $('.create-a-group').toggleClass('show');
    });
    $('.create-a-group .close, .create-a-group .cancel').click(function(){
      $('.create-a-group').toggleClass('show');
    });

    // nv: show initial Search Results when keying anything into Command Line
    $('#search').keypress(function(){
      $('.panel1').removeClass('expand');
    });

    // nv: show Chat window via Control Panel
    $('.new-chat-window-trigger, .line-item.message').click(function(){
      $('.chat-window-fpo').toggleClass('show');
    });

    // nv: Toggle Mini-player
    $('.mini-player-trigger, #mini-player-icon').click(function(){
      $('.contact-list, .command-line').toggleClass('mini-player');
      $('.wrapper').toggleClass('height-auto');
    });

    // nv: Toggle Call History Notification
    $('.call-history-notification-trigger').click(function(){
      $('.call-history-control, #call-history .time, #call-history .unread').toggleClass('notification');
    });

    // nv: show Disconnected Notification from Control Panel
    $('.disconnected-trigger').click(function(){
      $('.disconnected, .disconnected-overlay').toggleClass('show');
    });

    // nv: Hide/Show Message Window
    $('.message-window-trigger, .contact-list-li .text-button, .chat-area .close-control').click(function(){
      if ($('.contact-list-li').hasClass('reorder-state')) {
        return false;
      }
      else {
        $('.chat-area').toggleClass('show');
      }
    });

    // nv: Slide in Notifications
    $('.notification-slide-in-trigger').click(function(){
      $('.system-notifications').toggleClass('slide-in');
    });

    // nv: Show all Notifications
    $('.notification-show-all-trigger').click(function(){
      $('.system-notifications').toggleClass('show-all');
    });

    // nv: enlarge Quick Reply input
    $('.quick-reply input').click(function(){
      $('.system-notifications').toggleClass('focus');
    });

    // nv: show Send button
    $('.quick-reply input').keypress(function(){
      $(this).addClass('show-send');
    });

    // nv: toggle "Alfred"
    $('.alfred-trigger').click(function(){
      $('.wrapper').toggleClass('alfred');
      $('.contact-list, .command-line').addClass('mini-player');
    });

    // nv: toggle Availability
    $('.availability-trigger, .status-bar .background, .status-dot').click(function(){
      $('.user').toggleClass('toggle-availability');
      $('.user-status em').toggleClass('show');
    });

    // nv: enlarge Systray Icons
    $('.systray-icons-small').click(function(){
      $('.systray-icons-small img').toggleClass('large');
    });

    // nv: toggle Systray
    $('.systray-trigger').click(function(){
      $('.systray').toggleClass('show');
    });

    // nv: in-app Group notification
    $('.group-notification-trigger').click(function() {
      $('.notification-bar').toggleClass('show-notification');
      $('.notification-bar').toggleClass('group-notification');
    });

    // nv: toggle Settings dropdown
    $('.status-bar .settings').click(function() {
      $('.settings-dropdown').toggleClass('expand');
      $(this).toggleClass('active');
    });

    // nv: slide-out Preferences
    $('.settings-dropdown .line-item').click(function() {
      $('.settings-dropdown').removeClass('expand');
      $('.preferences').toggleClass('slide-in');
    });

    // nv: close preferences
    $('.preferences .close').click(function() {
      $('.preferences').removeClass('slide-in');
    });

    // nv: slide-out Preferences, slide-in Settings Master
    $('.preferences .line-item').click(function() {
      $('.preferences').addClass('slide-out');
      $('.settings-master').addClass('slide-in');
    });

    // nv: slide-in Preferences, slide-out Settings Master
    $('.settings-master .caret').click(function() {
      $('.preferences').removeClass('slide-out');
      $('.settings-master').removeClass('slide-in');
    });

    // nv: close all Settings
    $('.settings-master .close').click(function() {
      $('.preferences').removeClass('slide-out')
      $('.preferences').removeClass('slide-in');
      $('.settings-master').removeClass('slide-in');
    });

    // nv: toggle Settings drop-down
    $('.drop-down-macro .trigger, .drop-down-micro .line-item').click(function() {
      $('.drop-down-macro').toggleClass('expand');
    });

    // nv: toggle Context Menu (Right-Click Menu)
    $('.context-menu-trigger').click(function() {
      $('.context-menu').toggleClass('show');
    });

    // nv: slide-out Context Menu second level
    $('.flyout-trigger').hover(function() {
      $('.flyout').addClass('slide-out');
    });

    // nv: hide Context Menu second level
    $('.flyout .line-item').click(function() {
      $('.flyout').removeClass('slide-out');
    });

    // nv: in-app New Contact notification
    $('.new-contact-trigger').click(function() {
      $('.notification-bar').toggleClass('show-notification');
      $('.notification-bar').toggleClass('contact-notification');
    });

    // nv: show 'Saved' on value change for Settings
    $('.value-change').click(function() {
      $('.saved').addClass('show');
      setTimeout(
          function() {
            $('.saved').removeClass('show');
          },
      3000);
    });

    // nv: remove Notification notch on click
    $('#call-history li').click(function(){
      if ($(this).hasClass("notification")) {
        $(this).removeClass('notification');
        console.log('works');
      }
    });

    // nv: toggle Call/End button for Dialpad
    $('.call-end').click(function() {
      $('.call-end').toggleClass('end');
      $('.transfer').toggleClass('show');
      // $('.dialpad').toggleClass('outgoing');
    });

    // nv: show Dialpad dropdown on key "ch"
    $(".dialpad input").keyup(function() {
        if (this.value == "ch") {
            $('.dialpad .dropdown').addClass('show');
        }
        else {
        }
        if (this.value == "") {
            $('.dialpad .dropdown').removeClass('show');
        }
        else {
        }
    });

    // nv: show Add Contact Icon on key "212"
    $(".dialpad input").keyup(function() {
        if (this.value == "212") {
            $('.dialpad .add-contact-icon').addClass('show');
        }
        else {
        }
        if (this.value == "") {
            $('.dialpad .add-contact-icon').removeClass('show');
        }
        else {
        }
    });

    // nv: click on the dropdown to show Selected name in the input
    $('.dialpad .dropdown, .dialpad .selected-name').click(function() {
      $('.selected-name').toggleClass('show');
      $(this).removeClass('show');
    });

    // nv: click on Dialpad icon to show Dialpad
    $('.dialpad-control, .dialpad .close').click(function() {
      $('.dialpad').toggleClass('show');
    });

    // nv: Create-A-Contact trigger
    $('.cta-panel .button').click(function() {
      $('.create-a-contact').toggleClass('show');
      $('.tooltips').removeClass('slide-more');
      $('.tooltips').removeClass('slide');
    });

    // nv: type "james blue" to bring up New Contact panel
    $("#search").keyup(function() {
        if (this.value == "james blue") {
            $('.tooltips').addClass('slide-more');
            $('.tooltip.add-contact .message1').removeClass('show');
            $('.tooltip.add-contact .message2').addClass('show');
            console.log('toolip working');
        }
        else {
        }
        if (this.value == "") {
            $('.tooltips').removeClass('slide-more');
            $('.tooltip.add-contact .message2').removeClass('show');
            $('.tooltip.add-contact .message1').addClass('show');
        }
        else {
        }
    });

    // nv: type "sa" to bring up new contact panel / search results
    $("#search").keyup(function() {
        if (this.value == "sa") {
            $('.panel3').addClass('expand');
        }
        else {
        }
        if (this.value == "") {
            $('.panel3').removeClass('expand');
        }
        else {
        }
    });

    // nv: make call from Dialpad
    $('.dialpad .call-end').click(function(){
      $('.line-item.voice').removeClass('contract');
      $('.line-item.broadcast').removeClass('small');
      $('.phone-call').addClass('active');
      $('.empty').removeClass('active');
      // Engaged
      $('.now-playing .phone-call, .phone-call .communication-icon, .volume-controls').toggleClass('engaged');
      var siriWave = new SiriWave({
          container: $( '#siri-3' )[0],
          width: 600,
          height: 80,
          autostart: true,
          speed: 0.05,
          frequency: 5,
          amplitude: 0.5

      });
      // nv: looping in the Chat display
      $('.chat-area').toggleClass('outgoing');
      // nv: looping in the Dialpad display
      $('.dialpad').toggleClass('outgoing');
    });

    // nv: Create-A-Contact trigger
    $('#pencil, .edit-contact .close, .edit-contact .cancel').click(function() {
      $('.edit-contact').toggleClass('show');
      $('.tooltips').removeClass('slide-more');
      $('.tooltips').removeClass('slide');
    });

    // nv:  Phone Call Notification
    $('.phone-call-notification-trigger').click(function() {
      $('.notification-bar').toggleClass('show-notification');
      $('.notification-bar').toggleClass('incoming-phone-call');
      // nv: looping in the Chat display
      $('.chat-area').toggleClass('incoming');
    });

    // nv: Toggle Login Screen
    $('.login-screen-trigger').click(function() {
      $('.demo').toggleClass('login');
      $('.login-screen').toggleClass('show');
    });

    // nv: Toggle Login Screen Error state
    $('.login-screen-error-trigger').click(function() {
      $('.input-field.email').toggleClass('show-error');
    });

    // nv: Remember Password checkbox
    $('.remember-wrapper .checkbox').click(function() {
      $(this).toggleClass('checked');
    });

    // nv: Login Button -> Loading -> Elliot
    $('.logging-in .button').click(function() {
      $('.logging-in, .loading').toggleClass('show');
      setTimeout(
          function() {
            $('.demo').removeClass('login');
            $('.login-screen').removeClass('show');
          },
      3000);
    });

    // nv: show Context Menu and changed "Edit" menu item for Group tile
    $('.group-tile .text-button').click(function() {

      if ($('.group-tile').hasClass('reorder-state'))
        {
          $('.context-menu').toggleClass('show');
          $('.context-menu').toggleClass('group-menu');
        }
        else{

        }
    });

    // nv: edit Group
    $('.line-item.edit-group').click(function() {
      $('.context-menu').toggleClass('show');
      $('.context-menu').toggleClass('group-menu');
      $('.create-a-group').toggleClass('show');
      $('.create-a-group').toggleClass('edit-state');
      $('#group-name-input').val('Research Team');
    });

    // nv: Alfred open downwards
    $('#search').click(function() {
      if ($('.wrapper').hasClass("alfred")) {
        $('.alfred-panels').removeClass('hide');
        $('.alfred-panels').toggleClass('z');
        setTimeout(
            function() {
              $('.alfred-panels .one').toggleClass('show');
            },
        10);
      }
      else {
        $('.alfred-panels').addClass('hide');
      }
    });

    // nv: Alfred "Chloe"
    $("#search").keyup(function() {
        if (this.value == "ch") {
          $('.search-panel').addClass('show');
          if ($('.wrapper').hasClass("alfred")) {
            $('.alfred-panels').removeClass('hide');
            $('.alfred-panels .one').toggleClass('show');
            setTimeout(
                function() {
                  $('.alfred-panels .two').toggleClass('show');
                },
            10);
          }
          else {
            $('.alfred-panels').addClass('hide');
          }
        }
        else {
        }
        if (this.value == "") {
            $('.search-panel').removeClass('show');
        }
        else {
        }
    });

    // nv: hover state for Contact Tiles
    $('.demo .wrapper .contact-list #contact-list-ul li .wrapped .meta .text-button').hover(function() {
      $('.demo .wrapper .contact-list #contact-list-ul li').toggleClass('no-hover');
      $(this).toggleClass('do-hover');
    });

    // nv: Create-A-Contact button flow
    $('.create-a-contact .button').click(function() {
      setTimeout(
        function() {
          $('.create-a-contact').removeClass('show');
        },
      100);
      $('.notification-bar').addClass('show-notification');
      $('.notification-bar').addClass('contact-notification');
      setTimeout(
        function() {
          $('.notification-bar').removeClass('show-notification');
          $('.notification-bar').removeClass('contact-notification');
        },
      3000);
    });

    // nv: Call History Add Contact flow
    $('#call-history .add-contact-button').click(function() {
      $(this).parent().addClass('contract');
      $('.notification-bar').addClass('show-notification');
      $('.notification-bar').addClass('contact-notification');
      setTimeout(
        function() {
          $('.notification-bar').removeClass('show-notification');
          $('.notification-bar').removeClass('contact-notification');
        },
      3000);
    });

    // nv: give Dialpad icon outline
    $('.dialpad input, .key').click(function() {
      $('.call-end').addClass('active');
    });

    // nv: begin typing to enable the Login button
    $('.login-screen input').keypress(function(){
      $('.login-screen .button').addClass('enabled');
    });

    return { init: init, addContacts: addContacts };
  }
);
