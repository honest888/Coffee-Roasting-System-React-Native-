import React from 'react'

import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase("CRDT.db");

const setupRoastProfileTable = async () => {
    db.transaction(tx => {
        tx.executeSql(`CREATE TABLE IF NOT EXISTS roastProfile (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, temperature TEXT, yellowPhase TEXT, maillardPhase TEXT, firstCrack TEXT, endTime TEXT, greenWeight TEXT, endWeight TEXT, weightLoss TEXT, createdDate  TEXT DEFAULT (strftime('%m/%d/%Y %H:%M:%S', 'now', 'localtime')))`);
    },
        (_, error) => { console.log("db error creating tables"); console.log(error); },
        (_, success) => { console.log("success") }
    );
}

const dropDatabaseTablesAsync = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql(
                'DROP TABLE roastProfile',
                [],
                (_, result) => { resolve(result) },
                (_, error) => {
                    console.log("error dropping users table"); reject(error)
                }
            )
        })
    })
}


const getRoastProfiles = (setData) => {
    db.transaction(
        tx => {
            tx.executeSql(
                'SELECT * FROM roastProfile',
                [],
                (_, { rows: { _array } }) => {
                    setData(_array)
                }
            );
        },
        (t, error) => { console.log("db error load roastProfile"); console.log(error) },
        (_t, _success) => { console.log("loaded roastProfile") }
    );
}

const insertRoastProfile = (data, successFunc) => {
    db.transaction(tx => {
        tx.executeSql('INSERT INTO roastProfile (name, temperature, yellowPhase, maillardPhase, firstCrack, endTime, greenWeight, endWeight, weightLoss) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [data.name, data.preheatTemp, data.yellowPhase, data.maillardPhase, data.firstCrack, data.endTime, data.greenWeight, data.endWeight, data.weightLoss]);
    },
        (t, error) => { console.log("db error insertRoastProfile"); console.log(error); },
        (t, success) => { successFunc() })
}

const deleteRoastProfile = (id) => {
    db.transaction(
        tx => {
            tx.executeSql('DELETE FROM roastProfile WHERE id = ?', [id],
                (_, { rowAffected }) => {
                    console.log("Delete successfully", rowAffected);
                },
                (_, error) => {
                    console.log("delete failed", error);
                }
            );
        }
    )
}

const setupEspressoTable = async () => {
    return new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXIST espresso (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, grindSetting1 TEXT, dose1 TEXT, yield1 TEXT, brewTime1 TEXT, temp1 TEXT, notes1 TEXT,grindSetting2 TEXT, dose2 TEXT, yield2 TEXT, brewTime2 TEXT, temp2 TEXT, notes2 TEXT, grindSetting3 TEXT, dose3 TEXT, yield3 TEXT, brewTime3 TEXT, temp3 TEXT, notes3 TEXT,grindSetting4 TEXT, dose4 TEXT, yield4 TEXT, brewTime4 TEXT, temp4 TEXT, notes4 TEXT,grindSetting5 TEXT, dose5 TEXT, yield5 TEXT, brewTime5 TEXT, temp5 TEXT, notes5 TEXT,grindSetting6 TEXT, dose6 TEXT, yield6 TEXT, brewTime6 TEXT, temp6 TEXT, notes6 TEXT, )')
        },
            (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
            (_, success) => { resolve(success) })
    })
}

const getEspresso = (setData) => {
    db.transaction(
        tx => {
            tx.executeSql(
                'SELECT * FROM espresso',
                [],
                (_, { rows: { _array } }) => {
                    setData(_array)
                }
            );
        },
        (t, error) => { console.log("db error load espresso"); console.log(error) },
        (_t, _success) => { console.log("loaded espresso") }
    );
}


export const database = {
    setupRoastProfileTable,
    getRoastProfiles,
    setupEspressoTable,
    getEspresso,
    insertRoastProfile,
    deleteRoastProfile,
    dropDatabaseTablesAsync
}