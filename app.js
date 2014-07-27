/**
 * Created by zaur on 27.07.2014.
 */
(function(){
   var selector = "bb-calendar";
   var htmlStr = "<form action='' method='post'>"+
                    "с <input id='bb-calendar-from' type='text' value='' placeholder='выберите дату'\/>"+
                        "<a href='#' id='bb-calendar-from-btn'>Календарь<\/a>"+
                    "по <input id='bb-calendar-to' type='text' value='' placeholder='выберите дату'\/>"+
                        "<a href='#' id='bb-calendar-to-btn'>Календарь<\/a>"+
                  "<input type='submit' value='send'></form>";

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
