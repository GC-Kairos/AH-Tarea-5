import { MongoClient, ObjectId } from 'mongodb'

const client = new MongoClient("mongodb://127.0.0.1:27017")
const db = client.db("DB_Alumnos")

async function getAlumnos(filter = {}) {
    await client.connect()
    return db.collection("Alumnos").find({ deleted: { $ne: true } }).toArray()
}

async function getAlumnoByLegajo(legajoAlumno) {
    await client.connect()
    return db.collection("Alumnos").findOne({ legajo: legajoAlumno })
}

async function createAlumno(alumno) {
    await client.connect()
    await db.collection("Alumnos").insertOne(alumno)
    return alumno
}

async function editAlumno(legajoAlumno, alumno) {
    await client.connect()
    await db.collection("Alumnos").updateOne({ legajo: legajoAlumno }, { $set: alumno })
    return alumno
}

async function replaceAlumno(legajoAlumno, alumno) {
    await client.connect()
    await db.collection("Alumnos").replaceOne({ legajo: legajoAlumno }, alumno)
    return alumno
}


async function deleteAlumno(legajoAlumno) {
    await client.connect()
    await db.collection("Alumnos").deleteOne({ legajo: legajoAlumno })
    return {
        legajo: legajoAlumno
    }
}

export {
    getAlumnos,
    getAlumnoByLegajo,
    createAlumno,
    editAlumno,
    replaceAlumno,
    deleteAlumno
}