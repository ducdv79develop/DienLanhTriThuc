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
                            <form id="feedback-form" method="POST">
                                <div class="form-group">
                                    <label class="control-label" for="name">Họ và tên</label>
                                    <input type="text" id="name" name="name">
                                    <div id="name-error" class="text-danger"></div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label" for="address">Địa chỉ</label>
                                    <input type="text" id="address" name="address">
                                    <div id="address-error" class="text-danger"></div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label" for="phone_number">Số điện thoại</label>
                                    <input type="text" id="phone_number" name="phone_number">
                                    <div id="phone_number-error" class="text-danger"></div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label" for="title">Tiêu đề</label>
                                    <input type="text" id="title" name="title">
                                    <div id="title-error" class="text-danger"></div>
                                </div>
                                <div class="form-group">
                                    <label class="control-label" for="content">Nội dung</label>
                                    <textarea id="content" name="content" cols="20" rows="4"></textarea>
                                    <div id="content-error" class="text-danger"></div>
                                </div>
                                <div class="form-group">
                                    <button id="feedback-submit" data-url="https://dienlanhkienhien.com/lien-he.html">GỬI PHẢN HỒI <i class="fa fa-chevron-right"></i></button>
                                    <button id="feedback-reset" type="reset">Nhập lại</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

<?php
get_footer();
