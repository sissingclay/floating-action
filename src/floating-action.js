/**
 * Created by claysissing on 12/07/2016.
 */

var csFA = Object.create(HTMLElement.prototype);

csFA.createdCallback = function() {
    this.setAttributes();
    this.setElements();
    this.addEvents();
    this.hasScrolled();
};

csFA.setAttributes = function() {
    this.button = this.getAttribute('button');
    this.container = this.getAttribute('container');
    this.toggle = this.getAttribute('toggle');
    this.moveContainer = this.getAttribute('move-container');
    this.offSet = parseInt(this.getAttribute('to-bottom')) || 0;
};

csFA.setElements = function() {
    this.buttonElement = document.querySelector(this.button);
    this.containerElement = document.querySelector(this.container);
};

csFA.addEvents = function() {
    
    if(!this.isTouchDevice()) {
        this.addEventListener('mouseenter', this.buttonAction.bind(this), false);
        this.addEventListener('mouseleave', this.buttonAction.bind(this), false);
    }
    
    if(this.isTouchDevice()) {
        this.buttonElement.addEventListener('click', this.buttonAction.bind(this), false);
    }
};

csFA.hasScrolled = function() {
    
    window.addEventListener('scroll', function() {
        
        var isBottom = this.isBottom(this.offSet),
            hasClass = this.classList.contains(this.moveContainer);
        
        if(isBottom) {
            if(!hasClass) {
                this.classList.add(this.moveContainer);
            }
        }
        
        if(!isBottom) {
            if(hasClass) {
                this.classList.remove(this.moveContainer);
            }
        }
        
    }.bind(this), false);
};

csFA.buttonAction = function(e) {
    
    e.preventDefault();
    this.addRemoveClass();
    
    this.buttonElement.addEventListener('click', function(e) {
        e.preventDefault();
    }, false);
};

csFA.addRemoveClass = function () {
    
    var conElement = this.containerElement,
        isVisible = conElement.classList.contains(this.toggle);
    
    if(!isVisible) {
        conElement.classList.add(this.toggle);
    }
    
    if(isVisible) {
        conElement.classList.remove(this.toggle);
    }
};

csFA.isTouchDevice = function() {
    try {
        document.createEvent('TouchEvent');
        return true;
    } catch (e) {
        return false;
    }
};

csFA.isBottom = function(offSet) {
    
    var totalHeight   = document.body.offsetHeight - offSet,
        visibleHeight = document.documentElement.clientHeight,
        currentScroll;
    
    if (document.documentElement.scrollTop) {
        currentScroll = document.documentElement.scrollTop;
    } else {
        currentScroll = document.body.scrollTop;
    }
    
    if (totalHeight <= currentScroll + visibleHeight) {
        return true;
    } else {
        return false;
    }
}


document.registerElement('cs-floatingaction', {
    prototype: csFA
});