<article class="articleInfo"> 

  <div class="headerArticle">
    <div class="insideTitleArticle">
      <h2 class="titleArticle"> <?php the_title(); ?> </h2>
    </div>
  </div>

  <div class="contentArticle">
    <?php if (has_post_thumbnail()) : ?>
      <div class="insideArticleSection">
        <img src="<?php echo get_the_post_thumbnail_url(); ?>" alt="<?php the_title(); ?>" class="imageArticle">
      </div>
    <?php endif; ?>

    <div class="insideArticleSection ">
      <p><?php the_content(); ?> </p>
    </div>
  </div>

  <?php if(get_field('bloc_article')): ?>
    <div class="extra-content">
      <p>  <?php the_field('bloc_article'); ?> </p>
    </div>
  <?php endif; ?>

</article>  
