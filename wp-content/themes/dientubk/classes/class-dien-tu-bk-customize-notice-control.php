<?php
/**
 * Customize API: dien_tu_bk_Customize_Notice_Control class
 *
 * @package WordPress
 * @subpackage dien_tu_bk
 * @since Dien Tu BK 1.0
 */

/**
 * Customize Notice Control class.
 *
 * @since Dien Tu BK 1.0
 *
 * @see WP_Customize_Control
 */
class dien_tu_bk_Customize_Notice_Control extends WP_Customize_Control {
	/**
	 * The control type.
	 *
	 * @since Dien Tu BK 1.0
	 *
	 * @var string
	 */
	public $type = 'dien-tu-bk-notice';

	/**
	 * Renders the control content.
	 *
	 * This simply prints the notice we need.
	 *
	 * @since Dien Tu BK 1.0
	 *
	 * @return void
	 */
	public function render_content() {
		?>
		<div class="notice notice-warning">
			<p><?php esc_html_e( 'To access the Dark Mode settings, select a light background color.', 'dientubk' ); ?></p>
			<p><a href="<?php echo esc_url( __( 'https://wordpress.org/support/article/dien-tu-bk/#dark-mode-support', 'dientubk' ) ); ?>">
				<?php esc_html_e( 'Learn more about Dark Mode.', 'dientubk' ); ?>
			</a></p>
		</div><!-- .notice -->
		<?php
	}
}
