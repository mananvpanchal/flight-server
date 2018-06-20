const data = require('./data.js');
const moment = require('moment');

/*
Filters data based on origin, destination and journey date.
*/
const filterData = (origin, dest, date) => {
    return (data) => data.origin === origin
        && data.dest === dest
        && (data.freq === 'Daily'
            || data.freq.indexOf(moment(date).format('ddd')) > -1);
};

module.exports = (origin, dest, depDate, retDate) => {
    //This generates one way journey data.
    const oneWayData = data.filter(filterData(origin, dest, depDate));

    //This generates both way journey data if return date is exist.
    return retDate && retDate !== 'null'
        ? oneWayData
            .map(o => data
                .filter(filterData(dest, origin, retDate))
                .map(d => ({ up: o, down: d })))
            .reduce((acc, val) => acc.concat(val), [])
        : oneWayData;
};