module.exports = function (RED) {
  function SOAPResponse(config) {
    RED.nodes.createNode(this, config);
    const node = this;

    node.on("input", function (msg) {
      const callback = msg["_soap_server_soapResponseCallback"];
      const server = msg["_soap_server_reference"];
      const res = msg["res"];
      if (!config.convert) {
        server._sendHttpResponse(res, 200, msg.payload);
      } else {
        if (callback == null) {
          return;
        }
        callback(msg.payload);
      }
    });
  }

  RED.nodes.registerType("soap-response", SOAPResponse);
};
