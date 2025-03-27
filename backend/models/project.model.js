import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        trim: true,
    },
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    fileTree: {
        type: Object,
        default: {}
    },
});

const Project = mongoose.model('project', projectSchema);

export default Project;