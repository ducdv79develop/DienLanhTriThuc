<?php
/**
 * Template Name: Policy
 */

get_header();
?>
    <div id="main-body" class="clearfix">
        <div class="container">
            <?php
                while ( have_posts() ) : ?>
                <h1 style="font-size: 26px;color: blue;margin-bottom: 25px;margin-top: 25px;"><?php the_title(); ?></h1>
                <div class="row" style="margin-bottom: 50px;">
                    <div class="col-md-12">
                        <?php
                            the_post();
                            the_content();
                        ?>
                    </div>
                </div>
            <?php endwhile; ?>
        </div>
    </div>

<?php
get_footer();
