import mongoose from "mongoose";
import projectModel from "../models/project.model.js";

export const createProject = async ({name , userId}) => {
    if(!name){
        throw new Error('Name is required')
    }
    if(!userId){
        throw new Error('User is required')
    }
    let project;
    try {
        project = await projectModel.create({
            name,
            users: [ userId ]
        });
    } catch (error) {
        if (error.code === 11000) {
            throw new Error('Project name already exists');
        }
        throw error;
    }
    return project;
}

export const getAllProjectByUserId = async ({ userId }) => {
    if (!userId) {
        throw new Error('UserId is required')
    }
    const allUserProjects = await projectModel.find({
        users: userId
    })
    return allUserProjects
}

export const addUsersToProject = async ({ projectId, users, userId }) => {
    if(!projectId){
        throw new Error('Project ID is required')
    }

    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error('Invalid Project ID')
    }

    if(!users || users.length === 0){
        throw new Error('Users are required')
    }

    if(!Array.isArray(users) || users.some(user => typeof user !== 'string')){
        throw new Error('Users must be an array')
    }

    if(!userId){
        throw new Error('User is required')
    }

    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error('Invalid User ID')
    }

    const project = await projectModel.findOne({
        _id: projectId,
        users: userId
    });

    if(!project){
        throw new Error('User not belong to this project')
    }

    const updatedProject = await projectModel.findOneAndUpdate
    (
        {
            _id: projectId
        },
        {
            $addToSet: {
                users: {
                    $each: users
                }
            }
        },
        {
            new: true
        }
    );

    return updatedProject;
};

export const getProjectById = async ({ projectId }) => {
    if (!projectId) {
        throw new Error("projectId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }

    const project = await projectModel.findOne({
        _id: projectId
    }).populate('users')

    return project;
}

export const updateFileTree = async ({ projectId, fileTree }) => {
    if (!projectId) {
        throw new Error("projectId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }

    if (!fileTree) {
        throw new Error("fileTree is required")
    }

    const project = await projectModel.findOneAndUpdate({
        _id: projectId
    }, {
        fileTree
    }, {
        new: true
    })

    return project;
}