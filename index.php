<?php

require 'vendor/autoload.php';

$project_name = "Cloud 9";

$app = new \Slim\Slim(
  array(
    'templates.path' => 'views',
    'view' => new \Slim\Views\Twig(),
  )
);

$app->get( '/datgui', function() use ( $app )
{
  $title = 'Cloud 9 | Home';
  $body_class = "home fade";
  $app->render( 'home.twig', array(
    'title' => $title,
    'body_class' => $body_class
  ));
});

$app->get( '/', function() use ( $app )
{
  $title = 'Cloud 9 | Elliot';
  $body_class = "style-guide landing-page";
  $app->render( 'style-guide.twig', array(
    'title' => $title,
    'body_class' => $body_class,
    'is_landingPage' => true
  ));
});

$app->get( '/demo', function() use ( $app )
{
  $title = 'Cloud 9 | Demo';
  $body_class = "demo";
  $app->render( 'demo.twig', array(
    'title' => $title,
    'body_class' => $body_class
  ));
});

$app->get( '/style-guide-internal', function() use ( $app )
{
  $title = 'Cloud 9 | Style Guide Internal';
  $body_class = "style-guide-internal";
  $app->render( 'style-guide-internal.twig', array(
    'title' => $title,
    'body_class' => $body_class
  ));
});

$app->get( '/style-guide', function() use ( $app )
{
  $title = 'Cloud 9 | Style Guide';
  $body_class = "style-guide";
  $app->render( 'style-guide.twig', array(
    'title' => $title,
    'body_class' => $body_class
  ));
});

$app->get( '/presentation', function() use ( $app )
{
  $title = 'Cloud 9 | Presentation';
  $body_class = "demo presentation";
  $app->render( 'demo.twig', array(
    'title' => $title,
    'body_class' => $body_class
  ));
});

$app->get( '/no-chat', function() use ( $app )
{
  $title = 'Cloud 9 | No Chat';
  $body_class = "demo no-chat";
  $app->render( 'demo.twig', array(
    'title' => $title,
    'body_class' => $body_class,
    'is_noChat' => true
  ));
});

$app->get( '/phase1', function() use ( $app )
{
  $title = 'Cloud 9 | Phase 1';
  $body_class = "demo no-chat phase1";
  $app->render( 'demo.twig', array(
    'title' => $title,
    'body_class' => $body_class,
    'is_noChat' => true,
    'is_phase1' => true
  ));
});

$app->get( '/phase2', function() use ( $app )
{
  $title = 'Cloud 9 | Phase 2';
  $body_class = "demo no-chat phase2";
  $app->render( 'demo.twig', array(
    'title' => $title,
    'body_class' => $body_class,
    'is_noChat' => true,
    'is_phase2' => true
  ));
});

$app->get( '/phase3', function() use ( $app )
{
  $title = 'Cloud 9 | Phase 3';
  $body_class = "demo phase3";
  $app->render( 'demo.twig', array(
    'title' => $title,
    'body_class' => $body_class,
    'is_phase3' => true
  ));
});


$app->run();
