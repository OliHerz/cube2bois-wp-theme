<?php
// Spécifie toutes les actions que le thème peut supporter 

function themeExpo_supports()
{
  // permet de donner à la page son titre dans le nagivateur
  add_theme_support('title-tag');

  // permet d'ajouter les menus personnalisés
  add_theme_support('menus');

  // permet d'intégrer un logo personnalisé dans la page (header, footer, ...)
  add_theme_support('custom-logo');
  add_theme_support('custom_logo', array(
    'height'      => 150,
    'width'       => 150,
    'flex-height' => true,
    'flex-width'  => true,
  ));

  // permet de redimentionner la taille du logo ajouté
  add_image_size('custom-logo-size', 150, 150, true);

  // Ajout de l'image mise en avant 
  add_theme_support('post-thumbnails');


  // Permet du thème de supporter des modèles templates de pages personnalisées 
  add_theme_support('post-templates');

  add_post_type_support('page', 'excerpt');

  add_theme_support(
    'html5',
    array(
      'search-form',
      'comment-form',
      'comment-list',
      'gallery',
      'caption',
      'style',
      'script',
    )
  );

  add_theme_support('custom-header');

  add_theme_support('disable-custom-font-sizes');

  add_theme_support('disable-custom-colors');

  add_theme_support('editor-color-palette');

  remove_action('wp_head', '_admin_bar_bump_cb');
}

// permet de créer des menus personalisables
function themeExpo_register_menus()
{
  register_nav_menus(array(
    'walker' => esc_html__('walker', 'walker'),
    'header-menu' => esc_html__('En-tête de page', 'themeExpo'),
    'footer' => esc_html__('Pied de page', 'themeExpo'),
  ));
}



/* pour le script charge après html css ( pour que java script fonctionne comme il faut )   */
function ig_add_defer_attribute($tag, $handle)
{
  $scripts_to_defer = array('child-script');
  foreach ($scripts_to_defer as $defer_script) {
    if ($defer_script === $handle) {
      return str_replace(' src', ' defer="defer" src', $tag);
    }
  }
  return $tag;
}


// Spéficication des ajouts de style/plugins/frameworkd/library pour que le thème puisse le supporter
function themeExpo_register_assets()
{
  // Import des font Google
  wp_enqueue_style('custom-google-fonts', '//fonts.googleapis.com/css2?family=Lobster&family=Lobster+Two&family=Montserrat:ital,wght@0,400;0,500;0,700;1,400;1,700&display=swap');

  // Import des icons font Awesome
  wp_enqueue_style('font-awesome', '//maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css');

  // Import des feuilles de style
  wp_enqueue_style('styleinfo', get_template_directory_uri() . '/css/normalize.css', array(), "1.0");
  wp_enqueue_style('style', get_template_directory_uri() . '/css/style.css', array(), "1.0");
  wp_enqueue_style('ig-style', get_template_directory_uri() . '/css/style_configurateur.css', array(), "1.0");

  // Import des script JS  & Chargement
  wp_enqueue_script('script', get_theme_file_uri() . '/dist/script.js', array(), '', true);

  wp_register_script('makeThePDF', get_theme_file_uri() . '/dist/makeThePDF.js', array(), '', true);

  wp_register_script('fonctionnementReverse', get_theme_file_uri() . '/dist/fonctionnementReverse.js', array(), '', true);

  wp_enqueue_script('fontawesome', 'https://kit.fontawesome.com/121ca38717.js');


  wp_register_script('ig-scripts', get_theme_file_uri() . '/dist/config.js', '', '', true);

  if (is_page(83)) {
    wp_enqueue_script('ig-scripts');
  }

  if (is_page(81)) {
    wp_enqueue_script('fonctionnementReverse');
  }

  // Script pour afficher les devis ou stands
  wp_register_script('poststands', get_theme_file_uri() . '/dist/poststands.js', '', '', true);

  if (is_page(181)) {
    wp_enqueue_script('poststands');
    wp_enqueue_script('makeThePDF');
  }

  // Déclaration de variables globales pour le script ig-scripts
  wp_localize_script('ig-scripts', 'igData', array(
    'root_url' => get_site_url(),
    'current_user_id' => get_current_user_id(),
    'nonce' => wp_create_nonce('wp_rest')
  ));

  wp_localize_script('makeThePDF', 'InfosDevisIG', array(
    'dataIG' => [
      "nom_societe_PDF" =>  get_field('nom_societe_pdf', 'infos'),
      "rue_PDF" =>  get_field('rue_pdf', 'infos'),
      "code_postal_PDF" => get_field('code_postal_pdf', 'infos'),
      "ville_PDF" => get_field('ville_pdf', 'infos'),
      "tel_PDF" => get_field('tel_pdf', 'infos'),
      "email_PDF" => get_field('email_pdf', 'infos'),
      // On récupère ici les information qui vont se situer au bas du devis
      "email_footer_PDF" => get_field('email_footer_pdf', 'infos'),
      "naf_PDF" => get_field('naf_pdf', 'infos'),
      "sarl_PDF" => get_field('sarl_pdf', 'infos'),
      "siret_PDF"  => get_field('siret_pdf', 'infos'),
      "tva_PDF" => get_field('tva_pdf', 'infos'),
    ],
    'root_url' => get_site_url(),
    'current_user_id' => get_current_user_id(),
    'nonce' => wp_create_nonce('wp_rest')
  ));
}


// Remove private prefix from post titles
function removePrefixFromPrivatePostTitle($format, $post = null)
{
  return '%s';
}




function add_type_attribute($tag, $handle, $src)
{
  // if not your script, do nothing and return original $tag
  if ('ig-scripts' !== $handle) {
    return $tag;
  }
  // change the script tag by adding type="module" and return it.
  $tag = '<script type="module" src=' . esc_url($src) . '"></script>';
  return $tag;
}






function formulaire_contact()
{
  ob_start(); // Commence la mise en mémoire tampon de sortie
  echo do_shortcode('[contact-form-7 id="116" title="Formulaire de contact"]'); // Remplacez 123 par l'ID de votre formulaire de contact
  $shortcode = ob_get_clean(); // Stocke le contenu de la mise en mémoire tampon dans une variable
  return $shortcode;
}

// Désactiver le menu Mes stands si l’utilisateur n’est pas connecté
add_filter('wp_get_nav_menu_items', 'filter_menu_items', 10, 3);

function filter_menu_items($items, $menu, $args)
{
  if (!is_user_logged_in()) {
    foreach ($items as $key => $item) {
      if ($item->title == 'Mes stands') {
        unset($items[$key]);
      }
    }
  }
  return $items;
}





// Formulaire du site IG 
// [contact-form-7 id="116" title="Formulaire de contact"]


// Formualire de test
//[contact-form-7 id="64" title="Form 3"]
