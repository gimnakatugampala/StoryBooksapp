const moment = require('moment')

module.exports = {
    formatData : function(date,format){
        return moment(date).format(format)
    }
}