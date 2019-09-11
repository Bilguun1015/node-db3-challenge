const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    addStep,
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
        .orderBy('st.step_number')
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

function addStep(stepData, scheme_id) {
    return db('steps')
        .where({ scheme_id })
        .orderBy('step_number')
        .then( steps => {
            let newStepN;
            if(steps.length === 0){
                newStepN = 1
            } else {
                newStepN = steps[steps.length - 1].step_number + 1;
            }
            stepData.step_number = newStepN;
            stepData.scheme_id = scheme_id;
            return db('steps')
                .insert(stepData)
                .then( ids => {
                    console.log(ids)
                    return ids[0];
                });
        });
};

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


