var VideoClass =
{
    Initiate: function (container, ID, Title, Description, CoverImageURL, VideoSize, VideoLength)
    {
        var html = "";
        html += "<a href=\"PlayVideo.aspx?ID=" + ID + "\" target=\"_blank\">";
        if (CoverImageURL.length == 0)
        {
            html += "<div class=\"VideoContainer\" style='background-color:#f0f0f0; background-repeat:no-repeat; background-size:cover;' title=\"点击播放 - " + Title + "\">";
        }
        else
        {
            html += "<div style='background-image:url(" + CoverImageURL + "); background-repeat:no-repeat; background-size:cover;' class='CoverBg'></div>";
            html += "<div class=\"VideoContainer\" title=\"点击播放 - " + Title + "\">";
        }
        html += "<div class=\"VideoButton icon-play\"></div>";
        html += "<div class=\"VideoTitle\">" + Title + "</div>";
        html += "<div class=\"VideoDescription\">" + Description + "</div>";
        //html += "<div class=\"VideoSize\">" + VideoSize + "</div>";
        html += "<div class=\"VideoLength\">" + VideoLength + "</div>";
        html += "</div>";
        html += "</a>";
        Element.SetHtml(container, html);
    }
};