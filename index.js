$.ajax({
            type: "GET",
            contentType: "application/json; charset=utf-8",
            cache: false,
            url: "data.xml",
            data: {},
            dataType: 'xml',
            success: function(data, textStatus, jqXHR) {
                
                console.log(data);
                var htmlString = "";
                
                $(data).find('mainMenu mainitem').each(function() {
                    htmlString += parseMainItem(this);
                });

                $("body").append(htmlString);
            }
});

function writeToplevelNav(title, url) {
    return "<a href='"+url+"'>"+title+"</a><br/><hr/>";
}

function parseMainItem(mainitem) {
    var htmlString = writeToplevelNav($(mainitem).attr('title'), 
        $(mainitem).attr('url'), $(this));

    var items = "";
    $(mainitem).find('subitem').each(function () {

        items += parseSubItemItem(this);
    });
    if (items) {
        htmlString += "<ul>" + items + "</ul></li>";
    } else {
        htmlString += "</li>";
    }

    return htmlString;
}

function parseSubItemItem(subitem) {
    var htmlString = "<li>" + 
        writeToplevelNav($(subitem).attr('title'), 
        $(subitem).attr('url'), $(this));

    var items = "";
    $(subitem).find('item').each(function () {

        items += parseSubItemItem(this);
    });
    if (items) {
        htmlString += "<ul>" + items + "</ul></li>";
    } else {
        htmlString += "</li>";
    }

    return htmlString;
}

function parseItem(item) {
    var htmlString = "<li>" + 
        writeToplevelNav($(mitem).attr('title'), 
        $(item).attr('url'), $(this)) + "</li>";

    return htmlString;
}

