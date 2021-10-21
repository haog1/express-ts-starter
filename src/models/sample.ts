import mongoose from 'mongoose'
import { hash } from '@haog1/micro-core'

// An interface that describes properties to create a new sample
export interface SampleField {
  attr1: string
  attr2: boolean
  attr3: number
}

// An interface that describes a sample Document has
interface SampleDoc extends mongoose.Document {
  attr1: string
  attr2: boolean
  attr3: number
}

// An interface that describes a sample model has
interface SampleModel extends mongoose.Model<SampleDoc> {
  createOne(fields: SampleField): SampleDoc
}

const sampleSchema = new mongoose.Schema(
  {
    attr1: {
      type: String,
      required: true,
    },
    attr2: {
      type: Boolean,
      required: true,
    },
    attr3: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id
        delete ret._id // optinal
        delete ret.password // optional
        delete ret.__v // optinal
      },
    },
  },
)

sampleSchema.pre('save', async function (done) {
  // Optional below
  // if (this.isModified('password')) {
  //   const hashed = await hash(this.get('password'))
  //   this.set('password', hashed)
  // }
  done()
})

sampleSchema.statics.createOne = (fields: SampleField) => {
  return new Sample(fields)
}

const Sample = mongoose.model<SampleDoc, SampleModel>('Sample', sampleSchema)

export { Sample }
