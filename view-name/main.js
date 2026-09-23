alloy("sendEvent", {
  "xdm": {
    "_experience": {
      "decisioning": {
        "propositions": [{
          "scope":  _satellite.getVar('your rule'),
          "propositionEventType": {
            "display": 1
          }
        }],
        "eventType": "decisioning.propositionDisplay"
      }
    }
  }
});