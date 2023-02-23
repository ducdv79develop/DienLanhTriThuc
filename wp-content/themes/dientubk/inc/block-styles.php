<?php
/**
 * Block Styles
 *
 * @link https://developer.wordpress.org/reference/functions/register_block_style/
 *
 * @package WordPress
 * @subpackage dien_tu_bk
 * @since Dien Tu BK 1.0
 */

if ( function_exists( 'register_block_style' ) ) {
	/**
	 * Register block styles.
	 *
	 * @since Dien Tu BK 1.0
	 *
	 * @return void
	 */
	function dien_tu_bk_register_block_styles() {
		// Columns: Overlap.
		register_block_style(
			'core/columns',
			array(
				'name'  => 'dientubk-columns-overlap',
				'label' => esc_html__( 'Overlap', 'dientubk' ),
			)
		);

		// Cover: Borders.
		register_block_style(
			'core/cover',
			array(
				'name'  => 'dientubk-border',
				'label' => esc_html__( 'Borders', 'dientubk' ),
			)
		);

		// Group: Borders.
		register_block_style(
			'core/group',
			array(
				'name'  => 'dientubk-border',
				'label' => esc_html__( 'Borders', 'dientubk' ),
			)
		);

		// Image: Borders.
		register_block_style(
			'core/image',
			array(
				'name'  => 'dientubk-border',
				'label' => esc_html__( 'Borders', 'dientubk' ),
			)
		);

		// Image: Frame.
		register_block_style(
			'core/image',
			array(
				'name'  => 'dientubk-image-frame',
				'label' => esc_html__( 'Frame', 'dientubk' ),
			)
		);

		// Latest Posts: Dividers.
		register_block_style(
			'core/latest-posts',
			array(
				'name'  => 'dientubk-latest-posts-dividers',
				'label' => esc_html__( 'Dividers', 'dientubk' ),
			)
		);

		// Latest Posts: Borders.
		register_block_style(
			'core/latest-posts',
			array(
				'name'  => 'dientubk-latest-posts-borders',
				'label' => esc_html__( 'Borders', 'dientubk' ),
			)
		);

		// Media & Text: Borders.
		register_block_style(
			'core/media-text',
			array(
				'name'  => 'dientubk-border',
				'label' => esc_html__( 'Borders', 'dientubk' ),
			)
		);

		// Separator: Thick.
		register_block_style(
			'core/separator',
			array(
				'name'  => 'dientubk-separator-thick',
				'label' => esc_html__( 'Thick', 'dientubk' ),
			)
		);

		// Social icons: Dark gray color.
		register_block_style(
			'core/social-links',
			array(
				'name'  => 'dientubk-social-icons-color',
				'label' => esc_html__( 'Dark gray', 'dientubk' ),
			)
		);
	}
	add_action( 'init', 'dien_tu_bk_register_block_styles' );
}
