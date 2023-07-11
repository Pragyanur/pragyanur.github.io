function getData(title)
{
    switch(title)
    {
        case "rs1":
            var s = document.createElement("script");
                s.type = "text/javascript";
                s.src = "../scripts/sketch-01.js";
                s.innerHTML = null;
                s.id = "widget";
                document.getElementById("output").innerHTML = "";
                document.getElementById("output").appendChild(s);
        break;
        case "s2":
            var s = document.createElement("script");
                s.type = "text/javascript";
                s.src = "../scripts/sketch-02.js";
                s.innerHTML = null;
                s.id = "widget";
                document.getElementById("output").innerHTML = "";
                document.getElementById("output").appendChild(s);
        break;
        default:
        void(0);
    }
}