//IIFI
// Immediately invoed function expression
(function(){
    function start(){
        console.log("App started...")
    }
    window.addEventListener("load",start);
})();
// connect to mongo do and db

connectDB();