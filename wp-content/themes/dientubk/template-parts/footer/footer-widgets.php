<?php
/**
 * Displays the footer widget area.
 *
 * @package WordPress
 * @subpackage dien_tu_bk
 * @since Dien Tu BK 1.0
 */

if ( is_active_sidebar( 'sidebar-1' ) ) : ?>

	<aside class="widget-area">
		<?php dynamic_sidebar( 'sidebar-1' ); ?>
	</aside><!-- .widget-area -->

	<?php
endif;
