/* *********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var ArrayList = require("./array-list.js");

/**
 * Class Subject
 * Part of the observer pattern.
 *
 * @constructor
 */
function Subject() {

   this.observers = new ArrayList();

}

Subject.prototype = {

    notify : function(context) {

        var m_count = this.observers.count();
        for( var i = 0; i < m_count; i++ )
            this.observers.getAt(i).update(context);
    },

    addObserver : function(observer) {

        if( !observer.update )
            throw 'Wrong parameter';

        this.observers.add(observer);
    },

    removeObserver : function(observer) {

        if( !observer.update )
            throw 'Wrong parameter';

        this.observers.removeAt(this.observers.indexOf( observer, 0 ));
    },
};

module.exports = Subject;
