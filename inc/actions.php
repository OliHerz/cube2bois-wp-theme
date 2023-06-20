<?php

// ajoute les actions. en fonction de ('quelle actions est effectuée' -> 'quelle fonction cela lance')

add_action('after_setup_theme', 'themeExpo_supports');

// permet d'activer l'utilisation des scritp enregistrés dans la fonction 'themeExpo_register_assets'
add_action('wp_enqueue_scripts', 'themeExpo_register_assets');

// Register the menu locations.
add_action( 'init', 'themeExpo_register_menus' );
