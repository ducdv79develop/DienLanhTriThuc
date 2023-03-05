<?php
/**
 * The template for displaying 404 pages (not found)
 *
 * @link https://codex.wordpress.org/Creating_an_Error_404_Page
 *
 * @package dienlanhbachkhoa
 */

get_header();
?>

    <div class="container">
        <div id="main-content">
            <div id="content">
                <div class="widget widget_nav_menu">
                    <h1 class="widget-title">404 Không Tìm Thấy Trang</h1>
                </div>
                <div class="pagenavi clear"></div>
            </div>
        </div>
        <?php get_sidebar() ?>
    </div><br>

<?php
get_footer();
