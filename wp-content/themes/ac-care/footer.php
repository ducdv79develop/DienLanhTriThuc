<?php
/**
 * The template for displaying the footer
 * @subpackage AC Care
 * @since 1.0
 * @version 0.1
 */

?>
	<footer id="colophon" class="site-footer" role="contentinfo">
        <div class="container">
            <div class="row">
                <div class="col-md-5 col-sm-5 col-xs-12">
                    <div class="copyright">
                        <div id="text-2" class="widget_text" style="font-size: 15px;">
                            <div class="textwidget">
                                <h3 style="font-size: 20px;font-weight: 700;">Điện Lạnh Trí Thức</h3>
                                Địa chỉ: 250 Nguyễn Xiển - Hà Nội<br>
                                Website: <a href="https://dienlanhtrithuc.com">https://dienlanhtrithuc.com</a><br>
                                Email: <a href="mailto:dienlanhtrithuc@gmail.com">dienlanhtrithuc@gmail.com</a> <br>
                                Điện thoại: <a href="tel:0867887653">0867 887 653</a> - Hotline: <a href="tel:0865492444">0865 492 444</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="col-md-7 col-sm-7 col-xs-12">
                    <div class="address">
                        <ul>
                            <li><i class="fa fa-map-marker"></i> 250 Nguyễn Xiển - Hà Nội<strong></strong></li>
                            <li><i class="fa fa-map-marker"></i> 99 Định Công - Hà Nội<strong></strong></li>
                            <li><i class="fa fa-map-marker"></i> 193 Giáp Nhất - Hà Nội<strong></strong></li>
                            <li><i class="fa fa-map-marker"></i> 405 Thuỵ Khuê - Hà Nội<strong></strong></li>
                            <li><i class="fa fa-map-marker"></i> 368 Minh Khai - Hà Nội<strong></strong></li>
                            <li><i class="fa fa-map-marker"></i> 38 Đường Văn Phú - Hà Đông - Hà Nội<strong></strong></li>
                            <li><i class="fa fa-map-marker"></i> 54 Hữu Hoà - Thanh Trì - Hà Nội<strong></strong></li>
                            <li><i class="fa fa-map-marker"></i> 67 Nguyễn Văn Cừ - Hà Nội<strong></strong></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
	</footer>
	<?php if (get_theme_mod('ac_care_show_back_totop',true) != ''){ ?>
		<button role="tab" class="back-to-top"><span class="back-to-top-text"><?php echo esc_html('Top', 'ac-care'); ?></span></button>
	<?php }?>

<?php wp_footer(); ?>
</body>
</html>