<?php
/**
 * The header.
 *
 * This is the template that displays all of the <head> section and everything up until main.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package WordPress
 * @subpackage dien_tu_bk
 * @since Dien Tu BK 1.0
 */

?>
<!doctype html>
<html <?php language_attributes(); ?> <?php dientubk_the_html_classes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>" />
	<meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width; initial-scale=1.0; maximum-scale=1.0;user-scalable=no" />
    <meta name="title" content="Sửa điều hòa tại nhà Hà Nội - Sửa chữa điều hòa uy tín " />
    <meta name="description" content="Điện máy Bách Khoa - Trung tâm sửa điều hoà hàng đầu Việt Nam với uy tín, chất lượng cao. Đội ngũ kĩ thuật sẽ có mặt ngay chỉ sau 30 PHÚT, hỗ trợ khách hàng sửa chữa thiết bị để vận hành ngay! Điện máy BK cam kết bảo hành 100% thiết bị được SỬA CHỮA bởi chúng tôi và giá công khai niêm yết trên website, nếu có phát sinh sẽ thông báo rõ ràng trước khi sửa. Với mạng lưới chi nhánh rộng khắp Hà Nội, BK có thể hỗ trợ nhanh chóng, kịp thời, mang đến sự hài lòng cao nhất cho quý khách hàng!Sửa điều hòa gọi ngay Bách Khoa" />
    <meta name="keywords" content="Sửa điều hòa Ba Đình, Sửa điều hòa Bắc Từ Liêm; Sửa điều hòa Cầu Giấy; Sửa điều hòa Đống Đa;Sửa điều hòa Hà Đông;Sửa điều hòa Hai Bà Trưng;Sửa điều hòa Hoàn Kiếm;Sửa điều hòa Hoàng Mai;Sửa điều hòa Long Biên;Sửa điều hòa Nam Từ Liêm;Sửa điều hòa Tây Hồ;Sửa điều hòa Thanh Xuân;Sửa điều hòa Sơn Tây;Sửa điều hòa Ba Vì;Sửa điều hòa Đông Anh;Sửa điều hòa Gia Lâm;Sửa điều hòa Hoài Đức;Sửa điều hòa Thanh Trì;Sửa điều hòa Dịch Vọng;Sửa điều hòa Dịch Vọng Hậu;Sửa điều hòa Mai Dịch;Sửa điều hòa Nghĩa Đô;Sửa điều hòa Nghĩa Tân;Sửa điều hòa Quan Hoa;Sửa điều hòa Trung Hòa;Sửa điều hòa Yên Hòa;Sửa điều hòa Cầu Diễn;Sửa điều hòa Mỹ Đình 1;Sửa điều hòa Mỹ Đình 2;Sửa điều hòa Mễ Trì;Sửa điều hòa Phú Đô;Sửa điều hòa Trung Văn;Sửa điều hòa Tây Mỗ;Sửa điều hòa Đại Mỗ;Sửa điều hòa Phương Canh;Sửa điều hòa Xuân Phương;Sửa điều hòa Cát Linh;Sửa điều hòa Hàng Bột;Sửa điều hòa Khâm Thiên;Sửa điều hòa Khương Thượng;Sửa điều hòa Kim Liên;Sửa điều hòa Láng Hạ;Sửa điều hòa Láng Thượng;Sửa điều hòa Nam Đồng;Sửa điều hòa Ngã Tư Sở;Sửa điều hòa Ô Chợ Dừa;Sửa điều hòa Phương Liên;Sửa điều hòa Phương Mai;Sửa điều hòa Quang Trung;Sửa điều hòa Quốc Tử Giám;Sửa điều hòa Thịnh Quang;Sửa điều hòa;Thổ Quan;Sửa điều hòa Trung Liệt;Sửa điều hòa Trung Phụng;Sửa điều hòa Trung Tự;Sửa điều hòa Văn Chương;Sửa điều hòa Văn Miếu;Sửa điều hòa Hạ Đình;Sửa điều hòa Kim Gian;Sửa điều hòa Khương Đình;Sửa điều hòa Khương Mai;Sửa điều hòa Khương Trung;Sửa điều hòa Nhân Chính;Sửa điều hòa Thanh Xuân Bắc;Sửa điều hòa Thanh Xuân Nam;Sửa điều hòa Thanh Xuân Trung;Sửa điều hòa Thượng Đình;Sửa điều hòa Quang Trung;Sửa điều hòa Yết Kiêu;Sửa điều hòa Nguyễn Trãi;Sửa điều hòa Văn Mỗ;Sửa điều hòa Phúc La;Sửa điều hòa Vạn Phúc;Sửa điều hòa Hà Cầu;Sửa điều hòa Kiến Hưng;Sửa điều hòa Văn Khê;Sửa điều hòa Yên Nghĩa;Sửa điều hòa Phú Lương;Sửa điều hòa Phú Lãm;Sửa điều hòa Biên Giang;Sửa điều hòa Đồng Mai;Sửa điều hòa Dương Nội;Sửa điều hòa Cổ Nhuế 1;Sửa điều hòa Cổ Nhuế 2;Sửa điều hòa Đức Thắng;Sửa điều hòa Đông Ngạc;Sửa điều hòa Thụy Phương;Sửa điều hòa Liên Mạc;Sửa điều hòa Thượng Cát;Sửa điều hòa Tây Tựu;Sửa điều hòa Minh Khai;Sửa điều hòa Phú Diễn;Sửa điều hòa Phúc Diễn;Sửa điều hòa Xuân Đỉnh;Sửa điều hòa Xuân Tảo;Sửa điều hòa Daikin;Sửa điều hòa Panasonic;Sửa điều hòa Midea;Sửa điều hòa Gree;Sửa điều hòa Toshiba;Sửa điều hòa Mitsubishi;Sửa điều hòa Samsung;Sửa điều hòa LG;Sửa điều hòa Sumikura;Sửa điều hòa Casper;Sửa điều hòa Funiki;Sửa điều hòa Fujitsu;Sửa điều hòa Sumikura;Sửa điều hòa Nagakawa;Sửa điều hòa Carrỉe;Sửa điều hòa Sharp;Sửa điều hòa Elextrolux;Sửa điều hòa Trane;Sửa điều hòa không mát;Sửa điều hòa kém mát;Sửa điều hòa mát không sâu;Sửa điều hòa không lạnh;Sửa điều hòa kém lạnh;Sửa điều hòa chảy nước;Sửa điều hòa bám tuyết;Sửa điều hòa hết gas;Sửa điều hòa không chạy;Sửa điều hòa nháy đèn vàng;Sửa điều hòa nháy đèn;Sửa điều hòa nháy đèn đỏ;Sửa điều hòa báo lỗi;Sửa điều hòa nháy đèn timer;Sửa điều hòa kêu to;Sửa điều hòa có mùi khét;Sửa điều hòa tại nhà;Sửa điều hòa hà nội;Sửa điều hòa tại hà nội;Sửa điều hòa tại nhà hà nội;Sửa điều hòa multi;Sửa điều hòa âm trần;Sửa điều hòa công nghiệp" />
    <meta name="image" content="shop_file/6040452c8b67baef2e8c79f2/uploads/worigin/2021/03/04/banner-1-1.jpg" />
    <meta name="robots" content="index,follow" />
    <meta name="author" content="index.html" />
    <meta property="og:image" content="shop_file/6040452c8b67baef2e8c79f2/uploads/worigin/2021/03/04/banner-1-1.jpg" />
    <meta property="og:title" content="Sửa điều hòa tại nhà Hà Nội - Sửa chữa điều hòa uy tín " />
    <meta property="og:description" content="Điện máy Bách Khoa - Trung tâm sửa điều hoà hàng đầu Việt Nam với uy tín, chất lượng cao. Đội ngũ kĩ thuật sẽ có mặt ngay chỉ sau 30 PHÚT, hỗ trợ khách hàng sửa chữa thiết bị để vận hành ngay! Điện máy BK cam kết bảo hành 100% thiết bị được SỬA CHỮA bởi chúng tôi và giá công khai niêm yết trên website, nếu có phát sinh sẽ thông báo rõ ràng trước khi sửa. Với mạng lưới chi nhánh rộng khắp Hà Nội, BK có thể hỗ trợ nhanh chóng, kịp thời, mang đến sự hài lòng cao nhất cho quý khách hàng!Sửa điều hòa gọi ngay Bách Khoa" />
    <meta property="og:url" content="index.html" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Sửa điều hòa tại nhà Hà Nội - Sửa chữa điều hòa uy tín " />
	<?php wp_head(); ?>
    <style type="text/css">
        footer {
            background: #184154;
        }
        .head-info {
            background-color: #26404c;
        }
        .tab-content img {
            width: 100%;
            height: 300px;
            object-fit: cover;
            border: 1px solid#e1e1e1;
        }
        .blog-list .bg-box-da .title-project {
            max-height: 60px;
            padding: 2px 2px;
        }
        .blog-list .bg-box-da {
            display: block;
            bottom: 0;
            height: 60px;
            top: unset;
            border: none;
            background: rgb(0 174 255 / 55%);
            padding: 0px;
        }
    </style>
</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
	<a class="skip-link screen-reader-text" href="#content"><?php esc_html_e( 'Skip to content', 'dientubk' ); ?></a>

	<?php get_template_part( 'template-parts/header/site-header' ); ?>

	<div id="content" class="site-content">
		<div id="primary" class="content-area">
			<main id="main" class="site-main">
