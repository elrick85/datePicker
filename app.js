/**
 * Created by zaur on 27.07.2014.
 */
(function(){
   var selector = "bb-calendar";
   var htmlStr = "<div class='date-picker-box'>"+
        "<div class='date-picker-head'>"+
        "<i class='icon i-logo'></i><p class='pink'>The biggest hostel</br>in Moscow</p></div>"+
        "<div class='box1'>"+
        "<p>Booking </br>here and now</p>"+
        "<div><form action='' method='post'>"+
                    "<label>Check-in Date<\/label><div class='item'><input id='bb-calendar-from' type='text' value='' placeholder=''\/>"+
                        "<a href='#' id='bb-calendar-from-btn'><i class='icon i-btn-picker'><\/i><\/a><\/div>"+
                    "<label>Check-out Date<\/label><div class='item'><input id='bb-calendar-to' type='text' value='' placeholder=''\/>"+
                        "<a href='#' id='bb-calendar-to-btn'><i class='icon i-btn-picker'><\/i><\/a><\/div>"+
                  "<input class='btn default' type='submit' value='Search'></form></div></div></div>";

    window.onload = function(){
        var item = document.getElementById(selector);
        item.innerHTML = htmlStr;

        var from = document.getElementById("bb-calendar-from"),
            to = document.getElementById("bb-calendar-to"),
            fromBtn = document.getElementById("bb-calendar-from-btn"),
            toBtn = document.getElementById("bb-calendar-to-btn");

        from.onfocus = function(){
            this.select();
            bbCalendar.lcs(this);
        };
        from.onclick = function(){
            event.cancelBubble=true;
            this.select();
            bbCalendar.lcs(this)
        };
        fromBtn.onclick = function(){
            event.cancelBubble=true;
            from.select();
            bbCalendar.lcs(from);
            return false;
        };

        to.onfocus = function(){
            this.select();
            bbCalendar.lcs(this);
        };
        to.onclick = function(){
            event.cancelBubble=true;
            this.select();
            bbCalendar.lcs(this)
        };
        toBtn.onclick = function(){
            event.cancelBubble=true;
            to.select();
            bbCalendar.lcs(to);
            return false;
        };
    };
})();
