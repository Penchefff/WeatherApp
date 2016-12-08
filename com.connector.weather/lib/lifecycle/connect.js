var yourDataStore = {};

exports.connect = function (next) {
    this.client = {}
    next();
}