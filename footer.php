</main>
<footer>
  <div class="footerContent">
    <p class="excerptFooter"> © Copyright <?php echo date('Y') ?> | CUBE2BOIS </p>

    <div class="footer-pages">
      <a href="<?php echo get_permalink(get_page_by_path('politique-de-confidentialite')) ?>" class="footer-text">
        Politique de confidentialité
      </a>

      <a href="<?php echo get_permalink(get_page_by_path('mentions-legales')) ?>" class="footer-text">
        Mentions légales
      </a>

      <a href="<?php echo get_permalink(get_page_by_path('cgu')) ?>" class="footer-text">
        Conditions générales d’utilisations
      </a>
    </div>

    <div>

      <?php while (have_rows('reseaux_sociaux', 'infos')) : the_row();

        $icone_rs = get_sub_field('icone');
        $url_rs = get_sub_field('url');

      ?>
        <a class="icon-rs" href="<?php echo $url_rs ?>"><img src="<?php echo $icone_rs['url'] ?>" alt="LinkedIn Logo" class="footerLogo">
        </a>
      <?php endwhile; ?>
    </div>
  </div>
</footer>

<!-- wp_footer(); Permet d'inérer toutes les informations contenues dans le footer  -->
<?php wp_footer(); ?>
</body>

</html>