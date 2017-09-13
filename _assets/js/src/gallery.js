"use strict";
    
/*const LIMIT_COUNT = '{{ site.oauth.instagram.media_max_count }}' * 1;*/
const LIMIT_COUNT = 20;

var MAX_ID = null;
var MORE = false;

var setProfile = function(token) {
    $.ajax({
        cache: false,
        type: "GET",
        url: 'https://api.instagram.com/v1/users/self/',
        dataType: 'jsonp',
        data: { access_token : token },
        crossDomain: true,
        success: function(data, textStatus, jqXHR) {
            $("#user_profile_picture_img").attr("src", data.data.profile_picture);
            $("#user_profile_picture_img").load(function() {
                $("#user_profile_picture_div").css({
                    "width": this.width + "px",
                    "height": this.height + "px",
                    "background-image": "url(" + this.src + ")"
                });
                this.remove();
            });
            
            $("#user_name").html(data.data.full_name + " ( @" + data.data.username + " )");
            $("#user_bio").html(data.data.bio);
            $("#user_counts").html(
                "<h3 style=\"display: inline-block;\">" + data.data.counts.media + "</h3> posts " +
                "<h3 style=\"display: inline-block;\">" + data.data.counts.followed_by + "</h3> following " +
                "<h3 style=\"display: inline-block;\">" + data.data.counts.follows + "</h3> followers"
            );
        },
        error: function(x,y,z) {
            console.log("***ERROR in simpleJekyllSearch.js***");
            console.log(x);
            console.log(y);
            console.log(z);
            /*x.responseText should have what's wrong*/
        }
    });
};

var setPhotoContents = function(token) {
    $.ajax({
        cache: false,
        type: "GET",
        url: 'https://api.instagram.com/v1/users/self/media/recent/' ,
        dataType: 'jsonp',
        data: { access_token : token, max_id : MAX_ID },
        crossDomain: true,
        success: function(data, textStatus, jqXHR) {
            /*TODO: need re-factoring*/
            var __htmlOutput__ = $("#gallery_contents_crawler").html();
            var __tempMaxId__ = "";
            var __itemCount__ = 0;
            var __sumWidth__ = 0;
            $.each(data.data, function(i, item) {
                /*if (typeof item.carousel_media != 'undefined') {*/
                if (item.type === "carousel") {
                    $.each(item.carousel_media, function(ii, iitem) {
                        /*__htmlOutput__ += "<div style='display:inline-block;float:left;height:120%;>"*/
                        __htmlOutput__ += "<img src='" + iitem.images.low_resolution.url + "'"
                                        + "data-original='" + iitem.images.standard_resolution.url + "'"
                                        /*+ "data-linkTo='" + item.link + "'"*/
                                        + "alt='Based, 320x320' style=\"height:80%;\"/>";
                                        /*+ "</div>";*/
                        __itemCount__ += 1;
                        __sumWidth__ += iitem.images.low_resolution.width;
                    });
                } else {
                    /*__htmlOutput__ += "<div style='display:inline-block;float:left;height:120%;'>"*/
                    __htmlOutput__ += "<img src='" + item.images.low_resolution.url + "'"
                                    + "data-original='" + item.images.standard_resolution.url + "'"
                                    /*+ "data-linkTo='" + item.link + "'"*/
                                    + "alt='Based, 320x320' style=\"height:80%;\"/>";
                                    /*+ "</div>";*/
                    __itemCount__ += 1;
                    __sumWidth__ += item.images.low_resolution.width;
                }
                
                __tempMaxId__ = '"' + item.id + '"';
            });
            
            $("#gallery_contents_crawler").html(__htmlOutput__);
            
            marqueeInit({
                uniqueid: 'gallery_contents_crawler',
                style: {
                    "width": __sumWidth__ + "px"
                },
                inc: 16, /*speed - pixel increment for each iteration of this marquee's movement*/
                mouse: 'cursor driven', /*mouseover behavior ('pause' 'cursor driven' or false)*/
                moveatleast: 2,
                neutral: 320,
                savedirection: true,
                random: false
            });
            
            CONFIG.fancybox && NexT.utils.wrapImageWithFancyBox();
            
            MAX_ID = __tempMaxId__.replace(/\"|\'/g, "");
        },
        error: function(x,y,z) {
            console.log("***ERROR in simpleJekyllSearch.js***");
            console.log(x);
            console.log(y);
            console.log(z);
            /*x.responseText should have what's wrong*/
        }
    });
};

(function init(token) {
    setProfile(token);
    setPhotoContents(token);
}('2434938882.fc337e6.38410558a5da4d8193af7cf15422da07'));
/*}('{{ site.oauth.instagram.access_token }}'));*/