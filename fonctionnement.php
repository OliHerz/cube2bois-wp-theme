<?php 
/*
Template Name: Fonctionnement
*/
?>

<?php get_header();?>



<?php $infosCube = array(
  'post_type' => 'infos_cubes',
  'posts_per_page' => -1, // Récupère tous les posts de ce type
  'orderby' => 'ID', // 'Si l'on doit trier les articles, trie les par leurs id'
  'order' => 'ASC' // Dans l'ordre ascendant
);

$query = new WP_Query( $infosCube ); // $query deviens la déclaration de tous les posts 'infos_cube'

if ( $query->have_posts() ) {
  while ( $query->have_posts() ) {
    $query->the_post();
      // Ici, vous pouvez accéder aux données de chaque post
      get_template_part('template-parts/content-article-info');
  }
}
wp_reset_postdata(); // Réinitialisation de la requête ?>

<?php get_footer(); ?>