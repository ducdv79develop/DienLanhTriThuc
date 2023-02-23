<?php
/**
 * Show the appropriate content for the Audio post format.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage dien_tu_bk
 * @since Dien Tu BK 1.0
 */

$content = get_the_content();

if ( has_block( 'core/audio', $content ) ) {
	dien_tu_bk_print_first_instance_of_block( 'core/audio', $content );
} elseif ( has_block( 'core/embed', $content ) ) {
	dien_tu_bk_print_first_instance_of_block( 'core/embed', $content );
} else {
	dien_tu_bk_print_first_instance_of_block( 'core-embed/*', $content );
}

// Add the excerpt.
the_excerpt();
