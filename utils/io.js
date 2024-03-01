const userController = require('../Controllers/user.controller');
const chatController = require('../Controllers/chat.controller');

module.exports = function(io) {
    io.on("connection", async(socket) =>{
        console.log("client is connected.", socket.id);

        socket.on("login", async(userName, callbk)=> {
            //유저 정보를 저장
            try{
                const user = await userController.saveUser(userName, socket.id);
                const welcomeMessage = {
                    chat : `${user.name} is join to this room.`,
                    user : { id : null, name : "System"},
                };

                io.emit("message", welcomeMessage);
                callbk({ok : true, data : user});
            }catch(error){
                callbk({ok : false, error: error.message});
            }

        });

        socket.on("sendMessage", async(message, callbk) => {

            try{
                // 유저찾기 socket id로
                const user = await userController.checkUser(socket.id);
                // 메세지 저장(유저)
                const newMessage = await chatController.saveChat(message, user);
                io.emit("message", newMessage);
                callbk({ok : true});
            }catch(error){
                callbk({ok : false, error : error.message});
            }
        });

        socket.on("disconnect", () => {
            console.log("user is disconnected.");
        });
    });

};