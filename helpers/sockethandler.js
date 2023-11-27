import { Server } from "socket.io";

export const socket = (server) => {
  return new Server(server, {
    cors: {
      origin: ["http://localhost:5173", "*"],
    },
  });
};

var Joined_blog = [];
export const start_socket_connection = (io, socket) => {
  socket.on("join-Blog", (event) => {
    if (Joined_blog.some((addUser) => addUser.userId === event.userId)) {
      Joined_blog = Joined_blog.filter((user) => user.userId !== event.userId);
    }
    Joined_blog.push({
      blogId: event.blogId,
      userId: event.userId,
      socketId: socket.id,
    });
    console.log(Joined_blog);
  });
  socket.on("like-blog", (event) => {
    console.log(event);
    Joined_blog.map((user) => {
      if (user.blogId === event.blogId) {
        socket.to(user.socketId).emit("response-like-blog", event);
      }
    });
  });
  socket.on("comment", (event) => {
    Joined_blog.map((user) => {
      if (user.blogId === event.blogId) {
        socket.to(user.socketId).emit("response-comment", event);
      }
    });
  });
};
