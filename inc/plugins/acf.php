<?php

// Ajouter la page d'option pour le devis
// Qui permet d'enregister les informations de la société IG ou CUbe2Bois
// Pour générer dynamiquement leurs coordonnées sur le devis généré.

if (function_exists('acf_add_options_page')) {

  acf_add_options_page(array(
    'page_title'    => 'Nos informations',
    'menu_title'    => 'Nos Informations',
    'menu_slug'     => 'infos-site',
    'capability'    => 'edit_posts',
    'position'     => 3,
    'menu_icon'     => 'dashicons-media-text',
    'redirect'      => false,
    'post_id'      => 'infos',
    'update_button' => 'Mettre à jour'
  ));
}
