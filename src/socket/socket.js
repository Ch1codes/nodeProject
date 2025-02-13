import { Server } from "socket.io"

export const socketHandler = (httpsServer) => {
    const io = new Server(httpsServer)
    io.on("connection", (socket) => {
        console.log("socket connected")
    })
}