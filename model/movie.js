/**
 * Created by jade on 2015/6/23.
 */

var movieSchema = require("../schema/movie");
var mongoose = require("mongoose");

var MovieModel = mongoose.model("movie", movieSchema);

function movieDto() {

}

movieDto.prototype.save = function (obj, callback) {
    var movieModel = new MovieModel(obj);
    movieModel.save(function (err, movie) {
        callback(err, movie);
    });
};

movieDto.prototype.pagdResult = function (searchParams, callback) {

    var pageSize = searchParams.ps || 10;
    var pageNumber = searchParams.pn || 1;
    var skip = pageSize * (pageNumber - 1);

    var query = MovieModel.find(searchParams.q).sort({create_date: -1}).skip(skip).limit(pageSize).populate("_user");

    query.exec(function (err, movieList) {
            if (!err) {
                MovieModel.count({name: searchParams.q}, function (err, count) {
                        if (!err) {
                            callback({
                                movieList: movieList,
                                pageSize: pageSize,
                                pageNumber: pageNumber,
                                totalPages: Math.ceil(count / pageSize)
                            })
                        }
                    }
                )
            }
        }
    )
}

movieDto.prototype.findById = function (id, callback) {
    MovieModel.findById(id).populate("_user").exec(function (err, movie) {
        if (err) {
            movie = {};
        }
        callback(movie);
    })
}

module.exports = new movieDto();



var o = (function() {
    var person = {
        name: 'Vincent',
        age: 24
    };
    return {
        run: function(k) {
            return person[k];
        }
    }
})();

// TODO 在不改变上面代码的基础上，并且在只知道 person 是一个对象的基础上
// 只能在本段注释后面继续写代码，最终通过 o 打印出 person ，对于上文中的 person 即 `Object {name: "Vincent", age: 24}`
// 例如 o.someThing = 1; cosnole.log(o.run('someThing'));
// 在考虑到 person 为未知对象的基础上，尽可能写出更加完善的代码。
// 最终，如果不能完成该题，请尽可能的记录下来你思考的过程。

