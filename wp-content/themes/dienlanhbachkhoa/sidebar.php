<?php
/**
 * The sidebar containing the main widget area
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package dienlanhbachkhoa
 */

if ( ! is_active_sidebar( 'sidebar-1' ) ) {
	return;
}
?>

<aside id="sidebar">
    <div id="nav_menu-2" class="widget widget_nav_menu">
        <h3 class="widget-title">HỆ THỐNG TRUNG TÂM</h3>
        <div class="menu-services-menu-container">
            <ul>
                <li><?php echo '<img class="loading" src="' . THEME_URL . '/assets/images/contact.png" alt="Contact" style="width:100%;">'; ?></li>
                <li><i class="fa fa-map-marker"></i> 250 Nguyễn Xiển - Hà Nội<br>
                    <span style="color:#000;">Hotline:</span> <a style="font-size:15px;" href="tel:0865492444">0865
                        492 444</a></li>
                <li><i class="fa fa-map-marker"></i> 99 Định Công - Hà Nội<br>
                    <span style="color:#000;">Hotline:</span> <a style="font-size:15px;" href="tel:0865492444">0865
                        492 444</a></li>
                <li><i class="fa fa-map-marker"></i> 193 Giáp Nhất - Hà Nội<br>
                    <span style="color:#000;">Hotline:</span> <a style="font-size:15px;" href="tel:0865492444">0865
                        492 444</a></li>
                <li><i class="fa fa-map-marker"></i> 405 Thuỵ Khuê - Hà Nội<br>
                    <span style="color:#000;">Hotline:</span> <a style="font-size:15px;" href="tel:0865492444">0865
                        492 444</a></li>
                <li><i class="fa fa-map-marker"></i> 368 Minh Khai - Hà Nội<br>
                    <span style="color:#000;">Hotline:</span> <a style="font-size:15px;" href="tel:0865492444">0865
                        492 444</a></li>
                <li><i class="fa fa-map-marker"></i> 38 Đường Văn Phú - Hà Đông<br>
                    <span style="color:#000;">Hotline:</span> <a style="font-size:15px;" href="tel:0865492444">0865
                        492 444</a></li>
                <li><i class="fa fa-map-marker"></i> 54 Hữu Hoà - Thanh Trì<br>
                    <span style="color:#000;">Hotline:</span> <a style="font-size:15px;" href="tel:0865492444">0865
                        492 444</a></li>
                <li><i class="fa fa-map-marker"></i> 67 Nguyễn Văn Cừ - Hà Nội<br>
                    <span style="color:#000;">Hotline:</span> <a style="font-size:15px;" href="tel:0865492444">0865
                        492 444</a></li>
            </ul>
        </div>
    </div>
</aside>