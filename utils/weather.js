const request = require('postman-request')

function Weather(address , callback) {
const url = 'http://api.weatherstack.com/current?access_key=28372755581152231d70be72e9aa20ae&query='+encodeURIComponent(address)+'&units=m'

request({url,json:true},(error,{body}={}) => {
    if(error) {callback('Unable to connect to weather service!', null);}
    else if(body.error) {callback('ensure that address is correct',null)}
    else {
        callback(null,body.current)
    }
})
}

module.exports = Weather