import { Server } from "socket.io"

export const socketHandler = (httpsServer) => {
    const io = new Server(httpsServer,
        {
        cors: {
            origin: "http://localhost:5173",
        },
        
    })
    io.on("connection", (socket) => {
        console.log("socket connected");
        let room;
        socket.on("joinRoom", (roomObject) => {
            console.log(roomObject);
            const rooms = Array.from(socket.rooms);
            rooms.forEach((room) => {
                if (room !== socket.id) {
                    socket.leave(room);
                }
            })
            socket.join(roomObject.roomId);
            room = roomObject.roomId;

        })
        socket.on("sendMessage", (data) => {
            io.to(room).emit("sendMessageServer", data);
        })
    })
}
//make middleware for socket. 