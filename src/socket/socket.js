import { Server } from "socket.io"

export const socketHandler = (httpsServer) => {
    const io = new Server(httpsServer)
    io.on("connection", (socket) => {
        console.log("socket connected");
        let room;
        socket.on("joinRoom", (roomObject) => {
            console.log(roomObject);
            socket.join(roomObject.roomId);
            room = roomObject.roomId;

        })
        socket.on("sendMessage", (data) => {
            io.to(room).emit("sendMessageServer", data);
        })
    })
}