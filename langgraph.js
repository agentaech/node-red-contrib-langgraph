module.exports = function(RED) {
    const LangGraph = require('langgraphjs');

    function LangGraphNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;

        // Use async function for handling asynchronous operations
        node.on('input', async function(msg, send, done) {
            // Initialize LangGraph with options from msg.payload or config
            const options = msg.payload.options || config.options;
            const langGraph = new LangGraph(options);

            try {
                // Use await for asynchronous call
                const result = await langGraph.createGraph(options.graphData);
                msg.payload = result;
                send(msg); // Node-RED 1.0+ method for sending messages
            } catch (error) {
                // Use done() to handle errors in Node-RED 1.0+
                if (done) {
                    done("Failed to create LangGraph: " + error.message);
                } else {
                    node.error("Failed to create LangGraph: " + error.message, msg);
                }
            }
        });
    }
    RED.nodes.registerType("langgraph", LangGraphNode);

    function StateNode(config) {
        RED.nodes.createNode(this, config);
        var node = this;
        this.on('input', function(msg) {
            // Implement state logic here
            // For example, update the state based on msg.payload
            let currentState = {}; // Placeholder for state management logic
            // Logic to update currentState based on the input message
            msg.payload = currentState; // Assign updated state to msg.payload
            node.send(msg); // Send the updated message to the next connected node
        });
    }
    RED.nodes.registerType("state-node", StateNode);
};
