try {
    alloy("sendEvent", {
        "type": "recommendation.impression",
        "xdm": {
            "yourProfile": {
                "recommendationTargetDetails": _satellite.getVar('your-rule-name'),
                "identities": {
                  "martechProtocolId": _satellite.getVar('your-martech-protocol-id')
                }
            }
        }
    });
} catch (e) {}