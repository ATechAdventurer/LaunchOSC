const path = require("path");
const { Client, Server } = require("node-osc");
const midi = require("midi");
const servers = [];
servers.push(
  new Server(8010, "0.0.0.0", () => {
    console.log("OSC Server is listening");
  })
);
servers.push(
  new Server(8011, "0.0.0.0", () => {
    console.log("OSC Server is listening");
  })
);
const clients = [new Client("127.0.0.1", 8010)];
clients.push(new Client("127.0.0.1", 8011));

const input = new midi.Input();

// Count the available input ports.
input.getPortCount();

// Get the name of a specified input port.
input.getPortName(0);
input.on("message", (deltaTime, message) => {
  clients.forEach((client) => {
    client.send(`/${message[1]}`, message[2]);
  });
});

input.openPort(0);

input.ignoreTypes(false, false, false);
