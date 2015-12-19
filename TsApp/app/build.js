///<reference path="../typings/tsd.d.ts" />
angular.module('app', []);
var Greeter = (function () {
    function Greeter(element) {
        this.element = element;
        this.element.innerHTML += "The time is: ";
        this.span = document.createElement('span');
        this.element.appendChild(this.span);
        this.span.innerText = new Date().toUTCString();
    }
    Greeter.prototype.start = function () {
        //  this.timerToken = setInterval(() => this.span.innerHTML = new Date().toUTCString(), 500);
    };
    Greeter.prototype.stop = function () {
        clearTimeout(this.timerToken);
    };
    return Greeter;
})();
window.onload = function () {
    var el = document.getElementById('content');
    var greeter = new Greeter(el);
    greeter.start();
};

///<reference path="../typings/tsd.d.ts"/>
angular.module('app').controller('TestController', function () {
});

//# sourceMappingURL=build.js.map
