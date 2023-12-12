const admin = require('firebase-admin')
const config = require('config')
const serviceAccount = require('../config/serviceKeyFirebase.json')
const storageBucket = config.get('firebaseStorageBucket')
const fs = require('fs')
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: storageBucket,
})

// Initialize Cloud Storage
const storage = admin.storage()

class FirebaseService {
    async uploadFile(folder, file, files) {
        const bucket = storage.bucket(storageBucket)
        const destinationPath = folder + file.filename

        try {
            await bucket.upload(file.path, {
                destination: destinationPath,
            })

            const bucketFile = bucket.file(destinationPath)
            const [url] = await bucketFile.getSignedUrl({
                action: 'read',
                expires: '01-01-2100',
            })
            fs.unlinkSync(file.path)
            return url

        } catch (e) {
            console.error('Error uploading file:', e)
            throw e
        }
    }
}

module.exports = new FirebaseService()
