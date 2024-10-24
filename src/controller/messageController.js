const Conversation = require("../models/conversationModel");
const Message = require("../models/messageMode");


const SendMessage = async(req,res)=>{
    try {
        const {message} = req.body;
        const {id:receiverId} = req.params;
        const senderId = req.user._id;

        let conversation = await Conversation.findOne({
            participants:{$all:[senderId,receiverId]}
        });

        if (!conversation) {
			conversation = await Conversation.create({
				participants: [senderId, receiverId],
			});
		}

        const newMessage = new Message({
            senderId,
			receiverId,
			message,
        });

        if (newMessage) {
			conversation.messages.push(newMessage._id);
		}

        // await conversation.save();
        // await newMessage.save();

        // this will run in parallel
		await Promise.all([conversation.save(), newMessage.save()]);

           res.send(newMessage);
        
    } catch (error) {
        console.log("Error in sendMessage controller: ", error.message);
		res.status(500).json({ error: "Internal server error" });
    }
}


module.exports = {SendMessage}