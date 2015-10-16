/*
 * Author      : Subash Selvaraj
 * Version     : 1.0
 * website     : http://subashselvaraj.com/
 * Plugin url  : https://github.com/sesubash/searchbox
 * Created date: 14-07-2014
 * Last updated: 09-10-2014
 */

//=====================================================================================
//  Usage:
//  -------
//      HTML:
//      ======
//      <nav class="navbar navbar-default navbar-fixed-top" role="navigation">
//   <!--We use the fluid option here to avoid overriding the fixed width of a normal container within the narrow content columns.-->
//   <div class="container-fluid">
//     <div class="navbar-header">
//       <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-6">
//         <span class="sr-only">Toggle navigation</span>
//         <span class="icon-bar"></span>
//         <span class="icon-bar"></span>
//         <span class="icon-bar"></span>
//       </button>
//       <a class="navbar-brand" href="#">Brand</a>
//     </div>

//     <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-6">
//       <ul class="nav navbar-nav">
//         <li class="active"><a href="#">Home</a></li>
//         <li><a href="#">Contact</a></li>
//           <li><a><div class="search"></div></a></li>
//       </ul>
//     </div><!-- /.navbar-collapse -->
//   </div>
// </nav>
//      
//  Script:
//  -------
//  $(".search").searchbox({
//     name:"search",
//     method:"POST",
//     url:"",
//     ajax: true,
//     placement:"right",
//     ajax: true,
//     placement:"left",
//     ajaxOptions:{
//        success: function(success){
//            alert(success);
//        },
//        error: function(error){
//            alert(error);
//       }
//     }
//  });
//        
//      
//  options:
//      method      : HTTP method ('POST' or 'GET' etc.,)
//      name        : Input field name
//      ajax        : true or false
//      url         : url to submit
//      placement    : left  or right
//      ajaxOptions : ajaxOptions (applicable only if ajax parameter is true)
//
//=======================================================================================

// Demo:
// -----
//  http://jsfiddle.net/Lw3CN/24/embedded/result/
//  
// ====================================================
// 
(function ($) {
    $.fn.searchbox = function(options){
        var searchbox = this;
        var defaults = {
            wrapper: '<div class="searchbox-wrapper"/>',
            method:"POST",
            name: "search",
            ajax: false
        };
        searchbox.settings = $.extend({}, defaults, options);

        searchbox.destroy = function(){
            searchbox.each(function(){
                $.removeData(this);
                var obj = $(this);
                var $input = obj.find("input");
                var $parent = obj.parent().parent();
                $input.unbind("click");
                $parent.unbind("click");
            });
        };

        searchbox.onSubmit = function(event){
            var data = $(this).serialize();

            var ajaxOptions        = searchbox.settings.ajaxOptions;
                ajaxOptions.url    = searchbox.settings.url;
                ajaxOptions.method = searchbox.settings.method;
                ajaxOptions.data   =  data;           

            $.ajax(ajaxOptions);

            return false;
        };

        return searchbox.each(function(i){
            var obj = $(this);
            obj.addClass("search-box");
            // wrap the item with outer parent div
            obj.wrap(searchbox.settings.wrapper);
            // add the input field to the plugin
            obj.append("<div class='input-wrapper'><input class='search-input' type='text' name='"+searchbox.settings.name+"'></div>");
            // wrap the input field with a <form/>
            obj.wrap("<form id='searchbox-form' method='"+searchbox.settings.method+"' action='"+searchbox.settings.url+"'>");

            var $input = obj.find("input");
            var $inputWrapper = obj.find(".input-wrapper");
            var $parent = obj.parent().parent();

            //
            $parent.on("click", function(e){
                $(this).toggleClass("active");
                $input.focus();
                e.preventDefault();
                e.stopPropagation();
            });

            // set the postion of wrapper based on the option
            if(searchbox.settings.placement !== "undefined"){
                switch(searchbox.settings.placement){
                    case "right":
                                $inputWrapper.css("left", obj.width());
                                break;
                    case "left":
                                $inputWrapper.css("right", obj.width());
                                break;
                }
            }else{// by default set the placement of wrapper to the right side of search icon
                $inputWrapper.css("left", obj.width());
            }

            // adjust the vertical placement of wrapper
            $inputWrapper.css("top", -obj.height()/2);

            // prevent the search wrapper from closing it when clickon the input field
            $input.on("click", function(e){
                e.preventDefault();
                e.stopPropagation();
            });

            // close the input wrapper on clicking anywhere else other than input box
            $(document).on("click",function(){
                $parent.hasClass("active") ?  $parent.removeClass("active") : "";
            });

            if(searchbox.settings.ajax){
                $("#searchbox-form").submit(searchbox.onSubmit);
            }
        });
    };
})(jQuery);

$(".search").searchbox({
    name:"search",
    method:"POST",
    url:"",
    ajax: true,
    placement:"right",
    ajaxOptions:{
        success: function(success){
            alert(success);
        },
        error: function(error){
            alert(error);
        }
    }
});