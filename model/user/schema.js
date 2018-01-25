const mongoose = require('mongoose');
const Schema = mongoose.Schema;

class StoreMetaData {
  constructor() {
    this.created = new Date();
  }
}

const userSchema = new Schema({
  title: { type: String, required: true },
  body: { type: String },
  metadata: {
    created: Date
  }
});

userSchema.pre('save', function (next) {
  if (this.isNew) {
    this.metadata = {
      created: new Date()
    };
    console.warn('user save new', this);
  } else {
    console.warn('user save existing', this);
  }
  next();
});

userSchema.pre('update', function (next) {
  console.warn('user update');
  this.update({}, { $set: { metadata : new StoreMetaData() } });
  next();
});

module.exports =  userSchema;
