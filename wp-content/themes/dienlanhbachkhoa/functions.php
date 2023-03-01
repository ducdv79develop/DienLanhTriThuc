<?php
define('THEME_VERSION', '1.0');
define('SITE_NAME', trailingslashit(get_bloginfo()));
define('HOME_URL', trailingslashit(home_url()));
define('THEME_DIR', trailingslashit(get_template_directory()));
define('THEME_URL', trailingslashit(get_template_directory_uri()));
/** Sets the theme assets URIs. */
define('THEME_CSS', trailingslashit(THEME_URL) . 'assets/css');
define('THEME_IMG', trailingslashit(THEME_URL) . 'assets/images');
define('THEME_JS', trailingslashit(THEME_URL) . 'assets/js');
define('CS_ACTIVE_SHORTCODE', false);
define('CS_ACTIVE_CUSTOMIZE', false);
/**
 * dienlanhbachkhoa functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package dienlanhbachkhoa
 */

if ( ! defined( '_S_VERSION' ) ) {
	// Replace the version number of the theme on each release.
	define( '_S_VERSION', '1.0.0' );
}

/**
 * Sets up theme defaults and registers support for various WordPress features.
 *
 * Note that this function is hooked into the after_setup_theme hook, which
 * runs before the init hook. The init hook is too late for some features, such
 * as indicating support for post thumbnails.
 */
function dienlanhbachkhoa_setup() {
	/*
		* Make theme available for translation.
		* Translations can be filed in the /languages/ directory.
		* If you're building a theme based on dienlanhbachkhoa, use a find and replace
		* to change 'dienlanhbachkhoa' to the name of your theme in all the template files.
		*/
	load_theme_textdomain( 'dienlanhbachkhoa', get_template_directory() . '/languages' );

	// Add default posts and comments RSS feed links to head.
	add_theme_support( 'automatic-feed-links' );

	/*
		* Let WordPress manage the document title.
		* By adding theme support, we declare that this theme does not use a
		* hard-coded <title> tag in the document head, and expect WordPress to
		* provide it for us.
		*/
	add_theme_support( 'title-tag' );

	/*
		* Enable support for Post Thumbnails on posts and pages.
		*
		* @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		*/
	add_theme_support( 'post-thumbnails' );

	// This theme uses wp_nav_menu() in one location.
	register_nav_menus(
		array(
			'menu-1' => esc_html__( 'Primary', 'dienlanhbachkhoa' ),
		)
	);

	/*
		* Switch default core markup for search form, comment form, and comments
		* to output valid HTML5.
		*/
	add_theme_support(
		'html5',
		array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
			'style',
			'script',
		)
	);

	// Set up the WordPress core custom background feature.
	add_theme_support(
		'custom-background',
		apply_filters(
			'dienlanhbachkhoa_custom_background_args',
			array(
				'default-color' => 'ffffff',
				'default-image' => '',
			)
		)
	);

	// Add theme support for selective refresh for widgets.
	add_theme_support( 'customize-selective-refresh-widgets' );

	/**
	 * Add support for core custom logo.
	 *
	 * @link https://codex.wordpress.org/Theme_Logo
	 */
	add_theme_support(
		'custom-logo',
		array(
			'height'      => 250,
			'width'       => 250,
			'flex-width'  => true,
			'flex-height' => true,
		)
	);
}
add_action( 'after_setup_theme', 'dienlanhbachkhoa_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function dienlanhbachkhoa_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'dienlanhbachkhoa_content_width', 640 );
}
add_action( 'after_setup_theme', 'dienlanhbachkhoa_content_width', 0 );

/**
 * Register widget area.
 *
 * @link https://developer.wordpress.org/themes/functionality/sidebars/#registering-a-sidebar
 */
function dienlanhbachkhoa_widgets_init() {
	register_sidebar(
		array(
			'name'          => esc_html__( 'Sidebar', 'dienlanhbachkhoa' ),
			'id'            => 'sidebar-1',
			'description'   => esc_html__( 'Add widgets here.', 'dienlanhbachkhoa' ),
			'before_widget' => '<section id="%1$s" class="widget %2$s">',
			'after_widget'  => '</section>',
			'before_title'  => '<h2 class="widget-title">',
			'after_title'   => '</h2>',
		)
	);
}
add_action( 'widgets_init', 'dienlanhbachkhoa_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function dienlanhbachkhoa_scripts() {
	wp_enqueue_style( 'dienlanhbachkhoa-style', get_stylesheet_uri(), array(), _S_VERSION );
	wp_style_add_data( 'dienlanhbachkhoa-style', 'rtl', 'replace' );

	wp_enqueue_script( 'dienlanhbachkhoa-navigation', get_template_directory_uri() . '/js/navigation.js', array(), _S_VERSION, true );

	if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
		wp_enqueue_script( 'comment-reply' );
	}
}
add_action( 'wp_enqueue_scripts', 'dienlanhbachkhoa_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';
/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/bootstrap-menu.php';
/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/meta-boxes.php';


/**
 * Load Jetpack compatibility file.
 */
if ( defined( 'JETPACK__VERSION' ) ) {
	require get_template_directory() . '/inc/jetpack.php';
}
function dvb_custom_theme()
{
    wp_enqueue_style('bootstrap', THEME_URL . 'assets/css/bootstrap.min.css');
    wp_enqueue_style('fontawesome', THEME_URL . 'assets/css/font-awesome.min.css');
    wp_enqueue_style('jquery_fancybox', THEME_URL . 'assets/css/jquery.fancybox.min.css');
    wp_enqueue_style('owl_carousel', THEME_URL . 'assets/css/owl.carousel.min.css');
    wp_enqueue_style('owl_default', THEME_URL . 'assets/css/owl.theme.default.min.css');
    wp_enqueue_style('quick_call_button', THEME_URL . 'assets/css/quick-call-button.min.css');
    wp_enqueue_style('style_custom', THEME_URL . 'assets/style.css');
    wp_enqueue_style('dvb-style', get_stylesheet_uri());

    wp_enqueue_script('jquery_js', THEME_URL . 'assets/js/jquery-1.11.2.min.js', array('jquery'), false, true);
//    wp_enqueue_script('jquery_migrate_js', THEME_URL . 'assets/js/jquery-migrate-1.2.1.min.js', array('jquery'), false, true);
    wp_enqueue_script('jquery_ui_js', THEME_URL . 'assets/js/jquery-ui.min.js', array('jquery'), false, true);
//    wp_enqueue_script('jquery_ui_touch_js', THEME_URL . 'assets/js/jquery.ui.touch-punch.min.js', array('jquery'), false, true);
    wp_enqueue_script('bootstrap_js', THEME_URL . 'assets/js/bootstrap.min.js', array('jquery'), false, true);
    wp_enqueue_script('jquery_fancybox_js', THEME_URL . 'assets/js/jquery.fancybox.min.js', array('jquery'), false, true);
    wp_enqueue_script('jquery_tap_js', THEME_URL . 'assets/js/jquery.tap.min.js', array('jquery'), false, true);
    wp_enqueue_script('off_canvas_js', THEME_URL . 'assets/js/off-canvas.js', array('jquery'), false, true);
    wp_enqueue_script('carousel_js', THEME_URL . 'assets/js/owl.carousel.min.js', array('jquery'), false, true);
    wp_enqueue_script('scroll_top_js', THEME_URL . 'assets/js/scroll-to-top.min.js', array('jquery'), false, true);
    wp_enqueue_script('wow_js', THEME_URL . 'assets/js/wow.min.js', array('jquery'), false, true);
    wp_enqueue_script('custom_js', THEME_URL . 'assets/js/custom.js', array('jquery'), false, true);
    if (is_singular() && comments_open() && get_option('thread_comments')) {
        wp_enqueue_script('comment-reply');
    }
}
add_action('wp_enqueue_scripts', 'dvb_custom_theme', 10);


