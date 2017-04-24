var cool = 1;
if (localStorage.getItem("high") == null) {
    var best = localStorage.setItem("high", 0);
} else {
    var best = localStorage.getItem("high");
}

function myFunction() {
    document.getElementById("something").innerHTML = "Keep Tapping";
    document.getElementById("paragraph").innerHTML = cool;
    cool++;
    var parent = document.getElementById("div1");
    setTimeout(function () {
        var ooo = cool - 1;

        document.getElementById("don").innerHTML = cool - 1;
        var parent = document.getElementById("div1");
        var child = document.getElementById("something");
        parent.removeChild(child);
        var parent1 = document.getElementById("div2");
        var child1 = document.getElementById("paragraph");
        parent1.removeChild(child1);

        if (ooo > localStorage.getItem("high")) {
            ooo === best;
            localStorage.setItem("high", ooo);
            document.getElementById("add").innerHTML = localStorage.getItem("high");
        }
        else {
            document.getElementById("record").innerHTML = "no new record";
        }

    }, 3000);
}