import socket from 'socket.io-client';

let socketInstance = null;

export const initializeSocket = (projectId) => {
    socketInstance = socket(import.meta.env.VITE_API_URL, {
        auth: {
            token: localStorage.getItem('token')
        },
        query: {
            projectId
        }
    });
    return socketInstance;
}

export const receiveMessage = (eventname,callback) => {
    socketInstance.on(eventname,callback);
}

export const sendMessage = (eventname,data) => {
    socketInstance.emit(eventname,data);
}