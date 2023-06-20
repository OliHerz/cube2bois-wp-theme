<?php get_header() ?>

<?php
/*
Template Name: Configurateur
*/
?>


<!-- On va récupérer les information de toutes les config, etles stocker dans un bouton que l'on crée pour chaque -->
<?php
function getDataStand()
{
  $tableaux_cloisons = array(
    'cloisons' => array(),
    'structures' => array(),
    'options' => array(),
  );
  $args = array(
    'post_type' => 'model',
    'posts_per_page' => -1
  );

  $query = new WP_Query($args);

  if ($query->have_posts()) {
    while ($query->have_posts()) {
      $query->the_post();
      $tableaux_cloisons['cloisons'][get_the_title()] = 0;
      // Ajoutez des données au tableau $tableaux_cloisons[$nom_cloison] en fonction du type de cloison
    }
  }
  $tableaux_cloisons['structures']['Structure-3x3'] = 0;
  $tableaux_cloisons['structures']['Structure-4x4'] = 0;
  $tableaux_cloisons['structures']['Enseigne-3x3'] = 0;
  $tableaux_cloisons['structures']['Enseigne-4x4'] = 0;

  wp_reset_postdata();

  $current_user_id = get_current_user_id();

  $args = array(
    'author' => $current_user_id,
    'post_type' => 'config',
    'posts_per_page' => -1
  );

  $query = new WP_Query($args);

  if ($query->have_posts()) :
    while ($query->have_posts()) :
      $query->the_post();
?>
      <?php
      // Boucle pour récupérer le contenu des champs ACF pour chaque stand
      $i = 1;
      while (get_field('stand_' . $i)) {
        $stand_fields = get_field_object('stand_' . $i); // récupérer les informations sur le champ ACF du stand
        // Afficher le contenu récupéré pour chaque stand

        $structure = get_field('structure', $stand_fields['value'][0]->ID)[0]->post_title;
        if ($structure == "Structure - 3x3") {
          $tableaux_cloisons['structures']['Structure-3x3']++;
        } else if ($structure == "Structure - 4x4") {
          $tableaux_cloisons['structures']['Structure-4x4']++;
        }
        if (get_field('sign', $stand_fields['value'][0]) == 1) {
          if ($structure == 'Structure - 3x3') {
            $tableaux_cloisons['structures']['Enseigne-3x3']++;
          } else if ($structure == 'Structure - 4x4') {
            $tableaux_cloisons['structures']['Enseigne-4x4']++;
          }
        }

        $size = get_field('size', $stand_fields['value'][0]);
        if (get_field('cloison_droite', $stand_fields['value'][0]) == 1) {
          for ($j = 1; $j <= $size; $j++) {
            $field_name = 'droit_' . $j;
            $field_value = get_field($field_name, $stand_fields['value'][0]->ID)[0]->post_title;

            $tableaux_cloisons['cloisons'][$field_value]++;
          }
        }
        if (get_field('cloison_gauche', $stand_fields['value'][0]) == 1) {
          for ($j = 1; $j <= $size; $j++) {
            $field_name = 'gauche_' . $j;
            $field_value = get_field($field_name, $stand_fields['value'][0]->ID)[0]->post_title;

            $tableaux_cloisons['cloisons'][$field_value]++;
          }
        }

        for ($j = 1; $j <= $size; $j++) {
          $field_name = 'arriere_' . $j;
          $field_value = get_field($field_name, $stand_fields['value'][0]->ID)[0]->post_title;

          $tableaux_cloisons['cloisons'][$field_value]++;
        }

        $i++;
      } ?>

      <?php foreach ($tableaux_cloisons['structures'] as $key => $value) {
        if ($value != 0) { ?>
          <!-- <p> -->
          <?php
          // echo $key . ': ' . $value 
          ?>
          <!-- </p> -->
        <?php }
      }
      foreach ($tableaux_cloisons['cloisons'] as $key => $value) {
        if ($value != 0) { ?>
          <!-- <p> -->
          <?php
          // echo $key . ': ' . $value 
          ?>
          <!-- </p> -->
      <?php }
      }

      // $idconfig = get_the_ID();
      ?>


      <!-- On donne au boutton les données du talbeau qui contient les informations de la config  -->
      <!-- Infos que l'on convertie tableau en JavaScript -->
      <div class="post-content">
        <p> <a href="<?php echo get_permalink(get_page_by_path('configurateur')) . '?id=' . get_the_ID(); ?>"><?php the_title(); ?></a></p>
        <button data-donnee=<?php echo json_encode($tableaux_cloisons); ?> class="genPDF"> Créer un PDF </button>
      </div>

      <!-- Remet les valeurs à zéro après chaque itération sur chaque stand -->
  <?php foreach ($tableaux_cloisons as &$sous_tableau) {
        foreach ($sous_tableau as &$valeur) {
          $valeur = 0;
        }
      }
    endwhile;
  endif; ?>

<?php } ?>


<!-----------------  CONTEUR PRINCIPAL ----------------->

<!-- Page qui sert du configurateur -->
<?php if (is_page(83)) : ?>
  <!-- Choix de dimension et cotés -->
  <div class="conteneur_chargement active">

    <h1 class="loading-text">Chargement...</h1>
    <?php if (has_custom_logo()) : ?>
      <?php the_custom_logo(); ?>
    <?php else : ?>
      <h1>
        <?php bloginfo('name'); ?>
      </h1>
    <?php endif; ?>
    </a>
  </div>

  <div class="conteneur_principal conteneur_config">

    <!-----------------  MENU GAUCHE ----------------->
    <div class="menu-left menu-config  visible">
      <section class="section-button">
        <form class="config-form">



          <div class="cont-dimensions">
            <button class="button-config">
              <h4>Dimension</h4>
            </button>

            <div class="ss-button-conf set-up dimension-cont">



            </div>
          </div>


          <div class="cont-dimensions">
            <div class="button-config">
              <h4>Ajout de coté</h4>
            </div>

            <div class="ss-button-conf set-up side-cont">

            </div>
          </div>

        </form>
        <div class="cont-dimensions">
          <button class="button-config">
            <h4>Type de cloisons</h4>
          </button>

          <div class="ss-button-conf cloison-cont">
            <!-- active ici -->


          </div>
        </div>

        <div class="cont-dimensions">
          <div class="button-config">
            <h4>Options</h4>
          </div>

          <div class="ss-button-conf set-up options-cont">

          </div>
        </div>
        <!-- <div class="cont-dimensions">
          <button class="button-config">
            <h4>Type de sols</h4>
          </button>



          <div class="ss-button-conf ">

            <div class="contenu-btn">
              <p class="info-button">Bois</p>
              <div class="parametres-cont active">

                <div class="parametres-partie">
                  <p class="param-cote"> Gauche</p>
                  <div class="param active">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                  </div>
                </div>

                <div class="parametres-partie">
                  <p> Droite</p>
                  <div class="param">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                  </div>
                </div>

                <div class="parametres-partie">
                  <p> Fond</p>
                  <div class="param">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                  </div>
                </div>

              </div>
            </div>

            <div class="contenu-btn">
              <p class="info-button">Moquette</p>
              <div class="parametres-cont active">

                <div class="parametres-partie">
                  <p class="param-cote"> Gauche</p>
                  <div class="param active">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                  </div>
                </div>

                <div class="parametres-partie">
                  <p> Droite</p>
                  <div class="param">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                  </div>
                </div>

                <div class="parametres-partie">
                  <p> Fond</p>
                  <div class="param">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div> -->

        <!-- <div class="cont-dimensions">
          <button class="button-config">
            <h4>Détails</h4>
          </button>

          <div class="ss-button-conf">

            <div class="contenu-btn">
              <p class="info-button">Leds</p>

              <div class="parametres-cont">
                <div class="parametres-partie">
                  <p class="param-cote"> 1</p>
                  <p class="param-cote"> 2 </p>
                  <p class="param-cote"> 3 </p>
                </div>
              </div>
            </div>


          </div>
        </div> -->


      </section>

      <!-----------------  SECTION ICONE ET FONCTIONNALITÉS ----------------->
      <section class="side-menu">

        <div class="sectionIcon">


          <div class="iconStands">

          </div>
          <i class="fa-sharp fa-solid fa-trash icon"></i>
        </div>
        <?php if (is_user_logged_in()) { ?>
          <div class="sectionIcon sectionIcon-responsive">


            <div class="input-cont">
              <label for="input-name">Nom</label>
              <input class="input-name" type="text" name="input-name">
            </div>
            <div class=" iconMenus save-config">
              <i class="fas fa-save icon "></i>
            </div>
          </div>
        <?php } else { ?>
          <div class="connect-message">

            <p>Connectez vous pour sauvegarder</p>
          </div>
        <?php  } ?>

        <!-- <div class="container-arrow">
            <i class="fa-solid fa-arrow-left iconArrow btn-prev-config "></i>
            <i class="fa-solid fa-arrow-right iconArrow "></i>
          </div> -->

      </section>

    </div>


    <div class="scene rendu-configurateur">
      <canvas class="webgl"></canvas>
    </div>

  </div>
<?php endif; ?>


<!-- Page mes stands /devis / configurateur -->
<?php if (is_page(181)) : ?>
  <div class="conteneur_principal">

    <section class="menu-left menu-left--menu">
      <div class="containerButton mes-stands">
        <button class="buttonMenus button-Stand active">Mes stands</button>
        <button class="buttonMenus button-Devis">Mes devis</button>
        <button class="buttonMenus">
          <a href="<?php echo get_permalink(get_page_by_path('configurateur')); ?>">Nouveau configurateur</a>
        </button>
      </div>
    </section>

    <section class="rendu-configurateur rendu-configurateur--stand">

      <section class="stand-content">

        <form class="pdf-form">

          <i class="fa fa-close close-icon"></i>

          <div>
            <label for="nomSociete">Nom de la société :</label>
            <input type="text" id="nomSociete" name="nomSociete" required><br>
          </div>

          <div>
            <label for="telephone">Téléphone :</label>
            <input type="tel" id="telSociete" name="telephone" required><br>
          </div>

          <div>
            <label for="email">E-mail :</label>
            <input type="email" id="mailSociete" name="email" required><br>
          </div>

          <div>
            <label for="nomEvenement">Nom évènement :</label>
            <input type="text" id="nomEvenement" name="nomEvenement" required><br>
          </div>

          <div>
            <label for="dateEvenement">Date évènement :</label>
            <input type="text" id="dateEvenement" name="dateEvenement" required><br>
          </div>

          <div class="container-btn-form">
            <button type="submit">Générer PDF</button>
          </div>

        </form>

        <?php getDataStand(); ?>

      </section>

      <section class="devis-content">
      </section>

    </section>

  </div>
<?php endif; ?>






<?php get_footer() ?>