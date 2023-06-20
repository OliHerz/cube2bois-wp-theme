<?php
/*
  Template Name: template_page
*/
?>


<!--  PRESENTATION   -->

<section class="presentation">

    <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/bande_present.svg" width="" height="" alt="" />
    <?php if( have_posts() ) : while( have_posts() ) : the_post(); ?>
    <?php the_title( '<h2 id="presentation-anchor" class="title">', '</h2>') ; ?>                   
    <?php endwhile; endif; ?>
    <p class="light-presentation">
    <?php the_field('texte_presentation') ?> <br>
      <a href="<?php echo get_permalink(get_page_by_path('fonctionnement')); ?>" class="uppercase" >    <?php the_field('lien_info_presentation') ?>   </a>
    </p>

</section>

  <!-- FONCTIONNEMENT    -->
  <section class="functioning">

    <div class="right">
      <h2 id="functioning-anchor" class="title"> <?php the_field('titre_functioning') ?> </h2>
      <p> <?php the_field('texte_right_functioning') ?>  </p>
      <img class="mockup" src=" <?php the_field('image_right_functioning') ?>" width="" height="" alt="" />
    </div>

    <div class="left">
      <img class = "icon-fonct" src="<?php the_field('icon_functioning') ?>" width="" height="" alt="" />

      <img class="img-fonct" src="<?php the_field('image_left_functioning') ?>" width="" height="" alt="" />

      <p>  <?php the_field('texte_left_functioning') ?> </p>
    </div>

  </section>

  

  <!-- TRY   -->

  <section class="tryItArticle">
  <img src="<?php echo get_stylesheet_directory_uri(); ?>/img/bande_ess.svg" alt="Image de font section Essayez maintenant" class="ImgBandeauTry">
    <div class="tryItContent">
      <div class="tryTitre">
        <h2 class="tryItTitle"> Essayez maintenant </h2>
        <img class ="icon-try" src="<?php echo get_stylesheet_directory_uri(); ?>/img/icon_ess.svg" width="" height="" alt="" />
      </div>
      <a href="<?php echo get_permalink(get_page_by_path('configurateur')) ?>" class="tryItButton"> 
        <button class="buttonTRY"> <h3 class="titleButton"> Configurateur ici </h3></button>
      </a>
      </div>
    </section>

  <!--  CONTACT -->

  <section class="contact">
    <div class="container-contact">
      <h2 id="contact-anchor" class="title">Contactez nous</h2>
      <img class = "icon-contact" src="<?php echo get_stylesheet_directory_uri(); ?>/img/icon_contact.svg"  width="" height="" alt="" />
    </div>

    <?php 
      $shortcode = formulaire_contact();
      update_field('contact_forme', $shortcode);
    ?>
    <?php echo get_field('contact_forme'); ?>


      <div class="text-center">
        <p> www.igexpo.fr  |  +33 (0)3 81 51 42 24  |  info@igexpo.fr</p>
      </div>
  </section>

