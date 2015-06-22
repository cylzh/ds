/**
 * Created by jade on 2015/6/22.
 */
var mongoose = require("mongoose");
var customerSchema = require("../schema/customer");
var CustomerModel = mongoose.model("customer", customerSchema);

var CustomerDto = function () {

}


module.exports = new CustomerDto();