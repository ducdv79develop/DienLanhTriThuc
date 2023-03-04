<?php
/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package dienlanhbachkhoa
 */

get_header();
?>
    <div class="container">
        <div id="main-content">
            <div id="content">
                <?php
                if (have_posts()) : ?>
                    <div class="widget widget_nav_menu">
                        <h1 class="widget-title"><?php single_post_title(); ?></h1>
                    </div>

                    <?php echo get_the_content(); ?>
                <?php endif; ?>
            </div>
        </div>
        <?php get_sidebar() ?>
    </div><br>
<?php
get_footer();
