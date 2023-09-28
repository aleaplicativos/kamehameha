var m = (function( win, doc ) {
  var 
  $cannon, $body, isPressed = false, __x, __y,
  init = function() {
    getElements();
    bindEvends();

    setInterval( render, 20 ); 
  },
  render = function() {
    if( isPressed ) {
      shot( __x, __y );
    }
  },
  getElements = function() {
    $cannon = $( '#cannon' );
    $body = $( 'body' );
  },
  bindEvends = function() {
    $body.on( 'mousemove', function( e ) {
      $cannon.css( 'top', ( e.pageY - ( $cannon.height() / 2 ) ) + 'px' );
      __x = e.pageX;
      __y = e.pageY;
    });
    $body.on( 'click', function( e ) {
      shot( e.pageX, e.pageY );
    });
    $body.on( 'mousedown', function( e ) {
      isPressed = true;
    });
    $body.on( 'mouseup', function( e ) {
      isPressed = false;
    });

  },
  shot = function( posX, posY ) {
    var ball = createBall();
    ball.css( { 'top': ( posY - 80 ) + 'px', 'left': 250 + 'px'  } );
    $body.append( ball );
    setTimeout( function() {
      ball.addClass( 'go');
    }, 70);
    ball.on( 'transitionend', function( e ) {
      
      $( e.currentTarget ).off().remove();
    });

    $cannon.stop().animate( { left: '-40px' }, 50 , function() {
      $cannon.animate( { left: '-10px' }, 100 );
    });

  },
  createBall = function() {
    var ball = $( '<div>' );
    ball.addClass( 'ball' );
    return ball;
  };


  return function(){
    init();
  }
}( window, document ));

m();