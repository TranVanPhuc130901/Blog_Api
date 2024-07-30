'use strict'

const _ = require('lodash');
const { Types } = require('mongoose');

const convertToObjectMongodb = id => new Types.ObjectId(id);

const getInfoData = ({ fileds = [], object = {} }) => {
    return _.pick(object, fileds);
}

const getSelectData = (select = []) => {
    return Object.fromEntries(select.map(key => [key, 1]))
}

const unGetSelectData = (select = []) => {
    return Object.fromEntries(select.map(key => [key, 0]))
}

const removeUndifinedObject = obj => {
    Object.keys(obj).forEach(key => {
        if (obj[key] === null) {
            delete obj[key]
        }
    })

    return obj
}

const updateNestedObjectParser = obj => {
    const final = {};
    Object.keys(obj).forEach(key => {
        if (!Array.isArray(obj[key]) && typeof obj[key] === 'object') {
            const response = updateNestedObjectParser(obj[key]);
            Object.keys(response).forEach(k => {
                final[key + '.' + k] = response[k];
            })
        } else {
            final[key] = obj[key];
        }
    })
    return final;
}




module.exports = {
    getInfoData,
    getSelectData,
    unGetSelectData,
    removeUndifinedObject,
    updateNestedObjectParser,
    convertToObjectMongodb
}