/***********************************************************************
 *
 * Fightly - Web Game Engine
 * http://fightly.com
 *
 * License: see LICENSE.txt
 *
 **********************************************************************/

var arrayList_ = require("./array-list.js");

exports.Subject = function() {

   this.observers = new arrayList_.ArrayList();

}

exports.Subject.prototype = {

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
}
