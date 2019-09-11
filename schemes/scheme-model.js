const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
   // addStep,
    update,
    remove,
}

function find() {
    return db('schemes')
        .then(schemes => {
            return schemes;
        });
};

function findById(id) {
    return db('schemes')
        .where({ id })
        .then(schemes => {
            const scheme = schemes[0];
            if(scheme) {
                return scheme;
            }
        });
};

function findSteps(id) {
    return db('schemes as sc')
        .join('steps as st', 'sc.id','=', 'st.scheme_id')
        .where({ scheme_id : id })
        .select('scheme_name', 'step_number', 'instructions')
        .then(scheme => {
            return scheme;
        });
};

function add(schemeData) {
    return db('schemes')
        .insert(schemeData)
        .then( ids => {
            return ids[0];
        })
}

// function addStep(stepData, scheme_id) {
//     return db('steps')
//         .where({ scheme_id })
//         .then()
// }

function update(changes, id) {
    return db('schemes')
        .where({ id })
        .update(changes)
        .then(count => {
            return count;
        });
};

function remove(id) {
    return db('schemes')
        .where({ id })
        .del()
        .then(count => {
            return count
        });
};


