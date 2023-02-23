var IsCanCheckDelivery=1;
var IsCC='False';
$(document).ready(function(){
	$.ajax({
		url : '/product/comment/load-comment',
		type : 'POST',
		data : {
			product_id : $('#comment').data('product-id')
		},
		beforeSend: function(){
			// $('#loading').removeClass('hidden');
		},
		success : function(result){
			$('#comment').replaceWith(result);
		},
		error : function (){
			// alert('Có lỗi khi xử lý. Bạn vui lòng thử lại sau');
		},
		complete: function(){
			// $('#loading').addClass('hidden');
		}
	});
});
function cmtSearch(n) {
	var i = n.keyCode ? n.keyCode : n.which,
	t;
	if(i == 13){
		listcomment(1);
		// t = $(".s_comment .cmtKey").val();
		// t = $.trim(t);
		// $.ajaxCall("cmtnew.buildfirst", cmtGetextParam() + "&pageIndex=0&keyWord=" + CMTencodeURIComponent(t))
	}
}
function cmtaddcommentclick(){
	$("#txtEditor").removeClass("hide").addClass("hide");
	removeAllEditor();
	$.ajax({
		url : '/product/comment/build-post',
		type : 'POST',
		dataType: "jsonp",
		data : {
			product_id : $('#comment').data('product-id')
		},
		beforeSend: function(){
			// $('#loading').removeClass('hidden');
		},
		success : function(result){
			$('#comment').replaceWith(result);
		},
		error : function (){
			// alert('Có lỗi khi xử lý. Bạn vui lòng thử lại sau');
		},
		complete: function(){
			// $('#loading').addClass('hidden');
		}
	});
}
function removeAllEditor(){
	$(".js_cmt_form").each(function () {
		$(this).remove()
	});
	$(".form_reply").each(function () {
		$(this).remove()
	});
	$(".infocomment .comment_reply").each(function () {
		var n = $(this).find(".comment_ask").length;
		n == 0 && $(this).addClass("hide")
	});
	$("#txtEditor").removeClass("hide");
}
function showEditor() {
	$("#js_activity_feed_form #content").removeClass("hide");
	$("#js_activity_feed_form .wrap-attaddsend").removeClass("hide");
	$("#js_activity_feed_form #content").focus();
	$("#txtEditor").removeClass("hide").addClass("hide")
}
function InitEvent() {
	$(".js_cmt_form").unbind();
	$(".form_reply").unbind();
	$(".js_cmt_form").unbind();
	$(".js_cmt_form").submit(function () {
		var content = $(this).find("#content").html();
		var name = $(this).find("input[name='sendwithname']").val();
		var email = $(this).find("input[name='sendwithemail']").val();
		var sex = $(this).find("input[name='sex']:checked").val();

		var form_data = new FormData();
		form_data.append('content', content);
		form_data.append('name', name);
		form_data.append('email', email);
		form_data.append('sex', sex);
				
		var image_list = [];
		$(this).find('ul.resCmtImg li img').each(function(){
			image_list.push($(this).attr('src'));
		});
		for (var i = 0; i < image_list.length; i++) {
			form_data.append('image[]', image_list[i]);
		}
		
		form_data.append('product_id', $('#comment').data('product-id'));
		form_data.append('href', location.href);

		$.ajax({
			url : '/product/comment/send-comment',
			type : 'POST',
			cache: false,
			contentType: false,
			processData: false,
			data : form_data,
			beforeSend: function(){
				// $('#loading').removeClass('hidden');
			},
			success : function(result){
			},
			error : function (){
				offLoading();
				removeAllEditor();
				showTextArea();
			},
			complete: function(){
				// $('#loading').addClass('hidden');
			}
		});	
		return false;
	});
	$(".form_reply").unbind(), $(".form_reply").submit(function () {
		var content = $(this).find(".textarea").html().trim();
		var name = $(this).find("input[name='sendwithname']").val();
		var email = $(this).find("input[name='sendwithemail']").val();
		var sex = $(this).find("input[name='sexreply']:checked").val();

		var form_data = new FormData();
		form_data.append('content', content);
		form_data.append('name', name);
		form_data.append('email', email);
		form_data.append('sex', sex);
				
		var image_list = [];
		$(this).find('ul.resCmtImg li img').each(function(){
			image_list.push($(this).attr('src'));
		});
		for (var i = 0; i < image_list.length; i++) {
			form_data.append('image[]', image_list[i]);
		}
		
		form_data.append('product_id', $('#comment').data('product-id'));
		form_data.append('comment_id', $(this).data('id'));
		form_data.append('href', location.href);
		
		$.ajax({
			url : '/product/comment/send-comment-reply',
			type : 'POST',
			cache: false,
			contentType: false,
			processData: false,
			data : form_data,
			beforeSend: function(){
				// $('#loading').removeClass('hidden');
			},
			success : function(result){
			},
			error : function (){
				offLoading();
				removeAllEditor();
				showTextArea();
			},
			complete: function(){
				// $('#loading').addClass('hidden');
			}
		});	
		return false;
	});

	
	$("input[name=sendwithname]").keyup(function (n) {
		n.keyCode == 13 && $("#btnSendCmtNoLogin").trigger("click")
	});
	$("input[name=sendwithemail]").keyup(function (n) {
		n.keyCode == 13 && $("#btnSendCmtNoLogin").trigger("click")
	});
	$("#js_activity_feed_form #content").unbind();
	$("#js_activity_feed_form #content").focus(function () {
		g_loadFirst || ($("#js_activity_feed_form .wrap-attaddsend").removeClass("hide"), g_loadFirst = !0)
	});
	$("#js_activity_feed_form .dropfirst").unbind();
	$("#js_activity_feed_form .dropfirst").on("click", function (n) {
		n.preventDefault();
		$(".showfirst").is(":visible") || $(".showfirst").slideToggle("fast")
	});
	$("#js_activity_feed_form .closefirst").on("click", function () {
		$(".showfirst").slideToggle()
	});
	$(".closedropdown").on("click", function () {
		$(".showdropdown").slideToggle()
	});
	$("#js_activity_feed_form .dropsub").on("click", function (n) {
		n.preventDefault();
		$("#js_activity_feed_form .showsub").removeClass("hide")
	});
	$(".comment_reply .dropsub").unbind();
	$(".comment_reply .dropsub").on("click", function (n) {
		n.preventDefault();
		$(".comment_reply .showsub").removeClass("hide")
	});
	$(".closesub").on("click", function () {
		$(".showsub").slideToggle()
	});
	$("#js_activity_feed_form .dropicon").unbind();
	$("#js_activity_feed_form .dropicon").on("click", function (n) {
		n.preventDefault();
		$("#js_activity_feed_form .showicon").removeClass("hide")
	});
	$(".comment_reply .addicon").unbind();
	$(".comment_reply .addicon").on("click", function (n) {
		n.preventDefault();
		$(this).parent().parent().find(".showicon").removeClass("hide")
	});
	$(".closesub").on("click", function () {
		$(".showicon").slideToggle()
	});
	$("a.tab").click(function () {
		$(".active").removeClass("active");
		$(this).addClass("active");
		$(".content").hide();
		var n = $(this).attr("title");
		$("#" + n).show()
	});
	$(".sortcomment a").click(function () {
		$(".sortcomment a").removeClass("activedsort");
		$(this).addClass("activedsort")
	});
	$("#js_activity_feed_form #btnSendCmt").unbind();
	$("#js_activity_feed_form #btnSendCmt").click(function () {
		var n,
		t,
		i;
		if (clearEditor(), n = $.trim($("#js_activity_feed_form #content").html()), n == "" || n == null || n == "Vui lòng nhập nội dung")
			return $("#js_activity_feed_form #content").focus(), $("#js_activity_feed_form #content").html("Vui lòng nhập nội dung"), setTimeout(function () {
				$("#js_activity_feed_form #content").html("")
			}, 700), offLoading(), !1;
		if ($("#userinfoLog").html() == "")
			return $("#js_activity_feed_form .wrap_loginpost").removeClass("hide"), $("#js_activity_feed_form .wrap-attaddsend").removeClass("hide").addClass("hide"), $("#js_activity_feed_form [name='sendwithname']").val(""), $("#js_activity_feed_form [name='sendwithemail']").val(""), $("#js_activity_feed_form [name='loginemail']").val(""), $("#js_activity_feed_form [name='loginpass']").val(""), !1;
		if (showLoading(), $("#js_activity_feed_form .wrap-attaddsend").removeClass("hide"), $(".infocomment .comment_ask").length > 0 && $("#js_activity_feed_form [name='cmtLast']").val($(".infocomment .comment_ask").first().attr("id")), isPendingCmt && $("#userinfoLog").length > 0 && (t = $.trim($("#userinfoLog .uname").html()), i = $.trim($("#js_activity_feed_form #content").html()), CheckRepeatCmt(i, t)))
			return showEditor(), offLoading(), SendCmtSuccess(), !1;
		if (isSendingCmt)
			return !1;
		isSendingCmt = !0;
		isPendingCmt = !0;
		setTimeout(function () {
			isPendingCmt = !1
		}, 3e4);
		try {
			$(".sendnow #btnSendCmtNoLogin").html('<img class="load" src="/images/add.gif">');
			$(".showfirst .userinfo").addClass("hide")
		} catch (r) {}
		return $("#js_activity_feed_form").submit(),
		!1
	});
	$("#js_activity_feed_form #btnSendCmtLogin").unbind();
	$("#js_activity_feed_form #btnSendCmtLogin").click(function () {
		$("#js_activity_feed_form [name='sendwithname']").val("");
		$("#js_activity_feed_form [name='sendwithemail']").val("");
		var n = $.trim($("#js_activity_feed_form [name='loginemail']").val());
		if (n == "")
			return alert("Vui lòng nhập thông tin đầy đủ."), !1;
		if (isSendingCmt)
			return !1;
		isSendingCmt = !0;
		setTimeout(function () {
			showLoading();
			$("#userinfoLog").html(n);
			$("#js_activity_feed_form #btnSendCmt").click();
			$("#js_activity_feed_form .wrap_loginpost").removeClass("hide").addClass("hide");
			$("#js_activity_feed_form .wrap-attaddsend").removeClass("hide")
		}, 1e3);
		return
	});
	$("#js_activity_feed_form #btnSendCmtNoLogin").unbind();
	$("#js_activity_feed_form #btnSendCmtNoLogin").click(function () {
		var n,
		t,
		i,
		r;
		if ($("#js_activity_feed_form [name='loginemail']").val(""), $("#js_activity_feed_form [name='loginpass']").val(""), n = $.trim($("#js_activity_feed_form #content").html()), n == "" || n == null || n == "Vui lòng nhập nội dung")
			return $("#js_activity_feed_form #content").focus(), $("#js_activity_feed_form #content").html("Vui lòng nhập nội dung"), setTimeout(function () {
				$("#js_activity_feed_form #content").html("")
			}, 700), offLoading(), !1;
		if (t = $.trim($("#js_activity_feed_form [name='sendwithemail']").val()), t != null && t != "" && validateEmail(t) == !1)
			return alert("Email không đúng định dạng"), $("#js_activity_feed_form [name='sendwithemail']").focus(), !1;
		if (i = $.trim($("#js_activity_feed_form [name='sendwithname']").val()), i == "")
			return alert("Vui lòng nhập họ tên."), $("#js_activity_feed_form [name='sendwithname']").focus(), !1;
		if (validateName(i) == !1)
			return alert("Vui lòng nhập họ tên đúng định dạng (phải có ký tự từ a đến z)."), !1;
		r = getCookie("dm_fullname");
		setTimeout(function () {
			$("#userinfoLog").text(i);
			showLoading();
			$("#js_activity_feed_form #btnSendCmt").click();
			$("#js_activity_feed_form .wrap_loginpost").removeClass("hide").addClass("hide");
			$("#js_activity_feed_form .wrap-attaddsend").removeClass("hide")
		}, 1e3);
		return
	});
	$(".form_reply #btnSendReplyCmt").unbind();
	$(".form_reply #btnSendReplyCmt").click(function () {
		var f = $(this).closest('form').attr("id"),
		n = $(this).attr("data-id"),
		t = $.trim($("#content-" + n).html()),
		i,
		r,
		u;
		if (t == "" || t == null)
			return alert("Vui lòng nhập nội dung cần bình luận."), !1;
		if ($(".form_reply #userinfoLog").html() == "")
			return $(".form_reply .wrap_loginpost").removeClass("hide"), i = getCookie("dm_gender"), $(".form_reply .wrap_loginpost .cmtradio2").length > 0 && (i == 1 ? $(".form_reply #sexreply1").prop("checked", !0) : $(".form_reply #sexreply0").prop("checked", !0)), !1;
		if (showLoading(), $("#r" + n + " .comment_ask").length > 0 && $(".form_reply [name='cmtLast']").val($("#r" + n + " .comment_ask").last().attr("id")), isPendingCmt && $("#userinfoLog").length > 0 && (r = $.trim($("#userinfoLog .uname").html()), u = $.trim($(".form_reply .textarea").html()), CheckRepeatCmt(u, r, n)))
			return showEditor(), offLoading(), SendCmtSuccess(), !1;
		if (isSendingCmt)
			return !1;
		isSendingCmt = !0;
		isPendingCmt = !0;
		setTimeout(function () {
			isPendingCmt = !1
		}, 3e4);
		$("#" + f).submit()
	});
	$(".form_reply #btnSendReplyLogin").unbind();
	$(".form_reply #btnSendReplyLogin").click(function () {
		var t = $(this).attr("data-id"),
		n = $.trim($(".form_reply [name='loginemail']").val()),
		i = $.trim($(".form_reply [name='loginpass']").val());
		if (n == "" || i == "")
			return $(".form_reply #btnSendReplyNoLogin").trigger("click"), !1;
		if (isSendingCmt)
			return !1;
		isSendingCmt = !0;
		setTimeout(function () {
			showLoading();
			$("#userinfoLog").html(n);
			$("#js_activity_feed_form_" + t + " #btnSendReplyCmt").click()
		}, 1e3);
		return
	});
	$(".form_reply #btnSendReplyNoLogin").unbind();
	$(".form_reply #btnSendReplyNoLogin").click(function () {
		var n,
		t,
		i,
		r;
		$(".form_reply [name='loginemail']").val("");
		$(".form_reply [name='loginpass']").val("");
		n = $.trim($(".form_reply [name='sendwithemail']").val());
		if (n != null && n != "" && validateEmail(n) == !1)
			return alert("Email không đúng định dạng"), $(".form_reply [name='sendwithemail']").focus(), !1;
		t = $(this).attr("data-id");
		i = $.trim($(".form_reply [name='sendwithname']").val());
		if (i == "")
			return alert("Vui lòng nhập họ tên."), $(".form_reply [name='sendwithname']").focus(), !1;
		if (validateName(i) == !1)
			return alert("Vui lòng nhập họ tên đúng định dạng (phải có ký tự từ a đến z)."), !1;
		
		$(".form_reply .wrap_loginpost").removeClass("hide").addClass("hide");
		r = getCookie("dm_fullname");
		setTimeout(function () {
			var n = $("#js_activity_feed_form_" + t).find(".textarea").first().text();
			if (n.trim() == "")
				return alert("Vui lòng nhập nội dung."), $("#js_activity_feed_form_" + t).find(".textarea").first().focus(), !1;
			showLoading();
			$("#userinfoLog").html(i);
			$("#js_activity_feed_form_" + t + " #btnSendReplyCmt").click()
		}, 1e3);
		return
	});
	$("#js_activity_feed_form .tagcloseicon").click(function () {
		$("#js_activity_feed_form .showicon").removeClass("hide").addClass("hide")
	});
	$(".comment_reply .tagcloseicon").unbind();
	$(".comment_reply .tagcloseicon").click(function () {
		$(".comment_reply .showicon").removeClass("hide").addClass("hide")
	});
	$("#js_activity_feed_form #content").blur(function () {});
	$(".form_reply .textarea").blur(function () {
		$("#content .hide").remove();
		document.execCommand("insertHTML", !1, "<div class='hide'><\/div>");
		replaceIcon()
	});
	$("#js_activity_feed_form .wrap_iconemotion a").unbind();
	$("#js_activity_feed_form .wrap_iconemotion a").click(function () {
		if (savedRange == null && ($("#js_activity_feed_form #content").focus(), saveSelection()), $("#js_activity_feed_form #content img").length > 10)
			return alert("Bạn chỉ được chèn tối đa 10 icon."), !1;
		var i = savedRange.startContainer.textContent,
		t = $(this).html(),
		n = document.createElement("span");
		n.innerHTML = t;
		savedRange.insertNode(n)
	});
	$("#js_activity_feed_form #content").keyup(function () {});
	$(".comment_reply .wrap_iconemotion a").unbind();
	$(".comment_reply .wrap_iconemotion a").click(function () {
		if (savedRange == null && saveSelection(), $(".form_reply .textarea img").length > 10)
			return alert("Bạn chỉ được chèn tối đa 10 icon."), !1;
		var i = savedRange.startContainer.textContent,
		t = $(this).html(),
		n = document.createElement("span");
		n.innerHTML = t;
		savedRange.insertNode(n)
	});
	$("#js_activity_feed_form .tabicon a").click(function () {
		$(".tabicon a").removeClass("acticon");
		$(this).removeClass("acticon").addClass("acticon");
		var n = $(this).attr("type");
		n == "1" ? ($("#js_activity_feed_form #col1").removeClass("hide"), $("#js_activity_feed_form #col2").removeClass("hide").addClass("hide")) : ($("#js_activity_feed_form #col1").removeClass("hide").addClass("hide"), $("#js_activity_feed_form #col2").removeClass("hide"));
		$("#js_activity_feed_form #content").focus()
	});
	$(".comment_reply .tabicon a").click(function () {
		$(".comment_reply .tabicon a").removeClass("acticon");
		$(this).removeClass("acticon").addClass("acticon");
		var n = $(this).attr("type");
		n == "1" ? ($(".comment_reply #col1").removeClass("hide"), $(".comment_reply #col2").removeClass("hide").addClass("hide")) : ($(".comment_reply #col1").removeClass("hide").addClass("hide"), $(".comment_reply #col2").removeClass("hide"))
	});
	$("#js_activity_feed_form .closeIfo").unbind();
	$("#js_activity_feed_form .closeIfo").click(function () {
		$("#js_activity_feed_form .wrap-attaddsend").removeClass("hide");
		$("#js_activity_feed_form .wrap_loginpost").removeClass("hide").addClass("hide");
		$("#js_activity_feed_form #userinfoLog").removeClass("hide")
	});
	$(".form_reply .closeIfo").unbind();
	$(".form_reply .closeIfo").click(function () {
		$(".form_reply .wrap-attaddsend").removeClass("hide");
		$(".form_reply .wrap_loginpost").removeClass("hide").addClass("hide");
		$(".form_reply #userinfoLog").removeClass("hide")
	});
	$("#js_activity_feed_form").length > 0 && $("#js_activity_feed_form #content").focus();
	checkCkieUser();
	checkFirstCmt();
	$("#js_activity_feed_form .iconcom-facebook").unbind();
	$("#js_activity_feed_form .iconcom-facebook").on("click", function () {
		OpenLoginWindow(1)
	});
	$(".form_reply .iconcom-facebook").unbind();
	$(".form_reply .iconcom-facebook").on("click", function () {
		OpenLoginWindow(1)
	});
	$("#js_activity_feed_form .iconcom-googleplus").unbind();
	$("#js_activity_feed_form .iconcom-googleplus").on("click", function () {
		OpenLoginWindow(2)
	});
	$(".form_reply .iconcom-googleplus").unbind();
	$(".form_reply .iconcom-googleplus").on("click", function () {
		OpenLoginWindow(2)
	});
	$(".boxAdvisory").unbind();
	$(".boxAdvisory").click(function () {
		var n = $("#ckbCmtIsAdvisory").is(":checked");
		n ? $("input[name=iAdvisory]").val(1) : $("input[name=iAdvisory]").val(0)
	})
}
function cmtInsertImg() {
	if (cmtattachfile(0), $(".resCmtImg li").length > 2)
		return console.log("đã up load quá số ảnh quy định"), !1;
	$("#js_activity_feed_form #upload-image").click()
}
function cmtInsertReplyImg(n) {
	if (cmtattachfile(n), $(".resCmtImg li").length > 2)
		return console.log("đã up load quá số ảnh quy định"), !1;
	$(".comment_reply #upload-image").click()
}
function cmtattachfile(n) {
	if(n == 0){
		$("#js_activity_feed_form #upload-image").unbind();
		$("#js_activity_feed_form #upload-image").change(function(e){
			e.preventDefault();
			var files = e.originalEvent.target.files;
			var form_data = new FormData();
			form_data.append('file', files[0]);
			var jqXHR = $.ajax({
				url : '/product/upload',
				type : "POST",
				contentType : false,
				processData : false,
				cache : false,
				data : form_data,
				beforeSend : function(){
					$("#js_activity_feed_form .attach .load").removeClass("hide");
					$("#js_activity_feed_form .attach span").removeClass("hide").addClass("hide")
				},
				success : function(result) {
					var t = result,
					i;
					if(result.success == true){
						i = "<li data-imgName='" + result.file_name + "'  >";
						i += "<img src='/uploads/worigin" + result.uploaded_file + "' />";
						i += "<i class='fbDelImg' onclick='delCmtImg(this)'>x<\/i>";
						i += "<\/li>", $(".resCmtImg").append(i);
						$(".resCmtImg").removeClass("hide");
						getCmtImg()
						$("#js_activity_feed_form .attach .load").removeClass("hide").addClass("hide");
						$("#js_activity_feed_form .attach span").removeClass("hide");
					}else{
						alert(result.info);
						$("#js_activity_feed_form .attach .load").removeClass("hide").addClass("hide");
						$("#js_activity_feed_form .attach span").removeClass("hide");
					}
				},
				error :  function(){
				}
			});
		});
	}else{
		$(".form_reply #upload-image").unbind();
		$("#js_activity_feed_form_" + n + " #upload-image").change(function(e){
			e.preventDefault();
			var files = e.originalEvent.target.files;
			var form_data = new FormData();
			form_data.append('file', files[0]);
			var jqXHR = $.ajax({
				url : '/product/upload',
				type : "POST",
				contentType : false,
				processData : false,
				cache : false,
				data : form_data,
				beforeSend : function(){
					$("#js_activity_feed_form_" + n + " .attach .load").removeClass("hide");
					$("#js_activity_feed_form_" + n + " .attach span").removeClass("hide").addClass("hide")
				},
				success : function(result) {
					var t = result,
					i;
					$(".loadding").hide();
					if(result.success == true){
						i = "<li data-imgName='" + result.file_name + "'  >";
						i += "<img src='/uploads/worigin" + result.uploaded_file + "' />";
						i += "<i class='fbDelImg' onclick='delCmtImg(this)'>x<\/i>";
						i += "<\/li>", $(".resCmtImg").append(i);
						$(".resCmtImg").removeClass("hide");
						getCmtImg();
					}else{
						alert(result.info);
					}
					$("#js_activity_feed_form_" + n + " .attach .load").removeClass("hide").addClass('hide');
					$("#js_activity_feed_form_" + n + " .attach span").removeClass("hide");
				},
				error :  function(){
				}
			});
		});
	}
}
function delCmtImg(n) {
	$(n).parent().remove();
	getCmtImg()
}
function getCmtImg() {
	if ($(".resCmtImg li").length > 0) {
		var n = "";
		$(".resCmtImg li").each(function () {
			var t = $(this).attr("data-imgname");
			t != null && t != "" && (n += t + "╬")
		});
		$(".hdfCmtImg").val(n)
	} else
		$(".resCmtImg li").length == 0 && ($(".hdfCmtImg").val(""), $(".resCmtImg").addClass("hide"), $("#comment #upload-image").val(""))
}
function saveSelection() {
	window.getSelection ? savedRange = window.getSelection().getRangeAt(0) : document.selection && (savedRange = document.selection.createRange());
	countRowEditor()
}
function countRowEditor() {
	$("#js_activity_feed_form #content div").length > 10 ? $("#js_activity_feed_form #content").css("overflow-y", "scroll") : $("#js_activity_feed_form #content").css("overflow-y", "visible")
}
function disableReportErr(n) {
	$("#rp" + n).removeClass("hide").addClass("disble")
}
function validateEmail(n) {
	return /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(n)
}
function validateName(n) {
	return n.match(/[a-z]/i) ? !0 : !1
}
function CreateCookie(n, t, i) {
	var r = new Date,
	u,
	f,
	e;
	r.setDate(r.getDate() + i);
	u = escape(t) + (i == null ? "" : "; visited=true; path=/; domain=" + hostName + "; expires=" + r.toUTCString() + ";");
	document.cookie = n + "=" + u;
	f = escape(t) + (i == null ? "" : "; visited=true; path=/; domain=" + whostName + "; expires=" + r.toUTCString() + ";");
	document.cookie = n + "=" + f;
	try {
		e = escape(t) + (i == null ? "" : "; visited=true; path=/; expires=" + r.toUTCString() + ";");
		document.cookie = n + "=" + e
	} catch (o) {}
}
function getCookie(n) {
	for (var r, u, i = document.cookie.split(";"), t = 0; t < i.length; t++)
		if (r = i[t].substr(0, i[t].indexOf("=")), u = i[t].substr(i[t].indexOf("=") + 1), r = r.replace(/^\s+|\s+$/g, ""), r == n)
			return unescape(u)
}
function Delete_Cookie(n, t, i) {
	getCookie(n) && (document.cookie = n + "=" + (t ? ";path=" + t : "") + (i ? ";domain=" + i : "") + ";expires=Thu, 01 Jan 1970 00:00:01 GMT")
}
function clearCookie() {
	Delete_Cookie("dm_email", "/", hostName);
	Delete_Cookie("dm_fullname", "/", hostName);
	Delete_Cookie("dm_gender", "/", hostName);
	Delete_Cookie("dm_social", "/", hostName)
}
function expandCmt(n) {
	$("#" + n).find(".infocom_ask").removeClass("hide");
	$("#" + n).find(".infocom_ask_s").remove()
}
function expandCmtChild(n) {
	$("#" + n).find(".cmtcontent").removeClass("hide");
	$("#" + n).find(".content_s").remove()
}
function colCmt(n) {
	$(n).parent().find(".infocom_ask").addClass("hidecmt");
	$(n).replaceWith('<div class="viewmorecomment" onclick="expandCmt(this);" ><label class="btnexpand">Xem thêm<span><\/span><\/label><\/div>')
}
function colCmtChild(n) {
	$(n).parent().find(".conticon").addClass("hidecmt");
	$(n).replaceWith('<div class="viewmorecomment" onclick="expandCmtChild(this);" ><label class="btnexpand">Xem thêm<span><\/span><\/label><\/div>')
}
function DelImg(n) {
	$(n).parent().parent().remove()
}
function checkCkieUser() {
	var t = getCookie("dm_fullname"),
	i = getCookie("dm_email"),
	n = getCookie("dm_social"),
	r = getCookie("dm_gender");
	
	if (t != null && t != "") {
		if($("#js_activity_feed_form").length > 0){
			$("#js_activity_feed_form [name='sendwithname']").val(t);
			$("#js_activity_feed_form [name='sendwithemail']").val(i);
			if(r == 1){
				$("#js_activity_feed_form [id='male']").prop("checked", !0);
			}else{
				$("#js_activity_feed_form [id='female']").prop("checked", !0);
			}
			if(n != null && n != ""){
				$("#js_activity_feed_form [name='sendwithIfoSocial']").val(n);
			}
		}
		if($(".form_reply").length > 0){
			$(".form_reply [name='sendwithname']").val(t);
			$(".form_reply [name='sendwithemail']").val(i);
			if(r == 1){
				$(".form_reply [id='sexreply1']").prop("checked", !0);
			}else{
				$(".form_reply [id='sexreply0']").prop("checked", !0);
			}
			if(n != null && n != ""){
				$(".form_reply [name='sendwithIfoSocial']").val(n);
			}
		}
		if($(".showfirst .userinfonotlogin").length > 0){
			$(".showfirst .userinfonotlogin").html('<i class="iconcom-user1"><\/i><span class="uname">' + t + ' <\/span><a onclick="editName();" href="javascript:void(0)">(Sửa tên)<\/a>').removeClass("hide");
			$(".sendnow input[name=sendwithemail]").addClass("hide");
			$(".sendnow input[name=sendwithname]").addClass("hide");
			$(".sendnow .radio-ctnr").addClass("hide");
		}
		if($("#userinfoLog").length > 0){
			$("#userinfoLog").html('<i class="iconcom-user1"><\/i><span class="uname">' + t + ' <\/span><a onclick="editName();" href="javascript:void(0)">(Sửa tên)<\/a>');
			$("#userinfoLog").removeClass("hide");
			$("#ifoNoAccount").removeClass("hide").addClass("hide");
			$("#ifoAccount").removeClass("hide").addClass("hide");
			$(".sendclick").removeClass("hide")
		}
	}
	// if (i != null && i != "") {
		// $("#js_activity_feed_form").length > 0 && ($("#js_activity_feed_form [name='sendwithname']").val(i), $("#js_activity_feed_form [name='sendwithemail']").val(r), f == 1 ? $("#js_activity_feed_form [id='male']").prop("checked", !0) : $("#js_activity_feed_form [id='female']").prop("checked", !0), n != null && n != "" && $("#js_activity_feed_form [name='sendwithIfoSocial']").val(n));
		// $(".form_reply").length > 0 && ($(".form_reply [name='sendwithname']").val(i), $(".form_reply [name='sendwithemail']").val(r), n != null && n != "" && $(".form_reply [name='sendwithIfoSocial']").val(n));
		// $("#userinfoLog").html(t);
		// $("#userinfoLog").removeClass("hide");
		// $("#ifoNoAccount").removeClass("hide").addClass("hide");
		// $("#ifoAccount").removeClass("hide").addClass("hide");
		// $(".sendclick").removeClass("hide")
	// }
}
function saveCkieUser(n, t, i) {
	CreateCookie("dm_fullname", n, 30);
	CreateCookie("dm_email", t, 30);
	CreateCookie("dm_gender", i, 30)
}
function editName() {
	var n = getCookie("dm_fullname"),
	t = getCookie("dm_email"),
	i = getCookie("dm_gender");
	$(".sendnow").removeClass("hide");
	$(".sendnow input[name=sendwithemail]").removeClass("hide");
	$(".sendnow input[name=sendwithname]").removeClass("hide");
	$(".sendnow .radio-ctnr").removeClass("hide");
	$("#userinfoLog").removeClass("hide").addClass("hide");
	$("#btnSendCmt").removeClass("hide").addClass("hide");
	$(".form_reply").length > 0 && (i == 1 ? $(".form_reply [id='male']").prop("checked", !0) : $(".form_reply [id='female']").prop("checked", !0), $(".form_reply [name='sendwithname']").val(n), $(".form_reply [name='sendwithemail']").val(t), $(".wrap-attaddsend").removeClass("hide").addClass("hide"));
	clearCookie()
}
function clearEditor() {
	$("#js_activity_feed_form #content").length > 0 && ($("#js_activity_feed_form #content").html($("#js_activity_feed_form #content").html().replace(/&nbsp;/g, " ")), $("#js_activity_feed_form .msgImg").each(function () {
			$(this).remove()
		}));
	$(".form_reply .textarea").length > 0 && ($(".form_reply .textarea").html($(".form_reply .textarea").html().replace(/&nbsp;/g, " ")), $(".form_reply .msgImg").each(function () {
			$(this).remove()
		}), $(".form_reply .textarea div.hide").each(function () {
			$(this).remove()
		}))
}
function showLoading() {
	$("#js_activity_feed_form .wrap-attaddsend").removeClass("hide");
	$("#js_activity_feed_form .sendclick .load").removeClass("hide");
	$("#js_activity_feed_form .sendclick span").removeClass("hide").addClass("hide");
	$(".form_reply .sendclick .load").removeClass("hide");
	$(".form_reply .sendclick span").removeClass("hide").addClass("hide")
}
function offLoading() {
	$("#js_activity_feed_form .sendclick .load").removeClass("hide").addClass("hide");
	$("#js_activity_feed_form .sendclick span").removeClass("hide");
	$(".form_reply .sendclick .load").removeClass("hide").addClass("hide");
	$(".form_reply .sendclick span").removeClass("hide")
}
function CheckRepeatCmt(n, t, i) {
	var r = !1,
	u;
	return i != null && i != "" ? $("#r" + i + " .comment_ask").each(function () {
		var u = $.trim($(this).find(".infocom_ask .content").html()),
		f = $.trim($(this).find("strong").first().html()),
		e = $.trim(n),
		o = $.trim(t),
		i;
		u == e && f == o && (alert("Bạn vui lòng đợi 30 giây sau để gửi comment kế tiếp"), i = $(this).attr("id"), $("html, body").animate({
				scrollTop: $("#" + i).offset().top
			}, 500), r = !0)
	}) : (u = !1, $(".comment_ask").each(function () {
			var f = $.trim($(this).find(".infocom_ask").html()),
			e = $.trim($(this).find("strong").first().html()),
			o = $.trim(n),
			s = $.trim(t),
			i;
			f != o || e != s || u || (alert("Bạn vui lòng đợi 30 giây sau để gửi comment kế tiếp"), i = $(this).attr("id"), u = !0, $("html, body").animate({
					scrollTop: $("#" + i).offset().top
				}, 500), r = !0)
		})),
	r
}
function SendCmtSuccess(n) {
	try {
		$(".sendnow #btnSendCmtNoLogin").html("Gửi");
		typeof n != "undefined" && n != null && $("#" + n + " .cmtwrsn").length && $("#" + n + " .cmtwrsn img[data-original],#" + n + " .cmtwrsn img[data-src]").lazyload({
			load: function () {
				this.style.opacity = 1
			},
			threshold: 2e3
		})
	} catch (t) {}
	isSendingCmt = !1
}
function showTextArea() {
	$("#txtEditor").removeClass("hide")
}
function cmtaddreplyclick(n) {
	$("#r" + n + " .totalcomment-reply").length > 0 && $("#r" + n + " .totalcomment-reply").click();
	removeAllEditor();
	$(".comment_reply .form_reply").each(function () {
		$(this).remove()
	});
	$bDocumentIsLoaded = !0;
	$.ajax({
		url : '/product/comment/build-reply',
		type : 'POST',
		dataType: "jsonp",
		data : {
			product_id : $('#comment').data('product-id'),
			comment_id : n
		},
		beforeSend: function(){
			// $('#loading').removeClass('hidden');
		},
		success : function(result){
			$('#comment').replaceWith(result);
		},
		error : function (){
			// alert('Có lỗi khi xử lý. Bạn vui lòng thử lại sau');
		},
		complete: function(){
			// $('#loading').addClass('hidden');
		}
	});
	$("#r" + n).removeClass("hide")
}
function cmtChildAddReplyClick(n, t) {
	removeAllEditor();
	$(".comment_reply .form_reply").each(function () {
		$(this).remove()
	});
	$bDocumentIsLoaded = !0;
	$.ajax({
		url : '/product/comment/build-reply',
		type : 'POST',
		dataType: "jsonp",
		data : {
			product_id : $('#comment').data('product-id'),
			comment_id : t,
			reply_id : n
		},
		beforeSend: function(){
			// $('#loading').removeClass('hidden');
		},
		success : function(result){
			$('#comment').replaceWith(result);
		},
		error : function (){
			// alert('Có lỗi khi xử lý. Bạn vui lòng thử lại sau');
		},
		complete: function(){
			// $('#loading').addClass('hidden');
		}
	});
	$("#r" + n).removeClass("hide")
}
function setReplyUser(n) {
	var t = $("#" + n + " strong").html();
	$(".form_reply #content-" + n).html("@" + t + ": ")
}
function setReplyUserCmtChild(n, t) {
	var i = $("#" + n + " strong").html();
	$(".form_reply #content-" + t).html("@" + i + ": ")
}
function clearInput() {
	$("#js_activity_feed_form #content").html("");
	$("#js_activity_feed_form [name='sendwithname']").val("");
	$("#js_activity_feed_form [name='sendwithemail']").val("");
	$("#js_activity_feed_form [name='loginemail']").val("");
	$("#js_activity_feed_form [name='loginpass']").val("");
	$("#js_activity_feed_form .txtEditor").removeClass("hide");
	$("#js_activity_feed_form .wrap-attaddsend").removeClass("hide").addClass("hide");
	$("#js_activity_feed_form #content").removeClass("hide").addClass("hide");
	$(".form_reply .textarea").html("");
	$(".form_reply [name='sendwithname']").val("");
	$(".form_reply [name='sendwithemail']").val("");
	$(".form_reply [name='loginemail']").val("");
	$(".form_reply [name='loginpass']").val("")
}
function listcomment(page) {
	$("#notifycmtmsg").html("");
	var r = $(".s_comment .cmtKey").val().trim();
	$.ajax({
		url : '/product/comment/list-comment',
		type : 'POST',
		data : {
			product_id : $('#comment').data('product-id'),
			page : page,
			search : r,
		},
		beforeSend: function(){
			// $('#loading').removeClass('hidden');
		},
		success : function(result){
			$('.infocomment').html(result);
			InitEvent();
		},
		error : function (e){
			// console.log(e);
			// alert('Có lỗi khi xử lý. Bạn vui lòng thử lại sau');
		},
		complete: function(){
			// $('#loading').addClass('hidden');
		}
	});
}
function likeCmt(n) {
	$.ajax({
		url : '/product/comment/like-comment',
		type : 'POST',
		data : {
			comment_id : n
		},
		beforeSend: function(){
		},
		success : function(result){
		},
		error : function (e){
		},
		complete: function(){
		}
	});
}
function unlikeCmt(n) {
}
function replaceIcon() {}
function checkFirstCmt() {
	$(".infocomment div").length > 0 && $(".info_nocomment").removeClass("hide").addClass("hide")
}
var g_curPos = 0;
var g_loadFirst = !1;
var discount = 0;
var cmtnew = 0;
var cmtnew = 0;
var reconnectCount = 0;
var isSendingCmt = !1, isPendingCmt = !1, isGetingEditor = !1;
var hostName= "";
var whostName = "";

function lazy(n, t, i) {
	$(n).each(function (n, r) {
		$(r).lazyload({
			skip_invisible: t || !0,
			container: i || window,
			load: function () {
				this.style.opacity = 1
			}
		})
	})
}
var DmxModal, fullScreenUnbox, fullScreenGallery, fullScreenGalleryFeature, fullScreenCamera, galleryData, stores, provs, isChangeProvince, loading, itemsetup, sFirst, type, flagSubmitCoupon, voted, typeCart, showCombo, submitUpdateInfo, loadingCallToCC, isLoadStore, frmod, onSubmitOrder, remainuser, flagOpenPopupUser, flagShowmoreuser, flagSearch;

("undefined" != typeof window ? window : this, function (n, t) {

	function ii(n) {
		var t = !!n && "length" in n && n.length,
		r = i.type(n);
		return "function" === r || i.isWindow(n) ? !1 : "array" === r || 0 === t || "number" == typeof t && t > 0 && t - 1 in n
	}
	function ri(n, t, r) {
		if (i.isFunction(t))
			return i.grep(n, function (n, i) {
				return !!t.call(n, i, n) !== r
			});
		if (t.nodeType)
			return i.grep(n, function (n) {
				return n === t !== r
			});
		if ("string" == typeof t) {
			if (pe.test(t))
				return i.filter(t, n, r);
			t = i.filter(t, n)
		}
		return i.grep(n, function (n) {
			return i.inArray(n, t) > -1 !== r
		})
	}
	function kr(n, t) {
		do
			n = n[t];
		while (n && 1 !== n.nodeType);
		return n
	}
	function we(n) {
		var t = {};
		return i.each(n.match(s) || [], function (n, i) {
			t[i] = !0
		}),
		t
	}
	function dr() {
		u.addEventListener ? (u.removeEventListener("DOMContentLoaded", v), n.removeEventListener("load", v)) : (u.detachEvent("onreadystatechange", v), n.detachEvent("onload", v))
	}
	function v() {
		(u.addEventListener || "load" === n.event.type || "complete" === u.readyState) && (dr(), i.ready())
	}
	function nu(n, t, r) {
		if (void 0 === r && 1 === n.nodeType) {
			var u = "data-" + t.replace(ke, "-$1").toLowerCase();
			if (r = n.getAttribute(u), "string" == typeof r) {
				try {
					r = "true" === r ? !0 : "false" === r ? !1 : "null" === r ? null : +r + "" === r ? +r : be.test(r) ? i.parseJSON(r) : r
				} catch (f) {}
				i.data(n, t, r)
			} else
				r = void 0
		}
		return r
	}
	function fi(n) {
		for (var t in n)
			if (("data" !== t || !i.isEmptyObject(n[t])) && "toJSON" !== t)
				return !1;
		return !0
	}
	function tu(n, t, r, u) {
		if (ot(n)) {
			var s,
			e,
			h = i.expando,
			l = n.nodeType,
			o = l ? i.cache : n,
			f = l ? n[h] : n[h] && h;
			if (f && o[f] && (u || o[f].data) || void 0 !== r || "string" != typeof t)
				return f || (f = l ? n[h] = c.pop() || i.guid++ : h), o[f] || (o[f] = l ? {}
					 : {
					toJSON: i.noop
				}), "object" != typeof t && "function" != typeof t || (u ? o[f] = i.extend(o[f], t) : o[f].data = i.extend(o[f].data, t)), e = o[f], u || (e.data || (e.data = {}), e = e.data), void 0 !== r && (e[i.camelCase(t)] = r), "string" == typeof t ? (s = e[t], null == s && (s = e[i.camelCase(t)])) : s = e, s
		}
	}
	function iu(n, t, u) {
		if (ot(n)) {
			var o,
			s,
			h = n.nodeType,
			f = h ? i.cache : n,
			e = h ? n[i.expando] : i.expando;
			if (f[e]) {
				if (t && (o = u ? f[e] : f[e].data)) {
					for (i.isArray(t) ? t = t.concat(i.map(t, i.camelCase)) : (t in o) ? t = [t] : (t = i.camelCase(t), t = (t in o) ? [t] : t.split(" ")), s = t.length; s--; )
						delete o[t[s]];
					if (u ? !fi(o) : !i.isEmptyObject(o))
						return
				}
				(u || (delete f[e].data, fi(f[e]))) && (h ? i.cleanData([n], !0) : r.deleteExpando || f != f.window ? delete f[e] : f[e] = void 0)
			}
		}
	}
	function ru(n, t, r, u) {
		var h,
		e = 1,
		l = 20,
		c = u ? function () {
			return u.cur()
		}
		 : function () {
			return i.css(n, t, "")
		},
		s = c(),
		o = r && r[3] || (i.cssNumber[t] ? "" : "px"),
		f = (i.cssNumber[t] || "px" !== o && +s) && oi.exec(i.css(n, t));
		if (f && f[3] !== o) {
			o = o || f[3];
			r = r || [];
			f = +s || 1;
			do
				e = e || ".5", f /= e, i.style(n, t, f + o);
			while (e !== (e = c() / s) && 1 !== e && --l)
		}
		return r && (f = +f || +s || 0, h = r[1] ? f + (r[1] + 1) * r[2] : +r[2], u && (u.unit = o, u.start = f, u.end = h)),
		h
	}
	function ou(n) {
		var i = eu.split("|"),
		t = n.createDocumentFragment();
		if (t.createElement)
			while (i.length)
				t.createElement(i.pop());
		return t
	}
	function f(n, t) {
		var e,
		u,
		o = 0,
		r = "undefined" != typeof n.getElementsByTagName ? n.getElementsByTagName(t || "*") : "undefined" != typeof n.querySelectorAll ? n.querySelectorAll(t || "*") : void 0;
		if (!r)
			for (r = [], e = n.childNodes || n; null != (u = e[o]); o++)
				!t || i.nodeName(u, t) ? r.push(u) : i.merge(r, f(u, t));
		return void 0 === t || t && i.nodeName(n, t) ? i.merge([n], r) : r
	}
	function ci(n, t) {
		for (var u, r = 0; null != (u = n[r]); r++)
			i._data(u, "globalEval", !t || i._data(t[r], "globalEval"))
	}
	function de(n) {
		si.test(n.type) && (n.defaultChecked = n.checked)
	}
	function hu(n, t, u, e, s) {
		for (var l, h, k, c, w, b, v, d = n.length, y = ou(t), a = [], p = 0; d > p; p++)
			if (h = n[p], h || 0 === h)
				if ("object" === i.type(h))
					i.merge(a, h.nodeType ? [h] : h);
				else if (su.test(h)) {
					for (c = c || y.appendChild(t.createElement("div")), w = (uu.exec(h) || ["", ""])[1].toLowerCase(), v = o[w] || o._default, c.innerHTML = v[1] + i.htmlPrefilter(h) + v[2], l = v[0]; l--; )
						c = c.lastChild;
					if (!r.leadingWhitespace && hi.test(h) && a.push(t.createTextNode(hi.exec(h)[0])), !r.tbody)
						for (h = "table" !== w || li.test(h) ? "<table>" !== v[1] || li.test(h) ? 0 : c : c.firstChild, l = h && h.childNodes.length; l--; )
							i.nodeName(b = h.childNodes[l], "tbody") && !b.childNodes.length && h.removeChild(b);
					for (i.merge(a, c.childNodes), c.textContent = ""; c.firstChild; )
						c.removeChild(c.firstChild);
					c = y.lastChild
				} else
					a.push(t.createTextNode(h));
		for (c && y.removeChild(c), r.appendChecked || i.grep(f(a, "input"), de), p = 0; h = a[p++]; )
			if (e && i.inArray(h, e) > -1)
				s && s.push(h);
			else if (k = i.contains(h.ownerDocument, h), c = f(y.appendChild(h), "script"), k && ci(c), u)
				for (l = 0; h = c[l++]; )
					fu.test(h.type || "") && u.push(h);
		return c = null,
		y
	}
	function vt() {
		return !0
	}
	function rt() {
		return !1
	}
	function au() {
		try {
			return u.activeElement
		} catch (n) {}
	}
	function vi(n, t, r, u, f, e) {
		var o,
		s;
		if ("object" == typeof t) {
			"string" != typeof r && (u = u || r, r = void 0);
			for (s in t)
				vi(n, s, r, u, t[s], e);
			return n
		}
		if (null == u && null == f ? (f = r, u = r = void 0) : null == f && ("string" == typeof r ? (f = u, u = void 0) : (f = u, u = r, r = void 0)), f === !1)
			f = rt;
		else if (!f)
			return n;
		return 1 === e && (o = f, f = function (n) {
			return i().off(n),
			o.apply(this, arguments)
		}, f.guid = o.guid || (o.guid = i.guid++)),
		n.each(function () {
			i.event.add(this, t, f, u, r)
		})
	}
	function yu(n, t) {
		return i.nodeName(n, "table") && i.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? n.getElementsByTagName("tbody")[0] || n.appendChild(n.ownerDocument.createElement("tbody")) : n
	}
	function pu(n) {
		return n.type = (null !== i.find.attr(n, "type")) + "/" + n.type,
		n
	}
	function wu(n) {
		var t = fo.exec(n.type);
		return t ? n.type = t[1] : n.removeAttribute("type"),
		n
	}
	function bu(n, t) {
		if (1 === t.nodeType && i.hasData(n)) {
			var u,
			f,
			o,
			s = i._data(n),
			r = i._data(t, s),
			e = s.events;
			if (e) {
				delete r.handle;
				r.events = {};
				for (u in e)
					for (f = 0, o = e[u].length; o > f; f++)
						i.event.add(t, u, e[u][f])
			}
			r.data && (r.data = i.extend({}, r.data))
		}
	}
	function so(n, t) {
		var u,
		e,
		f;
		if (1 === t.nodeType) {
			if (u = t.nodeName.toLowerCase(), !r.noCloneEvent && t[i.expando]) {
				f = i._data(t);
				for (e in f.events)
					i.removeEvent(t, e, f.handle);
				t.removeAttribute(i.expando)
			}
			"script" === u && t.text !== n.text ? (pu(t).text = n.text, wu(t)) : "object" === u ? (t.parentNode && (t.outerHTML = n.outerHTML), r.html5Clone && n.innerHTML && !i.trim(t.innerHTML) && (t.innerHTML = n.innerHTML)) : "input" === u && si.test(n.type) ? (t.defaultChecked = t.checked = n.checked, t.value !== n.value && (t.value = n.value)) : "option" === u ? t.defaultSelected = t.selected = n.defaultSelected : "input" !== u && "textarea" !== u || (t.defaultValue = n.defaultValue)
		}
	}
	function k(n, t, u, e) {
		t = sr.apply([], t);
		var l,
		o,
		a,
		h,
		p,
		c,
		s = 0,
		v = n.length,
		b = v - 1,
		y = t[0],
		w = i.isFunction(y);
		if (w || v > 1 && "string" == typeof y && !r.checkClone && uo.test(y))
			return n.each(function (i) {
				var r = n.eq(i);
				w && (t[0] = y.call(this, i, r.html()));
				k(r, t, u, e)
			});
		if (v && (c = hu(t, n[0].ownerDocument, !1, n, e), l = c.firstChild, 1 === c.childNodes.length && (c = l), l || e)) {
			for (h = i.map(f(c, "script"), pu), a = h.length; v > s; s++)
				o = c, s !== b && (o = i.clone(o, !0, !0), a && i.merge(h, f(o, "script"))), u.call(n[s], o, s);
			if (a)
				for (p = h[h.length - 1].ownerDocument, i.map(h, wu), s = 0; a > s; s++)
					o = h[s], fu.test(o.type || "") && !i._data(o, "globalEval") && i.contains(p, o) && (o.src ? i._evalUrl && i._evalUrl(o.src) : i.globalEval((o.text || o.textContent || o.innerHTML || "").replace(eo, "")));
			c = l = null
		}
		return n
	}
	function ku(n, t, r) {
		for (var u, o = t ? i.filter(t, n) : n, e = 0; null != (u = o[e]); e++)
			r || 1 !== u.nodeType || i.cleanData(f(u)), u.parentNode && (r && i.contains(u.ownerDocument, u) && ci(f(u, "script")), u.parentNode.removeChild(u));
		return n
	}
	function du(n, t) {
		var r = i(t.createElement(n)).appendTo(t.body),
		u = i.css(r[0], "display");
		return r.detach(),
		u
	}
	function yt(n) {
		var r = u,
		t = pi[n];
		return t || (t = du(n, r), "none" !== t && t || (ht = (ht || i("<iframe frameborder='0' width='0' height='0'/>")).appendTo(r.documentElement), r = (ht[0].contentWindow || ht[0].contentDocument).document, r.write(), r.close(), t = du(n, r), ht.detach()), pi[n] = t),
		t
	}
	function bi(n, t) {
		return {
			get: function () {
				return n() ? void delete this.get : (this.get = t).apply(this, arguments)
			}
		}
	}
	function ef(n) {
		if (n in ff)
			return n;
		for (var i = n.charAt(0).toUpperCase() + n.slice(1), t = uf.length; t--; )
			if (n = uf[t] + i, n in ff)
				return n
	}
	function of(n, t) {
		for (var f, r, o, e = [], u = 0, s = n.length; s > u; u++)
			r = n[u], r.style && (e[u] = i._data(r, "olddisplay"), f = r.style.display, t ? (e[u] || "none" !== f || (r.style.display = ""), "" === r.style.display && st(r) && (e[u] = i._data(r, "olddisplay", yt(r.nodeName)))) : (o = st(r), (f && "none" !== f || !o) && i._data(r, "olddisplay", o ? f : i.css(r, "display"))));
		for (u = 0; s > u; u++)
			r = n[u], r.style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? e[u] || "" : "none"));
		return n
	}
	function sf(n, t, i) {
		var r = lo.exec(t);
		return r ? Math.max(0, r[1] - (i || 0)) + (r[2] || "px") : t
	}
	function hf(n, t, r, u, f) {
		for (var e = r === (u ? "border" : "content") ? 4 : "width" === t ? 1 : 0, o = 0; 4 > e; e += 2)
			"margin" === r && (o += i.css(n, r + b[e], !0, f)), u ? ("content" === r && (o -= i.css(n, "padding" + b[e], !0, f)), "margin" !== r && (o -= i.css(n, "border" + b[e] + "Width", !0, f))) : (o += i.css(n, "padding" + b[e], !0, f), "padding" !== r && (o += i.css(n, "border" + b[e] + "Width", !0, f)));
		return o
	}
	function cf(n, t, u) {
		var o = !0,
		f = "width" === t ? n.offsetWidth : n.offsetHeight,
		e = d(n),
		s = r.boxSizing && "border-box" === i.css(n, "boxSizing", !1, e);
		if (0 >= f || null == f) {
			if (f = p(n, t, e), (0 > f || null == f) && (f = n.style[t]), pt.test(f))
				return f;
			o = s && (r.boxSizingReliable() || f === n.style[t]);
			f = parseFloat(f) || 0
		}
		return f + hf(n, t, u || (s ? "border" : "content"), o, e) + "px"
	}
	function e(n, t, i, r, u) {
		return new e.prototype.init(n, t, i, r, u)
	}
	function vf() {
		return n.setTimeout(function () {
			ut = void 0
		}),
		ut = i.now()
	}
	function bt(n, t) {
		var r,
		i = {
			height: n
		},
		u = 0;
		for (t = t ? 1 : 0; 4 > u; u += 2 - t)
			r = b[u], i["margin" + r] = i["padding" + r] = n;
		return t && (i.opacity = i.width = n),
		i
	}
	function yf(n, t, i) {
		for (var u, f = (h.tweeners[t] || []).concat(h.tweeners["*"]), r = 0, e = f.length; e > r; r++)
			if (u = f[r].call(i, t, n))
				return u
	}
	function vo(n, t, u) {
		var f,
		a,
		p,
		v,
		s,
		w,
		h,
		b,
		l = this,
		y = {},
		o = n.style,
		c = n.nodeType && st(n),
		e = i._data(n, "fxshow");
		u.queue || (s = i._queueHooks(n, "fx"), null == s.unqueued && (s.unqueued = 0, w = s.empty.fire, s.empty.fire = function () {
				s.unqueued || w()
			}), s.unqueued++, l.always(function () {
				l.always(function () {
					s.unqueued--;
					i.queue(n, "fx").length || s.empty.fire()
				})
			}));
		1 === n.nodeType && ("height" in t || "width" in t) && (u.overflow = [o.overflow, o.overflowX, o.overflowY], h = i.css(n, "display"), b = "none" === h ? i._data(n, "olddisplay") || yt(n.nodeName) : h, "inline" === b && "none" === i.css(n, "float") && (r.inlineBlockNeedsLayout && "inline" !== yt(n.nodeName) ? o.zoom = 1 : o.display = "inline-block"));
		u.overflow && (o.overflow = "hidden", r.shrinkWrapBlocks() || l.always(function () {
				o.overflow = u.overflow[0];
				o.overflowX = u.overflow[1];
				o.overflowY = u.overflow[2]
			}));
		for (f in t)
			if (a = t[f], lf.exec(a)) {
				if (delete t[f], p = p || "toggle" === a, a === (c ? "hide" : "show")) {
					if ("show" !== a || !e || void 0 === e[f])
						continue;
					c = !0
				}
				y[f] = e && e[f] || i.style(n, f)
			} else
				h = void 0;
		if (i.isEmptyObject(y))
			"inline" === ("none" === h ? yt(n.nodeName) : h) && (o.display = h);
		else {
			e ? "hidden" in e && (c = e.hidden) : e = i._data(n, "fxshow", {});
			p && (e.hidden = !c);
			c ? i(n).show() : l.done(function () {
				i(n).hide()
			});
			l.done(function () {
				var t;
				i._removeData(n, "fxshow");
				for (t in y)
					i.style(n, t, y[t])
			});
			for (f in y)
				v = yf(c ? e[f] : 0, f, l), f in e || (e[f] = v.start, c && (v.end = v.start, v.start = "width" === f || "height" === f ? 1 : 0))
		}
	}
	function yo(n, t) {
		var r,
		f,
		e,
		u,
		o;
		for (r in n)
			if (f = i.camelCase(r), e = t[f], u = n[r], i.isArray(u) && (e = u[1], u = n[r] = u[0]), r !== f && (n[f] = u, delete n[r]), o = i.cssHooks[f], o && "expand" in o) {
				u = o.expand(u);
				delete n[f];
				for (r in u)
					r in n || (n[r] = u[r], t[r] = e)
			} else
				t[f] = e
	}
	function h(n, t, r) {
		var e,
		o,
		s = 0,
		a = h.prefilters.length,
		f = i.Deferred().always(function () {
				delete l.elem
			}),
		l = function () {
			if (o)
				return !1;
			for (var s = ut || vf(), t = Math.max(0, u.startTime + u.duration - s), h = t / u.duration || 0, i = 1 - h, r = 0, e = u.tweens.length; e > r; r++)
				u.tweens[r].run(i);
			return f.notifyWith(n, [u, i, t]),
			1 > i && e ? t : (f.resolveWith(n, [u]), !1)
		},
		u = f.promise({
				elem: n,
				props: i.extend({}, t),
				opts: i.extend(!0, {
					specialEasing: {},
					easing: i.easing._default
				}, r),
				originalProperties: t,
				originalOptions: r,
				startTime: ut || vf(),
				duration: r.duration,
				tweens: [],
				createTween: function (t, r) {
					var f = i.Tween(n, u.opts, t, r, u.opts.specialEasing[t] || u.opts.easing);
					return u.tweens.push(f),
					f
				},
				stop: function (t) {
					var i = 0,
					r = t ? u.tweens.length : 0;
					if (o)
						return this;
					for (o = !0; r > i; i++)
						u.tweens[i].run(1);
					return t ? (f.notifyWith(n, [u, 1, 0]), f.resolveWith(n, [u, t])) : f.rejectWith(n, [u, t]),
					this
				}
			}),
		c = u.props;
		for (yo(c, u.opts.specialEasing); a > s; s++)
			if (e = h.prefilters[s].call(u, n, c, u.opts))
				return i.isFunction(e.stop) && (i._queueHooks(u.elem, u.opts.queue).stop = i.proxy(e.stop, e)), e;
		return i.map(c, yf, u),
		i.isFunction(u.opts.start) && u.opts.start.call(n, u),
		i.fx.timer(i.extend(l, {
				elem: n,
				anim: u,
				queue: u.opts.queue
			})),
		u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
	}
	function nt(n) {
		return i.attr(n, "class") || ""
	}
	function re(n) {
		return function (t, r) {
			"string" != typeof t && (r = t, t = "*");
			var u,
			f = 0,
			e = t.toLowerCase().match(s) || [];
			if (i.isFunction(r))
				while (u = e[f++])
					"+" === u.charAt(0) ? (u = u.slice(1) || "*", (n[u] = n[u] || []).unshift(r)) : (n[u] = n[u] || []).push(r)
		}
	}
	function ue(n, t, r, u) {
		function e(s) {
			var h;
			return f[s] = !0,
			i.each(n[s] || [], function (n, i) {
				var s = i(t, r, u);
				return "string" != typeof s || o || f[s] ? o ? !(h = s) : void 0 : (t.dataTypes.unshift(s), e(s), !1)
			}),
			h
		}
		var f = {},
		o = n === tr;
		return e(t.dataTypes[0]) || !f["*"] && e("*")
	}
	function rr(n, t) {
		var u,
		r,
		f = i.ajaxSettings.flatOptions || {};
		for (r in t)
			void 0 !== t[r] && ((f[r] ? n : u || (u = {}))[r] = t[r]);
		return u && i.extend(!0, n, u),
		n
	}
	function ts(n, t, i) {
		for (var o, e, u, f, s = n.contents, r = n.dataTypes; "*" === r[0]; )
			r.shift(), void 0 === e && (e = n.mimeType || t.getResponseHeader("Content-Type"));
		if (e)
			for (f in s)
				if (s[f] && s[f].test(e)) {
					r.unshift(f);
					break
				}
		if (r[0]in i)
			u = r[0];
		else {
			for (f in i) {
				if (!r[0] || n.converters[f + " " + r[0]]) {
					u = f;
					break
				}
				o || (o = f)
			}
			u = u || o
		}
		if (u)
			return (u !== r[0] && r.unshift(u), i[u])
	}
	function is(n, t, i, r) {
		var h,
		u,
		f,
		s,
		e,
		o = {},
		c = n.dataTypes.slice();
		if (c[1])
			for (f in n.converters)
				o[f.toLowerCase()] = n.converters[f];
		for (u = c.shift(); u; )
			if (n.responseFields[u] && (i[n.responseFields[u]] = t), !e && r && n.dataFilter && (t = n.dataFilter(t, n.dataType)), e = u, u = c.shift())
				if ("*" === u)
					u = e;
				else if ("*" !== e && e !== u) {
					if (f = o[e + " " + u] || o["* " + u], !f)
						for (h in o)
							if (s = h.split(" "), s[1] === u && (f = o[e + " " + s[0]] || o["* " + s[0]])) {
								f === !0 ? f = o[h] : o[h] !== !0 && (u = s[0], c.unshift(s[1]));
								break
							}
					if (f !== !0)
						if (f && n.throws)
							t = f(t);
						else
							try {
								t = f(t)
							} catch (l) {
								return {
									state: "parsererror",
									error: f ? l : "No conversion from " + e + " to " + u
								}
							}
				}
		return {
			state: "success",
			data: t
		}
	}
	function rs(n) {
		return n.style && n.style.display || i.css(n, "display")
	}
	function us(n) {
		if (!i.contains(n.ownerDocument || u, n))
			return !0;
		while (n && 1 === n.nodeType) {
			if ("none" === rs(n) || "hidden" === n.type)
				return !0;
			n = n.parentNode
		}
		return !1
	}
	function ur(n, t, r, u) {
		var f;
		if (i.isArray(t))
			i.each(t, function (t, i) {
				r || es.test(n) ? u(n, i) : ur(n + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, r, u)
			});
		else if (r || "object" !== i.type(t))
			u(n, t);
		else
			for (f in t)
				ur(n + "[" + f + "]", t[f], r, u)
	}
	function fr() {
		try {
			return new n.XMLHttpRequest
		} catch (t) {}
	}
	function ee() {
		try {
			return new n.ActiveXObject("Microsoft.XMLHTTP")
		} catch (t) {}
	}
	function oe(n) {
		return i.isWindow(n) ? n : 9 === n.nodeType ? n.defaultView || n.parentWindow : !1
	}
	var c = [],
	u = n.document,
	a = c.slice,
	sr = c.concat,
	ti = c.push,
	hr = c.indexOf,
	lt = {},
	ce = lt.toString,
	tt = lt.hasOwnProperty,
	r = {},
	cr = "1.12.4",
	i = function (n, t) {
		return new i.fn.init(n, t)
	},
	le = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	ae = /^-ms-/,
	ve = /-([\da-z])/gi,
	ye = function (n, t) {
		return t.toUpperCase()
	},
	w,
	ui,
	yr,
	pr,
	wr,
	br,
	s,
	at,
	gr,
	o,
	su,
	li,
	ht,
	pi,
	d,
	p,
	tf,
	ut,
	wt,
	lf,
	af,
	pf,
	wf,
	kf,
	df,
	dt,
	er,
	ni,
	or,
	se,
	he;
	i.fn = i.prototype = {
		jquery: cr,
		constructor: i,
		selector: "",
		length: 0,
		toArray: function () {
			return a.call(this)
		},
		get: function (n) {
			return null != n ? 0 > n ? this[n + this.length] : this[n] : a.call(this)
		},
		pushStack: function (n) {
			var t = i.merge(this.constructor(), n);
			return t.prevObject = this,
			t.context = this.context,
			t
		},
		each: function (n) {
			return i.each(this, n)
		},
		map: function (n) {
			return this.pushStack(i.map(this, function (t, i) {
					return n.call(t, i, t)
				}))
		},
		slice: function () {
			return this.pushStack(a.apply(this, arguments))
		},
		first: function () {
			return this.eq(0)
		},
		last: function () {
			return this.eq(-1)
		},
		eq: function (n) {
			var i = this.length,
			t = +n + (0 > n ? i : 0);
			return this.pushStack(t >= 0 && i > t ? [this[t]] : [])
		},
		end: function () {
			return this.prevObject || this.constructor()
		},
		push: ti,
		sort: c.sort,
		splice: c.splice
	};
	i.extend = i.fn.extend = function () {
		var r,
		e,
		t,
		f,
		o,
		s,
		n = arguments[0] || {},
		u = 1,
		c = arguments.length,
		h = !1;
		for ("boolean" == typeof n && (h = n, n = arguments[u] || {}, u++), "object" == typeof n || i.isFunction(n) || (n = {}), u === c && (n = this, u--); c > u; u++)
			if (null != (o = arguments[u]))
				for (f in o)
					r = n[f], t = o[f], n !== t && (h && t && (i.isPlainObject(t) || (e = i.isArray(t))) ? (e ? (e = !1, s = r && i.isArray(r) ? r : []) : s = r && i.isPlainObject(r) ? r : {}, n[f] = i.extend(h, s, t)) : void 0 !== t && (n[f] = t));
		return n
	};
	i.extend({
		expando: "jQuery" + (cr + Math.random()).replace(/\D/g, ""),
		isReady: !0,
		error: function (n) {
			throw new Error(n);
		},
		noop: function () {},
		isFunction: function (n) {
			return "function" === i.type(n)
		},
		isArray: Array.isArray || function (n) {
			return "array" === i.type(n)
		},
		isWindow: function (n) {
			return null != n && n == n.window
		},
		isNumeric: function (n) {
			var t = n && n.toString();
			return !i.isArray(n) && t - parseFloat(t) + 1 >= 0
		},
		isEmptyObject: function (n) {
			for (var t in n)
				return !1;
			return !0
		},
		isPlainObject: function (n) {
			var t;
			if (!n || "object" !== i.type(n) || n.nodeType || i.isWindow(n))
				return !1;
			try {
				if (n.constructor && !tt.call(n, "constructor") && !tt.call(n.constructor.prototype, "isPrototypeOf"))
					return !1
			} catch (u) {
				return !1
			}
			if (!r.ownFirst)
				for (t in n)
					return tt.call(n, t);
			for (t in n);
			return void 0 === t || tt.call(n, t)
		},
		type: function (n) {
			return null == n ? n + "" : "object" == typeof n || "function" == typeof n ? lt[ce.call(n)] || "object" : typeof n
		},
		globalEval: function (t) {
			t && i.trim(t) && (n.execScript || function (t) {
				n.eval.call(n, t)
			})(t)
		},
		camelCase: function (n) {
			return n.replace(ae, "ms-").replace(ve, ye)
		},
		nodeName: function (n, t) {
			return n.nodeName && n.nodeName.toLowerCase() === t.toLowerCase()
		},
		each: function (n, t) {
			var r,
			i = 0;
			if (ii(n)) {
				for (r = n.length; r > i; i++)
					if (t.call(n[i], i, n[i]) === !1)
						break
			} else
				for (i in n)
					if (t.call(n[i], i, n[i]) === !1)
						break;
			return n
		},
		trim: function (n) {
			return null == n ? "" : (n + "").replace(le, "")
		},
		makeArray: function (n, t) {
			var r = t || [];
			return null != n && (ii(Object(n)) ? i.merge(r, "string" == typeof n ? [n] : n) : ti.call(r, n)),
			r
		},
		inArray: function (n, t, i) {
			var r;
			if (t) {
				if (hr)
					return hr.call(t, n, i);
				for (r = t.length, i = i ? 0 > i ? Math.max(0, r + i) : i : 0; r > i; i++)
					if (i in t && t[i] === n)
						return i
			}
			return -1
		},
		merge: function (n, t) {
			for (var r = +t.length, i = 0, u = n.length; r > i; )
				n[u++] = t[i++];
			if (r !== r)
				while (void 0 !== t[i])
					n[u++] = t[i++];
			return n.length = u,
			n
		},
		grep: function (n, t, i) {
			for (var u, f = [], r = 0, e = n.length, o = !i; e > r; r++)
				u = !t(n[r], r), u !== o && f.push(n[r]);
			return f
		},
		map: function (n, t, i) {
			var e,
			u,
			r = 0,
			f = [];
			if (ii(n))
				for (e = n.length; e > r; r++)
					u = t(n[r], r, i), null != u && f.push(u);
			else
				for (r in n)
					u = t(n[r], r, i), null != u && f.push(u);
			return sr.apply([], f)
		},
		guid: 1,
		proxy: function (n, t) {
			var u,
			r,
			f;
			return "string" == typeof t && (f = n[t], t = n, n = f),
			i.isFunction(n) ? (u = a.call(arguments, 2), r = function () {
				return n.apply(t || this, u.concat(a.call(arguments)))
			}, r.guid = n.guid = n.guid || i.guid++, r) : void 0
		},
		now: function () {
			return +new Date
		},
		support: r
	});
	"function" == typeof Symbol && (i.fn[Symbol.iterator] = c[Symbol.iterator]);
	i.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function (n, t) {
		lt["[object " + t + "]"] = t.toLowerCase()
	});
	w = function (n) {
		function u(n, t, r, u) {
			var l,
			w,
			a,
			s,
			nt,
			d,
			y,
			g,
			p = t && t.ownerDocument,
			v = t ? t.nodeType : 9;
			if (r = r || [], "string" != typeof n || !n || 1 !== v && 9 !== v && 11 !== v)
				return r;
			if (!u && ((t ? t.ownerDocument || t : c) !== i && b(t), t = t || i, h)) {
				if (11 !== v && (d = sr.exec(n)))
					if (l = d[1]) {
						if (9 === v) {
							if (!(a = t.getElementById(l)))
								return r;
							if (a.id === l)
								return r.push(a), r
						} else if (p && (a = p.getElementById(l)) && et(t, a) && a.id === l)
							return r.push(a), r
					} else {
						if (d[2])
							return k.apply(r, t.getElementsByTagName(n)), r;
						if ((l = d[3]) && f.getElementsByClassName && t.getElementsByClassName)
							return k.apply(r, t.getElementsByClassName(l)), r
					}
				if (f.qsa && !lt[n + " "] && (!o || !o.test(n))) {
					if (1 !== v)
						p = t, g = n;
					else if ("object" !== t.nodeName.toLowerCase()) {
						for ((s = t.getAttribute("id")) ? s = s.replace(hr, "\\$&") : t.setAttribute("id", s = e), y = ft(n), w = y.length, nt = yi.test(s) ? "#" + s : "[id='" + s + "']"; w--; )
							y[w] = nt + " " + yt(y[w]);
						g = y.join(",");
						p = gt.test(n) && ii(t.parentNode) || t
					}
					if (g)
						try {
							return k.apply(r, p.querySelectorAll(g)),
							r
						} catch (tt) {}
					finally {
						s === e && t.removeAttribute("id")
					}
				}
			}
			return si(n.replace(at, "$1"), t, r, u)
		}
		function ni() {
			function n(r, u) {
				return i.push(r + " ") > t.cacheLength && delete n[i.shift()],
				n[r + " "] = u
			}
			var i = [];
			return n
		}
		function l(n) {
			return n[e] = !0,
			n
		}
		function a(n) {
			var t = i.createElement("div");
			try {
				return !!n(t)
			} catch (r) {
				return !1
			}
			finally {
				t.parentNode && t.parentNode.removeChild(t);
				t = null
			}
		}
		function ti(n, i) {
			for (var r = n.split("|"), u = r.length; u--; )
				t.attrHandle[r[u]] = i
		}
		function wi(n, t) {
			var i = t && n,
			r = i && 1 === n.nodeType && 1 === t.nodeType && (~t.sourceIndex || li) - (~n.sourceIndex || li);
			if (r)
				return r;
			if (i)
				while (i = i.nextSibling)
					if (i === t)
						return -1;
			return n ? 1 : -1
		}
		function cr(n) {
			return function (t) {
				var i = t.nodeName.toLowerCase();
				return "input" === i && t.type === n
			}
		}
		function lr(n) {
			return function (t) {
				var i = t.nodeName.toLowerCase();
				return ("input" === i || "button" === i) && t.type === n
			}
		}
		function it(n) {
			return l(function (t) {
				return t = +t,
				l(function (i, r) {
					for (var u, f = n([], i.length, t), e = f.length; e--; )
						i[u = f[e]] && (i[u] = !(r[u] = i[u]))
				})
			})
		}
		function ii(n) {
			return n && "undefined" != typeof n.getElementsByTagName && n
		}
		function bi() {}
		function yt(n) {
			for (var t = 0, r = n.length, i = ""; r > t; t++)
				i += n[t].value;
			return i
		}
		function ri(n, t, i) {
			var r = t.dir,
			u = i && "parentNode" === r,
			f = ki++;
			return t.first ? function (t, i, f) {
				while (t = t[r])
					if (1 === t.nodeType || u)
						return n(t, i, f)
			}
			 : function (t, i, o) {
				var s,
				h,
				c,
				l = [v, f];
				if (o) {
					while (t = t[r])
						if ((1 === t.nodeType || u) && n(t, i, o))
							return !0
				} else
					while (t = t[r])
						if (1 === t.nodeType || u) {
							if (c = t[e] || (t[e] = {}), h = c[t.uniqueID] || (c[t.uniqueID] = {}), (s = h[r]) && s[0] === v && s[1] === f)
								return l[2] = s[2];
							if (h[r] = l, l[2] = n(t, i, o))
								return !0
						}
			}
		}
		function ui(n) {
			return n.length > 1 ? function (t, i, r) {
				for (var u = n.length; u--; )
					if (!n[u](t, i, r))
						return !1;
				return !0
			}
			 : n[0]
		}
		function ar(n, t, i) {
			for (var r = 0, f = t.length; f > r; r++)
				u(n, t[r], i);
			return i
		}
		function pt(n, t, i, r, u) {
			for (var e, o = [], f = 0, s = n.length, h = null != t; s > f; f++)
				(e = n[f]) && (i && !i(e, r, u) || (o.push(e), h && t.push(f)));
			return o
		}
		function fi(n, t, i, r, u, f) {
			return r && !r[e] && (r = fi(r)),
			u && !u[e] && (u = fi(u, f)),
			l(function (f, e, o, s) {
				var l,
				c,
				a,
				p = [],
				y = [],
				w = e.length,
				b = f || ar(t || "*", o.nodeType ? [o] : o, []),
				v = !n || !f && t ? b : pt(b, p, n, o, s),
				h = i ? u || (f ? n : w || r) ? [] : e : v;
				if (i && i(v, h, o, s), r)
					for (l = pt(h, y), r(l, [], o, s), c = l.length; c--; )
						(a = l[c]) && (h[y[c]] = !(v[y[c]] = a));
				if (f) {
					if (u || n) {
						if (u) {
							for (l = [], c = h.length; c--; )
								(a = h[c]) && l.push(v[c] = a);
							u(null, h = [], l, s)
						}
						for (c = h.length; c--; )
							(a = h[c]) && (l = u ? nt(f, a) : p[c]) > -1 && (f[l] = !(e[l] = a))
					}
				} else
					h = pt(h === e ? h.splice(w, h.length) : h), u ? u(null, e, h, s) : k.apply(e, h)
			})
		}
		function ei(n) {
			for (var o, u, r, s = n.length, h = t.relative[n[0].type], c = h || t.relative[" "], i = h ? 1 : 0, l = ri(function (n) {
						return n === o
					}, c, !0), a = ri(function (n) {
						return nt(o, n) > -1
					}, c, !0), f = [function (n, t, i) {
						var r = !h && (i || t !== ht) || ((o = t).nodeType ? l(n, t, i) : a(n, t, i));
						return o = null,
						r
					}
				]; s > i; i++)
				if (u = t.relative[n[i].type])
					f = [ri(ui(f), u)];
				else {
					if (u = t.filter[n[i].type].apply(null, n[i].matches), u[e]) {
						for (r = ++i; s > r; r++)
							if (t.relative[n[r].type])
								break;
						return fi(i > 1 && ui(f), i > 1 && yt(n.slice(0, i - 1).concat({
									value: " " === n[i - 2].type ? "*" : ""
								})).replace(at, "$1"), u, r > i && ei(n.slice(i, r)), s > r && ei(n = n.slice(r)), s > r && yt(n))
					}
					f.push(u)
				}
			return ui(f)
		}
		function vr(n, r) {
			var f = r.length > 0,
			e = n.length > 0,
			o = function (o, s, c, l, a) {
				var y,
				nt,
				d,
				g = 0,
				p = "0",
				tt = o && [],
				w = [],
				it = ht,
				rt = o || e && t.find.TAG("*", a),
				ut = v += null == it ? 1 : Math.random() || .1,
				ft = rt.length;
				for (a && (ht = s === i || s || a); p !== ft && null != (y = rt[p]); p++) {
					if (e && y) {
						for (nt = 0, s || y.ownerDocument === i || (b(y), c = !h); d = n[nt++]; )
							if (d(y, s || i, c)) {
								l.push(y);
								break
							}
						a && (v = ut)
					}
					f && ((y = !d && y) && g--, o && tt.push(y))
				}
				if (g += p, f && p !== g) {
					for (nt = 0; d = r[nt++]; )
						d(tt, w, s, c);
					if (o) {
						if (g > 0)
							while (p--)
								tt[p] || w[p] || (w[p] = gi.call(l));
						w = pt(w)
					}
					k.apply(l, w);
					a && !o && w.length > 0 && g + r.length > 1 && u.uniqueSort(l)
				}
				return a && (v = ut, ht = it),
				tt
			};
			return f ? l(o) : o
		}
		var rt,
		f,
		t,
		st,
		oi,
		ft,
		wt,
		si,
		ht,
		w,
		ut,
		b,
		i,
		s,
		h,
		o,
		d,
		ct,
		et,
		e = "sizzle" + 1 * new Date,
		c = n.document,
		v = 0,
		ki = 0,
		hi = ni(),
		ci = ni(),
		lt = ni(),
		bt = function (n, t) {
			return n === t && (ut = !0),
			0
		},
		li = -2147483648,
		di = {}
		.hasOwnProperty,
		g = [],
		gi = g.pop,
		nr = g.push,
		k = g.push,
		ai = g.slice,
		nt = function (n, t) {
			for (var i = 0, r = n.length; r > i; i++)
				if (n[i] === t)
					return i;
			return -1
		},
		kt = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
		r = "[\\x20\\t\\r\\n\\f]",
		tt = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
		vi = "\\[" + r + "*(" + tt + ")(?:" + r + "*([*^$|!~]?=)" + r + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + tt + "))|)" + r + "*\\]",
		dt = ":(" + tt + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + vi + ")*)|.*)\\)|)",
		tr = new RegExp(r + "+", "g"),
		at = new RegExp("^" + r + "+|((?:^|[^\\\\])(?:\\\\.)*)" + r + "+$", "g"),
		ir = new RegExp("^" + r + "*," + r + "*"),
		rr = new RegExp("^" + r + "*([>+~]|" + r + ")" + r + "*"),
		ur = new RegExp("=" + r + "*([^\\]'\"]*?)" + r + "*\\]", "g"),
		fr = new RegExp(dt),
		yi = new RegExp("^" + tt + "$"),
		vt = {
			ID: new RegExp("^#(" + tt + ")"),
			CLASS: new RegExp("^\\.(" + tt + ")"),
			TAG: new RegExp("^(" + tt + "|[*])"),
			ATTR: new RegExp("^" + vi),
			PSEUDO: new RegExp("^" + dt),
			CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + r + "*(even|odd|(([+-]|)(\\d*)n|)" + r + "*(?:([+-]|)" + r + "*(\\d+)|))" + r + "*\\)|)", "i"),
			bool: new RegExp("^(?:" + kt + ")$", "i"),
			needsContext: new RegExp("^" + r + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + r + "*((?:-\\d)?\\d*)" + r + "*\\)|)(?=[^-]|$)", "i")
		},
		er = /^(?:input|select|textarea|button)$/i,
		or = /^h\d$/i,
		ot = /^[^{]+\{\s*\[native \w/,
		sr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
		gt = /[+~]/,
		hr = /'|\\/g,
		y = new RegExp("\\\\([\\da-f]{1,6}" + r + "?|(" + r + ")|.)", "ig"),
		p = function (n, t, i) {
			var r = "0x" + t - 65536;
			return r !== r || i ? t : 0 > r ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
		},
		pi = function () {
			b()
		};
		try {
			k.apply(g = ai.call(c.childNodes), c.childNodes);
			g[c.childNodes.length].nodeType
		} catch (yr) {
			k = {
				apply: g.length ? function (n, t) {
					nr.apply(n, ai.call(t))
				}
				 : function (n, t) {
					for (var i = n.length, r = 0; n[i++] = t[r++]; );
					n.length = i - 1
				}
			}
		}
		f = u.support = {};
		oi = u.isXML = function (n) {
			var t = n && (n.ownerDocument || n).documentElement;
			return t ? "HTML" !== t.nodeName : !1
		};
		b = u.setDocument = function (n) {
			var v,
			u,
			l = n ? n.ownerDocument || n : c;
			return l !== i && 9 === l.nodeType && l.documentElement ? (i = l, s = i.documentElement, h = !oi(i), (u = i.defaultView) && u.top !== u && (u.addEventListener ? u.addEventListener("unload", pi, !1) : u.attachEvent && u.attachEvent("onunload", pi)), f.attributes = a(function (n) {
						return n.className = "i",
						!n.getAttribute("className")
					}), f.getElementsByTagName = a(function (n) {
						return n.appendChild(i.createComment("")),
						!n.getElementsByTagName("*").length
					}), f.getElementsByClassName = ot.test(i.getElementsByClassName), f.getById = a(function (n) {
						return s.appendChild(n).id = e,
						!i.getElementsByName || !i.getElementsByName(e).length
					}), f.getById ? (t.find.ID = function (n, t) {
					if ("undefined" != typeof t.getElementById && h) {
						var i = t.getElementById(n);
						return i ? [i] : []
					}
				}, t.filter.ID = function (n) {
					var t = n.replace(y, p);
					return function (n) {
						return n.getAttribute("id") === t
					}
				}) : (delete t.find.ID, t.filter.ID = function (n) {
					var t = n.replace(y, p);
					return function (n) {
						var i = "undefined" != typeof n.getAttributeNode && n.getAttributeNode("id");
						return i && i.value === t
					}
				}), t.find.TAG = f.getElementsByTagName ? function (n, t) {
				return "undefined" != typeof t.getElementsByTagName ? t.getElementsByTagName(n) : f.qsa ? t.querySelectorAll(n) : void 0
			}
				 : function (n, t) {
				var i,
				r = [],
				f = 0,
				u = t.getElementsByTagName(n);
				if ("*" === n) {
					while (i = u[f++])
						1 === i.nodeType && r.push(i);
					return r
				}
				return u
			}, t.find.CLASS = f.getElementsByClassName && function (n, t) {
				if ("undefined" != typeof t.getElementsByClassName && h)
					return t.getElementsByClassName(n)
			}, d = [], o = [], (f.qsa = ot.test(i.querySelectorAll)) && (a(function (n) {
						s.appendChild(n).innerHTML = "<a id='" + e + "'><\/a><select id='" + e + "-\r\\' msallowcapture=''><option selected=''><\/option><\/select>";
						n.querySelectorAll("[msallowcapture^='']").length && o.push("[*^$]=" + r + "*(?:''|\"\")");
						n.querySelectorAll("[selected]").length || o.push("\\[" + r + "*(?:value|" + kt + ")");
						n.querySelectorAll("[id~=" + e + "-]").length || o.push("~=");
						n.querySelectorAll(":checked").length || o.push(":checked");
						n.querySelectorAll("a#" + e + "+*").length || o.push(".#.+[+~]")
					}), a(function (n) {
						var t = i.createElement("input");
						t.setAttribute("type", "hidden");
						n.appendChild(t).setAttribute("name", "D");
						n.querySelectorAll("[name=d]").length && o.push("name" + r + "*[*^$|!~]?=");
						n.querySelectorAll(":enabled").length || o.push(":enabled", ":disabled");
						n.querySelectorAll("*,:x");
						o.push(",.*:")
					})), (f.matchesSelector = ot.test(ct = s.matches || s.webkitMatchesSelector || s.mozMatchesSelector || s.oMatchesSelector || s.msMatchesSelector)) && a(function (n) {
					f.disconnectedMatch = ct.call(n, "div");
					ct.call(n, "[s!='']:x");
					d.push("!=", dt)
				}), o = o.length && new RegExp(o.join("|")), d = d.length && new RegExp(d.join("|")), v = ot.test(s.compareDocumentPosition), et = v || ot.test(s.contains) ? function (n, t) {
				var r = 9 === n.nodeType ? n.documentElement : n,
				i = t && t.parentNode;
				return n === i || !(!i || 1 !== i.nodeType || !(r.contains ? r.contains(i) : n.compareDocumentPosition && 16 & n.compareDocumentPosition(i)))
			}
				 : function (n, t) {
				if (t)
					while (t = t.parentNode)
						if (t === n)
							return !0;
				return !1
			}, bt = v ? function (n, t) {
				if (n === t)
					return ut = !0, 0;
				var r = !n.compareDocumentPosition - !t.compareDocumentPosition;
				return r ? r : (r = (n.ownerDocument || n) === (t.ownerDocument || t) ? n.compareDocumentPosition(t) : 1, 1 & r || !f.sortDetached && t.compareDocumentPosition(n) === r ? n === i || n.ownerDocument === c && et(c, n) ? -1 : t === i || t.ownerDocument === c && et(c, t) ? 1 : w ? nt(w, n) - nt(w, t) : 0 : 4 & r ? -1 : 1)
			}
				 : function (n, t) {
				if (n === t)
					return ut = !0, 0;
				var r,
				u = 0,
				o = n.parentNode,
				s = t.parentNode,
				f = [n],
				e = [t];
				if (!o || !s)
					return n === i ? -1 : t === i ? 1 : o ? -1 : s ? 1 : w ? nt(w, n) - nt(w, t) : 0;
				if (o === s)
					return wi(n, t);
				for (r = n; r = r.parentNode; )
					f.unshift(r);
				for (r = t; r = r.parentNode; )
					e.unshift(r);
				while (f[u] === e[u])
					u++;
				return u ? wi(f[u], e[u]) : f[u] === c ? -1 : e[u] === c ? 1 : 0
			}, i) : i
		};
		u.matches = function (n, t) {
			return u(n, null, null, t)
		};
		u.matchesSelector = function (n, t) {
			if ((n.ownerDocument || n) !== i && b(n), t = t.replace(ur, "='$1']"), f.matchesSelector && h && !lt[t + " "] && (!d || !d.test(t)) && (!o || !o.test(t)))
				try {
					var r = ct.call(n, t);
					if (r || f.disconnectedMatch || n.document && 11 !== n.document.nodeType)
						return r
				} catch (e) {}
			return u(t, i, null, [n]).length > 0
		};
		u.contains = function (n, t) {
			return (n.ownerDocument || n) !== i && b(n),
			et(n, t)
		};
		u.attr = function (n, r) {
			(n.ownerDocument || n) !== i && b(n);
			var e = t.attrHandle[r.toLowerCase()],
			u = e && di.call(t.attrHandle, r.toLowerCase()) ? e(n, r, !h) : void 0;
			return void 0 !== u ? u : f.attributes || !h ? n.getAttribute(r) : (u = n.getAttributeNode(r)) && u.specified ? u.value : null
		};
		u.error = function (n) {
			throw new Error("Syntax error, unrecognized expression: " + n);
		};
		u.uniqueSort = function (n) {
			var r,
			u = [],
			t = 0,
			i = 0;
			if (ut = !f.detectDuplicates, w = !f.sortStable && n.slice(0), n.sort(bt), ut) {
				while (r = n[i++])
					r === n[i] && (t = u.push(i));
				while (t--)
					n.splice(u[t], 1)
			}
			return w = null,
			n
		};
		st = u.getText = function (n) {
			var r,
			i = "",
			u = 0,
			t = n.nodeType;
			if (t) {
				if (1 === t || 9 === t || 11 === t) {
					if ("string" == typeof n.textContent)
						return n.textContent;
					for (n = n.firstChild; n; n = n.nextSibling)
						i += st(n)
				} else if (3 === t || 4 === t)
					return n.nodeValue
			} else
				while (r = n[u++])
					i += st(r);
			return i
		};
		t = u.selectors = {
			cacheLength: 50,
			createPseudo: l,
			match: vt,
			attrHandle: {},
			find: {},
			relative: {
				">": {
					dir: "parentNode",
					first: !0
				},
				" ": {
					dir: "parentNode"
				},
				"+": {
					dir: "previousSibling",
					first: !0
				},
				"~": {
					dir: "previousSibling"
				}
			},
			preFilter: {
				ATTR: function (n) {
					return n[1] = n[1].replace(y, p),
					n[3] = (n[3] || n[4] || n[5] || "").replace(y, p),
					"~=" === n[2] && (n[3] = " " + n[3] + " "),
					n.slice(0, 4)
				},
				CHILD: function (n) {
					return n[1] = n[1].toLowerCase(),
					"nth" === n[1].slice(0, 3) ? (n[3] || u.error(n[0]), n[4] =  + (n[4] ? n[5] + (n[6] || 1) : 2 * ("even" === n[3] || "odd" === n[3])), n[5] =  + (n[7] + n[8] || "odd" === n[3])) : n[3] && u.error(n[0]),
					n
				},
				PSEUDO: function (n) {
					var i,
					t = !n[6] && n[2];
					return vt.CHILD.test(n[0]) ? null : (n[3] ? n[2] = n[4] || n[5] || "" : t && fr.test(t) && (i = ft(t, !0)) && (i = t.indexOf(")", t.length - i) - t.length) && (n[0] = n[0].slice(0, i), n[2] = t.slice(0, i)), n.slice(0, 3))
				}
			},
			filter: {
				TAG: function (n) {
					var t = n.replace(y, p).toLowerCase();
					return "*" === n ? function () {
						return !0
					}
					 : function (n) {
						return n.nodeName && n.nodeName.toLowerCase() === t
					}
				},
				CLASS: function (n) {
					var t = hi[n + " "];
					return t || (t = new RegExp("(^|" + r + ")" + n + "(" + r + "|$)")) && hi(n, function (n) {
						return t.test("string" == typeof n.className && n.className || "undefined" != typeof n.getAttribute && n.getAttribute("class") || "")
					})
				},
				ATTR: function (n, t, i) {
					return function (r) {
						var f = u.attr(r, n);
						return null == f ? "!=" === t : t ? (f += "", "=" === t ? f === i : "!=" === t ? f !== i : "^=" === t ? i && 0 === f.indexOf(i) : "*=" === t ? i && f.indexOf(i) > -1 : "$=" === t ? i && f.slice(-i.length) === i : "~=" === t ? (" " + f.replace(tr, " ") + " ").indexOf(i) > -1 : "|=" === t ? f === i || f.slice(0, i.length + 1) === i + "-" : !1) : !0
					}
				},
				CHILD: function (n, t, i, r, u) {
					var s = "nth" !== n.slice(0, 3),
					o = "last" !== n.slice(-4),
					f = "of-type" === t;
					return 1 === r && 0 === u ? function (n) {
						return !!n.parentNode
					}
					 : function (t, i, h) {
						var p,
						w,
						y,
						c,
						a,
						b,
						k = s !== o ? "nextSibling" : "previousSibling",
						d = t.parentNode,
						nt = f && t.nodeName.toLowerCase(),
						g = !h && !f,
						l = !1;
						if (d) {
							if (s) {
								while (k) {
									for (c = t; c = c[k]; )
										if (f ? c.nodeName.toLowerCase() === nt : 1 === c.nodeType)
											return !1;
									b = k = "only" === n && !b && "nextSibling"
								}
								return !0
							}
							if (b = [o ? d.firstChild : d.lastChild], o && g) {
								for (c = d, y = c[e] || (c[e] = {}), w = y[c.uniqueID] || (y[c.uniqueID] = {}), p = w[n] || [], a = p[0] === v && p[1], l = a && p[2], c = a && d.childNodes[a]; c = ++a && c && c[k] || (l = a = 0) || b.pop(); )
									if (1 === c.nodeType && ++l && c === t) {
										w[n] = [v, a, l];
										break
									}
							} else if (g && (c = t, y = c[e] || (c[e] = {}), w = y[c.uniqueID] || (y[c.uniqueID] = {}), p = w[n] || [], a = p[0] === v && p[1], l = a), l === !1)
								while (c = ++a && c && c[k] || (l = a = 0) || b.pop())
									if ((f ? c.nodeName.toLowerCase() === nt : 1 === c.nodeType) && ++l && (g && (y = c[e] || (c[e] = {}), w = y[c.uniqueID] || (y[c.uniqueID] = {}), w[n] = [v, l]), c === t))
										break;
							return l -= u,
							l === r || l % r == 0 && l / r >= 0
						}
					}
				},
				PSEUDO: function (n, i) {
					var f,
					r = t.pseudos[n] || t.setFilters[n.toLowerCase()] || u.error("unsupported pseudo: " + n);
					return r[e] ? r(i) : r.length > 1 ? (f = [n, n, "", i], t.setFilters.hasOwnProperty(n.toLowerCase()) ? l(function (n, t) {
							for (var u, f = r(n, i), e = f.length; e--; )
								u = nt(n, f[e]), n[u] = !(t[u] = f[e])
						}) : function (n) {
						return r(n, 0, f)
					}) : r
				}
			},
			pseudos: {
				not: l(function (n) {
					var t = [],
					r = [],
					i = wt(n.replace(at, "$1"));
					return i[e] ? l(function (n, t, r, u) {
						for (var e, o = i(n, null, u, []), f = n.length; f--; )
							(e = o[f]) && (n[f] = !(t[f] = e))
					}) : function (n, u, f) {
						return t[0] = n,
						i(t, null, f, r),
						t[0] = null,
						!r.pop()
					}
				}),
				has: l(function (n) {
					return function (t) {
						return u(n, t).length > 0
					}
				}),
				contains: l(function (n) {
					return n = n.replace(y, p),
					function (t) {
						return (t.textContent || t.innerText || st(t)).indexOf(n) > -1
					}
				}),
				lang: l(function (n) {
					return yi.test(n || "") || u.error("unsupported lang: " + n),
					n = n.replace(y, p).toLowerCase(),
					function (t) {
						var i;
						do
							if (i = h ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
								return i = i.toLowerCase(), i === n || 0 === i.indexOf(n + "-");
						while ((t = t.parentNode) && 1 === t.nodeType);
						return !1
					}
				}),
				target: function (t) {
					var i = n.location && n.location.hash;
					return i && i.slice(1) === t.id
				},
				root: function (n) {
					return n === s
				},
				focus: function (n) {
					return n === i.activeElement && (!i.hasFocus || i.hasFocus()) && !!(n.type || n.href || ~n.tabIndex)
				},
				enabled: function (n) {
					return n.disabled === !1
				},
				disabled: function (n) {
					return n.disabled === !0
				},
				checked: function (n) {
					var t = n.nodeName.toLowerCase();
					return "input" === t && !!n.checked || "option" === t && !!n.selected
				},
				selected: function (n) {
					return n.parentNode && n.parentNode.selectedIndex,
					n.selected === !0
				},
				empty: function (n) {
					for (n = n.firstChild; n; n = n.nextSibling)
						if (n.nodeType < 6)
							return !1;
					return !0
				},
				parent: function (n) {
					return !t.pseudos.empty(n)
				},
				header: function (n) {
					return or.test(n.nodeName)
				},
				input: function (n) {
					return er.test(n.nodeName)
				},
				button: function (n) {
					var t = n.nodeName.toLowerCase();
					return "input" === t && "button" === n.type || "button" === t
				},
				text: function (n) {
					var t;
					return "input" === n.nodeName.toLowerCase() && "text" === n.type && (null == (t = n.getAttribute("type")) || "text" === t.toLowerCase())
				},
				first: it(function () {
					return [0]
				}),
				last: it(function (n, t) {
					return [t - 1]
				}),
				eq: it(function (n, t, i) {
					return [0 > i ? i + t : i]
				}),
				even: it(function (n, t) {
					for (var i = 0; t > i; i += 2)
						n.push(i);
					return n
				}),
				odd: it(function (n, t) {
					for (var i = 1; t > i; i += 2)
						n.push(i);
					return n
				}),
				lt: it(function (n, t, i) {
					for (var r = 0 > i ? i + t : i; --r >= 0; )
						n.push(r);
					return n
				}),
				gt: it(function (n, t, i) {
					for (var r = 0 > i ? i + t : i; ++r < t; )
						n.push(r);
					return n
				})
			}
		};
		t.pseudos.nth = t.pseudos.eq;
		for (rt in {
			radio: !0,
			checkbox: !0,
			file: !0,
			password: !0,
			image: !0
		})
			t.pseudos[rt] = cr(rt);
		for (rt in {
			submit: !0,
			reset: !0
		})
			t.pseudos[rt] = lr(rt);
		return bi.prototype = t.filters = t.pseudos,
		t.setFilters = new bi,
		ft = u.tokenize = function (n, i) {
			var e,
			f,
			s,
			o,
			r,
			h,
			c,
			l = ci[n + " "];
			if (l)
				return i ? 0 : l.slice(0);
			for (r = n, h = [], c = t.preFilter; r; ) {
				(!e || (f = ir.exec(r))) && (f && (r = r.slice(f[0].length) || r), h.push(s = []));
				e = !1;
				(f = rr.exec(r)) && (e = f.shift(), s.push({
						value: e,
						type: f[0].replace(at, " ")
					}), r = r.slice(e.length));
				for (o in t.filter)
					(f = vt[o].exec(r)) && (!c[o] || (f = c[o](f))) && (e = f.shift(), s.push({
							value: e,
							type: o,
							matches: f
						}), r = r.slice(e.length));
				if (!e)
					break
			}
			return i ? r.length : r ? u.error(n) : ci(n, h).slice(0)
		},
		wt = u.compile = function (n, t) {
			var r,
			u = [],
			f = [],
			i = lt[n + " "];
			if (!i) {
				for (t || (t = ft(n)), r = t.length; r--; )
					i = ei(t[r]), i[e] ? u.push(i) : f.push(i);
				i = lt(n, vr(f, u));
				i.selector = n
			}
			return i
		},
		si = u.select = function (n, i, r, u) {
			var s,
			e,
			o,
			a,
			v,
			l = "function" == typeof n && n,
			c = !u && ft(n = l.selector || n);
			if (r = r || [], 1 === c.length) {
				if (e = c[0] = c[0].slice(0), e.length > 2 && "ID" === (o = e[0]).type && f.getById && 9 === i.nodeType && h && t.relative[e[1].type]) {
					if (i = (t.find.ID(o.matches[0].replace(y, p), i) || [])[0], !i)
						return r;
					l && (i = i.parentNode);
					n = n.slice(e.shift().value.length)
				}
				for (s = vt.needsContext.test(n) ? 0 : e.length; s--; ) {
					if (o = e[s], t.relative[a = o.type])
						break;
					if ((v = t.find[a]) && (u = v(o.matches[0].replace(y, p), gt.test(e[0].type) && ii(i.parentNode) || i))) {
						if (e.splice(s, 1), n = u.length && yt(e), !n)
							return k.apply(r, u), r;
						break
					}
				}
			}
			return (l || wt(n, c))(u, i, !h, r, !i || gt.test(n) && ii(i.parentNode) || i),
			r
		},
		f.sortStable = e.split("").sort(bt).join("") === e,
		f.detectDuplicates = !!ut,
		b(),
		f.sortDetached = a(function (n) {
				return 1 & n.compareDocumentPosition(i.createElement("div"))
			}),
		a(function (n) {
			return n.innerHTML = "<a href='#'><\/a>",
			"#" === n.firstChild.getAttribute("href")
		}) || ti("type|href|height|width", function (n, t, i) {
			if (!i)
				return n.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
		}),
		f.attributes && a(function (n) {
			return n.innerHTML = "<input/>",
			n.firstChild.setAttribute("value", ""),
			"" === n.firstChild.getAttribute("value")
		}) || ti("value", function (n, t, i) {
			if (!i && "input" === n.nodeName.toLowerCase())
				return n.defaultValue
		}),
		a(function (n) {
			return null == n.getAttribute("disabled")
		}) || ti(kt, function (n, t, i) {
			var r;
			if (!i)
				return n[t] === !0 ? t.toLowerCase() : (r = n.getAttributeNode(t)) && r.specified ? r.value : null
		}),
		u
	}
	(n);
	i.find = w;
	i.expr = w.selectors;
	i.expr[":"] = i.expr.pseudos;
	i.uniqueSort = i.unique = w.uniqueSort;
	i.text = w.getText;
	i.isXMLDoc = w.isXML;
	i.contains = w.contains;
	var it = function (n, t, r) {
		for (var u = [], f = void 0 !== r; (n = n[t]) && 9 !== n.nodeType; )
			if (1 === n.nodeType) {
				if (f && i(n).is(r))
					break;
				u.push(n)
			}
		return u
	},
	lr = function (n, t) {
		for (var i = []; n; n = n.nextSibling)
			1 === n.nodeType && n !== t && i.push(n);
		return i
	},
	ar = i.expr.match.needsContext,
	vr = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
	pe = /^.[^:#\[\.,]*$/;
	i.filter = function (n, t, r) {
		var u = t[0];
		return r && (n = ":not(" + n + ")"),
		1 === t.length && 1 === u.nodeType ? i.find.matchesSelector(u, n) ? [u] : [] : i.find.matches(n, i.grep(t, function (n) {
				return 1 === n.nodeType
			}))
	};
	i.fn.extend({
		find: function (n) {
			var t,
			r = [],
			u = this,
			f = u.length;
			if ("string" != typeof n)
				return this.pushStack(i(n).filter(function () {
						for (t = 0; f > t; t++)
							if (i.contains(u[t], this))
								return !0
					}));
			for (t = 0; f > t; t++)
				i.find(n, u[t], r);
			return r = this.pushStack(f > 1 ? i.unique(r) : r),
			r.selector = this.selector ? this.selector + " " + n : n,
			r
		},
		filter: function (n) {
			return this.pushStack(ri(this, n || [], !1))
		},
		not: function (n) {
			return this.pushStack(ri(this, n || [], !0))
		},
		is: function (n) {
			return !!ri(this, "string" == typeof n && ar.test(n) ? i(n) : n || [], !1).length
		}
	});
	yr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
	pr = i.fn.init = function (n, t, r) {
		var f,
		e;
		if (!n)
			return this;
		if (r = r || ui, "string" == typeof n) {
			if (f = "<" === n.charAt(0) && ">" === n.charAt(n.length - 1) && n.length >= 3 ? [null, n, null] : yr.exec(n), !f || !f[1] && t)
				return !t || t.jquery ? (t || r).find(n) : this.constructor(t).find(n);
			if (f[1]) {
				if (t = t instanceof i ? t[0] : t, i.merge(this, i.parseHTML(f[1], t && t.nodeType ? t.ownerDocument || t : u, !0)), vr.test(f[1]) && i.isPlainObject(t))
					for (f in t)
						i.isFunction(this[f]) ? this[f](t[f]) : this.attr(f, t[f]);
				return this
			}
			if (e = u.getElementById(f[2]), e && e.parentNode) {
				if (e.id !== f[2])
					return ui.find(n);
				this.length = 1;
				this[0] = e
			}
			return this.context = u,
			this.selector = n,
			this
		}
		return n.nodeType ? (this.context = this[0] = n, this.length = 1, this) : i.isFunction(n) ? "undefined" != typeof r.ready ? r.ready(n) : n(i) : (void 0 !== n.selector && (this.selector = n.selector, this.context = n.context), i.makeArray(n, this))
	};
	pr.prototype = i.fn;
	ui = i(u);
	wr = /^(?:parents|prev(?:Until|All))/;
	br = {
		children: !0,
		contents: !0,
		next: !0,
		prev: !0
	};
	i.fn.extend({
		has: function (n) {
			var t,
			r = i(n, this),
			u = r.length;
			return this.filter(function () {
				for (t = 0; u > t; t++)
					if (i.contains(this, r[t]))
						return !0
			})
		},
		closest: function (n, t) {
			for (var r, f = 0, o = this.length, u = [], e = ar.test(n) || "string" != typeof n ? i(n, t || this.context) : 0; o > f; f++)
				for (r = this[f]; r && r !== t; r = r.parentNode)
					if (r.nodeType < 11 && (e ? e.index(r) > -1 : 1 === r.nodeType && i.find.matchesSelector(r, n))) {
						u.push(r);
						break
					}
			return this.pushStack(u.length > 1 ? i.uniqueSort(u) : u)
		},
		index: function (n) {
			return n ? "string" == typeof n ? i.inArray(this[0], i(n)) : i.inArray(n.jquery ? n[0] : n, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
		},
		add: function (n, t) {
			return this.pushStack(i.uniqueSort(i.merge(this.get(), i(n, t))))
		},
		addBack: function (n) {
			return this.add(null == n ? this.prevObject : this.prevObject.filter(n))
		}
	});
	i.each({
		parent: function (n) {
			var t = n.parentNode;
			return t && 11 !== t.nodeType ? t : null
		},
		parents: function (n) {
			return it(n, "parentNode")
		},
		parentsUntil: function (n, t, i) {
			return it(n, "parentNode", i)
		},
		next: function (n) {
			return kr(n, "nextSibling")
		},
		prev: function (n) {
			return kr(n, "previousSibling")
		},
		nextAll: function (n) {
			return it(n, "nextSibling")
		},
		prevAll: function (n) {
			return it(n, "previousSibling")
		},
		nextUntil: function (n, t, i) {
			return it(n, "nextSibling", i)
		},
		prevUntil: function (n, t, i) {
			return it(n, "previousSibling", i)
		},
		siblings: function (n) {
			return lr((n.parentNode || {}).firstChild, n)
		},
		children: function (n) {
			return lr(n.firstChild)
		},
		contents: function (n) {
			return i.nodeName(n, "iframe") ? n.contentDocument || n.contentWindow.document : i.merge([], n.childNodes)
		}
	}, function (n, t) {
		i.fn[n] = function (r, u) {
			var f = i.map(this, t, r);
			return "Until" !== n.slice(-5) && (u = r),
			u && "string" == typeof u && (f = i.filter(u, f)),
			this.length > 1 && (br[n] || (f = i.uniqueSort(f)), wr.test(n) && (f = f.reverse())),
			this.pushStack(f)
		}
	});
	s = /\S+/g;
	i.Callbacks = function (n) {
		n = "string" == typeof n ? we(n) : i.extend({}, n);
		var e,
		r,
		h,
		f,
		t = [],
		o = [],
		u = -1,
		c = function () {
			for (f = n.once, h = e = !0; o.length; u = -1)
				for (r = o.shift(); ++u < t.length; )
					t[u].apply(r[0], r[1]) === !1 && n.stopOnFalse && (u = t.length, r = !1);
			n.memory || (r = !1);
			e = !1;
			f && (t = r ? [] : "")
		},
		s = {
			add: function () {
				return t && (r && !e && (u = t.length - 1, o.push(r)), function f(r) {
					i.each(r, function (r, u) {
						i.isFunction(u) ? n.unique && s.has(u) || t.push(u) : u && u.length && "string" !== i.type(u) && f(u)
					})
				}
					(arguments), r && !e && c()),
				this
			},
			remove: function () {
				return i.each(arguments, function (n, r) {
					for (var f; (f = i.inArray(r, t, f)) > -1; )
						t.splice(f, 1), u >= f && u--
				}),
				this
			},
			has: function (n) {
				return n ? i.inArray(n, t) > -1 : t.length > 0
			},
			empty: function () {
				return t && (t = []),
				this
			},
			disable: function () {
				return f = o = [],
				t = r = "",
				this
			},
			disabled: function () {
				return !t
			},
			lock: function () {
				return f = !0,
				r || s.disable(),
				this
			},
			locked: function () {
				return !!f
			},
			fireWith: function (n, t) {
				return f || (t = t || [], t = [n, t.slice ? t.slice() : t], o.push(t), e || c()),
				this
			},
			fire: function () {
				return s.fireWith(this, arguments),
				this
			},
			fired: function () {
				return !!h
			}
		};
		return s
	};
	i.extend({
		Deferred: function (n) {
			var u = [["resolve", "done", i.Callbacks("once memory"), "resolved"], ["reject", "fail", i.Callbacks("once memory"), "rejected"], ["notify", "progress", i.Callbacks("memory")]],
			f = "pending",
			r = {
				state: function () {
					return f
				},
				always: function () {
					return t.done(arguments).fail(arguments),
					this
				},
				then: function () {
					var n = arguments;
					return i.Deferred(function (f) {
						i.each(u, function (u, e) {
							var o = i.isFunction(n[u]) && n[u];
							t[e[1]](function () {
								var n = o && o.apply(this, arguments);
								n && i.isFunction(n.promise) ? n.promise().progress(f.notify).done(f.resolve).fail(f.reject) : f[e[0] + "With"](this === r ? f.promise() : this, o ? [n] : arguments)
							})
						});
						n = null
					}).promise()
				},
				promise: function (n) {
					return null != n ? i.extend(n, r) : r
				}
			},
			t = {};
			return r.pipe = r.then,
			i.each(u, function (n, i) {
				var e = i[2],
				o = i[3];
				r[i[1]] = e.add;
				o && e.add(function () {
					f = o
				}, u[1 ^ n][2].disable, u[2][2].lock);
				t[i[0]] = function () {
					return t[i[0] + "With"](this === t ? r : this, arguments),
					this
				};
				t[i[0] + "With"] = e.fireWith
			}),
			r.promise(t),
			n && n.call(t, t),
			t
		},
		when: function (n) {
			var t = 0,
			u = a.call(arguments),
			r = u.length,
			e = 1 !== r || n && i.isFunction(n.promise) ? r : 0,
			f = 1 === e ? n : i.Deferred(),
			h = function (n, t, i) {
				return function (r) {
					t[n] = this;
					i[n] = arguments.length > 1 ? a.call(arguments) : r;
					i === o ? f.notifyWith(t, i) : --e || f.resolveWith(t, i)
				}
			},
			o,
			c,
			s;
			if (r > 1)
				for (o = new Array(r), c = new Array(r), s = new Array(r); r > t; t++)
					u[t] && i.isFunction(u[t].promise) ? u[t].promise().progress(h(t, c, o)).done(h(t, s, u)).fail(f.reject) : --e;
			return e || f.resolveWith(s, u),
			f.promise()
		}
	});
	i.fn.ready = function (n) {
		return i.ready.promise().done(n),
		this
	};
	i.extend({
		isReady: !1,
		readyWait: 1,
		holdReady: function (n) {
			n ? i.readyWait++ : i.ready(!0)
		},
		ready: function (n) {
			(n === !0 ? --i.readyWait : i.isReady) || (i.isReady = !0, n !== !0 && --i.readyWait > 0 || (at.resolveWith(u, [i]), i.fn.triggerHandler && (i(u).triggerHandler("ready"), i(u).off("ready"))))
		}
	});
	i.ready.promise = function (t) {
		if (!at)
			if (at = i.Deferred(), "complete" !== u.readyState && ("loading" === u.readyState || u.documentElement.doScroll))
				if (u.addEventListener)
					u.addEventListener("DOMContentLoaded", v), n.addEventListener("load", v);
				else {
					u.attachEvent("onreadystatechange", v);
					n.attachEvent("onload", v);
					var r = !1;
					try {
						r = null == n.frameElement && u.documentElement
					} catch (e) {}
					r && r.doScroll && !function f() {
						if (!i.isReady) {
							try {
								r.doScroll("left")
							} catch (t) {
								return n.setTimeout(f, 50)
							}
							dr();
							i.ready()
						}
					}
					()
				}
			else
				n.setTimeout(i.ready);
		return at.promise(t)
	};
	i.ready.promise();
	for (gr in i(r))
		break;
	r.ownFirst = "0" === gr;
	r.inlineBlockNeedsLayout = !1;
	i(function () {
		var f,
		t,
		n,
		i;
		n = u.getElementsByTagName("body")[0];
		n && n.style && (t = u.createElement("div"), i = u.createElement("div"), i.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", n.appendChild(i).appendChild(t), "undefined" != typeof t.style.zoom && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1", r.inlineBlockNeedsLayout = f = 3 === t.offsetWidth, f && (n.style.zoom = 1)), n.removeChild(i))
	}),
	function () {
		var n = u.createElement("div");
		r.deleteExpando = !0;
		try {
			delete n.test
		} catch (t) {
			r.deleteExpando = !1
		}
		n = null
	}
	();
	var ot = function (n) {
		var t = i.noData[(n.nodeName + " ").toLowerCase()],
		r = +n.nodeType || 1;
		return 1 !== r && 9 !== r ? !1 : !t || t !== !0 && n.getAttribute("classid") === t
	},
	be = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	ke = /([A-Z])/g;
	i.extend({
		cache: {},
		noData: {
			"applet ": !0,
			"embed ": !0,
			"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
		},
		hasData: function (n) {
			return n = n.nodeType ? i.cache[n[i.expando]] : n[i.expando],
			!!n && !fi(n)
		},
		data: function (n, t, i) {
			return tu(n, t, i)
		},
		removeData: function (n, t) {
			return iu(n, t)
		},
		_data: function (n, t, i) {
			return tu(n, t, i, !0)
		},
		_removeData: function (n, t) {
			return iu(n, t, !0)
		}
	});
	i.fn.extend({
		data: function (n, t) {
			var f,
			u,
			e,
			r = this[0],
			o = r && r.attributes;
			if (void 0 === n) {
				if (this.length && (e = i.data(r), 1 === r.nodeType && !i._data(r, "parsedAttrs"))) {
					for (f = o.length; f--; )
						o[f] && (u = o[f].name, 0 === u.indexOf("data-") && (u = i.camelCase(u.slice(5)), nu(r, u, e[u])));
					i._data(r, "parsedAttrs", !0)
				}
				return e
			}
			return "object" == typeof n ? this.each(function () {
				i.data(this, n)
			}) : arguments.length > 1 ? this.each(function () {
				i.data(this, n, t)
			}) : r ? nu(r, n, i.data(r, n)) : void 0
		},
		removeData: function (n) {
			return this.each(function () {
				i.removeData(this, n)
			})
		}
	});
	i.extend({
		queue: function (n, t, r) {
			var u;
			if (n)
				return (t = (t || "fx") + "queue", u = i._data(n, t), r && (!u || i.isArray(r) ? u = i._data(n, t, i.makeArray(r)) : u.push(r)), u || [])
		},
		dequeue: function (n, t) {
			t = t || "fx";
			var r = i.queue(n, t),
			e = r.length,
			u = r.shift(),
			f = i._queueHooks(n, t),
			o = function () {
				i.dequeue(n, t)
			};
			"inprogress" === u && (u = r.shift(), e--);
			u && ("fx" === t && r.unshift("inprogress"), delete f.stop, u.call(n, o, f));
			!e && f && f.empty.fire()
		},
		_queueHooks: function (n, t) {
			var r = t + "queueHooks";
			return i._data(n, r) || i._data(n, r, {
				empty: i.Callbacks("once memory").add(function () {
					i._removeData(n, t + "queue");
					i._removeData(n, r)
				})
			})
		}
	});
	i.fn.extend({
		queue: function (n, t) {
			var r = 2;
			return "string" != typeof n && (t = n, n = "fx", r--),
			arguments.length < r ? i.queue(this[0], n) : void 0 === t ? this : this.each(function () {
				var r = i.queue(this, n, t);
				i._queueHooks(this, n);
				"fx" === n && "inprogress" !== r[0] && i.dequeue(this, n)
			})
		},
		dequeue: function (n) {
			return this.each(function () {
				i.dequeue(this, n)
			})
		},
		clearQueue: function (n) {
			return this.queue(n || "fx", [])
		},
		promise: function (n, t) {
			var r,
			f = 1,
			e = i.Deferred(),
			u = this,
			o = this.length,
			s = function () {
				--f || e.resolveWith(u, [u])
			};
			for ("string" != typeof n && (t = n, n = void 0), n = n || "fx"; o--; )
				r = i._data(u[o], n + "queueHooks"), r && r.empty && (f++, r.empty.add(s));
			return s(),
			e.promise(t)
		}
	}),
	function () {
		var n;
		r.shrinkWrapBlocks = function () {
			if (null != n)
				return n;
			n = !1;
			var t,
			i,
			r;
			return i = u.getElementsByTagName("body")[0],
			i && i.style ? (t = u.createElement("div"), r = u.createElement("div"), r.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px", i.appendChild(r).appendChild(t), "undefined" != typeof t.style.zoom && (t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1", t.appendChild(u.createElement("div")).style.width = "5px", n = 3 !== t.offsetWidth), i.removeChild(r), n) : void 0
		}
	}
	();
	var ei = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
	oi = new RegExp("^(?:([+-])=|)(" + ei + ")([a-z%]*)$", "i"),
	b = ["Top", "Right", "Bottom", "Left"],
	st = function (n, t) {
		return n = t || n,
		"none" === i.css(n, "display") || !i.contains(n.ownerDocument, n)
	};
	var y = function (n, t, r, u, f, e, o) {
		var s = 0,
		c = n.length,
		h = null == r;
		if ("object" === i.type(r)) {
			f = !0;
			for (s in r)
				y(n, t, s, r[s], !0, e, o)
		} else if (void 0 !== u && (f = !0, i.isFunction(u) || (o = !0), h && (o ? (t.call(n, u), t = null) : (h = t, t = function (n, t, r) {
						return h.call(i(n), r)
					})), t))
			for (; c > s; s++)
				t(n[s], r, o ? u : u.call(n[s], s, t(n[s], r)));
		return f ? n : h ? t.call(n) : c ? t(n[0], r) : e
	},
	si = /^(?:checkbox|radio)$/i,
	uu = /<([\w:-]+)/,
	fu = /^$|\/(?:java|ecma)script/i,
	hi = /^\s+/,
	eu = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
	!function () {
		var n = u.createElement("div"),
		f = u.createDocumentFragment(),
		t = u.createElement("input");
		n.innerHTML = "  <link/><table><\/table><a href='/a'>a<\/a><input type='checkbox'/>";
		r.leadingWhitespace = 3 === n.firstChild.nodeType;
		r.tbody = !n.getElementsByTagName("tbody").length;
		r.htmlSerialize = !!n.getElementsByTagName("link").length;
		r.html5Clone = "<:nav><\/:nav>" !== u.createElement("nav").cloneNode(!0).outerHTML;
		t.type = "checkbox";
		t.checked = !0;
		f.appendChild(t);
		r.appendChecked = t.checked;
		n.innerHTML = "<textarea>x<\/textarea>";
		r.noCloneChecked = !!n.cloneNode(!0).lastChild.defaultValue;
		f.appendChild(n);
		t = u.createElement("input");
		t.setAttribute("type", "radio");
		t.setAttribute("checked", "checked");
		t.setAttribute("name", "t");
		n.appendChild(t);
		r.checkClone = n.cloneNode(!0).cloneNode(!0).lastChild.checked;
		r.noCloneEvent = !!n.addEventListener;
		n[i.expando] = 1;
		r.attributes = !n.getAttribute(i.expando)
	}
	();
	o = {
		option: [1, "<select multiple='multiple'>", "<\/select>"],
		legend: [1, "<fieldset>", "<\/fieldset>"],
		area: [1, "<map>", "<\/map>"],
		param: [1, "<object>", "<\/object>"],
		thead: [1, "<table>", "<\/table>"],
		tr: [2, "<table><tbody>", "<\/tbody><\/table>"],
		col: [2, "<table><tbody><\/tbody><colgroup>", "<\/colgroup><\/table>"],
		td: [3, "<table><tbody><tr>", "<\/tr><\/tbody><\/table>"],
		_default: r.htmlSerialize ? [0, "", ""] : [1, "X<div>", "<\/div>"]
	};
	o.optgroup = o.option;
	o.tbody = o.tfoot = o.colgroup = o.caption = o.thead;
	o.th = o.td;
	su = /<|&#?\w+;/;
	li = /<tbody/i;
	!function () {
		var t,
		i,
		f = u.createElement("div");
		for (t in {
			submit: !0,
			change: !0,
			focusin: !0
		})
			i = "on" + t, (r[t] = i in n) || (f.setAttribute(i, "t"), r[t] = f.attributes[i].expando === !1);
		f = null
	}
	();
	var ai = /^(?:input|select|textarea)$/i,
	ge = /^key/,
	no = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	cu = /^(?:focusinfocus|focusoutblur)$/,
	lu = /^([^.]*)(?:\.(.+)|)/;
	i.event = {
		global: {},
		add: function (n, t, r, u, f) {
			var p,
			v,
			w,
			y,
			o,
			h,
			c,
			l,
			e,
			b,
			k,
			a = i._data(n);
			if (a) {
				for (r.handler && (y = r, r = y.handler, f = y.selector), r.guid || (r.guid = i.guid++), (v = a.events) || (v = a.events = {}), (h = a.handle) || (h = a.handle = function (n) {
						if ("undefined" != typeof i && (!n || i.event.triggered !== n.type))
							return i.event.dispatch.apply(h.elem, arguments)
						}, h.elem = n), t = (t || "").match(s) || [""], w = t.length; w--; )p = lu.exec(t[w]) || [], e = k = p[1], b = (p[2] || "").split(".").sort(), e && (o = i.event.special[e] || {}, e = (f ? o.delegateType : o.bindType) || e, o = i.event.special[e] || {}, c = i.extend({
								type: e,
								origType: k,
								data: u,
								handler: r,
								guid: r.guid,
								selector: f,
								needsContext: f && i.expr.match.needsContext.test(f),
								namespace: b.join(".")
							}, y), (l = v[e]) || (l = v[e] = [], l.delegateCount = 0, o.setup && o.setup.call(n, u, b, h) !== !1 || (n.addEventListener ? n.addEventListener(e, h, !1) : n.attachEvent && n.attachEvent("on" + e, h))), o.add && (o.add.call(n, c), c.handler.guid || (c.handler.guid = r.guid)), f ? l.splice(l.delegateCount++, 0, c) : l.push(c), i.event.global[e] = !0);
				n = null
			}
		},
		remove: function (n, t, r, u, f) {
			var y,
			o,
			h,
			b,
			p,
			a,
			c,
			l,
			e,
			w,
			k,
			v = i.hasData(n) && i._data(n);
			if (v && (a = v.events)) {
				for (t = (t || "").match(s) || [""], p = t.length; p--; )
					if (h = lu.exec(t[p]) || [], e = k = h[1], w = (h[2] || "").split(".").sort(), e) {
						for (c = i.event.special[e] || {}, e = (u ? c.delegateType : c.bindType) || e, l = a[e] || [], h = h[2] && new RegExp("(^|\\.)" + w.join("\\.(?:.*\\.|)") + "(\\.|$)"), b = y = l.length; y--; )
							o = l[y], !f && k !== o.origType || r && r.guid !== o.guid || h && !h.test(o.namespace) || u && u !== o.selector && ("**" !== u || !o.selector) || (l.splice(y, 1), o.selector && l.delegateCount--, c.remove && c.remove.call(n, o));
						b && !l.length && (c.teardown && c.teardown.call(n, w, v.handle) !== !1 || i.removeEvent(n, e, v.handle), delete a[e])
					} else
						for (e in a)
							i.event.remove(n, e + t[p], r, u, !0);
				i.isEmptyObject(a) && (delete v.handle, i._removeData(n, "events"))
			}
		},
		trigger: function (t, r, f, e) {
			var l,
			a,
			o,
			p,
			c,
			h,
			w,
			y = [f || u],
			s = tt.call(t, "type") ? t.type : t,
			v = tt.call(t, "namespace") ? t.namespace.split(".") : [];
			if (o = h = f = f || u, 3 !== f.nodeType && 8 !== f.nodeType && !cu.test(s + i.event.triggered) && (s.indexOf(".") > -1 && (v = s.split("."), s = v.shift(), v.sort()), a = s.indexOf(":") < 0 && "on" + s, t = t[i.expando] ? t : new i.Event(s, "object" == typeof t && t), t.isTrigger = e ? 2 : 3, t.namespace = v.join("."), t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + v.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, t.result = void 0, t.target || (t.target = f), r = null == r ? [t] : i.makeArray(r, [t]), c = i.event.special[s] || {}, e || !c.trigger || c.trigger.apply(f, r) !== !1)) {
				if (!e && !c.noBubble && !i.isWindow(f)) {
					for (p = c.delegateType || s, cu.test(p + s) || (o = o.parentNode); o; o = o.parentNode)
						y.push(o), h = o;
					h === (f.ownerDocument || u) && y.push(h.defaultView || h.parentWindow || n)
				}
				for (w = 0; (o = y[w++]) && !t.isPropagationStopped(); )
					t.type = w > 1 ? p : c.bindType || s, l = (i._data(o, "events") || {})[t.type] && i._data(o, "handle"), l && l.apply(o, r), l = a && o[a], l && l.apply && ot(o) && (t.result = l.apply(o, r), t.result === !1 && t.preventDefault());
				if (t.type = s, !e && !t.isDefaultPrevented() && (!c._default || c._default.apply(y.pop(), r) === !1) && ot(f) && a && f[s] && !i.isWindow(f)) {
					h = f[a];
					h && (f[a] = null);
					i.event.triggered = s;
					try {
						f[s]()
					} catch (b) {}
					i.event.triggered = void 0;
					h && (f[a] = h)
				}
				return t.result
			}
		},
		dispatch: function (n) {
			n = i.event.fix(n);
			var e,
			o,
			f,
			r,
			t,
			s = [],
			h = a.call(arguments),
			c = (i._data(this, "events") || {})[n.type] || [],
			u = i.event.special[n.type] || {};
			if (h[0] = n, n.delegateTarget = this, !u.preDispatch || u.preDispatch.call(this, n) !== !1) {
				for (s = i.event.handlers.call(this, n, c), e = 0; (r = s[e++]) && !n.isPropagationStopped(); )
					for (n.currentTarget = r.elem, o = 0; (t = r.handlers[o++]) && !n.isImmediatePropagationStopped(); )
						n.rnamespace && !n.rnamespace.test(t.namespace) || (n.handleObj = t, n.data = t.data, f = ((i.event.special[t.origType] || {}).handle || t.handler).apply(r.elem, h), void 0 !== f && (n.result = f) === !1 && (n.preventDefault(), n.stopPropagation()));
				return u.postDispatch && u.postDispatch.call(this, n),
				n.result
			}
		},
		handlers: function (n, t) {
			var e,
			u,
			f,
			o,
			h = [],
			s = t.delegateCount,
			r = n.target;
			if (s && r.nodeType && ("click" !== n.type || isNaN(n.button) || n.button < 1))
				for (; r != this; r = r.parentNode || this)
					if (1 === r.nodeType && (r.disabled !== !0 || "click" !== n.type)) {
						for (u = [], e = 0; s > e; e++)
							o = t[e], f = o.selector + " ", void 0 === u[f] && (u[f] = o.needsContext ? i(f, this).index(r) > -1 : i.find(f, this, null, [r]).length), u[f] && u.push(o);
						u.length && h.push({
							elem: r,
							handlers: u
						})
					}
			return s < t.length && h.push({
				elem: this,
				handlers: t.slice(s)
			}),
			h
		},
		fix: function (n) {
			if (n[i.expando])
				return n;
			var e,
			o,
			s,
			r = n.type,
			f = n,
			t = this.fixHooks[r];
			for (t || (this.fixHooks[r] = t = no.test(r) ? this.mouseHooks : ge.test(r) ? this.keyHooks : {}), s = t.props ? this.props.concat(t.props) : this.props, n = new i.Event(f), e = s.length; e--; )
				o = s[e], n[o] = f[o];
			return n.target || (n.target = f.srcElement || u),
			3 === n.target.nodeType && (n.target = n.target.parentNode),
			n.metaKey = !!n.metaKey,
			t.filter ? t.filter(n, f) : n
		},
		props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
		fixHooks: {},
		keyHooks: {
			props: "char charCode key keyCode".split(" "),
			filter: function (n, t) {
				return null == n.which && (n.which = null != t.charCode ? t.charCode : t.keyCode),
				n
			}
		},
		mouseHooks: {
			props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
			filter: function (n, t) {
				var i,
				e,
				r,
				f = t.button,
				o = t.fromElement;
				return null == n.pageX && null != t.clientX && (e = n.target.ownerDocument || u, r = e.documentElement, i = e.body, n.pageX = t.clientX + (r && r.scrollLeft || i && i.scrollLeft || 0) - (r && r.clientLeft || i && i.clientLeft || 0), n.pageY = t.clientY + (r && r.scrollTop || i && i.scrollTop || 0) - (r && r.clientTop || i && i.clientTop || 0)),
				!n.relatedTarget && o && (n.relatedTarget = o === n.target ? t.toElement : o),
				n.which || void 0 === f || (n.which = 1 & f ? 1 : 2 & f ? 3 : 4 & f ? 2 : 0),
				n
			}
		},
		special: {
			load: {
				noBubble: !0
			},
			focus: {
				trigger: function () {
					if (this !== au() && this.focus)
						try {
							return this.focus(),
							!1
						} catch (n) {}
				},
				delegateType: "focusin"
			},
			blur: {
				trigger: function () {
					if (this === au() && this.blur)
						return (this.blur(), !1)
				},
				delegateType: "focusout"
			},
			click: {
				trigger: function () {
					if (i.nodeName(this, "input") && "checkbox" === this.type && this.click)
						return (this.click(), !1)
				},
				_default: function (n) {
					return i.nodeName(n.target, "a")
				}
			},
			beforeunload: {
				postDispatch: function (n) {
					void 0 !== n.result && n.originalEvent && (n.originalEvent.returnValue = n.result)
				}
			}
		},
		simulate: function (n, t, r) {
			var u = i.extend(new i.Event, r, {
					type: n,
					isSimulated: !0
				});
			i.event.trigger(u, null, t);
			u.isDefaultPrevented() && r.preventDefault()
		}
	};
	i.removeEvent = u.removeEventListener ? function (n, t, i) {
		n.removeEventListener && n.removeEventListener(t, i)
	}
	 : function (n, t, i) {
		var r = "on" + t;
		n.detachEvent && ("undefined" == typeof n[r] && (n[r] = null), n.detachEvent(r, i))
	};
	i.Event = function (n, t) {
		return this instanceof i.Event ? (n && n.type ? (this.originalEvent = n, this.type = n.type, this.isDefaultPrevented = n.defaultPrevented || void 0 === n.defaultPrevented && n.returnValue === !1 ? vt : rt) : this.type = n, t && i.extend(this, t), this.timeStamp = n && n.timeStamp || i.now(), void(this[i.expando] = !0)) : new i.Event(n, t)
	};
	i.Event.prototype = {
		constructor: i.Event,
		isDefaultPrevented: rt,
		isPropagationStopped: rt,
		isImmediatePropagationStopped: rt,
		preventDefault: function () {
			var n = this.originalEvent;
			this.isDefaultPrevented = vt;
			n && (n.preventDefault ? n.preventDefault() : n.returnValue = !1)
		},
		stopPropagation: function () {
			var n = this.originalEvent;
			this.isPropagationStopped = vt;
			n && !this.isSimulated && (n.stopPropagation && n.stopPropagation(), n.cancelBubble = !0)
		},
		stopImmediatePropagation: function () {
			var n = this.originalEvent;
			this.isImmediatePropagationStopped = vt;
			n && n.stopImmediatePropagation && n.stopImmediatePropagation();
			this.stopPropagation()
		}
	};
	i.each({
		mouseenter: "mouseover",
		mouseleave: "mouseout",
		pointerenter: "pointerover",
		pointerleave: "pointerout"
	}, function (n, t) {
		i.event.special[n] = {
			delegateType: t,
			bindType: t,
			handle: function (n) {
				var u,
				f = this,
				r = n.relatedTarget,
				e = n.handleObj;
				return r && (r === f || i.contains(f, r)) || (n.type = e.origType, u = e.handler.apply(this, arguments), n.type = t),
				u
			}
		}
	});
	r.submit || (i.event.special.submit = {
			setup: function () {
				return i.nodeName(this, "form") ? !1 : void i.event.add(this, "click._submit keypress._submit", function (n) {
					var r = n.target,
					t = i.nodeName(r, "input") || i.nodeName(r, "button") ? i.prop(r, "form") : void 0;
					t && !i._data(t, "submit") && (i.event.add(t, "submit._submit", function (n) {
							n._submitBubble = !0
						}), i._data(t, "submit", !0))
				})
			},
			postDispatch: function (n) {
				n._submitBubble && (delete n._submitBubble, this.parentNode && !n.isTrigger && i.event.simulate("submit", this.parentNode, n))
			},
			teardown: function () {
				return i.nodeName(this, "form") ? !1 : void i.event.remove(this, "._submit")
			}
		});
	r.change || (i.event.special.change = {
			setup: function () {
				return ai.test(this.nodeName) ? ("checkbox" !== this.type && "radio" !== this.type || (i.event.add(this, "propertychange._change", function (n) {
							"checked" === n.originalEvent.propertyName && (this._justChanged = !0)
						}), i.event.add(this, "click._change", function (n) {
							this._justChanged && !n.isTrigger && (this._justChanged = !1);
							i.event.simulate("change", this, n)
						})), !1) : void i.event.add(this, "beforeactivate._change", function (n) {
					var t = n.target;
					ai.test(t.nodeName) && !i._data(t, "change") && (i.event.add(t, "change._change", function (n) {
							!this.parentNode || n.isSimulated || n.isTrigger || i.event.simulate("change", this.parentNode, n)
						}), i._data(t, "change", !0))
				})
			},
			handle: function (n) {
				var t = n.target;
				if (this !== t || n.isSimulated || n.isTrigger || "radio" !== t.type && "checkbox" !== t.type)
					return n.handleObj.handler.apply(this, arguments)
			},
			teardown: function () {
				return i.event.remove(this, "._change"),
				!ai.test(this.nodeName)
			}
		});
	r.focusin || i.each({
		focus: "focusin",
		blur: "focusout"
	}, function (n, t) {
		var r = function (n) {
			i.event.simulate(t, n.target, i.event.fix(n))
		};
		i.event.special[t] = {
			setup: function () {
				var u = this.ownerDocument || this,
				f = i._data(u, t);
				f || u.addEventListener(n, r, !0);
				i._data(u, t, (f || 0) + 1)
			},
			teardown: function () {
				var u = this.ownerDocument || this,
				f = i._data(u, t) - 1;
				f ? i._data(u, t, f) : (u.removeEventListener(n, r, !0), i._removeData(u, t))
			}
		}
	});
	i.fn.extend({
		on: function (n, t, i, r) {
			return vi(this, n, t, i, r)
		},
		one: function (n, t, i, r) {
			return vi(this, n, t, i, r, 1)
		},
		off: function (n, t, r) {
			var u,
			f;
			if (n && n.preventDefault && n.handleObj)
				return u = n.handleObj, i(n.delegateTarget).off(u.namespace ? u.origType + "." + u.namespace : u.origType, u.selector, u.handler), this;
			if ("object" == typeof n) {
				for (f in n)
					this.off(f, t, n[f]);
				return this
			}
			return t !== !1 && "function" != typeof t || (r = t, t = void 0),
			r === !1 && (r = rt),
			this.each(function () {
				i.event.remove(this, n, r, t)
			})
		},
		trigger: function (n, t) {
			return this.each(function () {
				i.event.trigger(n, t, this)
			})
		},
		triggerHandler: function (n, t) {
			var r = this[0];
			if (r)
				return i.event.trigger(n, t, r, !0)
		}
	});
	var to = / jQuery\d+="(?:null|\d+)"/g,
	vu = new RegExp("<(?:" + eu + ")[\\s/>]", "i"),
	io = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
	ro = /<script|<style|<link/i,
	uo = /checked\s*(?:[^=]|=\s*.checked.)/i,
	fo = /^true\/(.*)/,
	eo = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	oo = ou(u),
	yi = oo.appendChild(u.createElement("div"));
	i.extend({
		htmlPrefilter: function (n) {
			return n.replace(io, "<$1><\/$2>")
		},
		clone: function (n, t, u) {
			var e,
			c,
			s,
			o,
			h,
			l = i.contains(n.ownerDocument, n);
			if (r.html5Clone || i.isXMLDoc(n) || !vu.test("<" + n.nodeName + ">") ? s = n.cloneNode(!0) : (yi.innerHTML = n.outerHTML, yi.removeChild(s = yi.firstChild)), !(r.noCloneEvent && r.noCloneChecked || 1 !== n.nodeType && 11 !== n.nodeType || i.isXMLDoc(n)))
				for (e = f(s), h = f(n), o = 0; null != (c = h[o]); ++o)
					e[o] && so(c, e[o]);
			if (t)
				if (u)
					for (h = h || f(n), e = e || f(s), o = 0; null != (c = h[o]); o++)
						bu(c, e[o]);
				else
					bu(n, s);
			return e = f(s, "script"),
			e.length > 0 && ci(e, !l && f(n, "script")),
			e = h = c = null,
			s
		},
		cleanData: function (n, t) {
			for (var u, e, f, o, l = 0, s = i.expando, h = i.cache, a = r.attributes, v = i.event.special; null != (u = n[l]); l++)
				if ((t || ot(u)) && (f = u[s], o = f && h[f])) {
					if (o.events)
						for (e in o.events)
							v[e] ? i.event.remove(u, e) : i.removeEvent(u, e, o.handle);
					h[f] && (delete h[f], a || "undefined" == typeof u.removeAttribute ? u[s] = void 0 : u.removeAttribute(s), c.push(f))
				}
		}
	});
	i.fn.extend({
		domManip: k,
		detach: function (n) {
			return ku(this, n, !0)
		},
		remove: function (n) {
			return ku(this, n)
		},
		text: function (n) {
			return y(this, function (n) {
				return void 0 === n ? i.text(this) : this.empty().append((this[0] && this[0].ownerDocument || u).createTextNode(n))
			}, null, n, arguments.length)
		},
		append: function () {
			return k(this, arguments, function (n) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = yu(this, n);
					t.appendChild(n)
				}
			})
		},
		prepend: function () {
			return k(this, arguments, function (n) {
				if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
					var t = yu(this, n);
					t.insertBefore(n, t.firstChild)
				}
			})
		},
		before: function () {
			return k(this, arguments, function (n) {
				this.parentNode && this.parentNode.insertBefore(n, this)
			})
		},
		after: function () {
			return k(this, arguments, function (n) {
				this.parentNode && this.parentNode.insertBefore(n, this.nextSibling)
			})
		},
		empty: function () {
			for (var n, t = 0; null != (n = this[t]); t++) {
				for (1 === n.nodeType && i.cleanData(f(n, !1)); n.firstChild; )
					n.removeChild(n.firstChild);
				n.options && i.nodeName(n, "select") && (n.options.length = 0)
			}
			return this
		},
		clone: function (n, t) {
			return n = null == n ? !1 : n,
			t = null == t ? n : t,
			this.map(function () {
				return i.clone(this, n, t)
			})
		},
		html: function (n) {
			return y(this, function (n) {
				var t = this[0] || {},
				u = 0,
				e = this.length;
				if (void 0 === n)
					return 1 === t.nodeType ? t.innerHTML.replace(to, "") : void 0;
				if ("string" == typeof n && !ro.test(n) && (r.htmlSerialize || !vu.test(n)) && (r.leadingWhitespace || !hi.test(n)) && !o[(uu.exec(n) || ["", ""])[1].toLowerCase()]) {
					n = i.htmlPrefilter(n);
					try {
						for (; e > u; u++)
							t = this[u] || {},
						1 === t.nodeType && (i.cleanData(f(t, !1)), t.innerHTML = n);
						t = 0
					} catch (s) {}
				}
				t && this.empty().append(n)
			}, null, n, arguments.length)
		},
		replaceWith: function () {
			var n = [];
			return k(this, arguments, function (t) {
				var r = this.parentNode;
				i.inArray(this, n) < 0 && (i.cleanData(f(this)), r && r.replaceChild(t, this))
			}, n)
		}
	});
	i.each({
		appendTo: "append",
		prependTo: "prepend",
		insertBefore: "before",
		insertAfter: "after",
		replaceAll: "replaceWith"
	}, function (n, t) {
		i.fn[n] = function (n) {
			for (var u, r = 0, f = [], e = i(n), o = e.length - 1; o >= r; r++)
				u = r === o ? this : this.clone(!0), i(e[r])[t](u), ti.apply(f, u.get());
			return this.pushStack(f)
		}
	});
	pi = {
		HTML: "block",
		BODY: "block"
	};
	var gu = /^margin/,
	pt = new RegExp("^(" + ei + ")(?!px)[a-z%]+$", "i"),
	wi = function (n, t, i, r) {
		var f,
		u,
		e = {};
		for (u in t)
			e[u] = n.style[u], n.style[u] = t[u];
		f = i.apply(n, r || []);
		for (u in t)
			n.style[u] = e[u];
		return f
	},
	nf = u.documentElement;
	!function () {
		var f,
		s,
		h,
		e,
		c,
		l,
		o = u.createElement("div"),
		t = u.createElement("div");
		if (t.style) {
			t.style.cssText = "float:left;opacity:.5";
			r.opacity = "0.5" === t.style.opacity;
			r.cssFloat = !!t.style.cssFloat;
			t.style.backgroundClip = "content-box";
			t.cloneNode(!0).style.backgroundClip = "";
			r.clearCloneStyle = "content-box" === t.style.backgroundClip;
			o = u.createElement("div");
			o.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute";
			t.innerHTML = "";
			o.appendChild(t);
			r.boxSizing = "" === t.style.boxSizing || "" === t.style.MozBoxSizing || "" === t.style.WebkitBoxSizing;
			i.extend(r, {
				reliableHiddenOffsets: function () {
					return null == f && a(),
					e
				},
				boxSizingReliable: function () {
					return null == f && a(),
					h
				},
				pixelMarginRight: function () {
					return null == f && a(),
					s
				},
				pixelPosition: function () {
					return null == f && a(),
					f
				},
				reliableMarginRight: function () {
					return null == f && a(),
					c
				},
				reliableMarginLeft: function () {
					return null == f && a(),
					l
				}
			});
			function a() {
				var i,
				r,
				a = u.documentElement;
				a.appendChild(o);
				t.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%";
				f = h = l = !1;
				s = c = !0;
				n.getComputedStyle && (r = n.getComputedStyle(t), f = "1%" !== (r || {}).top, l = "2px" === (r || {}).marginLeft, h = "4px" === (r || {
							width: "4px"
						}).width, t.style.marginRight = "50%", s = "4px" === (r || {
							marginRight: "4px"
						}).marginRight, i = t.appendChild(u.createElement("div")), i.style.cssText = t.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0", i.style.marginRight = i.style.width = "0", t.style.width = "1px", c = !parseFloat((n.getComputedStyle(i) || {}).marginRight), t.removeChild(i));
				t.style.display = "none";
				e = 0 === t.getClientRects().length;
				e && (t.style.display = "", t.innerHTML = "<table><tr><td><\/td><td>t<\/td><\/tr><\/table>", t.childNodes[0].style.borderCollapse = "separate", i = t.getElementsByTagName("td"), i[0].style.cssText = "margin:0;border:0;padding:0;display:none", e = 0 === i[0].offsetHeight, e && (i[0].style.display = "", i[1].style.display = "none", e = 0 === i[0].offsetHeight));
				a.removeChild(o)
			}
		}
	}
	();
	tf = /^(top|right|bottom|left)$/;
	n.getComputedStyle ? (d = function (t) {
		var i = t.ownerDocument.defaultView;
		return i && i.opener || (i = n),
		i.getComputedStyle(t)
	}, p = function (n, t, u) {
		var o,
		s,
		h,
		f,
		e = n.style;
		return u = u || d(n),
		f = u ? u.getPropertyValue(t) || u[t] : void 0,
		"" !== f && void 0 !== f || i.contains(n.ownerDocument, n) || (f = i.style(n, t)),
		u && !r.pixelMarginRight() && pt.test(f) && gu.test(t) && (o = e.width, s = e.minWidth, h = e.maxWidth, e.minWidth = e.maxWidth = e.width = f, f = u.width, e.width = o, e.minWidth = s, e.maxWidth = h),
		void 0 === f ? f : f + ""
	}) : nf.currentStyle && (d = function (n) {
		return n.currentStyle
	}, p = function (n, t, i) {
		var o,
		f,
		e,
		r,
		u = n.style;
		return i = i || d(n),
		r = i ? i[t] : void 0,
		null == r && u && u[t] && (r = u[t]),
		pt.test(r) && !tf.test(t) && (o = u.left, f = n.runtimeStyle, e = f && f.left, e && (f.left = n.currentStyle.left), u.left = "fontSize" === t ? "1em" : r, r = u.pixelLeft + "px", u.left = o, e && (f.left = e)),
		void 0 === r ? r : r + "" || "auto"
	});
	var ki = /alpha\([^)]*\)/i,
	ho = /opacity\s*=\s*([^)]*)/i,
	co = /^(none|table(?!-c[ea]).+)/,
	lo = new RegExp("^(" + ei + ")(.*)$", "i"),
	ao = {
		position: "absolute",
		visibility: "hidden",
		display: "block"
	},
	rf = {
		letterSpacing: "0",
		fontWeight: "400"
	},
	uf = ["Webkit", "O", "Moz", "ms"],
	ff = u.createElement("div").style;
	i.extend({
		cssHooks: {
			opacity: {
				get: function (n, t) {
					if (t) {
						var i = p(n, "opacity");
						return "" === i ? "1" : i
					}
				}
			}
		},
		cssNumber: {
			animationIterationCount: !0,
			columnCount: !0,
			fillOpacity: !0,
			flexGrow: !0,
			flexShrink: !0,
			fontWeight: !0,
			lineHeight: !0,
			opacity: !0,
			order: !0,
			orphans: !0,
			widows: !0,
			zIndex: !0,
			zoom: !0
		},
		cssProps: {
			float: r.cssFloat ? "cssFloat" : "styleFloat"
		},
		style: function (n, t, u, f) {
			if (n && 3 !== n.nodeType && 8 !== n.nodeType && n.style) {
				var e,
				h,
				o,
				s = i.camelCase(t),
				c = n.style;
				if (t = i.cssProps[s] || (i.cssProps[s] = ef(s) || s), o = i.cssHooks[t] || i.cssHooks[s], void 0 === u)
					return o && "get" in o && void 0 !== (e = o.get(n, !1, f)) ? e : c[t];
				if (h = typeof u, "string" === h && (e = oi.exec(u)) && e[1] && (u = ru(n, t, e), h = "number"), null != u && u === u && ("number" === h && (u += e && e[3] || (i.cssNumber[s] ? "" : "px")), r.clearCloneStyle || "" !== u || 0 !== t.indexOf("background") || (c[t] = "inherit"), !(o && "set" in o && void 0 === (u = o.set(n, u, f)))))
					try {
						c[t] = u
					} catch (l) {}
			}
		},
		css: function (n, t, r, u) {
			var s,
			f,
			o,
			e = i.camelCase(t);
			return t = i.cssProps[e] || (i.cssProps[e] = ef(e) || e),
			o = i.cssHooks[t] || i.cssHooks[e],
			o && "get" in o && (f = o.get(n, !0, r)),
			void 0 === f && (f = p(n, t, u)),
			"normal" === f && t in rf && (f = rf[t]),
			"" === r || r ? (s = parseFloat(f), r === !0 || isFinite(s) ? s || 0 : f) : f
		}
	});
	i.each(["height", "width"], function (n, t) {
		i.cssHooks[t] = {
			get: function (n, r, u) {
				if (r)
					return co.test(i.css(n, "display")) && 0 === n.offsetWidth ? wi(n, ao, function () {
						return cf(n, t, u)
					}) : cf(n, t, u)
			},
			set: function (n, u, f) {
				var e = f && d(n);
				return sf(n, u, f ? hf(n, t, f, r.boxSizing && "border-box" === i.css(n, "boxSizing", !1, e), e) : 0)
			}
		}
	});
	r.opacity || (i.cssHooks.opacity = {
			get: function (n, t) {
				return ho.test((t && n.currentStyle ? n.currentStyle.filter : n.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
			},
			set: function (n, t) {
				var r = n.style,
				u = n.currentStyle,
				e = i.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : "",
				f = u && u.filter || r.filter || "";
				r.zoom = 1;
				(t >= 1 || "" === t) && "" === i.trim(f.replace(ki, "")) && r.removeAttribute && (r.removeAttribute("filter"), "" === t || u && !u.filter) || (r.filter = ki.test(f) ? f.replace(ki, e) : f + " " + e)
			}
		});
	i.cssHooks.marginRight = bi(r.reliableMarginRight, function (n, t) {
			if (t)
				return wi(n, {
					display: "inline-block"
				}, p, [n, "marginRight"])
		});
	i.cssHooks.marginLeft = bi(r.reliableMarginLeft, function (n, t) {
			if (t)
				return (parseFloat(p(n, "marginLeft")) || (i.contains(n.ownerDocument, n) ? n.getBoundingClientRect().left - wi(n, {
							marginLeft: 0
						}, function () {
							return n.getBoundingClientRect().left
						}) : 0)) + "px"
		});
	i.each({
		margin: "",
		padding: "",
		border: "Width"
	}, function (n, t) {
		i.cssHooks[n + t] = {
			expand: function (i) {
				for (var r = 0, f = {}, u = "string" == typeof i ? i.split(" ") : [i]; 4 > r; r++)
					f[n + b[r] + t] = u[r] || u[r - 2] || u[0];
				return f
			}
		};
		gu.test(n) || (i.cssHooks[n + t].set = sf)
	});
	i.fn.extend({
		css: function (n, t) {
			return y(this, function (n, t, r) {
				var f,
				e,
				o = {},
				u = 0;
				if (i.isArray(t)) {
					for (f = d(n), e = t.length; e > u; u++)
						o[t[u]] = i.css(n, t[u], !1, f);
					return o
				}
				return void 0 !== r ? i.style(n, t, r) : i.css(n, t)
			}, n, t, arguments.length > 1)
		},
		show: function () {
			return of(this, !0)
		},
		hide: function () {
			return of(this)
		},
		toggle: function (n) {
			return "boolean" == typeof n ? n ? this.show() : this.hide() : this.each(function () {
				st(this) ? i(this).show() : i(this).hide()
			})
		}
	});
	i.Tween = e;
	e.prototype = {
		constructor: e,
		init: function (n, t, r, u, f, e) {
			this.elem = n;
			this.prop = r;
			this.easing = f || i.easing._default;
			this.options = t;
			this.start = this.now = this.cur();
			this.end = u;
			this.unit = e || (i.cssNumber[r] ? "" : "px")
		},
		cur: function () {
			var n = e.propHooks[this.prop];
			return n && n.get ? n.get(this) : e.propHooks._default.get(this)
		},
		run: function (n) {
			var t,
			r = e.propHooks[this.prop];
			return this.pos = this.options.duration ? t = i.easing[this.easing](n, this.options.duration * n, 0, 1, this.options.duration) : t = n,
			this.now = (this.end - this.start) * t + this.start,
			this.options.step && this.options.step.call(this.elem, this.now, this),
			r && r.set ? r.set(this) : e.propHooks._default.set(this),
			this
		}
	};
	e.prototype.init.prototype = e.prototype;
	e.propHooks = {
		_default: {
			get: function (n) {
				var t;
				return 1 !== n.elem.nodeType || null != n.elem[n.prop] && null == n.elem.style[n.prop] ? n.elem[n.prop] : (t = i.css(n.elem, n.prop, ""), t && "auto" !== t ? t : 0)
			},
			set: function (n) {
				i.fx.step[n.prop] ? i.fx.step[n.prop](n) : 1 !== n.elem.nodeType || null == n.elem.style[i.cssProps[n.prop]] && !i.cssHooks[n.prop] ? n.elem[n.prop] = n.now : i.style(n.elem, n.prop, n.now + n.unit)
			}
		}
	};
	e.propHooks.scrollTop = e.propHooks.scrollLeft = {
		set: function (n) {
			n.elem.nodeType && n.elem.parentNode && (n.elem[n.prop] = n.now)
		}
	};
	i.easing = {
		linear: function (n) {
			return n
		},
		swing: function (n) {
			return .5 - Math.cos(n * Math.PI) / 2
		},
		_default: "swing"
	};
	i.fx = e.prototype.init;
	i.fx.step = {};
	lf = /^(?:toggle|show|hide)$/;
	af = /queueHooks$/;
	i.Animation = i.extend(h, {
			tweeners: {
				"*": [function (n, t) {
						var i = this.createTween(n, t);
						return ru(i.elem, n, oi.exec(t), i),
						i
					}
				]
			},
			tweener: function (n, t) {
				i.isFunction(n) ? (t = n, n = ["*"]) : n = n.match(s);
				for (var r, u = 0, f = n.length; f > u; u++)
					r = n[u], h.tweeners[r] = h.tweeners[r] || [], h.tweeners[r].unshift(t)
			},
			prefilters: [vo],
			prefilter: function (n, t) {
				t ? h.prefilters.unshift(n) : h.prefilters.push(n)
			}
		});
	i.speed = function (n, t, r) {
		var u = n && "object" == typeof n ? i.extend({}, n) : {
			complete: r || !r && t || i.isFunction(n) && n,
			duration: n,
			easing: r && t || t && !i.isFunction(t) && t
		};
		return u.duration = i.fx.off ? 0 : "number" == typeof u.duration ? u.duration : u.duration in i.fx.speeds ? i.fx.speeds[u.duration] : i.fx.speeds._default,
		null != u.queue && u.queue !== !0 || (u.queue = "fx"),
		u.old = u.complete,
		u.complete = function () {
			i.isFunction(u.old) && u.old.call(this);
			u.queue && i.dequeue(this, u.queue)
		},
		u
	};
	i.fn.extend({
		fadeTo: function (n, t, i, r) {
			return this.filter(st).css("opacity", 0).show().end().animate({
				opacity: t
			}, n, i, r)
		},
		animate: function (n, t, r, u) {
			var o = i.isEmptyObject(n),
			e = i.speed(t, r, u),
			f = function () {
				var t = h(this, i.extend({}, n), e);
				(o || i._data(this, "finish")) && t.stop(!0)
			};
			return f.finish = f,
			o || e.queue === !1 ? this.each(f) : this.queue(e.queue, f)
		},
		stop: function (n, t, r) {
			var u = function (n) {
				var t = n.stop;
				delete n.stop;
				t(r)
			};
			return "string" != typeof n && (r = t, t = n, n = void 0),
			t && n !== !1 && this.queue(n || "fx", []),
			this.each(function () {
				var o = !0,
				t = null != n && n + "queueHooks",
				e = i.timers,
				f = i._data(this);
				if (t)
					f[t] && f[t].stop && u(f[t]);
				else
					for (t in f)
						f[t] && f[t].stop && af.test(t) && u(f[t]);
				for (t = e.length; t--; )
					e[t].elem !== this || null != n && e[t].queue !== n || (e[t].anim.stop(r), o = !1, e.splice(t, 1));
				!o && r || i.dequeue(this, n)
			})
		},
		finish: function (n) {
			return n !== !1 && (n = n || "fx"),
			this.each(function () {
				var t,
				f = i._data(this),
				r = f[n + "queue"],
				e = f[n + "queueHooks"],
				u = i.timers,
				o = r ? r.length : 0;
				for (f.finish = !0, i.queue(this, n, []), e && e.stop && e.stop.call(this, !0), t = u.length; t--; )
					u[t].elem === this && u[t].queue === n && (u[t].anim.stop(!0), u.splice(t, 1));
				for (t = 0; o > t; t++)
					r[t] && r[t].finish && r[t].finish.call(this);
				delete f.finish
			})
		}
	});
	i.each(["toggle", "show", "hide"], function (n, t) {
		var r = i.fn[t];
		i.fn[t] = function (n, i, u) {
			return null == n || "boolean" == typeof n ? r.apply(this, arguments) : this.animate(bt(t, !0), n, i, u)
		}
	});
	i.each({
		slideDown: bt("show"),
		slideUp: bt("hide"),
		slideToggle: bt("toggle"),
		fadeIn: {
			opacity: "show"
		},
		fadeOut: {
			opacity: "hide"
		},
		fadeToggle: {
			opacity: "toggle"
		}
	}, function (n, t) {
		i.fn[n] = function (n, i, r) {
			return this.animate(t, n, i, r)
		}
	});
	i.timers = [];
	i.fx.tick = function () {
		var r,
		n = i.timers,
		t = 0;
		for (ut = i.now(); t < n.length; t++)
			r = n[t], r() || n[t] !== r || n.splice(t--, 1);
		n.length || i.fx.stop();
		ut = void 0
	};
	i.fx.timer = function (n) {
		i.timers.push(n);
		n() ? i.fx.start() : i.timers.pop()
	};
	i.fx.interval = 13;
	i.fx.start = function () {
		wt || (wt = n.setInterval(i.fx.tick, i.fx.interval))
	};
	i.fx.stop = function () {
		n.clearInterval(wt);
		wt = null
	};
	i.fx.speeds = {
		slow: 600,
		fast: 200,
		_default: 400
	};
	i.fn.delay = function (t, r) {
		return t = i.fx ? i.fx.speeds[t] || t : t,
		r = r || "fx",
		this.queue(r, function (i, r) {
			var u = n.setTimeout(i, t);
			r.stop = function () {
				n.clearTimeout(u)
			}
		})
	},
	function () {
		var i,
		n = u.createElement("input"),
		t = u.createElement("div"),
		f = u.createElement("select"),
		e = f.appendChild(u.createElement("option"));
		t = u.createElement("div");
		t.setAttribute("className", "t");
		t.innerHTML = "  <link/><table><\/table><a href='/a'>a<\/a><input type='checkbox'/>";
		i = t.getElementsByTagName("a")[0];
		n.setAttribute("type", "checkbox");
		t.appendChild(n);
		i = t.getElementsByTagName("a")[0];
		i.style.cssText = "top:1px";
		r.getSetAttribute = "t" !== t.className;
		r.style = /top/.test(i.getAttribute("style"));
		r.hrefNormalized = "/a" === i.getAttribute("href");
		r.checkOn = !!n.value;
		r.optSelected = e.selected;
		r.enctype = !!u.createElement("form").enctype;
		f.disabled = !0;
		r.optDisabled = !e.disabled;
		n = u.createElement("input");
		n.setAttribute("value", "");
		r.input = "" === n.getAttribute("value");
		n.value = "t";
		n.setAttribute("type", "radio");
		r.radioValue = "t" === n.value
	}
	();
	pf = /\r/g;
	wf = /[\x20\t\r\n\f]+/g;
	i.fn.extend({
		val: function (n) {
			var t,
			r,
			f,
			u = this[0];
			return arguments.length ? (f = i.isFunction(n), this.each(function (r) {
					var u;
					1 === this.nodeType && (u = f ? n.call(this, r, i(this).val()) : n, null == u ? u = "" : "number" == typeof u ? u += "" : i.isArray(u) && (u = i.map(u, function (n) {
										return null == n ? "" : n + ""
									})), t = i.valHooks[this.type] || i.valHooks[this.nodeName.toLowerCase()], t && "set" in t && void 0 !== t.set(this, u, "value") || (this.value = u))
				})) : u ? (t = i.valHooks[u.type] || i.valHooks[u.nodeName.toLowerCase()], t && "get" in t && void 0 !== (r = t.get(u, "value")) ? r : (r = u.value, "string" == typeof r ? r.replace(pf, "") : null == r ? "" : r)) : void 0
		}
	});
	i.extend({
		valHooks: {
			option: {
				get: function (n) {
					var t = i.find.attr(n, "value");
					return null != t ? t : i.trim(i.text(n)).replace(wf, " ")
				}
			},
			select: {
				get: function (n) {
					for (var o, t, s = n.options, u = n.selectedIndex, f = "select-one" === n.type || 0 > u, h = f ? null : [], c = f ? u + 1 : s.length, e = 0 > u ? c : f ? u : 0; c > e; e++)
						if (t = s[e], (t.selected || e === u) && (r.optDisabled ? !t.disabled : null === t.getAttribute("disabled")) && (!t.parentNode.disabled || !i.nodeName(t.parentNode, "optgroup"))) {
							if (o = i(t).val(), f)
								return o;
							h.push(o)
						}
					return h
				},
				set: function (n, t) {
					for (var f, r, u = n.options, o = i.makeArray(t), e = u.length; e--; )
						if (r = u[e], i.inArray(i.valHooks.option.get(r), o) > -1)
							try {
								r.selected = f = !0
							} catch (s) {
								r.scrollHeight
							}
						else
							r.selected = !1;
					return f || (n.selectedIndex = -1),
					u
				}
			}
		}
	});
	i.each(["radio", "checkbox"], function () {
		i.valHooks[this] = {
			set: function (n, t) {
				if (i.isArray(t))
					return n.checked = i.inArray(i(n).val(), t) > -1
			}
		};
		r.checkOn || (i.valHooks[this].get = function (n) {
			return null === n.getAttribute("value") ? "on" : n.value
		})
	});
	var ft,
	bf,
	l = i.expr.attrHandle,
	di = /^(?:checked|selected)$/i,
	g = r.getSetAttribute,
	kt = r.input;
	i.fn.extend({
		attr: function (n, t) {
			return y(this, i.attr, n, t, arguments.length > 1)
		},
		removeAttr: function (n) {
			return this.each(function () {
				i.removeAttr(this, n)
			})
		}
	});
	i.extend({
		attr: function (n, t, r) {
			var u,
			f,
			e = n.nodeType;
			if (3 !== e && 8 !== e && 2 !== e)
				return "undefined" == typeof n.getAttribute ? i.prop(n, t, r) : (1 === e && i.isXMLDoc(n) || (t = t.toLowerCase(), f = i.attrHooks[t] || (i.expr.match.bool.test(t) ? bf : ft)), void 0 !== r ? null === r ? void i.removeAttr(n, t) : f && "set" in f && void 0 !== (u = f.set(n, r, t)) ? u : (n.setAttribute(t, r + ""), r) : f && "get" in f && null !== (u = f.get(n, t)) ? u : (u = i.find.attr(n, t), null == u ? void 0 : u))
		},
		attrHooks: {
			type: {
				set: function (n, t) {
					if (!r.radioValue && "radio" === t && i.nodeName(n, "input")) {
						var u = n.value;
						return n.setAttribute("type", t),
						u && (n.value = u),
						t
					}
				}
			}
		},
		removeAttr: function (n, t) {
			var r,
			u,
			e = 0,
			f = t && t.match(s);
			if (f && 1 === n.nodeType)
				while (r = f[e++])
					u = i.propFix[r] || r, i.expr.match.bool.test(r) ? kt && g || !di.test(r) ? n[u] = !1 : n[i.camelCase("default-" + r)] = n[u] = !1 : i.attr(n, r, ""), n.removeAttribute(g ? r : u)
		}
	});
	bf = {
		set: function (n, t, r) {
			return t === !1 ? i.removeAttr(n, r) : kt && g || !di.test(r) ? n.setAttribute(!g && i.propFix[r] || r, r) : n[i.camelCase("default-" + r)] = n[r] = !0,
			r
		}
	};
	i.each(i.expr.match.bool.source.match(/\w+/g), function (n, t) {
		var r = l[t] || i.find.attr;
		l[t] = kt && g || !di.test(t) ? function (n, t, i) {
			var u,
			f;
			return i || (f = l[t], l[t] = u, u = null != r(n, t, i) ? t.toLowerCase() : null, l[t] = f),
			u
		}
		 : function (n, t, r) {
			if (!r)
				return n[i.camelCase("default-" + t)] ? t.toLowerCase() : null
		}
	});
	kt && g || (i.attrHooks.value = {
			set: function (n, t, r) {
				return i.nodeName(n, "input") ? void(n.defaultValue = t) : ft && ft.set(n, t, r)
			}
		});
	g || (ft = {
			set: function (n, t, i) {
				var r = n.getAttributeNode(i);
				return r || n.setAttributeNode(r = n.ownerDocument.createAttribute(i)),
				r.value = t += "",
				"value" === i || t === n.getAttribute(i) ? t : void 0
			}
		}, l.id = l.name = l.coords = function (n, t, i) {
		var r;
		if (!i)
			return (r = n.getAttributeNode(t)) && "" !== r.value ? r.value : null
	}, i.valHooks.button = {
			get: function (n, t) {
				var i = n.getAttributeNode(t);
				if (i && i.specified)
					return i.value
			},
			set: ft.set
		}, i.attrHooks.contenteditable = {
			set: function (n, t, i) {
				ft.set(n, "" === t ? !1 : t, i)
			}
		}, i.each(["width", "height"], function (n, t) {
			i.attrHooks[t] = {
				set: function (n, i) {
					if ("" === i)
						return (n.setAttribute(t, "auto"), i)
				}
			}
		}));
	r.style || (i.attrHooks.style = {
			get: function (n) {
				return n.style.cssText || void 0
			},
			set: function (n, t) {
				return n.style.cssText = t + ""
			}
		});
	kf = /^(?:input|select|textarea|button|object)$/i;
	df = /^(?:a|area)$/i;
	i.fn.extend({
		prop: function (n, t) {
			return y(this, i.prop, n, t, arguments.length > 1)
		},
		removeProp: function (n) {
			return n = i.propFix[n] || n,
			this.each(function () {
				try {
					this[n] = void 0;
					delete this[n]
				} catch (t) {}
			})
		}
	});
	i.extend({
		prop: function (n, t, r) {
			var f,
			u,
			e = n.nodeType;
			if (3 !== e && 8 !== e && 2 !== e)
				return 1 === e && i.isXMLDoc(n) || (t = i.propFix[t] || t, u = i.propHooks[t]), void 0 !== r ? u && "set" in u && void 0 !== (f = u.set(n, r, t)) ? f : n[t] = r : u && "get" in u && null !== (f = u.get(n, t)) ? f : n[t]
		},
		propHooks: {
			tabIndex: {
				get: function (n) {
					var t = i.find.attr(n, "tabindex");
					return t ? parseInt(t, 10) : kf.test(n.nodeName) || df.test(n.nodeName) && n.href ? 0 : -1
				}
			}
		},
		propFix: {
			"for": "htmlFor",
			"class": "className"
		}
	});
	r.hrefNormalized || i.each(["href", "src"], function (n, t) {
		i.propHooks[t] = {
			get: function (n) {
				return n.getAttribute(t, 4)
			}
		}
	});
	r.optSelected || (i.propHooks.selected = {
			get: function (n) {
				var t = n.parentNode;
				return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex),
				null
			},
			set: function (n) {
				var t = n.parentNode;
				t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex)
			}
		});
	i.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], function () {
		i.propFix[this.toLowerCase()] = this
	});
	r.enctype || (i.propFix.enctype = "encoding");
	dt = /[\t\r\n\f]/g;
	i.fn.extend({
		addClass: function (n) {
			var o,
			t,
			r,
			u,
			f,
			h,
			e,
			c = 0;
			if (i.isFunction(n))
				return this.each(function (t) {
					i(this).addClass(n.call(this, t, nt(this)))
				});
			if ("string" == typeof n && n)
				for (o = n.match(s) || []; t = this[c++]; )
					if (u = nt(t), r = 1 === t.nodeType && (" " + u + " ").replace(dt, " ")) {
						for (h = 0; f = o[h++]; )
							r.indexOf(" " + f + " ") < 0 && (r += f + " ");
						e = i.trim(r);
						u !== e && i.attr(t, "class", e)
					}
			return this
		},
		removeClass: function (n) {
			var o,
			r,
			t,
			u,
			f,
			h,
			e,
			c = 0;
			if (i.isFunction(n))
				return this.each(function (t) {
					i(this).removeClass(n.call(this, t, nt(this)))
				});
			if (!arguments.length)
				return this.attr("class", "");
			if ("string" == typeof n && n)
				for (o = n.match(s) || []; r = this[c++]; )
					if (u = nt(r), t = 1 === r.nodeType && (" " + u + " ").replace(dt, " ")) {
						for (h = 0; f = o[h++]; )
							while (t.indexOf(" " + f + " ") > -1)
								t = t.replace(" " + f + " ", " ");
						e = i.trim(t);
						u !== e && i.attr(r, "class", e)
					}
			return this
		},
		toggleClass: function (n, t) {
			var r = typeof n;
			return "boolean" == typeof t && "string" === r ? t ? this.addClass(n) : this.removeClass(n) : i.isFunction(n) ? this.each(function (r) {
				i(this).toggleClass(n.call(this, r, nt(this), t), t)
			}) : this.each(function () {
				var t,
				f,
				u,
				e;
				if ("string" === r)
					for (f = 0, u = i(this), e = n.match(s) || []; t = e[f++]; )
						u.hasClass(t) ? u.removeClass(t) : u.addClass(t);
				else
					void 0 !== n && "boolean" !== r || (t = nt(this), t && i._data(this, "__className__", t), i.attr(this, "class", t || n === !1 ? "" : i._data(this, "__className__") || ""))
			})
		},
		hasClass: function (n) {
			for (var t, r = 0, i = " " + n + " "; t = this[r++]; )
				if (1 === t.nodeType && (" " + nt(t) + " ").replace(dt, " ").indexOf(i) > -1)
					return !0;
			return !1
		}
	});
	i.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (n, t) {
		i.fn[t] = function (n, i) {
			return arguments.length > 0 ? this.on(t, null, n, i) : this.trigger(t)
		}
	});
	i.fn.extend({
		hover: function (n, t) {
			return this.mouseenter(n).mouseleave(t || n)
		}
	});
	var po = n.location,
	gi = i.now(),
	nr = /\?/,
	wo = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
	i.parseJSON = function (t) {
		if (n.JSON && n.JSON.parse)
			return n.JSON.parse(t + "");
		var f,
		r = null,
		u = i.trim(t + "");
		return u && !i.trim(u.replace(wo, function (n, t, i, u) {
				return f && t && (r = 0),
				0 === r ? n : (f = i || t, r += !u - !i, "")
			})) ? Function("return " + u)() : i.error("Invalid JSON: " + t)
	};
	i.parseXML = function (t) {
		var r,
		u;
		if (!t || "string" != typeof t)
			return null;
		try {
			n.DOMParser ? (u = new n.DOMParser, r = u.parseFromString(t, "text/xml")) : (r = new n.ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(t))
		} catch (f) {
			r = void 0
		}
		return r && r.documentElement && !r.getElementsByTagName("parsererror").length || i.error("Invalid XML: " + t),
		r
	};
	var bo = /#.*$/,
	gf = /([?&])_=[^&]*/,
	ko = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
	go = /^(?:GET|HEAD)$/,
	ns = /^\/\//,
	ne = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
	te = {},
	tr = {},
	ie = "*/".concat("*"),
	ir = po.href,
	et = ne.exec(ir.toLowerCase()) || [];
	i.extend({
		active: 0,
		lastModified: {},
		etag: {},
		ajaxSettings: {
			url: ir,
			type: "GET",
			isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(et[1]),
			global: !0,
			processData: !0,
			async: !0,
			contentType: "application/x-www-form-urlencoded; charset=UTF-8",
			accepts: {
				"*": ie,
				text: "text/plain",
				html: "text/html",
				xml: "application/xml, text/xml",
				json: "application/json, text/javascript"
			},
			contents: {
				xml: /\bxml\b/,
				html: /\bhtml/,
				json: /\bjson\b/
			},
			responseFields: {
				xml: "responseXML",
				text: "responseText",
				json: "responseJSON"
			},
			converters: {
				"* text": String,
				"text html": !0,
				"text json": i.parseJSON,
				"text xml": i.parseXML
			},
			flatOptions: {
				url: !0,
				context: !0
			}
		},
		ajaxSetup: function (n, t) {
			return t ? rr(rr(n, i.ajaxSettings), t) : rr(i.ajaxSettings, n)
		},
		ajaxPrefilter: re(te),
		ajaxTransport: re(tr),
		ajax: function (t, r) {
			function w(t, r, s, c) {
				var y,
				rt,
				it,
				w,
				tt,
				l = r;
				2 !== o && (o = 2, k && n.clearTimeout(k), v = void 0, b = c || "", f.readyState = t > 0 ? 4 : 0, y = t >= 200 && 300 > t || 304 === t, s && (w = ts(u, f, s)), w = is(u, w, f, y), y ? (u.ifModified && (tt = f.getResponseHeader("Last-Modified"), tt && (i.lastModified[e] = tt), tt = f.getResponseHeader("etag"), tt && (i.etag[e] = tt)), 204 === t || "HEAD" === u.type ? l = "nocontent" : 304 === t ? l = "notmodified" : (l = w.state, rt = w.data, it = w.error, y = !it)) : (it = l, !t && l || (l = "error", 0 > t && (t = 0))), f.status = t, f.statusText = (r || l) + "", y ? g.resolveWith(h, [rt, l, f]) : g.rejectWith(h, [f, l, it]), f.statusCode(p), p = void 0, a && d.trigger(y ? "ajaxSuccess" : "ajaxError", [f, u, y ? rt : it]), nt.fireWith(h, [f, l]), a && (d.trigger("ajaxComplete", [f, u]), --i.active || i.event.trigger("ajaxStop")))
			}
			"object" == typeof t && (r = t, t = void 0);
			r = r || {};
			var c,
			l,
			e,
			b,
			k,
			a,
			v,
			y,
			u = i.ajaxSetup({}, r),
			h = u.context || u,
			d = u.context && (h.nodeType || h.jquery) ? i(h) : i.event,
			g = i.Deferred(),
			nt = i.Callbacks("once memory"),
			p = u.statusCode || {},
			tt = {},
			it = {},
			o = 0,
			rt = "canceled",
			f = {
				readyState: 0,
				getResponseHeader: function (n) {
					var t;
					if (2 === o) {
						if (!y)
							for (y = {}; t = ko.exec(b); )
								y[t[1].toLowerCase()] = t[2];
						t = y[n.toLowerCase()]
					}
					return null == t ? null : t
				},
				getAllResponseHeaders: function () {
					return 2 === o ? b : null
				},
				setRequestHeader: function (n, t) {
					var i = n.toLowerCase();
					return o || (n = it[i] = it[i] || n, tt[n] = t),
					this
				},
				overrideMimeType: function (n) {
					return o || (u.mimeType = n),
					this
				},
				statusCode: function (n) {
					var t;
					if (n)
						if (2 > o)
							for (t in n)
								p[t] = [p[t], n[t]];
						else
							f.always(n[f.status]);
					return this
				},
				abort: function (n) {
					var t = n || rt;
					return v && v.abort(t),
					w(0, t),
					this
				}
			};
			if (g.promise(f).complete = nt.add, f.success = f.done, f.error = f.fail, u.url = ((t || u.url || ir) + "").replace(bo, "").replace(ns, et[1] + "//"), u.type = r.method || r.type || u.method || u.type, u.dataTypes = i.trim(u.dataType || "*").toLowerCase().match(s) || [""], null == u.crossDomain && (c = ne.exec(u.url.toLowerCase()), u.crossDomain = !(!c || c[1] === et[1] && c[2] === et[2] && (c[3] || ("http:" === c[1] ? "80" : "443")) === (et[3] || ("http:" === et[1] ? "80" : "443")))), u.data && u.processData && "string" != typeof u.data && (u.data = i.param(u.data, u.traditional)), ue(te, u, r, f), 2 === o)
				return f;
			a = i.event && u.global;
			a && 0 == i.active++ && i.event.trigger("ajaxStart");
			u.type = u.type.toUpperCase();
			u.hasContent = !go.test(u.type);
			e = u.url;
			u.hasContent || (u.data && (e = u.url += (nr.test(e) ? "&" : "?") + u.data, delete u.data), u.cache === !1 && (u.url = gf.test(e) ? e.replace(gf, "$1_=" + gi++) : e + (nr.test(e) ? "&" : "?") + "_=" + gi++));
			u.ifModified && (i.lastModified[e] && f.setRequestHeader("If-Modified-Since", i.lastModified[e]), i.etag[e] && f.setRequestHeader("If-None-Match", i.etag[e]));
			(u.data && u.hasContent && u.contentType !== !1 || r.contentType) && f.setRequestHeader("Content-Type", u.contentType);
			f.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + ie + "; q=0.01" : "") : u.accepts["*"]);
			for (l in u.headers)
				f.setRequestHeader(l, u.headers[l]);
			if (u.beforeSend && (u.beforeSend.call(h, f, u) === !1 || 2 === o))
				return f.abort();
			rt = "abort";
			for (l in {
				success: 1,
				error: 1,
				complete: 1
			})
				f[l](u[l]);
			if (v = ue(tr, u, r, f)) {
				if (f.readyState = 1, a && d.trigger("ajaxSend", [f, u]), 2 === o)
					return f;
				u.async && u.timeout > 0 && (k = n.setTimeout(function () {
							f.abort("timeout")
						}, u.timeout));
				try {
					o = 1;
					v.send(tt, w)
				} catch (ut) {
					if (!(2 > o))
						throw ut;
					w(-1, ut)
				}
			} else
				w(-1, "No Transport");
			return f
		},
		getJSON: function (n, t, r) {
			return i.get(n, t, r, "json")
		},
		getScript: function (n, t) {
			return i.get(n, void 0, t, "script")
		}
	});
	i.each(["get", "post"], function (n, t) {
		i[t] = function (n, r, u, f) {
			return i.isFunction(r) && (f = f || u, u = r, r = void 0),
			i.ajax(i.extend({
					url: n,
					type: t,
					dataType: f,
					data: r,
					success: u
				}, i.isPlainObject(n) && n))
		}
	});
	i._evalUrl = function (n) {
		return i.ajax({
			url: n,
			type: "GET",
			dataType: "script",
			cache: !0,
			async: !1,
			global: !1,
			throws: !0
		})
	};
	i.fn.extend({
		wrapAll: function (n) {
			if (i.isFunction(n))
				return this.each(function (t) {
					i(this).wrapAll(n.call(this, t))
				});
			if (this[0]) {
				var t = i(n, this[0].ownerDocument).eq(0).clone(!0);
				this[0].parentNode && t.insertBefore(this[0]);
				t.map(function () {
					for (var n = this; n.firstChild && 1 === n.firstChild.nodeType; )
						n = n.firstChild;
					return n
				}).append(this)
			}
			return this
		},
		wrapInner: function (n) {
			return i.isFunction(n) ? this.each(function (t) {
				i(this).wrapInner(n.call(this, t))
			}) : this.each(function () {
				var t = i(this),
				r = t.contents();
				r.length ? r.wrapAll(n) : t.append(n)
			})
		},
		wrap: function (n) {
			var t = i.isFunction(n);
			return this.each(function (r) {
				i(this).wrapAll(t ? n.call(this, r) : n)
			})
		},
		unwrap: function () {
			return this.parent().each(function () {
				i.nodeName(this, "body") || i(this).replaceWith(this.childNodes)
			}).end()
		}
	});
	i.expr.filters.hidden = function (n) {
		return r.reliableHiddenOffsets() ? n.offsetWidth <= 0 && n.offsetHeight <= 0 && !n.getClientRects().length : us(n)
	};
	i.expr.filters.visible = function (n) {
		return !i.expr.filters.hidden(n)
	};
	var fs = /%20/g,
	es = /\[\]$/,
	fe = /\r?\n/g,
	os = /^(?:submit|button|image|reset|file)$/i,
	ss = /^(?:input|select|textarea|keygen)/i;
	i.param = function (n, t) {
		var r,
		u = [],
		f = function (n, t) {
			t = i.isFunction(t) ? t() : null == t ? "" : t;
			u[u.length] = encodeURIComponent(n) + "=" + encodeURIComponent(t)
		};
		if (void 0 === t && (t = i.ajaxSettings && i.ajaxSettings.traditional), i.isArray(n) || n.jquery && !i.isPlainObject(n))
			i.each(n, function () {
				f(this.name, this.value)
			});
		else
			for (r in n)
				ur(r, n[r], t, f);
		return u.join("&").replace(fs, "+")
	};
	i.fn.extend({
		serialize: function () {
			return i.param(this.serializeArray())
		},
		serializeArray: function () {
			return this.map(function () {
				var n = i.prop(this, "elements");
				return n ? i.makeArray(n) : this
			}).filter(function () {
				var n = this.type;
				return this.name && !i(this).is(":disabled") && ss.test(this.nodeName) && !os.test(n) && (this.checked || !si.test(n))
			}).map(function (n, t) {
				var r = i(this).val();
				return null == r ? null : i.isArray(r) ? i.map(r, function (n) {
					return {
						name: t.name,
						value: n.replace(fe, "\r\n")
					}
				}) : {
					name: t.name,
					value: r.replace(fe, "\r\n")
				}
			}).get()
		}
	});
	i.ajaxSettings.xhr = void 0 !== n.ActiveXObject ? function () {
		return this.isLocal ? ee() : u.documentMode > 8 ? fr() : /^(get|post|head|put|delete|options)$/i.test(this.type) && fr() || ee()
	}
	 : fr;
	var hs = 0,
	gt = {},
	ct = i.ajaxSettings.xhr();
	return n.attachEvent && n.attachEvent("onunload", function () {
		for (var n in gt)
			gt[n](void 0, !0)
	}),
	r.cors = !!ct && "withCredentials" in ct,
	ct = r.ajax = !!ct,
	ct && i.ajaxTransport(function (t) {
		if (!t.crossDomain || r.cors) {
			var u;
			return {
				send: function (r, f) {
					var o,
					e = t.xhr(),
					s = ++hs;
					if (e.open(t.type, t.url, t.async, t.username, t.password), t.xhrFields)
						for (o in t.xhrFields)
							e[o] = t.xhrFields[o];
					t.mimeType && e.overrideMimeType && e.overrideMimeType(t.mimeType);
					t.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest");
					for (o in r)
						void 0 !== r[o] && e.setRequestHeader(o, r[o] + "");
					e.send(t.hasContent && t.data || null);
					u = function (n, r) {
						var o,
						c,
						h;
						if (u && (r || 4 === e.readyState))
							if (delete gt[s], u = void 0, e.onreadystatechange = i.noop, r)
								4 !== e.readyState && e.abort();
							else {
								h = {};
								o = e.status;
								"string" == typeof e.responseText && (h.text = e.responseText);
								try {
									c = e.statusText
								} catch (l) {
									c = ""
								}
								o || !t.isLocal || t.crossDomain ? 1223 === o && (o = 204) : o = h.text ? 200 : 404
							}
						h && f(o, c, h, e.getAllResponseHeaders())
					};
					t.async ? 4 === e.readyState ? n.setTimeout(u) : e.onreadystatechange = gt[s] = u : u()
				},
				abort: function () {
					u && u(void 0, !0)
				}
			}
		}
	}),
	i.ajaxSetup({
		accepts: {
			script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
		},
		contents: {
			script: /\b(?:java|ecma)script\b/
		},
		converters: {
			"text script": function (n) {
				return i.globalEval(n),
				n
			}
		}
	}),
	i.ajaxPrefilter("script", function (n) {
		void 0 === n.cache && (n.cache = !1);
		n.crossDomain && (n.type = "GET", n.global = !1)
	}),
	i.ajaxTransport("script", function (n) {
		if (n.crossDomain) {
			var t,
			r = u.head || i("head")[0] || u.documentElement;
			return {
				send: function (i, f) {
					t = u.createElement("script");
					t.async = !0;
					n.scriptCharset && (t.charset = n.scriptCharset);
					t.src = n.url;
					t.onload = t.onreadystatechange = function (n, i) {
						(i || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null, t.parentNode && t.parentNode.removeChild(t), t = null, i || f(200, "success"))
					};
					r.insertBefore(t, r.firstChild)
				},
				abort: function () {
					t && t.onload(void 0, !0)
				}
			}
		}
	}),
	er = [],
	ni = /(=)\?(?=&|$)|\?\?/,
	i.ajaxSetup({
		jsonp: "callback",
		jsonpCallback: function () {
			var n = er.pop() || i.expando + "_" + gi++;
			return this[n] = !0,
			n
		}
	}),
	i.ajaxPrefilter("json jsonp", function (t, r, u) {
		var f,
		e,
		o,
		s = t.jsonp !== !1 && (ni.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && ni.test(t.data) && "data");
		if (s || "jsonp" === t.dataTypes[0])
			return (f = t.jsonpCallback = i.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback, s ? t[s] = t[s].replace(ni, "$1" + f) : t.jsonp !== !1 && (t.url += (nr.test(t.url) ? "&" : "?") + t.jsonp + "=" + f), t.converters["script json"] = function () {
				return o || i.error(f + " was not called"),
				o[0]
			}, t.dataTypes[0] = "json", e = n[f], n[f] = function () {
				o = arguments
			}, u.always(function () {
					void 0 === e ? i(n).removeProp(f) : n[f] = e;
					t[f] && (t.jsonpCallback = r.jsonpCallback, er.push(f));
					o && i.isFunction(e) && e(o[0]);
					o = e = void 0
				}), "script")
	}),
	i.parseHTML = function (n, t, r) {
		if (!n || "string" != typeof n)
			return null;
		"boolean" == typeof t && (r = t, t = !1);
		t = t || u;
		var f = vr.exec(n),
		e = !r && [];
		return f ? [t.createElement(f[1])] : (f = hu([n], t, e), e && e.length && i(e).remove(), i.merge([], f.childNodes))
	},
	or = i.fn.load,
	i.fn.load = function (n, t, r) {
		if ("string" != typeof n && or)
			return or.apply(this, arguments);
		var u,
		o,
		s,
		f = this,
		e = n.indexOf(" ");
		return e > -1 && (u = i.trim(n.slice(e, n.length)), n = n.slice(0, e)),
		i.isFunction(t) ? (r = t, t = void 0) : t && "object" == typeof t && (o = "POST"),
		f.length > 0 && i.ajax({
			url: n,
			type: o || "GET",
			dataType: "html",
			data: t
		}).done(function (n) {
			s = arguments;
			f.html(u ? i("<div>").append(i.parseHTML(n)).find(u) : n)
		}).always(r && function (n, t) {
			f.each(function () {
				r.apply(this, s || [n.responseText, t, n])
			})
		}),
		this
	},
	i.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], function (n, t) {
		i.fn[t] = function (n) {
			return this.on(t, n)
		}
	}),
	i.expr.filters.animated = function (n) {
		return i.grep(i.timers, function (t) {
			return n === t.elem
		}).length
	},
	i.offset = {
		setOffset: function (n, t, r) {
			var e,
			o,
			s,
			h,
			u,
			c,
			v,
			l = i.css(n, "position"),
			a = i(n),
			f = {};
			"static" === l && (n.style.position = "relative");
			u = a.offset();
			s = i.css(n, "top");
			c = i.css(n, "left");
			v = ("absolute" === l || "fixed" === l) && i.inArray("auto", [s, c]) > -1;
			v ? (e = a.position(), h = e.top, o = e.left) : (h = parseFloat(s) || 0, o = parseFloat(c) || 0);
			i.isFunction(t) && (t = t.call(n, r, i.extend({}, u)));
			null != t.top && (f.top = t.top - u.top + h);
			null != t.left && (f.left = t.left - u.left + o);
			"using" in t ? t.using.call(n, f) : a.css(f)
		}
	},
	i.fn.extend({
		offset: function (n) {
			if (arguments.length)
				return void 0 === n ? this : this.each(function (t) {
					i.offset.setOffset(this, n, t)
				});
			var t,
			f,
			u = {
				top: 0,
				left: 0
			},
			r = this[0],
			e = r && r.ownerDocument;
			if (e)
				return t = e.documentElement, i.contains(t, r) ? ("undefined" != typeof r.getBoundingClientRect && (u = r.getBoundingClientRect()), f = oe(e), {
					top: u.top + (f.pageYOffset || t.scrollTop) - (t.clientTop || 0),
					left: u.left + (f.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
				}) : u
		},
		position: function () {
			if (this[0]) {
				var n,
				r,
				t = {
					top: 0,
					left: 0
				},
				u = this[0];
				return "fixed" === i.css(u, "position") ? r = u.getBoundingClientRect() : (n = this.offsetParent(), r = this.offset(), i.nodeName(n[0], "html") || (t = n.offset()), t.top += i.css(n[0], "borderTopWidth", !0), t.left += i.css(n[0], "borderLeftWidth", !0)), {
					top: r.top - t.top - i.css(u, "marginTop", !0),
					left: r.left - t.left - i.css(u, "marginLeft", !0)
				}
			}
		},
		offsetParent: function () {
			return this.map(function () {
				for (var n = this.offsetParent; n && !i.nodeName(n, "html") && "static" === i.css(n, "position"); )
					n = n.offsetParent;
				return n || nf
			})
		}
	}),
	i.each({
		scrollLeft: "pageXOffset",
		scrollTop: "pageYOffset"
	}, function (n, t) {
		var r = /Y/.test(t);
		i.fn[n] = function (u) {
			return y(this, function (n, u, f) {
				var e = oe(n);
				return void 0 === f ? e ? t in e ? e[t] : e.document.documentElement[u] : n[u] : void(e ? e.scrollTo(r ? i(e).scrollLeft() : f, r ? f : i(e).scrollTop()) : n[u] = f)
			}, n, u, arguments.length, null)
		}
	}),
	i.each(["top", "left"], function (n, t) {
		i.cssHooks[t] = bi(r.pixelPosition, function (n, r) {
				if (r)
					return (r = p(n, t), pt.test(r) ? i(n).position()[t] + "px" : r)
			})
	}),
	i.each({
		Height: "height",
		Width: "width"
	}, function (n, t) {
		i.each({
			padding: "inner" + n,
			content: t,
			"": "outer" + n
		}, function (r, u) {
			i.fn[u] = function (u, f) {
				var e = arguments.length && (r || "boolean" != typeof u),
				o = r || (u === !0 || f === !0 ? "margin" : "border");
				return y(this, function (t, r, u) {
					var f;
					return i.isWindow(t) ? t.document.documentElement["client" + n] : 9 === t.nodeType ? (f = t.documentElement, Math.max(t.body["scroll" + n], f["scroll" + n], t.body["offset" + n], f["offset" + n], f["client" + n])) : void 0 === u ? i.css(t, r, o) : i.style(t, r, u, o)
				}, t, e ? u : void 0, e, null)
			}
		})
	}),
	i.fn.extend({
		bind: function (n, t, i) {
			return this.on(n, null, t, i)
		},
		unbind: function (n, t) {
			return this.off(n, null, t)
		},
		delegate: function (n, t, i, r) {
			return this.on(t, n, i, r)
		},
		undelegate: function (n, t, i) {
			return 1 === arguments.length ? this.off(n, "**") : this.off(t, n || "**", i)
		}
	}),
	i.fn.size = function () {
		return this.length
	},
	i.fn.andSelf = i.fn.addBack,
	"function" == typeof define && define.amd && define("jquery", [], function () {
		return i
	}),
	se = n.jQuery,
	he = n.$,
	i.noConflict = function (t) {
		return n.$ === i && (n.$ = he),
		t && n.jQuery === i && (n.jQuery = se),
		i
	},
	t || (n.jQuery = n.$ = i),
	i
}), function (n, t, i, r) {
	var u = n(t);
	u.load(function () {
		u.resize()
	});
	n.fn.lazyload = function (f) {
		function s() {
			var t = 0;
			o.each(function () {
				var i = n(this);
				if ((!e.skip_invisible || i.is(":visible")) && !n.abovethetop(this, e))
					if (n.belowthefold(this, e)) {
						if (++t > e.failure_limit)
							return !1
					} else
						i.trigger("appear"), t = 0
			})
		}
		var o = this,
		h,
		e = {
			threshold: 0,
			failure_limit: 0,
			event: "scroll",
			effect: "show",
			container: t,
			data_attribute: "original|src",
			skip_invisible: !0,
			appear: null,
			load: null,
			placeholder: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC"
		};
		return f && (r !== f.failurelimit && (f.failure_limit = f.failurelimit, delete f.failurelimit), r !== f.effectspeed && (f.effect_speed = f.effectspeed, delete f.effectspeed), n.extend(e, f)),
		h = e.container === r || e.container === t ? u : n(e.container),
		0 === e.event.indexOf("scroll") && h.bind(e.event, function () {
			return s()
		}),
		this.each(function () {
			var i = this,
			t = n(i);
			i.loaded = !1;
			(t.attr("src") === r || t.attr("src") === !1) && t.is("img") && t.attr("src", e.placeholder);
			t.one("appear", function () {
				var s,
				u,
				f;
				if (!this.loaded) {
					if (e.appear && (s = o.length, e.appear.call(i, s, e)), u = "", e.data_attribute.indexOf("|") > 0)
						for (f = 0; f < e.data_attribute.split("|").length; f++)
							t.attr("data-" + e.data_attribute.split("|")[f]) != r && (u = t.attr("data-" + e.data_attribute.split("|")[f]));
					else
						u = e.data_attribute;
					n("<img />").bind("load", function () {
						var r,
						f;
						t.hide();
						u != "" && (t.is("img") ? t.attr("src", u) : t.css("background-image", "url('" + u + "')"));
						t[e.effect](e.effect_speed);
						i.loaded = !0;
						r = n.grep(o, function (n) {
								return !n.loaded
							});
						o = n(r);
						e.load && (f = o.length, e.load.call(i, f, e))
					}).attr("src", u)
				}
			});
			0 !== e.event.indexOf("scroll") && t.bind(e.event, function () {
				i.loaded || t.trigger("appear")
			})
		}),
		u.bind("resize", function () {
			s()
		}),
		/(?:iphone|ipod|ipad).*os 5/gi.test(navigator.appVersion) && u.bind("pageshow", function (t) {
			t.originalEvent && t.originalEvent.persisted && o.each(function () {
				n(this).trigger("appear")
			})
		}),
		n(i).ready(function () {
			s()
		}),
		this
	};
	n.belowthefold = function (i, f) {
		var e;
		return e = f.container === r || f.container === t ? (t.innerHeight ? t.innerHeight : u.height()) + u.scrollTop() : n(f.container).offset().top + n(f.container).height(),
		e <= n(i).offset().top - f.threshold
	};
	n.abovethetop = function (i, f) {
		var e;
		return e = f.container === r || f.container === t ? u.scrollTop() : n(f.container).offset().top,
		e >= n(i).offset().top + f.threshold + n(i).height()
	};
	n.inviewport = function (t, i) {
		return !n.belowthefold(t, i) && !n.abovethetop(t, i)
	};
	n.extend(n.expr[":"], {
		"below-the-fold": function (t) {
			return n.belowthefold(t, {
				threshold: 0
			})
		},
		"above-the-top": function (t) {
			return !n.belowthefold(t, {
				threshold: 0
			})
		},
		"in-viewport": function (t) {
			return n.inviewport(t, {
				threshold: 0
			})
		},
		"above-the-fold": function (t) {
			return !n.belowthefold(t, {
				threshold: 0
			})
		}
	})
}
(jQuery, window, document);
!function (n) {
	"use strict";
	"function" == typeof define && define.amd ? define(["jquery"], n) : "undefined" != typeof exports ? module.exports = n(require("jquery")) : n(jQuery)
}
(function (n) {
	"use strict";
	var t = window.Slick || {};
	t = function () {
		function t(t, r) {
			var f,
			u = this;
			u.defaults = {
				accessibility: !0,
				adaptiveHeight: !1,
				appendArrows: n(t),
				appendDots: n(t),
				arrows: !0,
				asNavFor: null,
				prevArrow: '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button">Previous<\/button>',
				nextArrow: '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button">Next<\/button>',
				autoplay: !1,
				autoplaySpeed: 3e3,
				centerMode: !1,
				centerPadding: "50px",
				cssEase: "ease",
				customPaging: function (t, i) {
					return n('<button type="button" data-role="none" role="button" tabindex="0" />').text(i + 1)
				},
				dots: !1,
				dotsClass: "slick-dots",
				draggable: !0,
				easing: "linear",
				edgeFriction: .35,
				fade: !1,
				focusOnSelect: !1,
				infinite: !0,
				initialSlide: 0,
				lazyLoad: "ondemand",
				mobileFirst: !1,
				pauseOnHover: !0,
				pauseOnFocus: !0,
				pauseOnDotsHover: !1,
				respondTo: "window",
				responsive: null,
				rows: 1,
				rtl: !1,
				slide: "",
				slidesPerRow: 1,
				slidesToShow: 1,
				slidesToScroll: 1,
				speed: 500,
				swipe: !0,
				swipeToSlide: !1,
				touchMove: !0,
				touchThreshold: 5,
				useCSS: !0,
				useTransform: !0,
				variableWidth: !1,
				vertical: !1,
				verticalSwiping: !1,
				waitForAnimate: !0,
				zIndex: 1e3
			};
			u.initials = {
				animating: !1,
				dragging: !1,
				autoPlayTimer: null,
				currentDirection: 0,
				currentLeft: null,
				currentSlide: 0,
				direction: 1,
				$dots: null,
				listWidth: null,
				listHeight: null,
				loadIndex: 0,
				$nextArrow: null,
				$prevArrow: null,
				slideCount: null,
				slideWidth: null,
				$slideTrack: null,
				$slides: null,
				sliding: !1,
				slideOffset: 0,
				swipeLeft: null,
				$list: null,
				touchObject: {},
				transformsEnabled: !1,
				unslicked: !1
			};
			n.extend(u, u.initials);
			u.activeBreakpoint = null;
			u.animType = null;
			u.animProp = null;
			u.breakpoints = [];
			u.breakpointSettings = [];
			u.cssTransitions = !1;
			u.focussed = !1;
			u.interrupted = !1;
			u.hidden = "hidden";
			u.paused = !0;
			u.positionProp = null;
			u.respondTo = null;
			u.rowCount = 1;
			u.shouldClick = !0;
			u.$slider = n(t);
			u.$slidesCache = null;
			u.transformType = null;
			u.transitionType = null;
			u.visibilityChange = "visibilitychange";
			u.windowWidth = 0;
			u.windowTimer = null;
			f = n(t).data("slick") || {};
			u.options = n.extend({}, u.defaults, r, f);
			u.currentSlide = u.options.initialSlide;
			u.originalSettings = u.options;
			"undefined" != typeof document.mozHidden ? (u.hidden = "mozHidden", u.visibilityChange = "mozvisibilitychange") : "undefined" != typeof document.webkitHidden && (u.hidden = "webkitHidden", u.visibilityChange = "webkitvisibilitychange");
			u.autoPlay = n.proxy(u.autoPlay, u);
			u.autoPlayClear = n.proxy(u.autoPlayClear, u);
			u.autoPlayIterator = n.proxy(u.autoPlayIterator, u);
			u.changeSlide = n.proxy(u.changeSlide, u);
			u.clickHandler = n.proxy(u.clickHandler, u);
			u.selectHandler = n.proxy(u.selectHandler, u);
			u.setPosition = n.proxy(u.setPosition, u);
			u.swipeHandler = n.proxy(u.swipeHandler, u);
			u.dragHandler = n.proxy(u.dragHandler, u);
			u.keyHandler = n.proxy(u.keyHandler, u);
			u.instanceUid = i++;
			u.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;
			u.registerBreakpoints();
			u.init(!0)
		}
		var i = 0;
		return t
	}
	();
	t.prototype.activateADA = function () {
		var n = this;
		n.$slideTrack.find(".slick-active").attr({
			"aria-hidden": "false"
		}).find("a, input, button, select").attr({
			tabindex: "0"
		})
	};
	t.prototype.addSlide = t.prototype.slickAdd = function (t, i, r) {
		var u = this;
		if ("boolean" == typeof i)
			r = i, i = null;
		else if (0 > i || i >= u.slideCount)
			return !1;
		u.unload();
		"number" == typeof i ? 0 === i && 0 === u.$slides.length ? n(t).appendTo(u.$slideTrack) : r ? n(t).insertBefore(u.$slides.eq(i)) : n(t).insertAfter(u.$slides.eq(i)) : r === !0 ? n(t).prependTo(u.$slideTrack) : n(t).appendTo(u.$slideTrack);
		u.$slides = u.$slideTrack.children(this.options.slide);
		u.$slideTrack.children(this.options.slide).detach();
		u.$slideTrack.append(u.$slides);
		u.$slides.each(function (t, i) {
			n(i).attr("data-slick-index", t)
		});
		u.$slidesCache = u.$slides;
		u.reinit()
	};
	t.prototype.animateHeight = function () {
		var n = this,
		t;
		1 === n.options.slidesToShow && n.options.adaptiveHeight === !0 && n.options.vertical === !1 && (t = n.$slides.eq(n.currentSlide).outerHeight(!0), n.$list.animate({
				height: t
			}, n.options.speed))
	};
	t.prototype.animateSlide = function (t, i) {
		var u = {},
		r = this;
		r.animateHeight();
		r.options.rtl === !0 && r.options.vertical === !1 && (t = -t);
		r.transformsEnabled === !1 ? r.options.vertical === !1 ? r.$slideTrack.animate({
			left: t
		}, r.options.speed, r.options.easing, i) : r.$slideTrack.animate({
			top: t
		}, r.options.speed, r.options.easing, i) : r.cssTransitions === !1 ? (r.options.rtl === !0 && (r.currentLeft = -r.currentLeft), n({
				animStart: r.currentLeft
			}).animate({
				animStart: t
			}, {
				duration: r.options.speed,
				easing: r.options.easing,
				step: function (n) {
					n = Math.ceil(n);
					r.options.vertical === !1 ? (u[r.animType] = "translate(" + n + "px, 0px)", r.$slideTrack.css(u)) : (u[r.animType] = "translate(0px," + n + "px)", r.$slideTrack.css(u))
				},
				complete: function () {
					i && i.call()
				}
			})) : (r.applyTransition(), t = Math.ceil(t), u[r.animType] = r.options.vertical === !1 ? "translate3d(" + t + "px, 0px, 0px)" : "translate3d(0px," + t + "px, 0px)", r.$slideTrack.css(u), i && setTimeout(function () {
				r.disableTransition();
				i.call()
			}, r.options.speed))
	};
	t.prototype.getNavTarget = function () {
		var i = this,
		t = i.options.asNavFor;
		return t && null !== t && (t = n(t).not(i.$slider)),
		t
	};
	t.prototype.asNavFor = function (t) {
		var r = this,
		i = r.getNavTarget();
		null !== i && "object" == typeof i && i.each(function () {
			var i = n(this).slick("getSlick");
			i.unslicked || i.slideHandler(t, !0)
		})
	};
	t.prototype.applyTransition = function (n) {
		var t = this,
		i = {};
		i[t.transitionType] = t.options.fade === !1 ? t.transformType + " " + t.options.speed + "ms " + t.options.cssEase : "opacity " + t.options.speed + "ms " + t.options.cssEase;
		t.options.fade === !1 ? t.$slideTrack.css(i) : t.$slides.eq(n).css(i)
	};
	t.prototype.autoPlay = function () {
		var n = this;
		n.autoPlayClear();
		n.slideCount > n.options.slidesToShow && (n.autoPlayTimer = setInterval(n.autoPlayIterator, n.options.autoplaySpeed))
	};
	t.prototype.autoPlayClear = function () {
		var n = this;
		n.autoPlayTimer && clearInterval(n.autoPlayTimer)
	};
	t.prototype.autoPlayIterator = function () {
		var n = this,
		t = n.currentSlide + n.options.slidesToScroll;
		n.paused || n.interrupted || n.focussed || (n.options.infinite === !1 && (1 === n.direction && n.currentSlide + 1 === n.slideCount - 1 ? n.direction = 0 : 0 === n.direction && (t = n.currentSlide - n.options.slidesToScroll, n.currentSlide - 1 == 0 && (n.direction = 1))), n.slideHandler(t))
	};
	t.prototype.buildArrows = function () {
		var t = this;
		t.options.arrows === !0 && (t.$prevArrow = n(t.options.prevArrow).addClass("slick-arrow"), t.$nextArrow = n(t.options.nextArrow).addClass("slick-arrow"), t.slideCount > t.options.slidesToShow ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"), t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows), t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows), t.options.infinite !== !0 && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true")) : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({
				"aria-disabled": "true",
				tabindex: "-1"
			}))
	};
	t.prototype.buildDots = function () {
		var i,
		r,
		t = this;
		if (t.options.dots === !0 && t.slideCount > t.options.slidesToShow) {
			for (t.$slider.addClass("slick-dotted"), r = n("<ul />").addClass(t.options.dotsClass), i = 0; i <= t.getDotCount(); i += 1)
				r.append(n("<li />").append(t.options.customPaging.call(this, t, i)));
			t.$dots = r.appendTo(t.options.appendDots);
			t.$dots.find("li").first().addClass("slick-active").attr("aria-hidden", "false")
		}
	};
	t.prototype.buildOut = function () {
		var t = this;
		t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide");
		t.slideCount = t.$slides.length;
		t.$slides.each(function (t, i) {
			n(i).attr("data-slick-index", t).data("originalStyling", n(i).attr("style") || "")
		});
		t.$slider.addClass("slick-slider");
		t.$slideTrack = 0 === t.slideCount ? n('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent();
		t.$list = t.$slideTrack.wrap('<div aria-live="polite" class="slick-list"/>').parent();
		t.$slideTrack.css("opacity", 0);
		(t.options.centerMode === !0 || t.options.swipeToSlide === !0) && (t.options.slidesToScroll = 1);
		n("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading");
		t.setupInfinite();
		t.buildArrows();
		t.buildDots();
		t.updateDots();
		t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0);
		t.options.draggable === !0 && t.$list.addClass("draggable")
	};
	t.prototype.buildRows = function () {
		var t,
		i,
		r,
		f,
		c,
		u,
		e,
		n = this,
		o,
		s,
		h;
		if (f = document.createDocumentFragment(), u = n.$slider.children(), n.options.rows > 1) {
			for (e = n.options.slidesPerRow * n.options.rows, c = Math.ceil(u.length / e), t = 0; c > t; t++) {
				for (o = document.createElement("div"), i = 0; i < n.options.rows; i++) {
					for (s = document.createElement("div"), r = 0; r < n.options.slidesPerRow; r++)
						h = t * e + (i * n.options.slidesPerRow + r), u.get(h) && s.appendChild(u.get(h));
					o.appendChild(s)
				}
				f.appendChild(o)
			}
			n.$slider.empty().append(f);
			n.$slider.children().children().children().css({
				width: 100 / n.options.slidesPerRow + "%",
				display: "inline-block"
			})
		}
	};
	t.prototype.checkResponsive = function (t, i) {
		var f,
		u,
		e,
		r = this,
		o = !1,
		s = r.$slider.width(),
		h = window.innerWidth || n(window).width();
		if ("window" === r.respondTo ? e = h : "slider" === r.respondTo ? e = s : "min" === r.respondTo && (e = Math.min(h, s)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive) {
			u = null;
			for (f in r.breakpoints)
				r.breakpoints.hasOwnProperty(f) && (r.originalSettings.mobileFirst === !1 ? e < r.breakpoints[f] && (u = r.breakpoints[f]) : e > r.breakpoints[f] && (u = r.breakpoints[f]));
			null !== u ? null !== r.activeBreakpoint ? (u !== r.activeBreakpoint || i) && (r.activeBreakpoint = u, "unslick" === r.breakpointSettings[u] ? r.unslick(u) : (r.options = n.extend({}, r.originalSettings, r.breakpointSettings[u]), t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(t)), o = u) : (r.activeBreakpoint = u, "unslick" === r.breakpointSettings[u] ? r.unslick(u) : (r.options = n.extend({}, r.originalSettings, r.breakpointSettings[u]), t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(t)), o = u) : null !== r.activeBreakpoint && (r.activeBreakpoint = null, r.options = r.originalSettings, t === !0 && (r.currentSlide = r.options.initialSlide), r.refresh(t), o = u);
			t || o === !1 || r.$slider.trigger("breakpoint", [r, o])
		}
	};
	t.prototype.changeSlide = function (t, i) {
		var f,
		e,
		o,
		r = this,
		u = n(t.currentTarget),
		s;
		switch (u.is("a") && t.preventDefault(), u.is("li") || (u = u.closest("li")), o = r.slideCount % r.options.slidesToScroll != 0, f = o ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll, t.data.message) {
		case "previous":
			e = 0 === f ? r.options.slidesToScroll : r.options.slidesToShow - f;
			r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - e, !1, i);
			break;
		case "next":
			e = 0 === f ? r.options.slidesToScroll : f;
			r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + e, !1, i);
			break;
		case "index":
			s = 0 === t.data.index ? 0 : t.data.index || u.index() * r.options.slidesToScroll;
			r.slideHandler(r.checkNavigable(s), !1, i);
			u.children().trigger("focus");
			break;
		default:
			return
		}
	};
	t.prototype.checkNavigable = function (n) {
		var t,
		i,
		u = this,
		r;
		if (t = u.getNavigableIndexes(), i = 0, n > t[t.length - 1])
			n = t[t.length - 1];
		else
			for (r in t) {
				if (n < t[r]) {
					n = i;
					break
				}
				i = t[r]
			}
		return n
	};
	t.prototype.cleanUpEvents = function () {
		var t = this;
		t.options.dots && null !== t.$dots && n("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", n.proxy(t.interrupt, t, !0)).off("mouseleave.slick", n.proxy(t.interrupt, t, !1));
		t.$slider.off("focus.slick blur.slick");
		t.options.arrows === !0 && t.slideCount > t.options.slidesToShow && (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide), t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide));
		t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler);
		t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler);
		t.$list.off("touchend.slick mouseup.slick", t.swipeHandler);
		t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler);
		t.$list.off("click.slick", t.clickHandler);
		n(document).off(t.visibilityChange, t.visibility);
		t.cleanUpSlideEvents();
		t.options.accessibility === !0 && t.$list.off("keydown.slick", t.keyHandler);
		t.options.focusOnSelect === !0 && n(t.$slideTrack).children().off("click.slick", t.selectHandler);
		n(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange);
		n(window).off("resize.slick.slick-" + t.instanceUid, t.resize);
		n("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault);
		n(window).off("load.slick.slick-" + t.instanceUid, t.setPosition);
		n(document).off("ready.slick.slick-" + t.instanceUid, t.setPosition)
	};
	t.prototype.cleanUpSlideEvents = function () {
		var t = this;
		t.$list.off("mouseenter.slick", n.proxy(t.interrupt, t, !0));
		t.$list.off("mouseleave.slick", n.proxy(t.interrupt, t, !1))
	};
	t.prototype.cleanUpRows = function () {
		var n,
		t = this;
		t.options.rows > 1 && (n = t.$slides.children().children(), n.removeAttr("style"), t.$slider.empty().append(n))
	};
	t.prototype.clickHandler = function (n) {
		var t = this;
		t.shouldClick === !1 && (n.stopImmediatePropagation(), n.stopPropagation(), n.preventDefault())
	};
	t.prototype.destroy = function (t) {
		var i = this;
		i.autoPlayClear();
		i.touchObject = {};
		i.cleanUpEvents();
		n(".slick-cloned", i.$slider).detach();
		i.$dots && i.$dots.remove();
		i.$prevArrow && i.$prevArrow.length && (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove());
		i.$nextArrow && i.$nextArrow.length && (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove());
		i.$slides && (i.$slides.removeClass("slick-slide slick-active slick-center slick-visible slick-current").removeAttr("aria-hidden").removeAttr("data-slick-index").each(function () {
				n(this).attr("style", n(this).data("originalStyling"))
			}), i.$slideTrack.children(this.options.slide).detach(), i.$slideTrack.detach(), i.$list.detach(), i.$slider.append(i.$slides));
		i.cleanUpRows();
		i.$slider.removeClass("slick-slider");
		i.$slider.removeClass("slick-initialized");
		i.$slider.removeClass("slick-dotted");
		i.unslicked = !0;
		t || i.$slider.trigger("destroy", [i])
	};
	t.prototype.disableTransition = function (n) {
		var t = this,
		i = {};
		i[t.transitionType] = "";
		t.options.fade === !1 ? t.$slideTrack.css(i) : t.$slides.eq(n).css(i)
	};
	t.prototype.fadeSlide = function (n, t) {
		var i = this;
		i.cssTransitions === !1 ? (i.$slides.eq(n).css({
				zIndex: i.options.zIndex
			}), i.$slides.eq(n).animate({
				opacity: 1
			}, i.options.speed, i.options.easing, t)) : (i.applyTransition(n), i.$slides.eq(n).css({
				opacity: 1,
				zIndex: i.options.zIndex
			}), t && setTimeout(function () {
				i.disableTransition(n);
				t.call()
			}, i.options.speed))
	};
	t.prototype.fadeSlideOut = function (n) {
		var t = this;
		t.cssTransitions === !1 ? t.$slides.eq(n).animate({
			opacity: 0,
			zIndex: t.options.zIndex - 2
		}, t.options.speed, t.options.easing) : (t.applyTransition(n), t.$slides.eq(n).css({
				opacity: 0,
				zIndex: t.options.zIndex - 2
			}))
	};
	t.prototype.filterSlides = t.prototype.slickFilter = function (n) {
		var t = this;
		null !== n && (t.$slidesCache = t.$slides, t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(n).appendTo(t.$slideTrack), t.reinit())
	};
	t.prototype.focusHandler = function () {
		var t = this;
		t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*:not(.slick-arrow)", function (i) {
			i.stopImmediatePropagation();
			var r = n(this);
			setTimeout(function () {
				t.options.pauseOnFocus && (t.focussed = r.is(":focus"), t.autoPlay())
			}, 0)
		})
	};
	t.prototype.getCurrent = t.prototype.slickCurrentSlide = function () {
		var n = this;
		return n.currentSlide
	};
	t.prototype.getDotCount = function () {
		var n = this,
		i = 0,
		r = 0,
		t = 0;
		if (n.options.infinite === !0)
			for (; i < n.slideCount; )
				++t, i = r + n.options.slidesToScroll, r += n.options.slidesToScroll <= n.options.slidesToShow ? n.options.slidesToScroll : n.options.slidesToShow;
		else if (n.options.centerMode === !0)
			t = n.slideCount;
		else if (n.options.asNavFor)
			for (; i < n.slideCount; )
				++t, i = r + n.options.slidesToScroll, r += n.options.slidesToScroll <= n.options.slidesToShow ? n.options.slidesToScroll : n.options.slidesToShow;
		else
			t = 1 + Math.ceil((n.slideCount - n.options.slidesToShow) / n.options.slidesToScroll);
		return t - 1
	};
	t.prototype.getLeft = function (n) {
		var f,
		r,
		i,
		t = this,
		u = 0;
		return t.slideOffset = 0,
		r = t.$slides.first().outerHeight(!0),
		t.options.infinite === !0 ? (t.slideCount > t.options.slidesToShow && (t.slideOffset = t.slideWidth * t.options.slidesToShow * -1, u = r * t.options.slidesToShow * -1), t.slideCount % t.options.slidesToScroll != 0 && n + t.options.slidesToScroll > t.slideCount && t.slideCount > t.options.slidesToShow && (n > t.slideCount ? (t.slideOffset = (t.options.slidesToShow - (n - t.slideCount)) * t.slideWidth * -1, u = (t.options.slidesToShow - (n - t.slideCount)) * r * -1) : (t.slideOffset = t.slideCount % t.options.slidesToScroll * t.slideWidth * -1, u = t.slideCount % t.options.slidesToScroll * r * -1))) : n + t.options.slidesToShow > t.slideCount && (t.slideOffset = (n + t.options.slidesToShow - t.slideCount) * t.slideWidth, u = (n + t.options.slidesToShow - t.slideCount) * r),
		t.slideCount <= t.options.slidesToShow && (t.slideOffset = 0, u = 0),
		t.options.centerMode === !0 && t.options.infinite === !0 ? t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2) - t.slideWidth : t.options.centerMode === !0 && (t.slideOffset = 0, t.slideOffset += t.slideWidth * Math.floor(t.options.slidesToShow / 2)),
		f = t.options.vertical === !1 ? n * t.slideWidth * -1 + t.slideOffset : n * r * -1 + u,
		t.options.variableWidth === !0 && (i = t.slideCount <= t.options.slidesToShow || t.options.infinite === !1 ? t.$slideTrack.children(".slick-slide").eq(n) : t.$slideTrack.children(".slick-slide").eq(n + t.options.slidesToShow), f = t.options.rtl === !0 ? i[0] ? -1 * (t.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, t.options.centerMode === !0 && (i = t.slideCount <= t.options.slidesToShow || t.options.infinite === !1 ? t.$slideTrack.children(".slick-slide").eq(n) : t.$slideTrack.children(".slick-slide").eq(n + t.options.slidesToShow + 1), f = t.options.rtl === !0 ? i[0] ? -1 * (t.$slideTrack.width() - i[0].offsetLeft - i.width()) : 0 : i[0] ? -1 * i[0].offsetLeft : 0, f += (t.$list.width() - i.outerWidth()) / 2)),
		f
	};
	t.prototype.getOption = t.prototype.slickGetOption = function (n) {
		var t = this;
		return t.options[n]
	};
	t.prototype.getNavigableIndexes = function () {
		var i,
		n = this,
		t = 0,
		r = 0,
		u = [];
		for (n.options.infinite === !1 ? i = n.slideCount : (t = -1 * n.options.slidesToScroll, r = -1 * n.options.slidesToScroll, i = 2 * n.slideCount); i > t; )
			u.push(t), t = r + n.options.slidesToScroll, r += n.options.slidesToScroll <= n.options.slidesToShow ? n.options.slidesToScroll : n.options.slidesToShow;
		return u
	};
	t.prototype.getSlick = function () {
		return this
	};
	t.prototype.getSlideCount = function () {
		var u,
		i,
		r,
		t = this;
		return r = t.options.centerMode === !0 ? t.slideWidth * Math.floor(t.options.slidesToShow / 2) : 0,
		t.options.swipeToSlide === !0 ? (t.$slideTrack.find(".slick-slide").each(function (u, f) {
				if (f.offsetLeft - r + n(f).outerWidth() / 2 > -1 * t.swipeLeft)
					return (i = f, !1)
			}), u = Math.abs(n(i).attr("data-slick-index") - t.currentSlide) || 1) : t.options.slidesToScroll
	};
	t.prototype.goTo = t.prototype.slickGoTo = function (n, t) {
		var i = this;
		i.changeSlide({
			data: {
				message: "index",
				index: parseInt(n)
			}
		}, t)
	};
	t.prototype.init = function (t) {
		var i = this;
		n(i.$slider).hasClass("slick-initialized") || (n(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler());
		t && i.$slider.trigger("init", [i]);
		i.options.accessibility === !0 && i.initADA();
		i.options.autoplay && (i.paused = !1, i.autoPlay())
	};
	t.prototype.initADA = function () {
		var t = this;
		t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({
			"aria-hidden": "true",
			tabindex: "-1"
		}).find("a, input, button, select").attr({
			tabindex: "-1"
		});
		t.$slideTrack.attr("role", "listbox");
		t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function (i) {
			n(this).attr({
				role: "option",
				"aria-describedby": "slick-slide" + t.instanceUid + i
			})
		});
		null !== t.$dots && t.$dots.attr("role", "tablist").find("li").each(function (i) {
			n(this).attr({
				role: "presentation",
				"aria-selected": "false",
				"aria-controls": "navigation" + t.instanceUid + i,
				id: "slick-slide" + t.instanceUid + i
			})
		}).first().attr("aria-selected", "true").end().find("button").attr("role", "button").end().closest("div").attr("role", "toolbar");
		t.activateADA()
	};
	t.prototype.initArrowEvents = function () {
		var n = this;
		n.options.arrows === !0 && n.slideCount > n.options.slidesToShow && (n.$prevArrow.off("click.slick").on("click.slick", {
				message: "previous"
			}, n.changeSlide), n.$nextArrow.off("click.slick").on("click.slick", {
				message: "next"
			}, n.changeSlide))
	};
	t.prototype.initDotEvents = function () {
		var t = this;
		t.options.dots === !0 && t.slideCount > t.options.slidesToShow && n("li", t.$dots).on("click.slick", {
			message: "index"
		}, t.changeSlide);
		t.options.dots === !0 && t.options.pauseOnDotsHover === !0 && n("li", t.$dots).on("mouseenter.slick", n.proxy(t.interrupt, t, !0)).on("mouseleave.slick", n.proxy(t.interrupt, t, !1))
	};
	t.prototype.initSlideEvents = function () {
		var t = this;
		t.options.pauseOnHover && (t.$list.on("mouseenter.slick", n.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", n.proxy(t.interrupt, t, !1)))
	};
	t.prototype.initializeEvents = function () {
		var t = this;
		t.initArrowEvents();
		t.initDotEvents();
		t.initSlideEvents();
		t.$list.on("touchstart.slick mousedown.slick", {
			action: "start"
		}, t.swipeHandler);
		t.$list.on("touchmove.slick mousemove.slick", {
			action: "move"
		}, t.swipeHandler);
		t.$list.on("touchend.slick mouseup.slick", {
			action: "end"
		}, t.swipeHandler);
		t.$list.on("touchcancel.slick mouseleave.slick", {
			action: "end"
		}, t.swipeHandler);
		t.$list.on("click.slick", t.clickHandler);
		n(document).on(t.visibilityChange, n.proxy(t.visibility, t));
		t.options.accessibility === !0 && t.$list.on("keydown.slick", t.keyHandler);
		t.options.focusOnSelect === !0 && n(t.$slideTrack).children().on("click.slick", t.selectHandler);
		n(window).on("orientationchange.slick.slick-" + t.instanceUid, n.proxy(t.orientationChange, t));
		n(window).on("resize.slick.slick-" + t.instanceUid, n.proxy(t.resize, t));
		n("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault);
		n(window).on("load.slick.slick-" + t.instanceUid, t.setPosition);
		n(document).on("ready.slick.slick-" + t.instanceUid, t.setPosition)
	};
	t.prototype.initUI = function () {
		var n = this;
		n.options.arrows === !0 && n.slideCount > n.options.slidesToShow && (n.$prevArrow.show(), n.$nextArrow.show());
		n.options.dots === !0 && n.slideCount > n.options.slidesToShow && n.$dots.show()
	};
	t.prototype.keyHandler = function (n) {
		var t = this;
		n.target.tagName.match("TEXTAREA|INPUT|SELECT") || (37 === n.keyCode && t.options.accessibility === !0 ? t.changeSlide({
				data: {
					message: t.options.rtl === !0 ? "next" : "previous"
				}
			}) : 39 === n.keyCode && t.options.accessibility === !0 && t.changeSlide({
				data: {
					message: t.options.rtl === !0 ? "previous" : "next"
				}
			}))
	};
	t.prototype.lazyLoad = function () {
		function f(i) {
			n("img[data-lazy]", i).each(function () {
				var i = n(this),
				r = n(this).attr("data-lazy"),
				u = document.createElement("img");
				u.onload = function () {
					i.animate({
						opacity: 0
					}, 100, function () {
						i.attr("src", r).animate({
							opacity: 1
						}, 200, function () {
							i.removeAttr("data-lazy").removeClass("slick-loading")
						});
						t.$slider.trigger("lazyLoaded", [t, i, r])
					})
				};
				u.onerror = function () {
					i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error");
					t.$slider.trigger("lazyLoadError", [t, i, r])
				};
				u.src = r
			})
		}
		var e,
		r,
		i,
		u,
		t = this;
		t.options.centerMode === !0 ? t.options.infinite === !0 ? (i = t.currentSlide + (t.options.slidesToShow / 2 + 1), u = i + t.options.slidesToShow + 2) : (i = Math.max(0, t.currentSlide - (t.options.slidesToShow / 2 + 1)), u = 2 + (t.options.slidesToShow / 2 + 1) + t.currentSlide) : (i = t.options.infinite ? t.options.slidesToShow + t.currentSlide : t.currentSlide, u = Math.ceil(i + t.options.slidesToShow), t.options.fade === !0 && (i > 0 && i--, u <= t.slideCount && u++));
		e = t.$slider.find(".slick-slide").slice(i, u);
		f(e);
		t.slideCount <= t.options.slidesToShow ? (r = t.$slider.find(".slick-slide"), f(r)) : t.currentSlide >= t.slideCount - t.options.slidesToShow ? (r = t.$slider.find(".slick-cloned").slice(0, t.options.slidesToShow), f(r)) : 0 === t.currentSlide && (r = t.$slider.find(".slick-cloned").slice(-1 * t.options.slidesToShow), f(r))
	};
	t.prototype.loadSlider = function () {
		var n = this;
		n.setPosition();
		n.$slideTrack.css({
			opacity: 1
		});
		n.$slider.removeClass("slick-loading");
		n.initUI();
		"progressive" === n.options.lazyLoad && n.progressiveLazyLoad()
	};
	t.prototype.next = t.prototype.slickNext = function () {
		var n = this;
		n.changeSlide({
			data: {
				message: "next"
			}
		})
	};
	t.prototype.orientationChange = function () {
		var n = this;
		n.checkResponsive();
		n.setPosition()
	};
	t.prototype.pause = t.prototype.slickPause = function () {
		var n = this;
		n.autoPlayClear();
		n.paused = !0
	};
	t.prototype.play = t.prototype.slickPlay = function () {
		var n = this;
		n.autoPlay();
		n.options.autoplay = !0;
		n.paused = !1;
		n.focussed = !1;
		n.interrupted = !1
	};
	t.prototype.postSlide = function (n) {
		var t = this;
		t.unslicked || (t.$slider.trigger("afterChange", [t, n]), t.animating = !1, t.setPosition(), t.swipeLeft = null, t.options.autoplay && t.autoPlay(), t.options.accessibility === !0 && t.initADA())
	};
	t.prototype.prev = t.prototype.slickPrev = function () {
		var n = this;
		n.changeSlide({
			data: {
				message: "previous"
			}
		})
	};
	t.prototype.preventDefault = function (n) {
		n.preventDefault()
	};
	t.prototype.progressiveLazyLoad = function (t) {
		t = t || 1;
		var r,
		u,
		f,
		i = this,
		e = n("img[data-lazy]", i.$slider);
		e.length ? (r = e.first(), u = r.attr("data-lazy"), f = document.createElement("img"), f.onload = function () {
			r.attr("src", u).removeAttr("data-lazy").removeClass("slick-loading");
			i.options.adaptiveHeight === !0 && i.setPosition();
			i.$slider.trigger("lazyLoaded", [i, r, u]);
			i.progressiveLazyLoad()
		}, f.onerror = function () {
			3 > t ? setTimeout(function () {
				i.progressiveLazyLoad(t + 1)
			}, 500) : (r.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), i.$slider.trigger("lazyLoadError", [i, r, u]), i.progressiveLazyLoad())
		}, f.src = u) : i.$slider.trigger("allImagesLoaded", [i])
	};
	t.prototype.refresh = function (t) {
		var r,
		u,
		i = this;
		u = i.slideCount - i.options.slidesToShow;
		!i.options.infinite && i.currentSlide > u && (i.currentSlide = u);
		i.slideCount <= i.options.slidesToShow && (i.currentSlide = 0);
		r = i.currentSlide;
		i.destroy(!0);
		n.extend(i, i.initials, {
			currentSlide: r
		});
		i.init();
		t || i.changeSlide({
			data: {
				message: "index",
				index: r
			}
		}, !1)
	};
	t.prototype.registerBreakpoints = function () {
		var u,
		f,
		i,
		t = this,
		r = t.options.responsive || null;
		if ("array" === n.type(r) && r.length) {
			t.respondTo = t.options.respondTo || "window";
			for (u in r)
				if (i = t.breakpoints.length - 1, f = r[u].breakpoint, r.hasOwnProperty(u)) {
					for (; i >= 0; )
						t.breakpoints[i] && t.breakpoints[i] === f && t.breakpoints.splice(i, 1), i--;
					t.breakpoints.push(f);
					t.breakpointSettings[f] = r[u].settings
				}
			t.breakpoints.sort(function (n, i) {
				return t.options.mobileFirst ? n - i : i - n
			})
		}
	};
	t.prototype.reinit = function () {
		var t = this;
		t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide");
		t.slideCount = t.$slides.length;
		t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll);
		t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0);
		t.registerBreakpoints();
		t.setProps();
		t.setupInfinite();
		t.buildArrows();
		t.updateArrows();
		t.initArrowEvents();
		t.buildDots();
		t.updateDots();
		t.initDotEvents();
		t.cleanUpSlideEvents();
		t.initSlideEvents();
		t.checkResponsive(!1, !0);
		t.options.focusOnSelect === !0 && n(t.$slideTrack).children().on("click.slick", t.selectHandler);
		t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0);
		t.setPosition();
		t.focusHandler();
		t.paused = !t.options.autoplay;
		t.autoPlay();
		t.$slider.trigger("reInit", [t])
	};
	t.prototype.resize = function () {
		var t = this;
		n(window).width() !== t.windowWidth && (clearTimeout(t.windowDelay), t.windowDelay = window.setTimeout(function () {
					t.windowWidth = n(window).width();
					t.checkResponsive();
					t.unslicked || t.setPosition()
				}, 50))
	};
	t.prototype.removeSlide = t.prototype.slickRemove = function (n, t, i) {
		var r = this;
		return "boolean" == typeof n ? (t = n, n = t === !0 ? 0 : r.slideCount - 1) : n = t === !0 ? --n : n,
		r.slideCount < 1 || 0 > n || n > r.slideCount - 1 ? !1 : (r.unload(), i === !0 ? r.$slideTrack.children().remove() : r.$slideTrack.children(this.options.slide).eq(n).remove(), r.$slides = r.$slideTrack.children(this.options.slide), r.$slideTrack.children(this.options.slide).detach(), r.$slideTrack.append(r.$slides), r.$slidesCache = r.$slides, void r.reinit())
	};
	t.prototype.setCSS = function (n) {
		var r,
		u,
		t = this,
		i = {};
		t.options.rtl === !0 && (n = -n);
		r = "left" == t.positionProp ? Math.ceil(n) + "px" : "0px";
		u = "top" == t.positionProp ? Math.ceil(n) + "px" : "0px";
		i[t.positionProp] = n;
		t.transformsEnabled === !1 ? t.$slideTrack.css(i) : (i = {}, t.cssTransitions === !1 ? (i[t.animType] = "translate(" + r + ", " + u + ")", t.$slideTrack.css(i)) : (i[t.animType] = "translate3d(" + r + ", " + u + ", 0px)", t.$slideTrack.css(i)))
	};
	t.prototype.setDimensions = function () {
		var n = this,
		t;
		n.options.vertical === !1 ? n.options.centerMode === !0 && n.$list.css({
			padding: "0px " + n.options.centerPadding
		}) : (n.$list.height(n.$slides.first().outerHeight(!0) * n.options.slidesToShow), n.options.centerMode === !0 && n.$list.css({
				padding: n.options.centerPadding + " 0px"
			}));
		n.listWidth = n.$list.width();
		n.listHeight = n.$list.height();
		n.options.vertical === !1 && n.options.variableWidth === !1 ? (n.slideWidth = Math.ceil(n.listWidth / n.options.slidesToShow), n.$slideTrack.width(Math.ceil(n.slideWidth * n.$slideTrack.children(".slick-slide").length))) : n.options.variableWidth === !0 ? n.$slideTrack.width(5e3 * n.slideCount) : (n.slideWidth = Math.ceil(n.listWidth), n.$slideTrack.height(Math.ceil(n.$slides.first().outerHeight(!0) * n.$slideTrack.children(".slick-slide").length)));
		t = n.$slides.first().outerWidth(!0) - n.$slides.first().width();
		n.options.variableWidth === !1 && n.$slideTrack.children(".slick-slide").width(n.slideWidth - t)
	};
	t.prototype.setFade = function () {
		var i,
		t = this;
		t.$slides.each(function (r, u) {
			i = t.slideWidth * r * -1;
			t.options.rtl === !0 ? n(u).css({
				position: "relative",
				right: i,
				top: 0,
				zIndex: t.options.zIndex - 2,
				opacity: 0
			}) : n(u).css({
				position: "relative",
				left: i,
				top: 0,
				zIndex: t.options.zIndex - 2,
				opacity: 0
			})
		});
		t.$slides.eq(t.currentSlide).css({
			zIndex: t.options.zIndex - 1,
			opacity: 1
		})
	};
	t.prototype.setHeight = function () {
		var n = this,
		t;
		1 === n.options.slidesToShow && n.options.adaptiveHeight === !0 && n.options.vertical === !1 && (t = n.$slides.eq(n.currentSlide).outerHeight(!0), n.$list.css("height", t))
	};
	t.prototype.setOption = t.prototype.slickSetOption = function () {
		var u,
		f,
		e,
		i,
		r,
		t = this,
		o = !1;
		if ("object" === n.type(arguments[0]) ? (e = arguments[0], o = arguments[1], r = "multiple") : "string" === n.type(arguments[0]) && (e = arguments[0], i = arguments[1], o = arguments[2], "responsive" === arguments[0] && "array" === n.type(arguments[1]) ? r = "responsive" : "undefined" != typeof arguments[1] && (r = "single")), "single" === r)
			t.options[e] = i;
		else if ("multiple" === r)
			n.each(e, function (n, i) {
				t.options[n] = i
			});
		else if ("responsive" === r)
			for (f in i)
				if ("array" !== n.type(t.options.responsive))
					t.options.responsive = [i[f]];
				else {
					for (u = t.options.responsive.length - 1; u >= 0; )
						t.options.responsive[u].breakpoint === i[f].breakpoint && t.options.responsive.splice(u, 1), u--;
					t.options.responsive.push(i[f])
				}
		o && (t.unload(), t.reinit())
	};
	t.prototype.setPosition = function () {
		var n = this;
		n.setDimensions();
		n.setHeight();
		n.options.fade === !1 ? n.setCSS(n.getLeft(n.currentSlide)) : n.setFade();
		n.$slider.trigger("setPosition", [n])
	};
	t.prototype.setProps = function () {
		var n = this,
		t = document.body.style;
		n.positionProp = n.options.vertical === !0 ? "top" : "left";
		"top" === n.positionProp ? n.$slider.addClass("slick-vertical") : n.$slider.removeClass("slick-vertical");
		(void 0 !== t.WebkitTransition || void 0 !== t.MozTransition || void 0 !== t.msTransition) && n.options.useCSS === !0 && (n.cssTransitions = !0);
		n.options.fade && ("number" == typeof n.options.zIndex ? n.options.zIndex < 3 && (n.options.zIndex = 3) : n.options.zIndex = n.defaults.zIndex);
		void 0 !== t.OTransform && (n.animType = "OTransform", n.transformType = "-o-transform", n.transitionType = "OTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (n.animType = !1));
		void 0 !== t.MozTransform && (n.animType = "MozTransform", n.transformType = "-moz-transform", n.transitionType = "MozTransition", void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (n.animType = !1));
		void 0 !== t.webkitTransform && (n.animType = "webkitTransform", n.transformType = "-webkit-transform", n.transitionType = "webkitTransition", void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (n.animType = !1));
		void 0 !== t.msTransform && (n.animType = "msTransform", n.transformType = "-ms-transform", n.transitionType = "msTransition", void 0 === t.msTransform && (n.animType = !1));
		void 0 !== t.transform && n.animType !== !1 && (n.animType = "transform", n.transformType = "transform", n.transitionType = "transition");
		n.transformsEnabled = n.options.useTransform && null !== n.animType && n.animType !== !1
	};
	t.prototype.setSlideClasses = function (n) {
		var u,
		i,
		r,
		f,
		t = this;
		i = t.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true");
		t.$slides.eq(n).addClass("slick-current");
		t.options.centerMode === !0 ? (u = Math.floor(t.options.slidesToShow / 2), t.options.infinite === !0 && (n >= u && n <= t.slideCount - 1 - u ? t.$slides.slice(n - u, n + u + 1).addClass("slick-active").attr("aria-hidden", "false") : (r = t.options.slidesToShow + n, i.slice(r - u + 1, r + u + 2).addClass("slick-active").attr("aria-hidden", "false")), 0 === n ? i.eq(i.length - 1 - t.options.slidesToShow).addClass("slick-center") : n === t.slideCount - 1 && i.eq(t.options.slidesToShow).addClass("slick-center")), t.$slides.eq(n).addClass("slick-center")) : n >= 0 && n <= t.slideCount - t.options.slidesToShow ? t.$slides.slice(n, n + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false") : i.length <= t.options.slidesToShow ? i.addClass("slick-active").attr("aria-hidden", "false") : (f = t.slideCount % t.options.slidesToShow, r = t.options.infinite === !0 ? t.options.slidesToShow + n : n, t.options.slidesToShow == t.options.slidesToScroll && t.slideCount - n < t.options.slidesToShow ? i.slice(r - (t.options.slidesToShow - f), r + f).addClass("slick-active").attr("aria-hidden", "false") : i.slice(r, r + t.options.slidesToShow).addClass("slick-active").attr("aria-hidden", "false"));
		"ondemand" === t.options.lazyLoad && t.lazyLoad()
	};
	t.prototype.setupInfinite = function () {
		var i,
		r,
		u,
		t = this;
		if (t.options.fade === !0 && (t.options.centerMode = !1), t.options.infinite === !0 && t.options.fade === !1 && (r = null, t.slideCount > t.options.slidesToShow)) {
			for (u = t.options.centerMode === !0 ? t.options.slidesToShow + 1 : t.options.slidesToShow, i = t.slideCount; i > t.slideCount - u; i -= 1)
				r = i - 1, n(t.$slides[r]).clone(!0).attr("id", "").attr("data-slick-index", r - t.slideCount).prependTo(t.$slideTrack).addClass("slick-cloned");
			for (i = 0; u > i; i += 1)
				r = i, n(t.$slides[r]).clone(!0).attr("id", "").attr("data-slick-index", r + t.slideCount).appendTo(t.$slideTrack).addClass("slick-cloned");
			t.$slideTrack.find(".slick-cloned").find("[id]").each(function () {
				n(this).attr("id", "")
			})
		}
	};
	t.prototype.interrupt = function (n) {
		var t = this;
		n || t.autoPlay();
		t.interrupted = n
	};
	t.prototype.selectHandler = function (t) {
		var i = this,
		u = n(t.target).is(".slick-slide") ? n(t.target) : n(t.target).parents(".slick-slide"),
		r = parseInt(u.attr("data-slick-index"));
		return r || (r = 0),
		i.slideCount <= i.options.slidesToShow ? (i.setSlideClasses(r), void i.asNavFor(r)) : void i.slideHandler(r)
	};
	t.prototype.slideHandler = function (n, t, i) {
		var u,
		f,
		s,
		o,
		e,
		h = null,
		r = this;
		return t = t || !1,
		r.animating === !0 && r.options.waitForAnimate === !0 || r.options.fade === !0 && r.currentSlide === n || r.slideCount <= r.options.slidesToShow ? void 0 : (t === !1 && r.asNavFor(n), u = n, h = r.getLeft(u), o = r.getLeft(r.currentSlide), r.currentLeft = null === r.swipeLeft ? o : r.swipeLeft, r.options.infinite === !1 && r.options.centerMode === !1 && (0 > n || n > r.getDotCount() * r.options.slidesToScroll) ? void(r.options.fade === !1 && (u = r.currentSlide, i !== !0 ? r.animateSlide(o, function () {
						r.postSlide(u)
					}) : r.postSlide(u))) : r.options.infinite === !1 && r.options.centerMode === !0 && (0 > n || n > r.slideCount - r.options.slidesToScroll) ? void(r.options.fade === !1 && (u = r.currentSlide, i !== !0 ? r.animateSlide(o, function () {
						r.postSlide(u)
					}) : r.postSlide(u))) : (r.options.autoplay && clearInterval(r.autoPlayTimer), f = 0 > u ? r.slideCount % r.options.slidesToScroll != 0 ? r.slideCount - r.slideCount % r.options.slidesToScroll : r.slideCount + u : u >= r.slideCount ? r.slideCount % r.options.slidesToScroll != 0 ? 0 : u - r.slideCount : u, r.animating = !0, r.$slider.trigger("beforeChange", [r, r.currentSlide, f]), s = r.currentSlide, r.currentSlide = f, r.setSlideClasses(r.currentSlide), r.options.asNavFor && (e = r.getNavTarget(), e = e.slick("getSlick"), e.slideCount <= e.options.slidesToShow && e.setSlideClasses(r.currentSlide)), r.updateDots(), r.updateArrows(), r.options.fade === !0 ? (i !== !0 ? (r.fadeSlideOut(s), r.fadeSlide(f, function () {
							r.postSlide(f)
						})) : r.postSlide(f), void r.animateHeight()) : void(i !== !0 ? r.animateSlide(h, function () {
						r.postSlide(f)
					}) : r.postSlide(f))))
	};
	t.prototype.startLoad = function () {
		var n = this;
		n.options.arrows === !0 && n.slideCount > n.options.slidesToShow && (n.$prevArrow.hide(), n.$nextArrow.hide());
		n.options.dots === !0 && n.slideCount > n.options.slidesToShow && n.$dots.hide();
		n.$slider.addClass("slick-loading")
	};
	t.prototype.swipeDirection = function () {
		var i,
		r,
		u,
		n,
		t = this;
		return i = t.touchObject.startX - t.touchObject.curX,
		r = t.touchObject.startY - t.touchObject.curY,
		u = Math.atan2(r, i),
		n = Math.round(180 * u / Math.PI),
		0 > n && (n = 360 - Math.abs(n)),
		45 >= n && n >= 0 ? t.options.rtl === !1 ? "left" : "right" : 360 >= n && n >= 315 ? t.options.rtl === !1 ? "left" : "right" : n >= 135 && 225 >= n ? t.options.rtl === !1 ? "right" : "left" : t.options.verticalSwiping === !0 ? n >= 35 && 135 >= n ? "down" : "up" : "vertical"
	};
	t.prototype.swipeEnd = function () {
		var t,
		i,
		n = this;
		if (n.dragging = !1, n.interrupted = !1, n.shouldClick = n.touchObject.swipeLength > 10 ? !1 : !0, void 0 === n.touchObject.curX)
			return !1;
		if (n.touchObject.edgeHit === !0 && n.$slider.trigger("edge", [n, n.swipeDirection()]), n.touchObject.swipeLength >= n.touchObject.minSwipe) {
			switch (i = n.swipeDirection()) {
			case "left":
			case "down":
				t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide + n.getSlideCount()) : n.currentSlide + n.getSlideCount();
				n.currentDirection = 0;
				break;
			case "right":
			case "up":
				t = n.options.swipeToSlide ? n.checkNavigable(n.currentSlide - n.getSlideCount()) : n.currentSlide - n.getSlideCount();
				n.currentDirection = 1
			}
			"vertical" != i && (n.slideHandler(t), n.touchObject = {}, n.$slider.trigger("swipe", [n, i]))
		} else
			n.touchObject.startX !== n.touchObject.curX && (n.slideHandler(n.currentSlide), n.touchObject = {})
	};
	t.prototype.swipeHandler = function (n) {
		var t = this;
		if (!(t.options.swipe === !1 || "ontouchend" in document && t.options.swipe === !1 || t.options.draggable === !1 && -1 !== n.type.indexOf("mouse")))
			switch (t.touchObject.fingerCount = n.originalEvent && void 0 !== n.originalEvent.touches ? n.originalEvent.touches.length : 1, t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold, t.options.verticalSwiping === !0 && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold), n.data.action) {
			case "start":
				t.swipeStart(n);
				break;
			case "move":
				t.swipeMove(n);
				break;
			case "end":
				t.swipeEnd(n)
			}
	};
	t.prototype.swipeMove = function (n) {
		var f,
		e,
		r,
		u,
		i,
		t = this;
		return i = void 0 !== n.originalEvent ? n.originalEvent.touches : null,
		!t.dragging || i && 1 !== i.length ? !1 : (f = t.getLeft(t.currentSlide), t.touchObject.curX = void 0 !== i ? i[0].pageX : n.clientX, t.touchObject.curY = void 0 !== i ? i[0].pageY : n.clientY, t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curX - t.touchObject.startX, 2))), t.options.verticalSwiping === !0 && (t.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(t.touchObject.curY - t.touchObject.startY, 2)))), e = t.swipeDirection(), "vertical" !== e ? (void 0 !== n.originalEvent && t.touchObject.swipeLength > 4 && n.preventDefault(), u = (t.options.rtl === !1 ? 1 : -1) * (t.touchObject.curX > t.touchObject.startX ? 1 : -1), t.options.verticalSwiping === !0 && (u = t.touchObject.curY > t.touchObject.startY ? 1 : -1), r = t.touchObject.swipeLength, t.touchObject.edgeHit = !1, t.options.infinite === !1 && (0 === t.currentSlide && "right" === e || t.currentSlide >= t.getDotCount() && "left" === e) && (r = t.touchObject.swipeLength * t.options.edgeFriction, t.touchObject.edgeHit = !0), t.swipeLeft = t.options.vertical === !1 ? f + r * u : f + r * (t.$list.height() / t.listWidth) * u, t.options.verticalSwiping === !0 && (t.swipeLeft = f + r * u), t.options.fade === !0 || t.options.touchMove === !1 ? !1 : t.animating === !0 ? (t.swipeLeft = null, !1) : void t.setCSS(t.swipeLeft)) : void 0)
	};
	t.prototype.swipeStart = function (n) {
		var i,
		t = this;
		return t.interrupted = !0,
		1 !== t.touchObject.fingerCount || t.slideCount <= t.options.slidesToShow ? (t.touchObject = {}, !1) : (void 0 !== n.originalEvent && void 0 !== n.originalEvent.touches && (i = n.originalEvent.touches[0]), t.touchObject.startX = t.touchObject.curX = void 0 !== i ? i.pageX : n.clientX, t.touchObject.startY = t.touchObject.curY = void 0 !== i ? i.pageY : n.clientY, void(t.dragging = !0))
	};
	t.prototype.unfilterSlides = t.prototype.slickUnfilter = function () {
		var n = this;
		null !== n.$slidesCache && (n.unload(), n.$slideTrack.children(this.options.slide).detach(), n.$slidesCache.appendTo(n.$slideTrack), n.reinit())
	};
	t.prototype.unload = function () {
		var t = this;
		n(".slick-cloned", t.$slider).remove();
		t.$dots && t.$dots.remove();
		t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove();
		t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove();
		t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "")
	};
	t.prototype.unslick = function (n) {
		var t = this;
		t.$slider.trigger("unslick", [t, n]);
		t.destroy()
	};
	t.prototype.updateArrows = function () {
		var t,
		n = this;
		t = Math.floor(n.options.slidesToShow / 2);
		n.options.arrows === !0 && n.slideCount > n.options.slidesToShow && !n.options.infinite && (n.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), n.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"), 0 === n.currentSlide ? (n.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), n.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : n.currentSlide >= n.slideCount - n.options.slidesToShow && n.options.centerMode === !1 ? (n.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), n.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")) : n.currentSlide >= n.slideCount - 1 && n.options.centerMode === !0 && (n.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), n.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")))
	};
	t.prototype.updateDots = function () {
		var n = this;
		null !== n.$dots && (n.$dots.find("li").removeClass("slick-active").attr("aria-hidden", "true"), n.$dots.find("li").eq(Math.floor(n.currentSlide / n.options.slidesToScroll)).addClass("slick-active").attr("aria-hidden", "false"))
	};
	t.prototype.visibility = function () {
		var n = this;
		n.options.autoplay && (n.interrupted = document[n.hidden] ? !0 : !1)
	};
	n.fn.slick = function () {
		for (var u, i = this, r = arguments[0], f = Array.prototype.slice.call(arguments, 1), e = i.length, n = 0; e > n; n++)
			if ("object" == typeof r || "undefined" == typeof r ? i[n].slick = new t(i[n], r) : u = i[n].slick[r].apply(i[n].slick, f), "undefined" != typeof u)
				return u;
		return i
	}
});
"function" != typeof Object.create && (Object.create = function (n) {
	function t() {}
	return t.prototype = n,
	new t
}), function (n, t, i) {
	var r = {
		init: function (t, i) {
			this.$elem = n(i);
			this.options = n.extend({}, n.fn.owlCarousel.options, this.$elem.data(), t);
			this.userOptions = t;
			this.loadContent()
		},
		loadContent: function () {
			function r(n) {
				var i,
				r = "";
				if ("function" == typeof t.options.jsonSuccess)
					t.options.jsonSuccess.apply(this, [n]);
				else {
					for (i in n.owl)
						n.owl.hasOwnProperty(i) && (r += n.owl[i].item);
					t.$elem.html(r)
				}
				t.logIn()
			}
			var t = this,
			i;
			"function" == typeof t.options.beforeInit && t.options.beforeInit.apply(this, [t.$elem]);
			"string" == typeof t.options.jsonPath ? (i = t.options.jsonPath, n.getJSON(i, r)) : t.logIn()
		},
		logIn: function () {
			this.$elem.data("owl-originalStyles", this.$elem.attr("style"));
			this.$elem.data("owl-originalClasses", this.$elem.attr("class"));
			this.$elem.css({
				opacity: 0
			});
			this.orignalItems = this.options.items;
			this.checkBrowser();
			this.wrapperWidth = 0;
			this.checkVisible = null;
			this.setVars()
		},
		setVars: function () {
			if (0 === this.$elem.children().length)
				return !1;
			this.baseClass();
			this.eventTypes();
			this.$userItems = this.$elem.children();
			this.itemsAmount = this.$userItems.length;
			this.wrapItems();
			this.$owlItems = this.$elem.find(".owl-item");
			this.$owlWrapper = this.$elem.find(".owl-wrapper");
			this.playDirection = "next";
			this.prevItem = 0;
			this.prevArr = [0];
			this.currentItem = 0;
			this.customEvents();
			this.onStartup()
		},
		onStartup: function () {
			this.updateItems();
			this.calculateAll();
			this.buildControls();
			this.updateControls();
			this.response();
			this.moveEvents();
			this.stopOnHover();
			this.owlStatus();
			!1 !== this.options.transitionStyle && this.transitionTypes(this.options.transitionStyle);
			!0 === this.options.autoPlay && (this.options.autoPlay = 5e3);
			this.play();
			this.$elem.find(".owl-wrapper").css("display", "block");
			this.$elem.is(":visible") ? this.$elem.css("opacity", 1) : this.watchVisibility();
			this.onstartup = !1;
			this.eachMoveUpdate();
			"function" == typeof this.options.afterInit && this.options.afterInit.apply(this, [this.$elem])
		},
		eachMoveUpdate: function () {
			!0 === this.options.lazyLoad && this.lazyLoad();
			!0 === this.options.autoHeight && this.autoHeight();
			this.onVisibleItems();
			"function" == typeof this.options.afterAction && this.options.afterAction.apply(this, [this.$elem])
		},
		updateVars: function () {
			"function" == typeof this.options.beforeUpdate && this.options.beforeUpdate.apply(this, [this.$elem]);
			this.watchVisibility();
			this.updateItems();
			this.calculateAll();
			this.updatePosition();
			this.updateControls();
			this.eachMoveUpdate();
			"function" == typeof this.options.afterUpdate && this.options.afterUpdate.apply(this, [this.$elem])
		},
		reload: function () {
			var n = this;
			t.setTimeout(function () {
				n.updateVars()
			}, 0)
		},
		watchVisibility: function () {
			var n = this;
			if (!1 === n.$elem.is(":visible"))
				n.$elem.css({
					opacity: 0
				}), t.clearInterval(n.autoPlayInterval), t.clearInterval(n.checkVisible);
			else
				return !1;
			n.checkVisible = t.setInterval(function () {
					n.$elem.is(":visible") && (n.reload(), n.$elem.animate({
							opacity: 1
						}, 200), t.clearInterval(n.checkVisible))
				}, 500)
		},
		wrapItems: function () {
			this.$userItems.wrapAll('<div class="owl-wrapper">').wrap('<div class="owl-item"><\/div>');
			this.$elem.find(".owl-wrapper").wrap('<div class="owl-wrapper-outer">');
			this.wrapperOuter = this.$elem.find(".owl-wrapper-outer");
			this.$elem.css("display", "block")
		},
		baseClass: function () {
			var n = this.$elem.hasClass(this.options.baseClass),
			t = this.$elem.hasClass(this.options.theme);
			n || this.$elem.addClass(this.options.baseClass);
			t || this.$elem.addClass(this.options.theme)
		},
		updateItems: function () {
			var t,
			i;
			if (!1 === this.options.responsive)
				return !1;
			if (!0 === this.options.singleItem)
				return this.options.items = this.orignalItems = 1, this.options.itemsCustom = !1, this.options.itemsDesktop = !1, this.options.itemsDesktopSmall = !1, this.options.itemsTablet = !1, this.options.itemsTabletSmall = !1, this.options.itemsMobile = !1;
			if (t = n(this.options.responsiveBaseWidth).width(), t > (this.options.itemsDesktop[0] || this.orignalItems) && (this.options.items = this.orignalItems), !1 !== this.options.itemsCustom)
				for (this.options.itemsCustom.sort(function (n, t) {
						return n[0] - t[0]
					}), i = 0; i < this.options.itemsCustom.length; i += 1)
					this.options.itemsCustom[i][0] <= t && (this.options.items = this.options.itemsCustom[i][1]);
			else
				t <= this.options.itemsDesktop[0] && !1 !== this.options.itemsDesktop && (this.options.items = this.options.itemsDesktop[1]), t <= this.options.itemsDesktopSmall[0] && !1 !== this.options.itemsDesktopSmall && (this.options.items = this.options.itemsDesktopSmall[1]), t <= this.options.itemsTablet[0] && !1 !== this.options.itemsTablet && (this.options.items = this.options.itemsTablet[1]), t <= this.options.itemsTabletSmall[0] && !1 !== this.options.itemsTabletSmall && (this.options.items = this.options.itemsTabletSmall[1]), t <= this.options.itemsMobile[0] && !1 !== this.options.itemsMobile && (this.options.items = this.options.itemsMobile[1]);
			this.options.items > this.itemsAmount && !0 === this.options.itemsScaleUp && (this.options.items = this.itemsAmount)
		},
		response: function () {
			var i = this,
			u,
			r;
			if (!0 !== i.options.responsive)
				return !1;
			r = n(t).width();
			i.resizer = function () {
				n(t).width() !== r && (!1 !== i.options.autoPlay && t.clearInterval(i.autoPlayInterval), t.clearTimeout(u), u = t.setTimeout(function () {
							r = n(t).width();
							i.updateVars()
						}, i.options.responsiveRefreshRate))
			};
			n(t).resize(i.resizer)
		},
		updatePosition: function () {
			this.jumpTo(this.currentItem);
			!1 !== this.options.autoPlay && this.checkAp()
		},
		appendItemsSizes: function () {
			var t = this,
			i = 0,
			r = t.itemsAmount - t.options.items;
			t.$owlItems.each(function (u) {
				var f = n(this);
				f.css({
					width: t.itemWidth
				}).data("owl-item", Number(u));
				(0 == u % t.options.items || u === r) && (u > r || (i += 1));
				f.data("owl-roundPages", i)
			})
		},
		appendWrapperSizes: function () {
			this.$owlWrapper.css({
				width: this.$owlItems.length * this.itemWidth * 2,
				left: 0
			});
			this.appendItemsSizes()
		},
		calculateAll: function () {
			this.calculateWidth();
			this.appendWrapperSizes();
			this.loops();
			this.max()
		},
		calculateWidth: function () {
			this.itemWidth = Math.round(this.$elem.width() / this.options.items)
		},
		max: function () {
			var n = -1 * (this.itemsAmount * this.itemWidth - this.options.items * this.itemWidth);
			return this.options.items > this.itemsAmount ? this.maximumPixels = n = this.maximumItem = 0 : (this.maximumItem = this.itemsAmount - this.options.items, this.maximumPixels = n),
			n
		},
		min: function () {
			return 0
		},
		loops: function () {
			var r = 0,
			u = 0,
			t,
			i;
			for (this.positionsInArray = [0], this.pagesInArray = [], t = 0; t < this.itemsAmount; t += 1)
				u += this.itemWidth, this.positionsInArray.push(-u), !0 === this.options.scrollPerPage && (i = n(this.$owlItems[t]), i = i.data("owl-roundPages"), i !== r && (this.pagesInArray[r] = this.positionsInArray[t], r = i))
		},
		buildControls: function () {
			(!0 === this.options.navigation || !0 === this.options.pagination) && (this.owlControls = n('<div class="owl-controls"/>').toggleClass("clickable", !this.browser.isTouch).appendTo(this.$elem));
			!0 === this.options.pagination && this.buildPagination();
			!0 === this.options.navigation && this.buildButtons()
		},
		buildButtons: function () {
			var t = this,
			i = n('<div class="owl-buttons"/>');
			t.owlControls.append(i);
			t.buttonPrev = n("<div/>", {
					"class": "owl-prev",
					html: t.options.navigationText[0] || ""
				});
			t.buttonNext = n("<div/>", {
					"class": "owl-next",
					html: t.options.navigationText[1] || ""
				});
			i.append(t.buttonPrev).append(t.buttonNext);
			i.on("touchstart.owlControls mousedown.owlControls", 'div[class^="owl"]', function (n) {
				n.preventDefault()
			});
			i.on("touchend.owlControls mouseup.owlControls", 'div[class^="owl"]', function (i) {
				i.preventDefault();
				n(this).hasClass("owl-next") ? t.next() : t.prev()
			})
		},
		buildPagination: function () {
			var t = this;
			t.paginationWrapper = n('<div class="owl-pagination"/>');
			t.owlControls.append(t.paginationWrapper);
			t.paginationWrapper.on("touchend.owlControls mouseup.owlControls", ".owl-page", function (i) {
				i.preventDefault();
				Number(n(this).data("owl-page")) !== t.currentItem && t.goTo(Number(n(this).data("owl-page")), !0)
			})
		},
		updatePagination: function () {
			var r,
			u,
			f,
			t,
			i,
			e;
			if (!1 === this.options.pagination)
				return !1;
			for (this.paginationWrapper.html(""), r = 0, u = this.itemsAmount - this.itemsAmount % this.options.items, t = 0; t < this.itemsAmount; t += 1)
				0 == t % this.options.items && (r += 1, u === t && (f = this.itemsAmount - this.options.items), i = n("<div/>", {
							"class": "owl-page"
						}), e = n("<span><\/span>", {
							text: !0 === this.options.paginationNumbers ? r : "",
							"class": !0 === this.options.paginationNumbers ? "owl-numbers" : ""
						}), i.append(e), i.data("owl-page", u === t ? f : t), i.data("owl-roundPages", r), this.paginationWrapper.append(i));
			this.checkPagination()
		},
		checkPagination: function () {
			var t = this;
			if (!1 === t.options.pagination)
				return !1;
			t.paginationWrapper.find(".owl-page").each(function () {
				n(this).data("owl-roundPages") === n(t.$owlItems[t.currentItem]).data("owl-roundPages") && (t.paginationWrapper.find(".owl-page").removeClass("active"), n(this).addClass("active"))
			})
		},
		checkNavigation: function () {
			if (!1 === this.options.navigation)
				return !1;
			!1 === this.options.rewindNav && (0 === this.currentItem && 0 === this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.addClass("disabled")) : 0 === this.currentItem && 0 !== this.maximumItem ? (this.buttonPrev.addClass("disabled"), this.buttonNext.removeClass("disabled")) : this.currentItem === this.maximumItem ? (this.buttonPrev.removeClass("disabled"), this.buttonNext.addClass("disabled")) : 0 !== this.currentItem && this.currentItem !== this.maximumItem && (this.buttonPrev.removeClass("disabled"), this.buttonNext.removeClass("disabled")))
		},
		updateControls: function () {
			this.updatePagination();
			this.checkNavigation();
			this.owlControls && (this.options.items >= this.itemsAmount ? this.owlControls.hide() : this.owlControls.show())
		},
		destroyControls: function () {
			this.owlControls && this.owlControls.remove()
		},
		next: function (n) {
			if (this.isTransition)
				return !1;
			if (this.currentItem += !0 === this.options.scrollPerPage ? this.options.items : 1, this.currentItem > this.maximumItem + (!0 === this.options.scrollPerPage ? this.options.items - 1 : 0))
				if (!0 === this.options.rewindNav)
					this.currentItem = 0, n = "rewind";
				else
					return this.currentItem = this.maximumItem, !1;
			this.goTo(this.currentItem, n)
		},
		prev: function (n) {
			if (this.isTransition)
				return !1;
			if (this.currentItem = !0 === this.options.scrollPerPage && 0 < this.currentItem && this.currentItem < this.options.items ? 0 : this.currentItem - (!0 === this.options.scrollPerPage ? this.options.items : 1), 0 > this.currentItem)
				if (!0 === this.options.rewindNav)
					this.currentItem = this.maximumItem, n = "rewind";
				else
					return this.currentItem = 0, !1;
			this.goTo(this.currentItem, n)
		},
		goTo: function (n, i, r) {
			var u = this;
			if (u.isTransition)
				return !1;
			if ("function" == typeof u.options.beforeMove && u.options.beforeMove.apply(this, [u.$elem]), n >= u.maximumItem ? n = u.maximumItem : 0 >= n && (n = 0), u.currentItem = u.owl.currentItem = n, !1 !== u.options.transitionStyle && "drag" !== r && 1 === u.options.items && !0 === u.browser.support3d)
				return u.swapSpeed(0), !0 === u.browser.support3d ? u.transition3d(u.positionsInArray[n]) : u.css2slide(u.positionsInArray[n], 1), u.afterGo(), u.singleItemTransition(), !1;
			n = u.positionsInArray[n];
			!0 === u.browser.support3d ? (u.isCss3Finish = !1, !0 === i ? (u.swapSpeed("paginationSpeed"), t.setTimeout(function () {
						u.isCss3Finish = !0
					}, u.options.paginationSpeed)) : "rewind" === i ? (u.swapSpeed(u.options.rewindSpeed), t.setTimeout(function () {
						u.isCss3Finish = !0
					}, u.options.rewindSpeed)) : (u.swapSpeed("slideSpeed"), t.setTimeout(function () {
						u.isCss3Finish = !0
					}, u.options.slideSpeed)), u.transition3d(n)) : !0 === i ? u.css2slide(n, u.options.paginationSpeed) : "rewind" === i ? u.css2slide(n, u.options.rewindSpeed) : u.css2slide(n, u.options.slideSpeed);
			u.afterGo()
		},
		jumpTo: function (n) {
			"function" == typeof this.options.beforeMove && this.options.beforeMove.apply(this, [this.$elem]);
			n >= this.maximumItem || -1 === n ? n = this.maximumItem : 0 >= n && (n = 0);
			this.swapSpeed(0);
			!0 === this.browser.support3d ? this.transition3d(this.positionsInArray[n]) : this.css2slide(this.positionsInArray[n], 1);
			this.currentItem = this.owl.currentItem = n;
			this.afterGo()
		},
		afterGo: function () {
			this.prevArr.push(this.currentItem);
			this.prevItem = this.owl.prevItem = this.prevArr[this.prevArr.length - 2];
			this.prevArr.shift(0);
			this.prevItem !== this.currentItem && (this.checkPagination(), this.checkNavigation(), this.eachMoveUpdate(), !1 !== this.options.autoPlay && this.checkAp());
			"function" == typeof this.options.afterMove && this.prevItem !== this.currentItem && this.options.afterMove.apply(this, [this.$elem])
		},
		stop: function () {
			this.apStatus = "stop";
			t.clearInterval(this.autoPlayInterval)
		},
		checkAp: function () {
			"stop" !== this.apStatus && this.play()
		},
		play: function () {
			var n = this;
			if (n.apStatus = "play", !1 === n.options.autoPlay)
				return !1;
			t.clearInterval(n.autoPlayInterval);
			n.autoPlayInterval = t.setInterval(function () {
					n.next(!0)
				}, n.options.autoPlay)
		},
		swapSpeed: function (n) {
			"slideSpeed" === n ? this.$owlWrapper.css(this.addCssSpeed(this.options.slideSpeed)) : "paginationSpeed" === n ? this.$owlWrapper.css(this.addCssSpeed(this.options.paginationSpeed)) : "string" != typeof n && this.$owlWrapper.css(this.addCssSpeed(n))
		},
		addCssSpeed: function (n) {
			return {
				"-webkit-transition": "all " + n + "ms ease",
				"-moz-transition": "all " + n + "ms ease",
				"-o-transition": "all " + n + "ms ease",
				transition: "all " + n + "ms ease"
			}
		},
		removeTransition: function () {
			return {
				"-webkit-transition": "",
				"-moz-transition": "",
				"-o-transition": "",
				transition: ""
			}
		},
		doTranslate: function (n) {
			return {
				"-webkit-transform": "translate3d(" + n + "px, 0px, 0px)",
				"-moz-transform": "translate3d(" + n + "px, 0px, 0px)",
				"-o-transform": "translate3d(" + n + "px, 0px, 0px)",
				"-ms-transform": "translate3d(" + n + "px, 0px, 0px)",
				transform: "translate3d(" + n + "px, 0px,0px)"
			}
		},
		transition3d: function (n) {
			this.$owlWrapper.css(this.doTranslate(n))
		},
		css2move: function (n) {
			this.$owlWrapper.css({
				left: n
			})
		},
		css2slide: function (n, t) {
			var i = this;
			i.isCssFinish = !1;
			i.$owlWrapper.stop(!0, !0).animate({
				left: n
			}, {
				duration: t || i.options.slideSpeed,
				complete: function () {
					i.isCssFinish = !0
				}
			})
		},
		checkBrowser: function () {
			var n = i.createElement("div");
			n.style.cssText = "  -moz-transform:translate3d(0px, 0px, 0px); -ms-transform:translate3d(0px, 0px, 0px); -o-transform:translate3d(0px, 0px, 0px); -webkit-transform:translate3d(0px, 0px, 0px); transform:translate3d(0px, 0px, 0px)";
			n = n.style.cssText.match(/translate3d\(0px, 0px, 0px\)/g);
			this.browser = {
				support3d: null !== n && 1 === n.length,
				isTouch: "ontouchstart" in t || t.navigator.msMaxTouchPoints
			}
		},
		moveEvents: function () {
			(!1 !== this.options.mouseDrag || !1 !== this.options.touchDrag) && (this.gestures(), this.disabledEvents())
		},
		eventTypes: function () {
			var n = ["s", "e", "x"];
			this.ev_types = {};
			!0 === this.options.mouseDrag && !0 === this.options.touchDrag ? n = ["touchstart.owl mousedown.owl", "touchmove.owl mousemove.owl", "touchend.owl touchcancel.owl mouseup.owl"] : !1 === this.options.mouseDrag && !0 === this.options.touchDrag ? n = ["touchstart.owl", "touchmove.owl", "touchend.owl touchcancel.owl"] : !0 === this.options.mouseDrag && !1 === this.options.touchDrag && (n = ["mousedown.owl", "mousemove.owl", "mouseup.owl"]);
			this.ev_types.start = n[0];
			this.ev_types.move = n[1];
			this.ev_types.end = n[2]
		},
		disabledEvents: function () {
			this.$elem.on("dragstart.owl", function (n) {
				n.preventDefault()
			});
			this.$elem.on("mousedown.disableTextSelect", function (t) {
				return n(t.target).is("input, textarea, select, option")
			})
		},
		gestures: function () {
			function f(n) {
				if (void 0 !== n.touches)
					return {
						x: n.touches[0].pageX,
						y: n.touches[0].pageY
					};
				if (void 0 === n.touches) {
					if (void 0 !== n.pageX)
						return {
							x: n.pageX,
							y: n.pageY
						};
					if (void 0 === n.pageX)
						return {
							x: n.clientX,
							y: n.clientY
						}
				}
			}
			function e(t) {
				"on" === t ? (n(i).on(r.ev_types.move, o), n(i).on(r.ev_types.end, s)) : "off" === t && (n(i).off(r.ev_types.move), n(i).off(r.ev_types.end))
			}
			function o(e) {
				e = e.originalEvent || e || t.event;
				r.newPosX = f(e).x - u.offsetX;
				r.newPosY = f(e).y - u.offsetY;
				r.newRelativeX = r.newPosX - u.relativePos;
				"function" == typeof r.options.startDragging && !0 !== u.dragging && 0 !== r.newRelativeX && (u.dragging = !0, r.options.startDragging.apply(r, [r.$elem]));
				(8 < r.newRelativeX || -8 > r.newRelativeX) && !0 === r.browser.isTouch && (void 0 !== e.preventDefault ? e.preventDefault() : e.returnValue = !1, u.sliding = !0);
				(10 < r.newPosY || -10 > r.newPosY) && !1 === u.sliding && n(i).off("touchmove.owl");
				r.newPosX = Math.max(Math.min(r.newPosX, r.newRelativeX / 5), r.maximumPixels + r.newRelativeX / 5);
				!0 === r.browser.support3d ? r.transition3d(r.newPosX) : r.css2move(r.newPosX)
			}
			function s(i) {
				i = i.originalEvent || i || t.event;
				var f;
				i.target = i.target || i.srcElement;
				u.dragging = !1;
				!0 !== r.browser.isTouch && r.$owlWrapper.removeClass("grabbing");
				r.dragDirection = r.owl.dragDirection = 0 > r.newRelativeX ? "left" : "right";
				0 !== r.newRelativeX && (f = r.getNewPosition(), r.goTo(f, !1, "drag"), u.targetElement === i.target && !0 !== r.browser.isTouch && (n(i.target).on("click.disable", function (t) {
							t.stopImmediatePropagation();
							t.stopPropagation();
							t.preventDefault();
							n(t.target).off("click.disable")
						}), i = n._data(i.target, "events").click, f = i.pop(), i.splice(0, 0, f)));
				e("off")
			}
			var r = this,
			u = {
				offsetX: 0,
				offsetY: 0,
				baseElWidth: 0,
				relativePos: 0,
				position: null,
				minSwipe: null,
				maxSwipe: null,
				sliding: null,
				dargging: null,
				targetElement: null
			};
			r.isCssFinish = !0;
			r.$elem.on(r.ev_types.start, ".owl-wrapper", function (i) {
				i = i.originalEvent || i || t.event;
				var o;
				if (3 === i.which)
					return !1;
				if (!(r.itemsAmount <= r.options.items)) {
					if (!1 === r.isCssFinish && !r.options.dragBeforeAnimFinish || !1 === r.isCss3Finish && !r.options.dragBeforeAnimFinish)
						return !1;
					!1 !== r.options.autoPlay && t.clearInterval(r.autoPlayInterval);
					!0 === r.browser.isTouch || r.$owlWrapper.hasClass("grabbing") || r.$owlWrapper.addClass("grabbing");
					r.newPosX = 0;
					r.newRelativeX = 0;
					n(this).css(r.removeTransition());
					o = n(this).position();
					u.relativePos = o.left;
					u.offsetX = f(i).x - o.left;
					u.offsetY = f(i).y - o.top;
					e("on");
					u.sliding = !1;
					u.targetElement = i.target || i.srcElement
				}
			})
		},
		getNewPosition: function () {
			var n = this.closestItem();
			return n > this.maximumItem ? n = this.currentItem = this.maximumItem : 0 <= this.newPosX && (this.currentItem = n = 0),
			n
		},
		closestItem: function () {
			var t = this,
			i = !0 === t.options.scrollPerPage ? t.pagesInArray : t.positionsInArray,
			u = t.newPosX,
			r = null;
			return n.each(i, function (f, e) {
				u - t.itemWidth / 20 > i[f + 1] && u - t.itemWidth / 20 < e && "left" === t.moveDirection() ? (r = e, t.currentItem = !0 === t.options.scrollPerPage ? n.inArray(r, t.positionsInArray) : f) : u + t.itemWidth / 20 < e && u + t.itemWidth / 20 > (i[f + 1] || i[f] - t.itemWidth) && "right" === t.moveDirection() && (!0 === t.options.scrollPerPage ? (r = i[f + 1] || i[i.length - 1], t.currentItem = n.inArray(r, t.positionsInArray)) : (r = i[f + 1], t.currentItem = f + 1))
			}),
			t.currentItem
		},
		moveDirection: function () {
			var n;
			return 0 > this.newRelativeX ? (n = "right", this.playDirection = "next") : (n = "left", this.playDirection = "prev"),
			n
		},
		customEvents: function () {
			var n = this;
			n.$elem.on("owl.next", function () {
				n.next()
			});
			n.$elem.on("owl.prev", function () {
				n.prev()
			});
			n.$elem.on("owl.play", function (t, i) {
				n.options.autoPlay = i;
				n.play();
				n.hoverStatus = "play"
			});
			n.$elem.on("owl.stop", function () {
				n.stop();
				n.hoverStatus = "stop"
			});
			n.$elem.on("owl.goTo", function (t, i) {
				n.goTo(i)
			});
			n.$elem.on("owl.jumpTo", function (t, i) {
				n.jumpTo(i)
			})
		},
		stopOnHover: function () {
			var n = this;
			!0 === n.options.stopOnHover && !0 !== n.browser.isTouch && !1 !== n.options.autoPlay && (n.$elem.on("mouseover", function () {
					n.stop()
				}), n.$elem.on("mouseout", function () {
					"stop" !== n.hoverStatus && n.play()
				}))
		},
		lazyLoad: function () {
			var r,
			t,
			u,
			i,
			f;
			if (!1 === this.options.lazyLoad)
				return !1;
			for (r = 0; r < this.itemsAmount; r += 1)
				t = n(this.$owlItems[r]), "loaded" !== t.data("owl-loaded") && (u = t.data("owl-item"), i = t.find(".lazyOwl"), "string" != typeof i.data("src") ? t.data("owl-loaded", "loaded") : (void 0 === t.data("owl-loaded") && (i.hide(), t.addClass("loading").data("owl-loaded", "checked")), (f = !0 === this.options.lazyFollow ? u >= this.currentItem : !0) && u < this.currentItem + this.options.items && i.length && this.lazyPreload(t, i)))
		},
		lazyPreload: function (n, i) {
			function u() {
				n.data("owl-loaded", "loaded").removeClass("loading");
				i.removeAttr("data-src");
				"fade" === r.options.lazyEffect ? i.fadeIn(400) : i.show();
				"function" == typeof r.options.afterLazyLoad && r.options.afterLazyLoad.apply(this, [r.$elem])
			}
			function f() {
				e += 1;
				r.completeImg(i.get(0)) || !0 === o ? u() : 100 >= e ? t.setTimeout(f, 100) : u()
			}
			var r = this,
			e = 0,
			o;
			"DIV" === i.prop("tagName") ? (i.css("background-image", "url(" + i.data("src") + ")"), o = !0) : i[0].src = i.data("src");
			f()
		},
		autoHeight: function () {
			function u() {
				var r = n(i.$owlItems[i.currentItem]).height();
				i.wrapperOuter.css("height", r + "px");
				i.wrapperOuter.hasClass("autoHeight") || t.setTimeout(function () {
					i.wrapperOuter.addClass("autoHeight")
				}, 0)
			}
			function f() {
				r += 1;
				i.completeImg(e.get(0)) ? u() : 100 >= r ? t.setTimeout(f, 100) : i.wrapperOuter.css("height", "")
			}
			var i = this,
			e = n(i.$owlItems[i.currentItem]).find("img"),
			r;
			void 0 !== e.get(0) ? (r = 0, f()) : u()
		},
		completeImg: function (n) {
			return !n.complete || "undefined" != typeof n.naturalWidth && 0 === n.naturalWidth ? !1 : !0
		},
		onVisibleItems: function () {
			var t;
			for (!0 === this.options.addClassActive && this.$owlItems.removeClass("active"), this.visibleItems = [], t = this.currentItem; t < this.currentItem + this.options.items; t += 1)
				this.visibleItems.push(t), !0 === this.options.addClassActive && n(this.$owlItems[t]).addClass("active");
			this.owl.visibleItems = this.visibleItems
		},
		transitionTypes: function (n) {
			this.outClass = "owl-" + n + "-out";
			this.inClass = "owl-" + n + "-in"
		},
		singleItemTransition: function () {
			var n = this,
			u = n.outClass,
			f = n.inClass,
			t = n.$owlItems.eq(n.currentItem),
			i = n.$owlItems.eq(n.prevItem),
			e = Math.abs(n.positionsInArray[n.currentItem]) + n.positionsInArray[n.prevItem],
			r = Math.abs(n.positionsInArray[n.currentItem]) + n.itemWidth / 2;
			n.isTransition = !0;
			n.$owlWrapper.addClass("owl-origin").css({
				"-webkit-transform-origin": r + "px",
				"-moz-perspective-origin": r + "px",
				"perspective-origin": r + "px"
			});
			i.css({
				position: "relative",
				left: e + "px"
			}).addClass(u).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function () {
				n.endPrev = !0;
				i.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
				n.clearTransStyle(i, u)
			});
			t.addClass(f).on("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend", function () {
				n.endCurrent = !0;
				t.off("webkitAnimationEnd oAnimationEnd MSAnimationEnd animationend");
				n.clearTransStyle(t, f)
			})
		},
		clearTransStyle: function (n, t) {
			n.css({
				position: "",
				left: ""
			}).removeClass(t);
			this.endPrev && this.endCurrent && (this.$owlWrapper.removeClass("owl-origin"), this.isTransition = this.endCurrent = this.endPrev = !1)
		},
		owlStatus: function () {
			this.owl = {
				userOptions: this.userOptions,
				baseElement: this.$elem,
				userItems: this.$userItems,
				owlItems: this.$owlItems,
				currentItem: this.currentItem,
				prevItem: this.prevItem,
				visibleItems: this.visibleItems,
				isTouch: this.browser.isTouch,
				browser: this.browser,
				dragDirection: this.dragDirection
			}
		},
		clearEvents: function () {
			this.$elem.off(".owl owl mousedown.disableTextSelect");
			n(i).off(".owl owl");
			n(t).off("resize", this.resizer)
		},
		unWrap: function () {
			0 !== this.$elem.children().length && (this.$owlWrapper.unwrap(), this.$userItems.unwrap().unwrap(), this.owlControls && this.owlControls.remove());
			this.clearEvents();
			this.$elem.attr("style", this.$elem.data("owl-originalStyles") || "").attr("class", this.$elem.data("owl-originalClasses"))
		},
		destroy: function () {
			this.stop();
			t.clearInterval(this.checkVisible);
			this.unWrap();
			this.$elem.removeData()
		},
		reinit: function (t) {
			t = n.extend({}, this.userOptions, t);
			this.unWrap();
			this.init(t, this.$elem)
		},
		addItem: function (n, t) {
			var i;
			if (!n)
				return !1;
			if (0 === this.$elem.children().length)
				return this.$elem.append(n), this.setVars(), !1;
			this.unWrap();
			i = void 0 === t || -1 === t ? -1 : t;
			i >= this.$userItems.length || -1 === i ? this.$userItems.eq(-1).after(n) : this.$userItems.eq(i).before(n);
			this.setVars()
		},
		removeItem: function (n) {
			if (0 === this.$elem.children().length)
				return !1;
			n = void 0 === n || -1 === n ? -1 : n;
			this.unWrap();
			this.$userItems.eq(n).remove();
			this.setVars()
		}
	};
	n.fn.owlCarousel = function (t) {
		return this.each(function () {
			if (!0 === n(this).data("owl-init"))
				return !1;
			n(this).data("owl-init", !0);
			var i = Object.create(r);
			i.init(t, this);
			n.data(this, "owlCarousel", i)
		})
	};
	n.fn.owlCarousel.options = {
		items: 5,
		itemsCustom: !1,
		itemsDesktop: [1199, 4],
		itemsDesktopSmall: [979, 3],
		itemsTablet: [768, 2],
		itemsTabletSmall: !1,
		itemsMobile: [479, 1],
		singleItem: !1,
		itemsScaleUp: !1,
		slideSpeed: 200,
		paginationSpeed: 800,
		rewindSpeed: 1e3,
		autoPlay: !1,
		stopOnHover: !1,
		navigation: !1,
		navigationText: ["‹", "›"],
		rewindNav: !0,
		scrollPerPage: !1,
		pagination: !0,
		paginationNumbers: !1,
		responsive: !0,
		responsiveRefreshRate: 200,
		responsiveBaseWidth: t,
		baseClass: "owl-carousel",
		theme: "owl-theme",
		lazyLoad: !1,
		lazyFollow: !0,
		lazyEffect: "fade",
		autoHeight: !1,
		jsonPath: !1,
		jsonSuccess: !1,
		dragBeforeAnimFinish: !0,
		mouseDrag: !0,
		touchDrag: !0,
		addClassActive: !1,
		transitionStyle: !1,
		beforeUpdate: !1,
		afterUpdate: !1,
		beforeInit: !1,
		afterInit: !1,
		beforeMove: !1,
		afterMove: !1,
		afterAction: !1,
		startDragging: !1,
		afterLazyLoad: !1
	}
}
(jQuery, window, document), function () {
	function w(n, t) {
		var u = [],
		r,
		i;
		try {
			for (r = document.evaluate(n, t || document, null, XPathResult.ANY_TYPE, null), i = r.iterateNext(); i; i = r.iterateNext())
				u.push(i)
		} catch (f) {}
		return u
	}
	function b(n, t) {
		var i = [];
		try {
			i = Array.prototype.slice.call((t || document).querySelectorAll(n))
		} catch (r) {}
		return i
	}
	function k(n, t) {
		for (var f = (t || document).getElementsByTagName("*"), r = [], u = 0, i; i = f[u]; u++)
			i.getAttribute(n) && r.push(i);
		return r
	}
	function s(n) {
		for (var i, t = 1; t < arguments.length; t++)
			if (typeof arguments[t] == "object")
				for (i in arguments[t])
					arguments[t].hasOwnProperty(i) && (n[i] = arguments[t][i]);
		return n
	}
	function d() {
		function v(n, i) {
			t.disableAnimation ? i() : (n.getBoundingClientRect(), n.classList.add("animating"), i && i(), setTimeout(function () {
					n.classList.remove("animating")
				}, t.animateDuration))
		}
		function y(n, i, r, u) {
			t.disableAnimation ? u && u() : (n.classList.add(i), n.getBoundingClientRect(), n.classList.add("animating"), n.classList.remove(i), n.classList.add(r), u && u(), setTimeout(function () {
					n.classList.remove("animating");
					n.classList.remove(r)
				}, t.animateDuration))
		}
		function w() {
			document.removeChild(i)
		}
		function p() {
			return i.style.visibility !== "collapse" && (i.style.visibility = "collapse"),
			i.style.left = "-9999px",
			i.style.top = "-9999px",
			r.style.display !== "none" && (r.style.display = "none", r.style.visibility = "collapse", r.style.height = "auto"),
			this
		}
		function b() {
			var u = document.createElement("div");
			u.innerHTML = n.HTMLTemplate ? n.HTMLTemplate : e.HTML;
			i = u.firstChild;
			o = i.getElementsByClassName(e.hookClasses.tooltipBox)[0];
			c = i.getElementsByClassName(e.hookClasses.tooltipText)[0];
			r = i.getElementsByClassName(e.hookClasses.tooltipMore)[0];
			a = r.getElementsByClassName(e.hookClasses.tooltipMoreText)[0];
			p();
			t = s({}, l)
		}
		function k(n) {
			return n ? (t !== n && (t = s({}, l, n), tt()), this) : t
		}
		function d() {
			return i.style.visibility !== "visible" && (i.style.visibility = "visible", h(), y(o, t.animateFunction + "-from", t.animateFunction + "-to")),
			this
		}
		function g() {
			if (i.style.visibility !== "visible")
				i.style.visibility = "visible", y(o, t.animateFunction + "-from", t.animateFunction + "-to"), t.contentMore && (r.style.display = "block", r.style.visibility = "visible"), h();
			else if (r.style.display !== "block" && t.contentMore) {
				r.style.display = "block";
				v(i);
				h();
				var n = r.getBoundingClientRect().height;
				r.style.visibility = "visible";
				r.style.height = "0px";
				v(r, function () {
					r.style.height = n > 0 ? n + "px" : "auto"
				})
			}
			return this
		}
		function nt(n) {
			return n ? (f !== n && (f = n), this) : f
		}
		function h() {
			var r,
			e,
			o;
			if (f) {
				i.style.width = "auto";
				e = i.getBoundingClientRect();
				o = parseInt(t.maxWidth) || n.maxWidth;
				o && (i.style.width = e.width > o ? o + "px" : "auto");
				r = f.getBoundingClientRect();
				e = i.getBoundingClientRect();
				switch (t.stickTo) {
				case u.stickTo.bottom:
					i.style.left = r.left + parseInt((r.width - e.width) / 2) + "px";
					i.style.top = r.top + r.height + parseInt(t.stickDistance) + "px";
					break;
				case u.stickTo.left:
					i.style.left = r.left - e.width - parseInt(t.stickDistance) + "px";
					i.style.top = r.top + (r.height - e.height) / 2 + "px";
					break;
				case u.stickTo.right:
					i.style.left = r.left + r.width + parseInt(t.stickDistance) + "px";
					i.style.top = r.top + (r.height - e.height) / 2 + "px";
					break;
				case u.stickTo.top:
					i.style.left = r.left + (r.width - e.width) / 2 + "px";
					i.style.top = r.top - e.height - parseInt(t.stickDistance) + "px"
				}
			}
		}
		function tt() {
			c.innerHTML = t.contentText ? t.contentText : "";
			a.innerHTML = t.contentMore ? t.contentMore : "";
			t.animateDuration = n.animateDuration ? n.animateDuration : t.animateDuration;
			t.animateFunction = n.animateFunction ? n.animateFunction : t.animateFunction;
			t.disableAnimation = n.disableAnimation ? n.disableAnimation : t.disableAnimation;
			t.color = n.color ? n.color : t.color;
			u.color[t.color] && (t.color = u.color[t.color], t.color = "rgb(" + t.color.r + ", " + t.color.g + ", " + t.color.b + ")");
			o.style.backgroundColor = t.color || "";
			i.className = e.hookClasses.tooltip + "-" + t.stickTo;
			document.body && i.parentNode !== document.body && document.body.appendChild(i)
		}
		var i,
		t,
		f,
		o,
		c,
		r,
		a;
		return b(), {
			destroy: w,
			hideAll: p,
			model: k,
			showAll: g,
			showBrief: d,
			target: nt,
			updatePos: h
		}
	}
	function p() {
		var n = k("data-tooltip");
		f = o.slice();
		n.forEach(function (n) {
			var t = {
				contentText: n.getAttribute("data-tooltip"),
				targetElements: [n]
			};
			n.getAttribute("data-tooltip-animate-function") !== null && (t.animateFunction = n.getAttribute("data-tooltip-animate-function"));
			n.getAttribute("data-tooltip-color") !== null && (t.color = n.getAttribute("data-tooltip-color"));
			n.getAttribute("data-tooltip-delay") !== null && (t.delay = n.getAttribute("data-tooltip-delay"));
			n.getAttribute("data-tooltip-more") !== null && (t.contentMore = n.getAttribute("data-tooltip-more"));
			n.getAttribute("data-tooltip-stickto") !== null && (t.stickTo = n.getAttribute("data-tooltip-stickto"));
			n.getAttribute("data-tooltip-maxwidth") !== null && (t.maxWidth = n.getAttribute("data-tooltip-maxwidth"));
			f.push(s({}, l, t))
		})
	}
	function a() {
		var n = [];
		return f.forEach(function (r, u) {
			function e() {
				i.hovered !== this && i.focused === null && (i.hovered = this, t.target(this).model(r), setTimeout(function () {
						i.hovered === this && t.showBrief()
					}
						.bind(this), r.delay))
			}
			function o() {
				(i.hovered = null, i.focused === null) && t.hideAll()
			}
			function h() {
				(["INPUT", "TEXTAREA"].indexOf(this.tagName) !== -1 || this.getAttribute("contenteditable") !== null) && (i.focused = this, t.target(this).model(r), t.showAll())
			}
			function c() {
				i.focused = null;
				t.hideAll()
			}
			f[u] = r = s({}, l, r);
			!r.targetElements.length && r.targetSelector && (r.targetElements = b(r.targetSelector));
			!r.targetElements.length && r.targetXPath && (r.targetElements = w(r.targetXPath));
			r.targetElements.forEach(function (t) {
				n.push(function () {
					t.removeEventListener("mouseenter", e);
					t.removeEventListener("mouseleave", o);
					t.removeEventListener("focus", h);
					t.removeEventListener("blur", c)
				});
				t.addEventListener("mouseenter", e);
				t.addEventListener("mouseleave", o);
				t.addEventListener("focus", h);
				t.addEventListener("blur", c)
			})
		}),
		function () {
			for (var t = n.length; t--; )
				n[t]()
		}
	}
	function v() {
		t || (n = {}, t = d(), o = [], f = []);
		i = {
			focused: null,
			hovered: null
		}
	}
	function c() {
		document.removeEventListener("DOMContentLoaded", c, !1);
		window.removeEventListener("load", c, !1);
		p();
		r && r();
		r = a()
	}
	var t,
	f,
	n,
	i,
	r,
	o,
	u = {
		animateFunction: {
			fadeIn: "fadein",
			foldIn: "foldin",
			foldOut: "foldout",
			roll: "roll",
			scaleIn: "scalein",
			slideIn: "slidein",
			spin: "spin"
		},
		color: {
			daffodil: {
				r: 255,
				g: 230,
				b: 23
			},
			daisy: {
				r: 250,
				g: 211,
				b: 28
			},
			mustard: {
				r: 253,
				g: 183,
				b: 23
			},
			"citrus zest": {
				r: 250,
				g: 170,
				b: 33
			},
			pumpkin: {
				r: 241,
				g: 117,
				b: 63
			},
			tangerine: {
				r: 237,
				g: 87,
				b: 36
			},
			salmon: {
				r: 240,
				g: 70,
				b: 57
			},
			persimmon: {
				r: 234,
				g: 40,
				b: 48
			},
			rouge: {
				r: 188,
				g: 35,
				b: 38
			},
			scarlet: {
				r: 140,
				g: 12,
				b: 3
			},
			"hot pink": {
				r: 229,
				g: 24,
				b: 93
			},
			princess: {
				r: 243,
				g: 132,
				b: 174
			},
			petal: {
				r: 250,
				g: 198,
				b: 210
			},
			lilac: {
				r: 178,
				g: 150,
				b: 199
			},
			lavender: {
				r: 123,
				g: 103,
				b: 174
			},
			violet: {
				r: 95,
				g: 53,
				b: 119
			},
			cloud: {
				r: 195,
				g: 222,
				b: 241
			},
			dream: {
				r: 85,
				g: 190,
				b: 237
			},
			gulf: {
				r: 49,
				g: 168,
				b: 224
			},
			turquoise: {
				r: 35,
				g: 138,
				b: 204
			},
			sky: {
				r: 13,
				g: 96,
				b: 174
			},
			indigo: {
				r: 20,
				g: 59,
				b: 134
			},
			navy: {
				r: 0,
				g: 27,
				b: 74
			},
			"sea foam": {
				r: 125,
				g: 205,
				b: 194
			},
			teal: {
				r: 0,
				g: 168,
				b: 168
			},
			peacock: {
				r: 18,
				g: 149,
				b: 159
			},
			ceadon: {
				r: 193,
				g: 209,
				b: 138
			},
			olive: {
				r: 121,
				g: 145,
				b: 85
			},
			bamboo: {
				r: 128,
				g: 188,
				b: 66
			},
			grass: {
				r: 74,
				g: 160,
				b: 63
			},
			kelly: {
				r: 22,
				g: 136,
				b: 74
			},
			forrest: {
				r: 0,
				g: 63,
				b: 46
			},
			chocolate: {
				r: 56,
				g: 30,
				b: 17
			},
			"terra cotta": {
				r: 192,
				g: 92,
				b: 32
			},
			camel: {
				r: 191,
				g: 155,
				b: 107
			},
			linen: {
				r: 233,
				g: 212,
				b: 167
			},
			stone: {
				r: 231,
				g: 230,
				b: 225
			},
			smoke: {
				r: 207,
				g: 208,
				b: 210
			},
			steel: {
				r: 138,
				g: 139,
				b: 143
			},
			slate: {
				r: 119,
				g: 133,
				b: 144
			},
			charcoal: {
				r: 71,
				g: 77,
				b: 77
			},
			black: {
				r: 5,
				g: 6,
				b: 8
			},
			white: {
				r: 255,
				g: 255,
				b: 255
			},
			"metalic silver": {
				r: 152,
				g: 162,
				b: 171
			},
			"metalic gold": {
				r: 159,
				g: 135,
				b: 89
			},
			"metalic copper": {
				r: 140,
				g: 102,
				b: 65
			}
		},
		stickTo: {
			bottom: "bottom",
			left: "left",
			right: "right",
			top: "top"
		}
	},
	l = {
		animateDuration: 300,
		animateFunction: u.animateFunction.fadeIn,
		color: null,
		contentText: "",
		contentMore: "",
		delay: 500,
		disableAnimation: !1,
		stickTo: u.stickTo.bottom,
		stickDistance: 10,
		targetElements: [],
		targetSelector: "",
		targetXPath: "",
		maxWidth: null
	},
	e = {
		HTML: "<div class='html5tooltip' style='box-sizing:border-box;position:fixed;'><div class='html5tooltip-box'><div class='html5tooltip-text'><\/div><div class='html5tooltip-more' style='overflow:hidden;'><div class='html5tooltip-text'><\/div><\/div><\/div><\/div>",
		hookClasses: {
			tooltip: "html5tooltip",
			tooltipBox: "html5tooltip-box",
			tooltipText: "html5tooltip-text",
			tooltipMore: "html5tooltip-more",
			tooltipMoreText: "html5tooltip-text"
		}
	},
	y = function (t, i) {
		t.length ? Array.prototype.push.apply(o, t) : typeof t == "object" && o.push(t);
		n = i ? s({}, i) : n;
		Array.prototype.push.apply(f, o);
		r && r();
		r = a()
	},
	h = function (n, t) {
		v();
		y(n, t)
	};
	h.autoinit = function () {
		v();
		h.refresh()
	};
	y.refresh = h.refresh = function () {
		p();
		r && r();
		r = a()
	};
	typeof exports == "object" && exports && typeof module == "object" && module && module.exports === exports ? module.exports = h : window.define ? define(function () {
			return h
		}) : (v(), document.readyState === "complete" ? c() : (document.addEventListener("DOMContentLoaded", c, !1), window.addEventListener("load", c, !1)), window.html5tooltips === undefined && (window.html5tooltipsPredefined = u, window.html5tooltips = y));
	window.addEventListener("scroll", function () {
		t.updatePos()
	}, !1)
}
();
/*!
 * Fotorama 4.6.4 | http://fotorama.io/license/
 */
fotoramaVersion = "4.6.4", function (n, t, i, r, u) {
	"use strict";
	function ye(n) {
		var t = "bez_" + r.makeArray(arguments).join("_").replace(".", "p"),
		i;
		return typeof r.easing[t] != "function" && (i = function (n, t) {
			var u = [null, null],
			r = [null, null],
			i = [null, null],
			f = function (f, e) {
				return i[e] = 3 * n[e],
				r[e] = 3 * (t[e] - n[e]) - i[e],
				u[e] = 1 - i[e] - r[e],
				f * (i[e] + f * (r[e] + f * u[e]))
			},
			e = function (n) {
				return i[0] + n * (2 * r[0] + 3 * u[0] * n)
			},
			o = function (n) {
				for (var t = n, r = 0, i; ++r < 14; ) {
					if (i = f(t, 0) - n, Math.abs(i) < .001)
						break;
					t -= i / e(t)
				}
				return t
			};
			return function (n) {
				return f(o(n), 1)
			}
		}, r.easing[t] = function (t, r, u, f, e) {
			return f * i([n[0], n[1]], [n[2], n[3]])(r / e) + u
		}),
		t
	}
	function c() {}
	function v(n, t, i) {
		return Math.max(isNaN(t) ? -Infinity : t, Math.min(isNaN(i) ? Infinity : i, n))
	}
	function eo(n) {
		return n.match(/ma/) && n.match(/-?\d+(?!d)/g)[n.match(/3d/) ? 12 : 4]
	}
	function oo(n) {
		return nt ? +eo(n.css("transform")) : +n.css("left").replace("px", "")
	}
	function gt(n) {
		var t = {};
		return nt ? t.transform = "translate3d(" + n + "px,0,0)" : t.left = n,
		t
	}
	function ai(n) {
		return {
			"transition-duration": n + "ms"
		}
	}
	function ru(n, t) {
		return isNaN(n) ? t : n
	}
	function y(n, t) {
		return ru(+String(n).replace(t || "px", ""))
	}
	function so(n) {
		return /%$/.test(n) ? y(n, "%") : u
	}
	function b(n, t) {
		return ru(so(n) / 100 * t, y(n))
	}
	function k(n) {
		return (!isNaN(y(n)) || !isNaN(y(n, "%"))) && n
	}
	function ni(n, t, i, r) {
		return (n - (r || 0)) * (t + (i || 0))
	}
	function ho(n, t, i, r) {
		return -Math.round(n / (t + (i || 0)) - (r || 0))
	}
	function co(n) {
		var t = n.data(),
		i,
		r;
		t.tEnd || (i = n[0], r = {
				WebkitTransition: "webkitTransitionEnd",
				MozTransition: "transitionend",
				OTransition: "oTransitionEnd otransitionend",
				msTransition: "MSTransitionEnd",
				transition: "transitionend"
			}, l(i, r[pr.prefixed("transition")], function (n) {
				t.tProp && n.propertyName.match(t.tProp) && t.onEndFn()
			}), t.tEnd = !0)
	}
	function lo(n, t, i, r) {
		var f,
		u = n.data();
		u && (u.onEndFn = function () {
			f || (f = !0, clearTimeout(u.tT), i())
		}, u.tProp = t, clearTimeout(u.tT), u.tT = setTimeout(function () {
					u.onEndFn()
				}, r * 1.5), co(n))
	}
	function vi(n, t) {
		var i,
		r;
		if (n.length)
			return i = n.data(), nt ? (n.css(ai(0)), i.onEndFn = c, clearTimeout(i.tT)) : n.stop(), r = uu(t, function () {
					return oo(n)
				}), n.css(gt(r)), r
	}
	function uu() {
		for (var t, n = 0, i = arguments.length; n < i; n++)
			if (t = n ? arguments[n]() : arguments[n], typeof t == "number")
				break;
		return t
	}
	function fu(n, t) {
		return Math.round(n + (t - n) / 1.5)
	}
	function rt() {
		return rt.p = rt.p || (i.protocol === "https:" ? "https://" : "http://"),
		rt.p
	}
	function ao(n) {
		var i = t.createElement("a");
		return i.href = n,
		i
	}
	function eu(n, t) {
		var i,
		r,
		u;
		return typeof n != "string" ? n : (n = ao(n), n.host.match(/youtube\.com/) && n.search ? (i = n.search.split("v=")[1], i && (u = i.indexOf("&"), u !== -1 && (i = i.substring(0, u)), r = "youtube")) : n.host.match(/youtube\.com|youtu\.be/) ? (i = n.pathname.replace(/^\/(embed\/|v\/)?/, "").replace(/\/.*/, ""), r = "youtube") : n.host.match(/vimeo\.com/) && (r = "vimeo", i = n.pathname.replace(/^\/(video\/)?/, "").replace(/\/.*/, "")), i && r || !t || (i = n.href, r = "custom"), i ? {
			id: i,
			type: r,
			s: n.search.replace(/^\?/, ""),
			p: rt()
		}
			 : !1)
	}
	function vo(n, t, i) {
		var e,
		f,
		u = n.video;
		return u.type === "youtube" ? (f = rt() + "img.youtube.com/vi/" + u.id + "/default.jpg", e = f.replace(/\/default.jpg$/, "/hqdefault.jpg"), n.thumbsReady = !0) : u.type === "vimeo" ? r.ajax({
			url: rt() + "vimeo.com/api/v2/video/" + u.id + ".json",
			dataType: "jsonp",
			success: function (r) {
				n.thumbsReady = !0;
				ou(t, {
					img: r[0].thumbnail_large,
					thumb: r[0].thumbnail_small
				}, n.i, i)
			}
		}) : n.thumbsReady = !0, {
			img: e,
			thumb: f
		}
	}
	function ou(n, t, i, u) {
		for (var o, e, f = 0, s = n.length; f < s; f++)
			if (o = n[f], o.i === i && o.thumbsReady) {
				e = {
					videoReady: !0
				};
				e[h] = e[kt] = e[bt] = !1;
				u.splice(f, 1, r.extend({}, o, e, t));
				break
			}
	}
	function yo(n) {
		function u(n, t, u) {
			var o = n.children("img").eq(0),
			f = n.attr("href"),
			s = n.attr("src"),
			h = o.attr("src"),
			c = t.video,
			e = u ? eu(f, c === !0) : !1;
			e ? f = !1 : e = c;
			i(n, o, r.extend(t, {
					video: e,
					img: t.img || f || s || h,
					thumb: t.thumb || h || s || f
				}))
		}
		function i(n, t, i) {
			var u = i.thumb && i.img !== i.thumb,
			f = y(i.width || n.attr("width")),
			e = y(i.height || n.attr("height"));
			r.extend(i, {
				width: f,
				height: e,
				thumbratio: au(i.thumbratio || y(i.thumbwidth || t && t.attr("width") || u || f) / y(i.thumbheight || t && t.attr("height") || u || e))
			})
		}
		var t = [];
		return n.children().each(function () {
			var n = r(this),
			f = yi(r.extend(n.data(), {
						id: n.attr("id")
					}));
			if (n.is("a, img"))
				u(n, f, !0);
			else {
				if (n.is(":empty"))
					return;
				i(n, null, r.extend(f, {
						html: this,
						_html: n.html()
					}))
			}
			t.push(f)
		}),
		t
	}
	function po(n) {
		return n.offsetWidth === 0 && n.offsetHeight === 0
	}
	function wo(n) {
		return !r.contains(t.documentElement, n)
	}
	function s(n, t, i, r) {
		return s.i || (s.i = 1, s.ii = [!0]),
		r = r || s.i,
		typeof s.ii[r] == "undefined" && (s.ii[r] = !0),
		n() ? t() : s.ii[r] && setTimeout(function () {
			s.ii[r] && s(n, t, i, r)
		}, i || 100),
		s.i++
	}
	function bo(n) {
		i.replace(i.protocol + "//" + i.host + i.pathname.replace(/^\/?/, "/") + i.search + "#" + n)
	}
	function su(n, t, i, r) {
		var f = n.data(),
		u = f.measures;
		if (u && (!f.l || f.l.W !== u.width || f.l.H !== u.height || f.l.r !== u.ratio || f.l.w !== t.w || f.l.h !== t.h || f.l.m !== i || f.l.p !== r)) {
			var e = u.width,
			o = u.height,
			y = t.w / t.h,
			s = u.ratio >= y,
			h = i === "scaledown",
			c = i === "contain",
			l = i === "cover",
			a = ts(r);
			s && (h || c) || !s && l ? (e = v(t.w, 0, h ? e : Infinity), o = e / u.ratio) : (s && l || !s && (h || c)) && (o = v(t.h, 0, h ? o : Infinity), e = o * u.ratio);
			n.css({
				width: e,
				height: o,
				left: b(a.x, t.w - e),
				top: b(a.y, t.h - o)
			});
			f.l = {
				W: u.width,
				H: u.height,
				r: u.ratio,
				w: t.w,
				h: t.h,
				m: i,
				p: r
			}
		}
		return !0
	}
	function ko(n, t) {
		var i = n[0];
		i.styleSheet ? i.styleSheet.cssText = t : n.html(t)
	}
	function ti(n, t, i) {
		return t === i ? !1 : n <= t ? "left" : n >= i ? "right" : "left right"
	}
	function hu(n, t, i, r) {
		var f,
		u,
		e,
		o;
		if (!i)
			return !1;
		if (!isNaN(n))
			return n - (r ? 0 : 1);
		for (u = 0, e = t.length; u < e; u++)
			if (o = t[u], o.id === n) {
				f = u;
				break
			}
		return f
	}
	function go(n, t, i) {
		i = i || {};
		n.each(function () {
			var n = r(this),
			u = n.data(),
			f;
			u.clickOn || (u.clickOn = !0, r.extend(ku(n, {
						onStart: function (n) {
							f = n;
							(i.onStart || c).call(this, n)
						},
						onMove: i.onMove || c,
						onTouchEnd: i.onTouchEnd || c,
						onEnd: function (n) {
							n.moved || t.call(this, f)
						}
					}), {
					noMove: !0
				}))
		})
	}
	function e(n, t) {
		return '<div class="' + n + '">' + (t || "") + "<\/div>"
	}
	function cu(n) {
		for (var t = n.length, i, r; t; )
			i = Math.floor(Math.random() * t--), r = n[t], n[t] = n[i], n[i] = r;
		return n
	}
	function lu(n) {
		return Object.prototype.toString.call(n) == "[object Array]" && r.map(n, function (n) {
			return r.extend({}, n)
		})
	}
	function st(n, t, i) {
		n.scrollLeft(t || 0).scrollTop(i || 0)
	}
	function yi(n) {
		if (n) {
			var t = {};
			return r.each(n, function (n, i) {
				t[n.toLowerCase()] = i
			}),
			t
		}
	}
	function au(n) {
		if (n) {
			var t = +n;
			return isNaN(t) ? (t = n.split("/"), +t[0] / +t[1] || u) : t
		}
	}
	function l(n, t, i, r) {
		t && (n.addEventListener ? n.addEventListener(t, i, !!r) : n.attachEvent("on" + t, i))
	}
	function ns(n) {
		return !!n.getAttribute("disabled")
	}
	function vu(n) {
		return {
			tabindex: n * -1 + "",
			disabled: n
		}
	}
	function pi(n, t) {
		l(n, "keyup", function (i) {
			ns(n) || i.keyCode == 13 && t.call(n, i)
		})
	}
	function wi(n, t) {
		l(n, "focus", n.onfocusin = function (i) {
			t.call(n, i)
		}, !0)
	}
	function w(n, t) {
		n.preventDefault ? n.preventDefault() : n.returnValue = !1;
		t && n.stopPropagation && n.stopPropagation()
	}
	function bi(n) {
		return n ? ">" : "<"
	}
	function ts(n) {
		return n = (n + "").split(/\s+/), {
			x: k(n[0]) || dt,
			y: k(n[1]) || dt
		}
	}
	function ht(n, t) {
		var f = n.data(),
		e = Math.round(t.pos),
		i = function () {
			f.sliding = !1;
			(t.onEnd || c)()
		},
		u;
		typeof t.overPos != "undefined" && t.overPos !== t.pos && (e = t.overPos, i = function () {
			ht(n, r.extend({}, t, {
					overPos: t.pos,
					time: Math.max(ot, t.time / 2)
				}))
		});
		u = r.extend(gt(e), t.width && {
				width: t.width
			});
		f.sliding = !0;
		nt ? (n.css(r.extend(ai(t.time), u)), t.time > 10 ? lo(n, "transform", i, t.time) : i()) : n.stop().animate(u, t.time, io, i)
	}
	function yu(n, t, i, u, f, e) {
		var h = typeof e != "undefined";
		if (h || (f.push(arguments), Array.prototype.push.call(arguments, f.length), !(f.length > 1))) {
			n = n || r(n);
			t = t || r(t);
			var v = n[0],
			l = t[0],
			s = u.method === "crossfade",
			o = function () {
				if (!o.done) {
					o.done = !0;
					var n = (h || f.shift()) && f.shift();
					n && yu.apply(this, n);
					(u.onEnd || c)(!!n)
				}
			},
			a = u.time / (e || 1);
			i.removeClass(or + " " + er);
			n.stop().addClass(or);
			t.stop().addClass(er);
			s && l && n.fadeTo(0, 0);
			n.fadeTo(s ? a : 0, 1, s && o);
			t.fadeTo(a, 0, o);
			v && s || l || o()
		}
	}
	function bu(n) {
		var t = (n.touches || [])[0] || n;
		n._x = t.pageX;
		n._y = t.clientY;
		n._now = r.now()
	}
	function ku(n, i) {
		function d(n) {
			if (o = r(n.target), u.checked = b = k = y = !1, e || u.flow || n.touches && n.touches.length > 1 || n.which > 1 || ki && ki.type !== n.type && di || (b = i.select && o.is(i.select, f)))
				return b;
			s = n.type === "touchstart";
			k = o.is("a, a *", f);
			v = u.control;
			rt = u.noMove || u.noSwipe || v ? 16 : u.snap ? 0 : 4;
			bu(n);
			a = ki = n;
			pu = n.type.replace(/down|start/, "move").replace(/Down/, "Move");
			(i.onStart || c).call(f, n, {
				control: v,
				$target: o
			});
			e = u.flow = !0;
			(!s || u.go) && w(n)
		}
		function g(n) {
			if (n.touches && n.touches.length > 1 || tt && !n.isPrimary || pu !== n.type || !e) {
				e && h();
				(i.onTouchEnd || c)();
				return
			}
			bu(n);
			var t = Math.abs(n._x - a._x),
			r = Math.abs(n._y - a._y),
			o = t - r,
			l = (u.go || u.x || o >= 0) && !u.noSwipe,
			v = o < 0;
			s && !u.checked ? (e = l) && w(n) : (w(n), (i.onMove || c).call(f, n, {
					touch: s
				}));
			!y && Math.sqrt(Math.pow(t, 2) + Math.pow(r, 2)) > rt && (y = !0);
			u.checked = u.checked || l || v
		}
		function h(n) {
			(i.onTouchEnd || c)();
			var t = e;
			(u.control = e = !1, t && (u.flow = !1), t && (!k || u.checked)) && (n && w(n), di = !0, clearTimeout(wu), wu = setTimeout(function () {
						di = !1
					}, 1e3), (i.onEnd || c).call(f, {
					moved: y,
					$target: o,
					control: v,
					touch: s,
					startEvent: a,
					aborted: !n || n.type === "MSPointerCancel"
				}))
		}
		function ut() {
			u.flow || setTimeout(function () {
				u.flow = !0
			}, 10)
		}
		function nt() {
			u.flow && setTimeout(function () {
				u.flow = !1
			}, it)
		}
		var f = n[0],
		u = {},
		e,
		a,
		o,
		v,
		s,
		b,
		k,
		rt,
		y;
		if (tt)
			l(f, "MSPointerDown", d), l(t, "MSPointerMove", g), l(t, "MSPointerCancel", h), l(t, "MSPointerUp", h);
		else {
			l(f, "touchstart", d);
			l(f, "touchmove", g);
			l(f, "touchend", h);
			l(t, "touchstart", ut);
			l(t, "touchend", nt);
			l(t, "touchcancel", nt);
			p.on("scroll", nt);
			n.on("mousedown", d);
			vt.on("mousemove", g).on("mouseup", h)
		}
		n.on("click", "a", function (n) {
			u.checked && w(n)
		});
		return u
	}
	function du(n, t) {
		function k(r, f) {
			l = !0;
			y = s = r._x;
			g = r._now;
			h = [[g, y]];
			p = i = u.noMove || f ? 0 : vi(n, (t.getPos || c)());
			(t.onStart || c).call(a, r)
		}
		function ft(n, t) {
			f = u.min;
			e = u.max;
			o = u.snap;
			nt = n.altKey;
			l = b = !1;
			rt = t.control;
			rt || ut.sliding || k(n)
		}
		function et(r, o) {
			u.noSwipe || (l || k(r), s = r._x, h.push([r._now, s]), i = p - (y - s), d = ti(i, f, e), i <= f ? i = fu(i, f) : i >= e && (i = fu(i, e)), u.noMove || (n.css(gt(i)), b || (b = !0, o.touch || tt || n.addClass(hr)), (t.onMove || c).call(a, r, {
						pos: i,
						edge: d
					})))
		}
		function st(y) {
			var ft;
			if (!u.noSwipe || !y.moved) {
				l || k(y.startEvent, !0);
				y.touch || tt || n.removeClass(hr);
				w = r.now();
				var vt = w - it,
				lt,
				et,
				at,
				st = null,
				yt,
				d,
				g,
				b,
				rt,
				ut = ot,
				ht,
				pt = t.friction;
				for (ft = h.length - 1; ft >= 0; ft--) {
					if (lt = h[ft][0], et = Math.abs(lt - vt), st === null || et < at)
						st = lt, yt = h[ft][1];
					else if (st === vt || et > at)
						break;
					at = et
				}
				b = v(i, f, e);
				var wt = yt - s,
				ct = wt >= 0,
				bt = w - st,
				kt = bt > it,
				dt = !kt && i !== p && b === i;
				o && (b = v(Math[dt ? ct ? "floor" : "ceil" : "round"](i / o) * o, f, e), f = e = b);
				dt && (o || b === i) && (ht =  - (wt / bt), ut *= v(Math.abs(ht), t.timeLow, t.timeHigh), d = Math.round(i + ht * ut / pt), o || (b = d), (!ct && d > e || ct && d < f) && (g = ct ? f : e, rt = d - g, o || (b = g), rt = v(b + rt * .03, g - 50, g + 50), ut = Math.abs((i - rt) / (ht / pt))));
				ut *= nt ? 10 : 1;
				(t.onEnd || c).call(a, r.extend(y, {
						moved: y.moved || kt && o,
						pos: i,
						newPos: b,
						overPos: rt,
						time: ut
					}))
			}
		}
		var a = n[0],
		ut = n.data(),
		u = {},
		y,
		s,
		p,
		i,
		d,
		h,
		g,
		w,
		f,
		e,
		o,
		nt,
		rt,
		b,
		l;
		return u = r.extend(ku(t.$wrap, r.extend({}, t, {
						onStart: ft,
						onMove: et,
						onEnd: st
					})), u)
	}
	function gu(n, t) {
		var o = n[0],
		u,
		f,
		e,
		i = {
			prevent: {}
		};
		return l(o, ke, function (n) {
			var l = n.wheelDeltaY || -1 * n.deltaY || 0,
			s = n.wheelDeltaX || -1 * n.deltaX || 0,
			a = Math.abs(s) && !Math.abs(l),
			o = bi(s < 0),
			v = f === o,
			h = r.now(),
			y = h - e < it;
			if (f = o, e = h, a && i.ok && (!i.prevent[o] || u)) {
				if (w(n, !0), u && v && y)
					return
			} else
				return;
			t.shift && (u = !0, clearTimeout(i.t), i.t = setTimeout(function () {
						u = !1
					}, de));
			(t.onEnd || c)(n, t.shift ? o : s)
		}),
		i
	}
	function nf() {
		r.each(r.Fotorama.instances, function (n, t) {
			t.index = n
		})
	}
	function is(n) {
		r.Fotorama.instances.push(n);
		nf()
	}
	function rs(n) {
		r.Fotorama.instances.splice(n.index, 1);
		nf()
	}
	var f = "fotorama",
	ut = "fullscreen",
	a = f + "__wrap",
	tf = a + "--css2",
	rf = a + "--css3",
	gi = a + "--video",
	uf = a + "--fade",
	ff = a + "--slide",
	nr = a + "--no-controls",
	ef = a + "--no-shadows",
	of = a + "--pan-y",
	sf = a + "--rtl",
	tr = a + "--only-active",
	hf = a + "--no-captions",
	cf = a + "--toggle-arrows",
	ii = f + "__stage",
	ir = ii + "__frame",
	lf = ir + "--video",
	af = ii + "__shaft",
	rr = f + "__grab",
	vf = f + "__pointer",
	d = f + "__arr",
	ur = d + "--disabled",
	yf = d + "--prev",
	pf = d + "--next",
	us = d + "__arr",
	g = f + "__nav",
	wf = g + "-wrap",
	bf = g + "__shaft",
	ri = g + "--dots",
	ui = g + "--thumbs",
	ft = g + "__frame",
	kf = ft + "--dot",
	df = ft + "--thumb",
	fr = f + "__fade",
	er = fr + "-front",
	or = fr + "-rear",
	gf = f + "__shadow",
	fi = gf + "s",
	ne = fi + "--left",
	te = fi + "--right",
	ei = f + "__active",
	oi = f + "__select",
	ie = f + "--hidden",
	sr = f + "--fullscreen",
	re = f + "__fullscreen-icon",
	si = f + "__error",
	hi = f + "__loading",
	ct = f + "__loaded",
	ue = ct + "--full",
	fe = ct + "--img",
	hr = f + "__grabbing",
	cr = f + "__img",
	ee = cr + "--full",
	oe = f + "__dot",
	lr = f + "__thumb",
	se = lr + "-border",
	he = f + "__html",
	ar = f + "__video",
	vr = ar + "-play",
	ce = ar + "-close",
	le = f + "__caption",
	ae = f + "__caption__wrap",
	ve = f + "__spinner",
	et = '" tabindex="0" role="button',
	lt = r && r.fn.jquery.split("."),
	at,
	br,
	kr,
	dr,
	gr,
	ki,
	pu,
	di,
	wu;
	if (!lt || lt[0] < 1 || lt[0] == 1 && lt[1] < 8)
		throw "Fotorama requires jQuery 1.8 or later and will not run without it.";
	var yr = {},
	pr = function (n, t, i) {
		function nt(n) {
			p.cssText = n
		}
		function u(n, t) {
			return typeof n === t
		}
		function ut(n, t) {
			return !!~("" + n).indexOf(t)
		}
		function tt(n, t) {
			var u,
			r;
			for (u in n)
				if (r = n[u], !ut(r, "-") && p[r] !== i)
					return t == "pfx" ? r : !0;
			return !1
		}
		function ft(n, t, r) {
			var e,
			f;
			for (e in n)
				if (f = t[n[e]], f !== i)
					return r === !1 ? n[e] : u(f, "function") ? f.bind(r || t) : f;
			return !1
		}
		function h(n, t, i) {
			var r = n.charAt(0).toUpperCase() + n.slice(1),
			f = (n + " " + k.join(r + " ") + r).split(" ");
			return u(t, "string") || u(t, "undefined") ? tt(f, t) : (f = (n + " " + d.join(r + " ") + r).split(" "), ft(f, t, i))
		}
		var r = {},
		f = t.documentElement,
		e = "modernizr",
		y = t.createElement(e),
		p = y.style,
		it,
		et = {}
		.toString,
		w = " -webkit- -moz- -o- -ms- ".split(" "),
		b = "Webkit Moz O ms",
		k = b.split(" "),
		d = b.toLowerCase().split(" "),
		o = {},
		g = [],
		l = g.slice,
		s,
		rt = function (n, i, r, u) {
			var l,
			a,
			c,
			v,
			o = t.createElement("div"),
			h = t.body,
			s = h || t.createElement("body");
			if (parseInt(r, 10))
				while (r--)
					c = t.createElement("div"), c.id = u ? u[r] : e + (r + 1), o.appendChild(c);
			return l = ["&#173;", '<style id="s', e, '">', n, "<\/style>"].join(""),
			o.id = e,
			(h ? o : s).innerHTML += l,
			s.appendChild(o),
			h || (s.style.background = "", s.style.overflow = "hidden", v = f.style.overflow, f.style.overflow = "hidden", f.appendChild(s)),
			a = i(o, n),
			h ? o.parentNode.removeChild(o) : (s.parentNode.removeChild(s), f.style.overflow = v),
			!!a
		},
		a = {}
		.hasOwnProperty,
		v,
		c;
		v = u(a, "undefined") || u(a.call, "undefined") ? function (n, t) {
			return t in n && u(n.constructor.prototype[t], "undefined")
		}
		 : function (n, t) {
			return a.call(n, t)
		};
		Function.prototype.bind || (Function.prototype.bind = function (n) {
			var t = this,
			i,
			r;
			if (typeof t != "function")
				throw new TypeError;
			return i = l.call(arguments, 1),
			r = function () {
				var f,
				e,
				u;
				return this instanceof r ? (f = function () {}, f.prototype = t.prototype, e = new f, u = t.apply(e, i.concat(l.call(arguments))), Object(u) === u) ? u : e : t.apply(n, i.concat(l.call(arguments)))
			},
			r
		});
		o.csstransforms3d = function () {
			return !!h("perspective")
		};
		for (c in o)
			v(o, c) && (s = c.toLowerCase(), r[s] = o[c](), g.push((r[s] ? "" : "no-") + s));
		return r.addTest = function (n, t) {
			if (typeof n == "object")
				for (var u in n)
					v(n, u) && r.addTest(u, n[u]);
			else {
				if (n = n.toLowerCase(), r[n] !== i)
					return r;
				t = typeof t == "function" ? t() : t;
				typeof enableClasses != "undefined" && enableClasses && (f.className += " " + (t ? "" : "no-") + n);
				r[n] = t
			}
			return r
		},
		nt(""),
		y = it = null,
		r._version = "2.6.2",
		r._prefixes = w,
		r._domPrefixes = d,
		r._cssomPrefixes = k,
		r.testProp = function (n) {
			return tt([n])
		},
		r.testAllProps = h,
		r.testStyles = rt,
		r.prefixed = function (n, t, i) {
			return t ? h(n, t, i) : h(n, "pfx")
		},
		r
	}
	(n, t),
	o = {
		ok: !1,
		is: function () {
			return !1
		},
		request: function () {},
		cancel: function () {},
		event: "",
		prefix: ""
	},
	wr = "webkit moz o ms khtml".split(" ");
	if (typeof t.cancelFullScreen != "undefined")
		o.ok = !0;
	else
		for (at = 0, br = wr.length; at < br; at++)
			if (o.prefix = wr[at], typeof t[o.prefix + "CancelFullScreen"] != "undefined") {
				o.ok = !0;
				break
			}
	o.ok && (o.event = o.prefix + "fullscreenchange", o.is = function () {
		switch (this.prefix) {
		case "":
			return t.fullScreen;
		case "webkit":
			return t.webkitIsFullScreen;
		default:
			return t[this.prefix + "FullScreen"]
		}
	}, o.request = function (n) {
		return this.prefix === "" ? n.requestFullScreen() : n[this.prefix + "RequestFullScreen"]()
	}, o.cancel = function () {
		return this.prefix === "" ? t.cancelFullScreen() : t[this.prefix + "CancelFullScreen"]()
	});
	dr = {
		lines: 12,
		length: 5,
		width: 2,
		radius: 7,
		corners: 1,
		rotate: 15,
		color: "rgba(128, 128, 128, .75)",
		hwaccel: !0
	};
	gr = {
		top: "auto",
		left: "auto",
		className: ""
	},
	function (n, t) {
		kr = t()
	}
	(this, function () {
		function f(n, i) {
			var r = t.createElement(n || "div");
			for (var u in i)
				r[u] = i[u];
			return r
		}
		function i(n) {
			for (var t = 1, i = arguments.length; t < i; t++)
				n.appendChild(arguments[t]);
			return n
		}
		function p(n, t, i, r) {
			var u = ["opacity", t, ~~(n * 100), i, r].join("-"),
			f = .01 + i / r * 100,
			o = Math.max(1 - (1 - n) / t * (100 - f), n),
			h = e.substring(0, e.indexOf("Animation")).toLowerCase(),
			c = h && "-" + h + "-" || "";
			return l[u] || (s.insertRule("@" + c + "keyframes " + u + "{0%{opacity:" + o + "}" + f + "%{opacity:" + n + "}" + (f + .01) + "%{opacity:1}" + (f + t) % 100 + "%{opacity:" + n + "}100%{opacity:" + o + "}}", s.cssRules.length), l[u] = 1),
			u
		}
		function h(n, t) {
			var f = n.style,
			r,
			i;
			for (t = t.charAt(0).toUpperCase() + t.slice(1), i = 0; i < c.length; i++)
				if (r = c[i] + t, f[r] !== u)
					return r;
			if (f[t] !== u)
				return t
		}
		function n(n, t) {
			for (var i in t)
				n.style[h(n, i) || i] = t[i];
			return n
		}
		function a(n) {
			for (var r, i, t = 1; t < arguments.length; t++) {
				r = arguments[t];
				for (i in r)
					n[i] === u && (n[i] = r[i])
			}
			return n
		}
		function v(n) {
			for (var t = {
					x: n.offsetLeft,
					y: n.offsetTop
				}; n = n.offsetParent; )
				t.x += n.offsetLeft, t.y += n.offsetTop;
			return t
		}
		function y(n, t) {
			return typeof n == "string" ? n : n[t % n.length]
		}
		function r(n) {
			if (typeof this == "undefined")
				return new r(n);
			this.opts = a(n || {}, r.defaults, w)
		}
		function b() {
			function t(n, t) {
				return f("<" + n + ' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">', t)
			}
			s.addRule(".spin-vml", "behavior:url(#default#VML)");
			r.prototype.lines = function (r, u) {
				function s() {
					return n(t("group", {
							coordsize: o + " " + o,
							coordorigin: -e + " " + -e
						}), {
						width: o,
						height: o
					})
				}
				function l(r, f, o) {
					i(c, i(n(s(), {
								rotation: 360 / u.lines * r + "deg",
								left: ~~f
							}), i(n(t("roundrect", {
										arcsize: u.corners
									}), {
									width: e,
									height: u.width,
									left: u.radius,
									top: -u.width >> 1,
									filter: o
								}), t("fill", {
									color: y(u.color, r),
									opacity: u.opacity
								}), t("stroke", {
									opacity: 0
								}))))
				}
				var e = u.length + u.width,
				o = 2 * e,
				h =  - (u.width + u.length) * 2 + "px",
				c = n(s(), {
						position: "absolute",
						top: h,
						left: h
					}),
				f;
				if (u.shadow)
					for (f = 1; f <= u.lines; f++)
						l(f, -2, "progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");
				for (f = 1; f <= u.lines; f++)
					l(f);
				return i(r, c)
			};
			r.prototype.opacity = function (n, t, i, r) {
				var u = n.firstChild;
				r = r.shadow && r.lines || 0;
				u && t + r < u.childNodes.length && (u = u.childNodes[t + r], u = u && u.firstChild, u = u && u.firstChild, u && (u.opacity = i))
			}
		}
		var c = ["webkit", "Moz", "ms", "O"],
		l = {},
		e,
		s = function () {
			var n = f("style", {
					type: "text/css"
				});
			return i(t.getElementsByTagName("head")[0], n),
			n.sheet || n.styleSheet
		}
		(),
		w = {
			lines: 12,
			length: 7,
			width: 5,
			radius: 10,
			rotate: 0,
			corners: 1,
			color: "#000",
			direction: 1,
			speed: 1,
			trail: 100,
			opacity: 1 / 4,
			fps: 20,
			zIndex: 2e9,
			className: "spinner",
			top: "auto",
			left: "auto",
			position: "relative"
		},
		o;
		return r.defaults = {},
		a(r.prototype, {
			spin: function (t) {
				this.stop();
				var r = this,
				i = r.opts,
				u = r.el = n(f(0, {
							className: i.className
						}), {
						position: i.position,
						width: 0,
						zIndex: i.zIndex
					}),
				c = i.radius + i.length + i.width,
				o,
				s;
				if (t && (t.insertBefore(u, t.firstChild || null), s = v(t), o = v(u), n(u, {
							left: (i.left == "auto" ? s.x - o.x + (t.offsetWidth >> 1) : parseInt(i.left, 10) + c) + "px",
							top: (i.top == "auto" ? s.y - o.y + (t.offsetHeight >> 1) : parseInt(i.top, 10) + c) + "px"
						})), u.setAttribute("role", "progressbar"), r.lines(u, r.opts), !e) {
					var l = 0,
					p = (i.lines - 1) * (1 - i.direction) / 2,
					a,
					y = i.fps,
					h = y / i.speed,
					w = (1 - i.opacity) / (h * i.trail / 100),
					b = h / i.lines;
					(function k() {
						l++;
						for (var n = 0; n < i.lines; n++)
							a = Math.max(1 - (l + (i.lines - n) * b) % h * w, i.opacity), r.opacity(u, n * i.direction + p, a, i);
						r.timeout = r.el && setTimeout(k, ~~(1e3 / y))
					})()
				}
				return r
			},
			stop: function () {
				var n = this.el;
				return n && (clearTimeout(this.timeout), n.parentNode && n.parentNode.removeChild(n), this.el = u),
				this
			},
			lines: function (t, r) {
				function s(t, i) {
					return n(f(), {
						position: "absolute",
						width: r.length + r.width + "px",
						height: r.width + "px",
						background: t,
						boxShadow: i,
						transformOrigin: "left",
						transform: "rotate(" + ~~(360 / r.lines * u + r.rotate) + "deg) translate(" + r.radius + "px,0)",
						borderRadius: (r.corners * r.width >> 1) + "px"
					})
				}
				for (var u = 0, h = (r.lines - 1) * (1 - r.direction) / 2, o; u < r.lines; u++)
					o = n(f(), {
							position: "absolute",
							top: 1 + ~(r.width / 2) + "px",
							transform: r.hwaccel ? "translate3d(0,0,0)" : "",
							opacity: r.opacity,
							animation: e && p(r.opacity, r.trail, h + u * r.direction, r.lines) + " " + 1 / r.speed + "s linear infinite"
						}), r.shadow && i(o, n(s("#000", "0 0 4px #000"), {
							top: "2px"
						})), i(t, i(o, s(y(r.color, u), "0 0 1px rgba(0,0,0,.1)")));
				return t
			},
			opacity: function (n, t, i) {
				t < n.childNodes.length && (n.childNodes[t].style.opacity = i)
			}
		}),
		o = n(f("group"), {
				behavior: "url(#default#VML)"
			}),
		!h(o, "transform") && o.adj ? b() : e = h(o, "animation"),
		r
	});
	var p = r(n),
	vt = r(t),
	ci,
	yt,
	pe = i.hash.replace("#", "") === "quirks",
	nu = pr.csstransforms3d,
	nt = nu && !pe,
	we = nu || t.compatMode === "CSS1Compat",
	tu = o.ok,
	be = navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone/i),
	pt = !nt || be,
	tt = navigator.msPointerEnabled,
	ke = "onwheel" in t.createElement("div") ? "wheel" : t.onmousewheel !== u ? "mousewheel" : "DOMMouseScroll",
	it = 250,
	ot = 300,
	de = 1400,
	ge = 5e3,
	li = 2,
	wt = 64,
	no = 500,
	to = 333,
	h = "$stageFrame",
	bt = "$navDotFrame",
	kt = "$navThumbFrame",
	iu = "auto",
	io = ye([.1, 0, .25, 1]),
	ro = 99999,
	dt = "50%",
	uo = {
		width: null,
		minwidth: null,
		maxwidth: "100%",
		height: null,
		minheight: null,
		maxheight: null,
		ratio: null,
		margin: li,
		glimpse: 0,
		fit: "contain",
		position: dt,
		thumbposition: dt,
		nav: "dots",
		navposition: "bottom",
		navwidth: null,
		thumbwidth: wt,
		thumbheight: wt,
		thumbmargin: li,
		thumbborderwidth: li,
		thumbfit: "cover",
		allowfullscreen: !1,
		transition: "slide",
		clicktransition: null,
		transitionduration: ot,
		captions: !0,
		hash: !1,
		startindex: 0,
		loop: !1,
		autoplay: !1,
		stopautoplayontouch: !0,
		keyboard: !1,
		arrows: !0,
		click: !0,
		swipe: !0,
		trackpad: !1,
		enableifsingleframe: !1,
		controlsonstart: !0,
		shuffle: !1,
		direction: "ltr",
		shadows: !0,
		spinner: null
	},
	fo = {
		left: !0,
		right: !0,
		down: !1,
		up: !1,
		space: !1,
		home: !1,
		end: !1
	};
	s.stop = function (n) {
		s.ii[n] = !1
	};
	jQuery.Fotorama = function (n, c) {
		function ua() {
			r.each(at, function (n, t) {
				var r,
				i;
				t.i || (t.i = dl++, r = eu(t.video, !0), r && (i = {}, t.video = r, t.img || t.thumb ? t.thumbsReady = !0 : i = vo(t, at, rt), ou(at, {
							img: i.img,
							thumb: i.thumb
						}, t.i, rt)))
			})
		}
		function lo(n) {
			return vc[n] || rt.fullScreen
		}
		function fa(n) {
			var i = "keydown." + f,
			t = f + fh,
			r = "keydown." + t,
			u = "resize." + t + " orientationchange." + t;
			if (n) {
				vt.on(r, function (n) {
					var i,
					t;
					di && n.keyCode === 27 ? (i = !0, be(di, !0, !0)) : (rt.fullScreen || c.keyboard && !rt.index) && (n.keyCode === 27 ? (i = !0, rt.cancelFullScreen()) : n.keyCode === 37 && lo("left") || n.keyCode === 38 && lo("up") ? t = "<" : n.keyCode === 39 && lo("right") || n.keyCode === 40 && lo("down") ? t = ">" : n.keyCode === 36 && lo("home") ? t = "<<" : n.keyCode === 35 && lo("end") && (t = ">>"));
					(i || t) && w(n);
					t && rt.show({
						index: t,
						slow: n.altKey,
						user: !0
					})
				});
				if (!rt.index)
					vt.off(i).on(i, "textarea, input, select", function (n) {
						yt.hasClass(ut) || n.stopPropagation()
					});
				p.on(u, rt.resize)
			} else
				vt.off(r), p.off(u)
		}
		function nh(t) {
			t !== nh.f && (t ? (n.html("").addClass(f + " " + rc).append(fr).before(eh).before(oh), is(rt)) : (fr.detach(), eh.detach(), oh.detach(), n.html(fc.urtext).removeClass(rc), rs(rt)), fa(t), nh.f = t)
		}
		function ea() {
			at = rt.data = at || lu(c.data) || yo(n);
			ki = rt.size = at.length;
			!uh.ok && c.shuffle && cu(at);
			ua();
			dt = kh(dt);
			ki && nh(!0)
		}
		function bh() {
			var n = ki < 2 && !c.enableifsingleframe || di;
			yr.noMove = n || pu;
			yr.noSwipe = n || !c.swipe;
			gf || ke.toggleClass(rr, !c.click && !yr.noMove && !yr.noSwipe);
			tt && fr.toggleClass(of, !yr.noSwipe)
		}
		function dc(n) {
			n === !0 && (n = "");
			c.autoplay = Math.max(+n || ge, so * 1.5)
		}
		function oa() {
			function n(n, i) {
				t[n ? "add" : "remove"].push(i)
			}
			rt.options = c = yi(c);
			pu = c.transition === "crossfade" || c.transition === "dissolve";
			fu = c.loop && (ki > 2 || pu && (!gf || gf !== "slide"));
			so = +c.transitionduration || ot;
			de = c.direction === "rtl";
			vc = r.extend({}, c.keyboard && fo, c.keyboard);
			var t = {
				add: [],
				remove: []
			};
			ki > 1 || c.enableifsingleframe ? (wr = c.nav, ac = c.navposition === "top", t.remove.push(oi), eo.toggle(!!c.arrows)) : (wr = !1, eo.hide());
			rl();
			ws = new kr(r.extend(dr, c.spinner, gr, {
						direction: de ? -1 : 1
					}));
			sl();
			hl();
			c.autoplay && dc(c.autoplay);
			vh = y(c.thumbwidth) || wt;
			ks = y(c.thumbheight) || wt;
			ds.ok = os.ok = c.trackpad && !pt;
			bh();
			yl(c, [lt]);
			oo = wr === "thumbs";
			oo ? (gh(ki, "navThumb"), ch = ys, ye = kt, ko(eh, r.Fotorama.jst.style({
						w: vh,
						h: ks,
						b: c.thumbborderwidth,
						m: c.thumbmargin,
						s: fh,
						q: !we
					})), or.addClass(ui).removeClass(ri)) : wr === "dots" ? (gh(ki, "navDot"), ch = lh, ye = bt, or.addClass(ri).removeClass(ui)) : (wr = !1, or.removeClass(ui + " " + ri));
			wr && (ac ? hh.insertBefore(er) : hh.insertAfter(er), ls.nav = !1, ls(ch, pr, "nav"));
			bs = c.allowfullscreen;
			bs ? (ps.prependTo(er), fs = tu && bs === "native") : (ps.detach(), fs = !1);
			n(pu, uf);
			n(!pu, ff);
			n(!c.captions, hf);
			n(de, sf);
			n(c.arrows !== "always", cf);
			es = c.shadows && !pt;
			n(!es, ef);
			fr.addClass(t.add.join(" ")).removeClass(t.remove.join(" "));
			ia = r.extend({}, c)
		}
		function io(n) {
			return n < 0 ? (ki + n % ki) % ki : n >= ki ? n % ki : n
		}
		function kh(n) {
			return v(n, 0, ki - 1)
		}
		function gc(n) {
			return fu ? io(n) : kh(n)
		}
		function nl(n) {
			return n > 0 || fu ? n - 1 : !1
		}
		function tl(n) {
			return n < ki - 1 || fu ? n + 1 : !1
		}
		function sa() {
			yr.min = fu ? -Infinity : -ni(ki - 1, lt.w, c.margin, ku);
			yr.max = fu ? Infinity : -ni(0, lt.w, c.margin, ku);
			yr.snap = lt.w + c.margin
		}
		function ha() {
			li.min = Math.min(0, lt.nw - pr.width());
			li.max = 0;
			pr.toggleClass(rr, !(li.noMove = li.min === li.max))
		}
		function dh(n, t, i) {
			if (typeof n == "number") {
				n = new Array(n);
				var u = !0
			}
			return r.each(n, function (n, r) {
				var f,
				o,
				e;
				u && (r = n);
				typeof r == "number" && (f = at[io(r)], f && (o = "$" + t + "Frame", e = f[o], i.call(this, n, r, f, e, o, e && e.data())))
			})
		}
		function il(n, t, i, r) {
			yh && (yh !== "*" || r !== us) || (n = k(c.width) || k(n) || no, t = k(c.height) || k(t) || to, rt.resize({
					width: n,
					ratio: c.ratio || i || n / t
				}, 0, r !== us && "*"))
		}
		function hs(n, t, i, u, f, e) {
			dh(n, t, function (n, o, h, l, a, v) {
				function g(n) {
					var t = io(o);
					nu(n, {
						index: t,
						src: y,
						frame: at[t]
					})
				}
				function nt() {
					b.remove();
					r.Fotorama.cache[y] = "error";
					(!h.html || t !== "stage") && d && d !== y ? (h[tt] = y = d, hs([o], t, i, u, f, !0)) : (!y || h.html || p ? t === "stage" && (l.trigger("f:load").removeClass(hi + " " + si).addClass(ct), g("load"), il()) : (l.trigger("f:error").removeClass(hi).addClass(si), g("error")), v.state = "error", !(ki > 1) || at[o] !== h || h.html || h.deleted || h.video || p || (h.deleted = !0, rt.splice(o, 1)))
				}
				function ut() {
					r.Fotorama.measures[y] = k.measures = r.Fotorama.measures[y] || {
						width: w.width,
						height: w.height,
						ratio: w.width / w.height
					};
					il(k.measures.width, k.measures.height, k.measures.ratio, o);
					b.off("load error").addClass(cr + (p ? " " + ee : "")).prependTo(l);
					su(b, (r.isFunction(i) ? i() : i) || lt, u || h.fit || c.fit, f || h.position || c.position);
					r.Fotorama.cache[y] = v.state = "loaded";
					setTimeout(function () {
						l.trigger("f:load").removeClass(hi + " " + si).addClass(ct + " " + (p ? ue : fe));
						t === "stage" ? g("load") : h.thumbratio !== iu && (h.thumbratio || c.thumbratio !== iu) || (h.thumbratio = k.measures.ratio, bu())
					}, 0)
				}
				function it() {
					var n = 10;
					s(function () {
						return !ss || !n-- && !pt
					}, function () {
						ut()
					})
				}
				var p;
				if (l && (p = rt.fullScreen && h.full && h.full !== h.img && !v.$full && t === "stage", !v.$img || e || p)) {
					var w = new Image,
					b = r(w),
					k = b.data();
					v[p ? "$full" : "$img"] = b;
					var tt = t === "stage" ? p ? "full" : "img" : "thumb",
					y = h[tt],
					d = p ? null : h[t === "stage" ? "thumb" : "img"];
					if (t === "navThumb" && (l = v.$wrap), !y) {
						nt();
						return
					}
					if (r.Fotorama.cache[y])
						(function ft() {
							r.Fotorama.cache[y] === "error" ? nt() : r.Fotorama.cache[y] === "loaded" ? setTimeout(it, 0) : setTimeout(ft, 100)
						})();
					else {
						r.Fotorama.cache[y] = "*";
						b.on("load", it).on("error", nt)
					}
					v.state = "";
					w.src = y
				}
			})
		}
		function ca(n) {
			hc.append(ws.spin().el).appendTo(n)
		}
		function rl() {
			hc.detach();
			ws && ws.stop()
		}
		function ul() {
			var n = hr[h];
			if (n && !n.data().state) {
				ca(n);
				n.on("f:load f:error", function () {
					n.off("f:load f:error");
					rl()
				})
			}
		}
		function fl(n) {
			pi(n, wl);
			wi(n, function () {
				setTimeout(function () {
					st(or)
				}, 0);
				pe({
					time: so,
					guessIndex: r(this).data().eq,
					minMax: li
				})
			})
		}
		function gh(n, t) {
			dh(n, t, function (n, i, u, f, o, s) {
				if (!f) {
					f = u[o] = fr[o].clone();
					s = f.data();
					s.data = u;
					var h = f[0];
					t === "stage" ? (u.html && r('<div class="' + he + '"><\/div>').append(u._html ? r(u.html).removeAttr("id").html(u._html) : u.html).appendTo(f), u.caption && r(e(le, e(ae, u.caption))).appendTo(f), u.video && f.addClass(lf).append(sc.clone()), wi(h, function () {
							setTimeout(function () {
								st(er)
							}, 0);
							ns({
								index: s.eq,
								user: !0
							})
						}), sh = sh.add(f)) : t === "navDot" ? (fl(h), lh = lh.add(f)) : t === "navThumb" && (fl(h), s.$wrap = f.children(":first"), ys = ys.add(f), u.video && s.$wrap.append(sc.clone()))
				}
			})
		}
		function nc(n, t, i, r) {
			return n && n.length && su(n, t, i, r)
		}
		function el(n) {
			dh(n, "stage", function (n, t, i, u, f, e) {
				if (u) {
					var o = io(t),
					s = i.fit || c.fit,
					l = i.position || c.position;
					e.eq = o;
					wh[h][o] = u.css(r.extend({
								left: pu ? 0 : ni(t, lt.w, c.margin, ku)
							}, pu && ai(0)));
					wo(u[0]) && (u.appendTo(ke), be(i.$video));
					nc(e.$img, lt, s, l);
					nc(e.$full, lt, s, l)
				}
			})
		}
		function cs(n, t) {
			if (wr === "thumbs" && !isNaN(n)) {
				var i = -n,
				f = -n + lt.nw;
				ys.each(function () {
					var v = r(this),
					n = v.data(),
					e = n.eq,
					o = function () {
						return {
							h: ks,
							w: n.w
						}
					},
					s = o(),
					h = at != null && at[e] != u ? at[e] : {},
					l = h.thumbfit || c.thumbfit,
					a = h.thumbposition || c.thumbposition;
					(s.w = n.w, n.l + n.w < i || n.l > f || nc(n.$img, s, l, a)) || t && hs([e], "navThumb", o, l, a)
				})
			}
		}
		function ls(n, t, i) {
			if (!ls[i]) {
				var f = i === "nav" && oo,
				u = 0;
				t.append(n.filter(function () {
						for (var t, i = r(this), u = i.data(), n = 0, f = at.length; n < f; n++)
							if (u.data === at[n]) {
								t = !0;
								u.eq = n;
								break
							}
						return t || i.remove() && !1
					}).sort(function (n, t) {
						return r(n).data().eq - r(t).data().eq
					}).each(function () {
						if (f) {
							var i = r(this),
							n = i.data(),
							t = Math.round(ks * n.data.thumbratio) || vh;
							n.l = u;
							n.w = t;
							i.css({
								width: t
							});
							u += t + c.thumbmargin
						}
					}));
				ls[i] = !0
			}
		}
		function ol(n) {
			return n - kc > lt.w / 3
		}
		function as(n) {
			return !fu && (!(dt + n) || !(dt - ki + n)) && !di
		}
		function sl() {
			var n = as(0),
			t = as(1);
			ec.toggleClass(ur, n).attr(vu(n));
			oc.toggleClass(ur, t).attr(vu(t))
		}
		function hl() {
			ds.ok && (ds.prevent = {
					"<": as(0),
					">": as(1)
				})
		}
		function cl(n) {
			var r = n.data(),
			t,
			i;
			return oo ? (t = r.l, i = r.w) : (t = n.position().left, i = n.width()), {
				c: t + i / 2,
				min: -t + c.thumbmargin * 10,
				max: -t + lt.w - i - c.thumbmargin * 10
			}
		}
		function ll(n) {
			var t = hr[ye].data();
			ht(gl, {
				time: n * 1.2,
				pos: t.l,
				width: t.w - c.thumbborderwidth * 2
			})
		}
		function pe(n) {
			var r = at[n.guessIndex][ye];
			if (r) {
				var t = li.min !== li.max,
				u = n.minMax || t && cl(hr[ye]),
				f = t && (n.keep && pe.l ? pe.l : v((n.coo || lt.nw / 2) - cl(r).c, u.min, u.max)),
				i = t && v(f, li.min, li.max),
				e = n.time * 1.1;
				ht(pr, {
					time: e,
					pos: i || 0,
					onEnd: function () {
						cs(i, !0)
					}
				});
				ao(or, ti(i, li.min, li.max));
				pe.l = f
			}
		}
		function la() {
			al(ye);
			co[ye].push(hr[ye].addClass(ei))
		}
		function al(n) {
			for (var t = co[n]; t.length; )
				t.shift().removeClass(ei)
		}
		function tc(n) {
			var t = wh[n];
			r.each(ru, function (n, i) {
				delete t[io(i)]
			});
			r.each(t, function (n, i) {
				delete t[n];
				i.detach()
			})
		}
		function vl(n) {
			ku = ar = dt;
			var t = hr[h];
			t && (al(h), co[h].push(t.addClass(ei)), n || rt.show.onEnd(!0), vi(ke, 0, !0), tc(h), el(ru), sa(), ha())
		}
		function yl(n, t) {
			n && r.each(t, function (t, i) {
				i && r.extend(i, {
					width: n.width || i.width,
					height: n.height,
					minwidth: n.minwidth,
					maxwidth: n.maxwidth,
					minheight: n.minheight,
					maxheight: n.maxheight,
					ratio: au(n.ratio)
				})
			})
		}
		function nu(t, i) {
			n.trigger(f + ":" + t, [rt, i])
		}
		function vs() {
			clearTimeout(uo.t);
			ss = 1;
			c.stopautoplayontouch ? rt.stopAutoplay() : wu = !0
		}
		function uo() {
			ss && (c.stopautoplayontouch || (th(), br()), uo.t = setTimeout(function () {
						ss = 0
					}, ot + it))
		}
		function th() {
			wu = !!(di || ph)
		}
		function br() {
			if (clearTimeout(br.t), s.stop(br.w), !c.autoplay || wu) {
				rt.autoplay && (rt.autoplay = !1, nu("stopautoplay"));
				return
			}
			rt.autoplay || (rt.autoplay = !0, nu("startautoplay"));
			var n = dt,
			t = hr[h].data();
			br.w = s(function () {
					return t.state || n !== dt
				}, function () {
					br.t = setTimeout(function () {
							if (!wu && n === dt) {
								var t = ts,
								i = at[t][h].data();
								br.w = s(function () {
										return i.state || t !== ts
									}, function () {
										wu || t !== ts || rt.show(fu ? bi(!de) : ts)
									})
							}
						}, c.autoplay)
				})
		}
		function pl() {
			rt.fullScreen && (rt.fullScreen = !1, tu && o.cancel(uc), yt.removeClass(ut), ci.removeClass(ut), n.removeClass(sr).insertAfter(oh), lt = r.extend({}, bc), be(di, !0, !0), rh("x", !1), rt.resize(), hs(ru, "stage"), st(p, pc, yc), nu("fullscreenexit"))
		}
		function ao(n, t) {
			es && (n.removeClass(ne + " " + te), t && !di && n.addClass(t.replace(/^|\s/g, " " + fi + "--")))
		}
		function be(n, t, i) {
			t && (fr.removeClass(gi), di = !1, bh());
			n && n !== di && (n.remove(), nu("unloadvideo"));
			i && (th(), br())
		}
		function ih(n) {
			fr.toggleClass(nr, n)
		}
		function po(n) {
			if (!yr.flow) {
				var t = n ? n.pageX : po.x,
				i = t && !as(ol(t)) && c.click;
				po.p !== i && er.toggleClass(vf, i) && (po.p = i, po.x = t)
			}
		}
		function ns(n) {
			clearTimeout(ns.t);
			c.clicktransition && c.clicktransition !== c.transition ? setTimeout(function () {
				var t = c.transition;
				rt.setOptions({
					transition: c.clicktransition
				});
				gf = t;
				ns.t = setTimeout(function () {
						rt.show(n)
					}, 10)
			}, 0) : rt.show(n)
		}
		function aa(n, t) {
			var i = n.target,
			u = r(i);
			u.hasClass(vr) ? rt.playVideo() : i === ah ? rt.toggleFullScreen() : di ? i === ta && be(di, !0, !0) : t ? ih() : c.click && ns({
				index: n.shiftKey || bi(ol(n._x)),
				slow: n.altKey,
				user: !0
			})
		}
		function rh(n, t) {
			yr[n] = li[n] = t
		}
		function wl(n) {
			var t = r(this).data().eq;
			ns({
				index: t,
				slow: n.altKey,
				user: !0,
				coo: n._x - or.offset().left
			})
		}
		function bl(n) {
			ns({
				index: eo.index(this) ? ">" : "<",
				slow: n.altKey,
				user: !0
			})
		}
		function kl(n) {
			wi(n, function () {
				setTimeout(function () {
					st(er)
				}, 0);
				ih(!1)
			})
		}
		function bu() {
			if (ea(), oa(), !bu.i) {
				bu.i = !0;
				var n = c.startindex;
				(n || c.hash && i.hash) && (us = hu(n || i.hash.replace(/^#/, ""), at, rt.index === 0 || n, n));
				dt = ku = ar = nf = us = gc(us) || 0
			}
			if (ki) {
				if (ic())
					return;
				di && be(di, !0);
				ru = [];
				tc(h);
				bu.ok = !0;
				rt.show({
					index: dt,
					time: 0
				});
				rt.resize()
			} else
				rt.destroy()
		}
		function ic() {
			if (!ic.f === de)
				return ic.f = de, dt = ki - 1 - dt, rt.reverse(), !0
		}
		function uh() {
			uh.ok || (uh.ok = !0, nu("ready"))
		}
		ci = r("html");
		yt = r("body");
		var rt = this,
		fh = r.now(),
		rc = f + fh,
		uc = n[0],
		at,
		dl = 1,
		fc = n.data(),
		ki,
		eh = r("<style><\/style>"),
		oh = r(e(ie)),
		fr = r(e(a)),
		er = r(e(ii)).appendTo(fr),
		va = er[0],
		ke = r(e(af)).appendTo(er),
		sh = r(),
		ec = r(e(d + " " + yf + et)),
		oc = r(e(d + " " + pf + et)),
		eo = ec.add(oc).appendTo(er),
		hh = r(e(wf)),
		or = r(e(g)).appendTo(hh),
		pr = r(e(bf)).appendTo(or),
		ch,
		lh = r(),
		ys = r(),
		ya = ke.data(),
		pa = pr.data(),
		gl = r(e(se)).appendTo(pr),
		ps = r(e(re + et)),
		ah = ps[0],
		sc = r(e(vr)),
		na = r(e(ce)).appendTo(er),
		ta = na[0],
		ws,
		hc = r(e(ve)),
		di,
		dt = !1,
		hr,
		ru,
		ku,
		ar,
		nf,
		cc,
		lc,
		ts,
		us,
		fu,
		wr,
		oo,
		ac,
		bs,
		fs,
		pu,
		vh,
		ks,
		so,
		gf,
		es,
		de,
		vc,
		ia = {},
		lt = {},
		yh,
		yr = {},
		ds = {},
		li = {},
		os = {},
		yc,
		pc,
		wc,
		wu,
		ph,
		co = {},
		wh = {},
		bc,
		ss,
		gs,
		ye,
		kc = 0,
		ra = [];
		fr[h] = r(e(ir));
		fr[kt] = r(e(ft + " " + df + et, e(lr)));
		fr[bt] = r(e(ft + " " + kf + et, e(oe)));
		co[h] = [];
		co[kt] = [];
		co[bt] = [];
		wh[h] = {};
		fr.addClass(nt ? rf : tf).toggleClass(nr, !c.controlsonstart);
		fc.fotorama = this;
		rt.startAutoplay = function (n) {
			return rt.autoplay ? this : (wu = ph = !1, dc(n || c.autoplay), br(), this)
		};
		rt.stopAutoplay = function () {
			return rt.autoplay && (wu = ph = !0, br()),
			this
		};
		rt.show = function (n) {
			var t,
			e,
			u,
			r,
			o,
			s,
			f;
			typeof n != "object" ? (t = n, n = {}) : t = n.index;
			t = t === ">" ? ar + 1 : t === "<" ? ar - 1 : t === "<<" ? 0 : t === ">>" ? ki - 1 : t;
			t = isNaN(t) ? hu(t, at, !0) : t;
			t = typeof t == "undefined" ? dt || 0 : t;
			rt.activeIndex = dt = gc(t);
			cc = nl(dt);
			lc = tl(dt);
			ts = io(dt + (de ? -1 : 1));
			ru = [dt, cc, lc];
			ar = fu ? t : dt;
			var l = Math.abs(nf - ar),
			i = uu(n.time, function () {
					return Math.min(so * (1 + (l - 1) / 12), so * 2)
				}),
			a = n.overPos;
			return n.slow && (i *= 10),
			e = hr,
			rt.activeFrame = hr = at[dt],
			u = e === hr && !n.user,
			be(di, hr.i !== at[io(ku)].i),
			gh(ru, "stage"),
			el(pt ? [ar] : [ar, nl(ar), tl(ar)]),
			rh("go", !0),
			u || nu("show", {
				user: n.user,
				time: i
			}),
			wu = !0,
			r = rt.show.onEnd = function (t) {
				if (!r.ok) {
					if (r.ok = !0, t || vl(!0), u || nu("showend", {
							user: n.user
						}), !t && gf && gf !== c.transition) {
						rt.setOptions({
							transition: gf
						});
						gf = !1;
						return
					}
					ul();
					hs(ru, "stage");
					rh("go", !1);
					hl();
					po();
					th();
					br()
				}
			},
			pu ? (o = hr[h], s = dt !== nf ? at[nf][h] : null, yu(o, s, sh, {
					time: i,
					method: c.transition,
					onEnd: r
				}, ra)) : ht(ke, {
				pos: -ni(ar, lt.w, c.margin, ku),
				overPos: a,
				time: i,
				onEnd: r
			}),
			sl(),
			wr && (la(), f = kh(dt + v(ar - nf, -1, 1)), pe({
					time: i,
					coo: f !== dt && n.coo,
					guessIndex: typeof n.coo != "undefined" ? f : dt,
					keep: u
				}), oo && ll(i)),
			wc = typeof nf != "undefined" && nf !== dt,
			nf = dt,
			c.hash && wc && !rt.eq && bo(hr.id || dt + 1),
			this
		};
		rt.requestFullScreen = function () {
			return bs && !rt.fullScreen && (yc = p.scrollTop(), pc = p.scrollLeft(), st(p), rh("x", !0), bc = r.extend({}, lt), n.addClass(sr).appendTo(yt.addClass(ut)), ci.addClass(ut), be(di, !0, !0), rt.fullScreen = !0, fs && o.request(uc), rt.resize(), hs(ru, "stage"), ul(), nu("fullscreenenter")),
			this
		};
		rt.cancelFullScreen = function () {
			return fs && o.is() ? o.cancel(t) : pl(),
			this
		};
		rt.toggleFullScreen = function () {
			return rt[(rt.fullScreen ? "cancel" : "request") + "FullScreen"]()
		};
		l(t, o.event, function () {
			!at || o.is() || di || pl()
		});
		rt.resize = function (n) {
			var r,
			u;
			if (!at)
				return this;
			r = arguments[1] || 0;
			u = arguments[2];
			yl(rt.fullScreen ? {
				width: "100%",
				maxwidth: null,
				minwidth: null,
				height: "100%",
				maxheight: null,
				minheight: null
			}
				 : yi(n), [lt, u || rt.fullScreen || c]);
			var t = lt.width,
			i = lt.height,
			e = lt.ratio,
			f = p.height() - (wr ? or.height() : 0);
			return k(t) && (fr.addClass(tr).css({
					width: t,
					minWidth: lt.minwidth || 0,
					maxWidth: lt.maxwidth || ro
				}), t = lt.W = lt.w = fr.width(), lt.nw = wr && b(c.navwidth, t) || t, c.glimpse && (lt.w -= Math.round((b(c.glimpse, t) || 0) * 2)), ke.css({
					width: lt.w,
					marginLeft: (lt.W - lt.w) / 2
				}), i = b(i, f), i = i || e && t / e, i -= 50, i && (t = Math.round(t), i = lt.h = Math.round(v(i, b(lt.minheight, f), b(lt.maxheight, f))), er.stop().animate({
						width: t,
						height: i
					}, r, function () {
						fr.removeClass(tr)
					}), vl(), wr && (or.stop().animate({
							width: lt.nw
						}, r), pe({
							guessIndex: dt,
							time: r,
							keep: !0
						}), oo && ls.nav && ll(r)), yh = u || !0, uh())),
			kc = er.offset().left,
			this
		};
		rt.setOptions = function (n) {
			return r.extend(c, n),
			bu(),
			this
		};
		rt.shuffle = function () {
			return at && cu(at) && bu(),
			this
		};
		rt.destroy = function () {
			return rt.cancelFullScreen(),
			rt.stopAutoplay(),
			at = rt.data = null,
			nh(),
			ru = [],
			tc(h),
			bu.ok = !1,
			this
		};
		rt.playVideo = function () {
			var n = hr,
			t = n.video,
			i = dt;
			return typeof t == "object" && n.videoReady && (fs && rt.fullScreen && rt.cancelFullScreen(), s(function () {
					return !o.is() || i !== dt
				}, function () {
					i === dt && (n.$video = n.$video || r(r.Fotorama.jst.video(t)), n.$video.appendTo(n[h]), fr.addClass(gi), di = n.$video, bh(), eo.blur(), ps.blur(), nu("loadvideo"))
				})),
			this
		};
		rt.stopVideo = function () {
			return be(di, !0, !0),
			this
		};
		er.on("mousemove", po);
		yr = du(ke, {
				onStart: vs,
				onMove: function (n, t) {
					ao(er, t.edge)
				},
				onTouchEnd: uo,
				onEnd: function (n) {
					var t,
					i;
					ao(er);
					t = (tt && !gs || n.touch) && c.arrows && c.arrows !== "always";
					n.moved || t && n.pos !== n.newPos && !n.control ? (i = ho(n.newPos, lt.w, c.margin, ku), rt.show({
							index: i,
							time: pu ? so : n.time,
							overPos: n.overPos,
							user: !0
						})) : n.aborted || n.control || aa(n.startEvent, t)
				},
				timeLow: 1,
				timeHigh: 1,
				friction: 2,
				select: "." + oi + ", ." + oi + " *",
				$wrap: er
			});
		li = du(pr, {
				onStart: vs,
				onMove: function (n, t) {
					ao(or, t.edge)
				},
				onTouchEnd: uo,
				onEnd: function (n) {
					function t() {
						pe.l = n.newPos;
						th();
						br();
						cs(n.newPos, !0)
					}
					if (n.moved)
						n.pos !== n.newPos ? (wu = !0, ht(pr, {
								time: n.time,
								pos: n.newPos,
								overPos: n.overPos,
								onEnd: t
							}), cs(n.newPos), es && ao(or, ti(n.newPos, li.min, li.max))) : t();
					else {
						var i = n.$target.closest("." + ft, pr)[0];
						i && wl.call(i, n.startEvent)
					}
				},
				timeLow: .5,
				timeHigh: 2,
				friction: 5,
				$wrap: or
			});
		ds = gu(er, {
				shift: !0,
				onEnd: function (n, t) {
					vs();
					uo();
					rt.show({
						index: t,
						slow: n.altKey
					})
				}
			});
		os = gu(or, {
				onEnd: function (n, t) {
					vs();
					uo();
					var i = vi(pr) + t * .25;
					pr.css(gt(v(i, li.min, li.max)));
					es && ao(or, ti(i, li.min, li.max));
					os.prevent = {
						"<": i >= li.max,
						">": i <= li.min
					};
					clearTimeout(os.t);
					os.t = setTimeout(function () {
							pe.l = i;
							cs(i, !0)
						}, it);
					cs(i)
				}
			});
		fr.hover(function () {
			setTimeout(function () {
				ss || ih(!(gs = !0))
			}, 0)
		}, function () {
			gs && ih(!(gs = !1))
		});
		go(eo, function (n) {
			w(n);
			bl.call(this, n)
		}, {
			onStart: function () {
				vs();
				yr.control = !0
			},
			onTouchEnd: uo
		});
		eo.each(function () {
			pi(this, function (n) {
				bl.call(this, n)
			});
			kl(this)
		});
		pi(ah, rt.toggleFullScreen);
		kl(ah);
		r.each("load push pop shift unshift reverse sort splice".split(" "), function (n, t) {
			rt[t] = function () {
				return at = at || [],
				t !== "load" ? Array.prototype[t].apply(at, arguments) : arguments[0] && typeof arguments[0] == "object" && arguments[0].length && (at = lu(arguments[0])),
				bu(),
				rt
			}
		});
		bu()
	};
	r.fn.fotorama = function (t) {
		return this.each(function () {
			var e = this,
			i = r(this),
			u = i.data(),
			f = u.fotorama;
			f ? f.setOptions(t, !0) : s(function () {
				return !po(e)
			}, function () {
				u.urtext = i.html();
				new r.Fotorama(i, r.extend({}, uo, n.fotoramaDefaults, t, u))
			})
		})
	};
	r.Fotorama.instances = [];
	r.Fotorama.cache = {};
	r.Fotorama.measures = {};
	r = r || {};
	r.Fotorama = r.Fotorama || {};
	r.Fotorama.jst = r.Fotorama.jst || {};
	r.Fotorama.jst.style = function (n) {
		var t,
		i = yr.escape;
		return "" + (".fotorama" + ((t = n.s) == null ? "" : t) + " .fotorama__nav--thumbs .fotorama__nav__frame{\npadding:" + ((t = n.m) == null ? "" : t) + "px;\nheight:" + ((t = n.h) == null ? "" : t) + "px}\n.fotorama" + ((t = n.s) == null ? "" : t) + " .fotorama__thumb-border{\nheight:" + ((t = n.h - n.b * (n.q ? 0 : 2)) == null ? "" : t) + "px;\nborder-width:" + ((t = n.b) == null ? "" : t) + "px;\nmargin-top:" + ((t = n.m) == null ? "" : t) + "px}")
	};
	r.Fotorama.jst.video = function (n) {
		function r() {
			t += i.call(arguments, "")
		}
		var t = "",
		u = yr.escape,
		i = Array.prototype.join;
		return t += '<div class="fotorama__video"><iframe allow="autoplay; encrypted-media" src="',
		r((n.type == "youtube" ? n.p + "youtube.com/embed/" + n.id + "?autoplay=1" : n.type == "vimeo" ? n.p + "player.vimeo.com/video/" + n.id + "?autoplay=1&badge=0" : n.id) + (n.s && n.type != "custom" ? "&" + n.s : "")),
		t += '" frameborder="0" allowfullscreen><\/iframe><\/div>\n'
	};
	r(function () {
		r("." + f + ':not([data-auto="false"])').fotorama()
	})
}
(window, document, location, typeof jQuery != "undefined" && jQuery);
var galleryItems, pswpElement = document.querySelectorAll(".pswpGallery")[0], lstTopbarItems = [], resJSON = null, currentGalleryImageIndex = 0;
var parr = "<i class='icondetail-prev'><\/i>", narr = "<i class='icondetail-next'><\/i>", isZoom = !1, colorPic = $(".colorandpic.cate-2142"), carousel = $(".colorandpic .owl-carousel"), isCount = !1, isSetTimer = !1, isDisplayCheckDeli = !1, isChangeProvince = !1, isClickNeS = !1, urlRedirect = null, isSlider = !1, gotoSlideF = 0, isShowAllColor = !1;
$(function () {
	var i,
	t,
	n,
	u,
	r;
	IsCC == "True" && setTimeout(function () {
		location.reload(!1)
	}, 3e5);
	
	lazy("img[data-src]");
});
isChangeProvince = !1;
loading = !1;
type = $(".type-2").length > 0 ? 1 : 0;
flagSubmitCoupon = !1;
voted = !1;
typeCart = 0;
showCombo = !1;
submitUpdateInfo = !1;
loadingCallToCC = !1;
isLoadStore = !1;
onSubmitOrder = !1;
$.fn.serializeObject = function () {
	var n = {},
	t = this.serializeArray();
	return $.each(t, function () {
		n[this.name] ? (n[this.name].push || (n[this.name] = [n[this.name]]), n[this.name].push(this.value || "")) : n[this.name] = this.value || ""
	}),
	n
};
remainuser = 0;
flagOpenPopupUser = !1;
flagShowmoreuser = !1;
flagSearch = !1;
