<!DOCTYPE html>
<html>
<!-- language_attribute permet au site internet de s'addapter la langue des textes en fonction de l'utilisateur -->

<head <?php language_attributes(); ?>>
  <!-- 'charset' permet de dire au navigateur quel type de lettre, caractères et chiffre utiliser pour le site -->
  <meta charset="<?php bloginfo('charset'); ?>">
  <title><?php the_title(); ?></title>
  <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>" type="text/css">
  <script src="https://www.google.com/recaptcha/api.js" async defer></script>

  <!-- ce meta permettre à wordpress d'utiliser ses propres dimensions pour les media querry -->
  <script  src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"> </script>
  <!-- Script de debug pour jsPDF  -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.5.3/jspdf.debug.js" integrity="sha384-NaWTHo/8YCBYJ59830LTz/P4aQZK1sS0SneOgAvhsIl3zBu8r9RevNg5lHCHAuQ/" crossorigin="anonymous"></script>
  <meta name="viewport" content="width=device-width, initial-scale = 1">
  <!-- wp_head(); permet d'insérer toutes les informations à mettre en entête -->
  <?php wp_head(); ?>
</head>

<!-- body_class() permet de donner différentes information sur la page en cours, et attribue à chaque page différentes pages  -->

<body <?php body_class() ?>>
  <header>

    <!---------------------------------- Navbar --------------------------------------->
    <nav class="menu">
      <div class="menuStart">
        <?php if (has_custom_logo()) : ?>
          <?php the_custom_logo(); ?>
        <?php else : ?>
          <h1>
            <a href="<?php bloginfo('url'); ?>" <?php bloginfo('name'); ?> class="navLogo"> </a>
          </h1>
        <?php endif; ?>
        </a>
      </div>


      <!---------------------------------- Toggle Nav For MediaQuerys --------------------------------------->
      <button class="hamburger">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!---------------------------------- Liste of Menu --------------------------------------->
      <div class="menuEnd">
        <?php
        wp_nav_menu(array(
          'theme_location' => 'walker',
          'container' => 'menu',
          'menu_class' => 'navBar',
          'walker'         => new MyCustom_Walker_Nav_Menu()
        ))
        ?>
      </div>
    </nav>
    <!---------------------------------- FIN Navbar --------------------------------------->

    <!-- Si une image est mise en avant pour cette page, ajout cette section au header -->
    <?php if (has_post_thumbnail()) : ?>
      <section class="landing">
        <?php the_post_thumbnail('full', array('class' => 'headerImg')); ?>
          <p class="excerptHeader"> Créez et réservez votre <span class="boldGreen"> stand en bois </span> avec notre configurateur </p>
      </section>
    <?php endif; ?>

  </header>
  <main>