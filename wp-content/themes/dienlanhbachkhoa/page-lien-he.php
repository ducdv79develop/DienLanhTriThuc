<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package dienlanhbachkhoa
 */

get_header();
?>

    <div id="main-body" class="clearfix" style="margin-top: 20px; margin-bottom: 70px;font-size: 16px;">
        <div class="container">
            <div id="main-content">
                <div id="content">
                    <div class="heading">
                        <h1 style="font-size: 22px;">LIÊN HỆ</h1>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <?php echo do_shortcode('[contact-form-7 id="170" title="contact form new"]')?>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<?php
get_footer();
