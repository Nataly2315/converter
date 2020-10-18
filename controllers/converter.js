const fs = require('fs');

let rawdata = fs.readFileSync('units_ratio.json');
let units_ratio = JSON.parse(rawdata);
let units = units_ratio.units;


module.exports.convert = (req, res) => {
    let {distance, convert_to} = req.body;

    let value = (units[distance.unit].ratio * distance.value / units[convert_to].ratio).toFixed(2);

    res.json({ unit: convert_to, value: value});
}

// Validation middleware
module.exports.validate = (req, res, next) => {
    let {distance, convert_to} = req.body;

    switch (true) {
        case (!distance || !distance.unit || !distance.value || !convert_to):
        {
            res.status(400).send({
                error: "Wrong request format",
            })
            break;
        }
        case (!units.hasOwnProperty(convert_to)):
        {
            res.status(400).send({
                error: "Unit " + convert_to + " does not exist in file"
            })
            break;
        }
        case (!units.hasOwnProperty(distance.unit)):
        {
            res.status(400).send({
                error: "Unit " + distance.unit + " does not exist in file"
            })
            break;
        }
        case (typeof distance.value !== "number"):
        {
            res.status(400).send({
                error: "Numeric parameter distance value expected"
            })
            break;
        }
        default: return next();
    }

}