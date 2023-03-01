const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema(
    [{
        gender: {
          type: String,
          required: false
        },
        name: {
          title: String,
          first: String,
          last: String
        },
        location: {
          street: {
            number: String,
            name: String
          },
          city: String,
          state: String,
          country: String,
          postcode: String,
          coordinates: {
            latitude: String,
            longitude: String
          },
          timezone: {
            offset: String,
            description: String
          }
        },
        email: {
          type: String,
          required: false
        },
        nat: {
          type: String,
          required: false
        }
      }],
    {
        versionKey:false,timelaps:true
    }
)

module.exports = mongoose.model('Users',UserSchema)