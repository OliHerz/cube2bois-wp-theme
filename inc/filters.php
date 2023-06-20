<?php

// defer le script js pour qu'il soit hargé en fin de page 
add_filter( 'script_loader_tag', 'ig_add_defer_attribute', 10, 2 );


add_filter('show_admin_bar', '__return_false');


add_filter('script_loader_tag', 'add_type_attribute', 10, 3);

add_filter('private_title_format', 'removePrefixFromPrivatePostTitle');