var Liquid = {
    author: 'EXPVirusGene<expVirus.gene@gmail.com>',
    version: '0.0.1',
    
    parse: function(__data__) {
        return JSON.parse(__data__.replace(/=>/g, ":"));
    }
};

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
        exports = module.exports = Liquid;
    }
    exports.Liquid = Liquid;
}