let config = {
  endpoint: "",
};

export function initTracker(userConfig) {
   if (window.__TRACKER_INITIALIZED__) {
    console.log("⚠️ Tracker already initialized");
    return;
  }

  window.__TRACKER_INITIALIZED__ = true;
  console.log("🚀 Tracker initialized");
  config = { ...config, ...userConfig };

  console.log(config, 'connnnnnnnnnnnnnnn')

  // 1. Send initial connection signal
  sendEvent({
    type: "SDK_CONNECTED",
    timestamp: new Date().toISOString(),
    apiKey: config.apiKey,
    environment: config.environment
  });

  // 2. Start heartbeat (every 50s)
  // setInterval(() => {
  //   sendEvent({
  //     type: "HEARTBEAT",
  //     timestamp: new Date().toISOString(),
  //         apiKey: config.apiKey,
  //   environment: config.environment
  //   });
  // }, 50000);

  interceptFetch();
}

function sendEvent(payload) {
  console.log("📤 Sending to backend:", payload);

  fetch(config.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.apiKey, // 👈 Required for backend auth
    },
    body: JSON.stringify(payload),
  })
    .then((res) => {
      console.log("✅ Backend response:", res.status);
    })
    .catch((err) => {
      console.log("❌ Backend error:", err);
    });
}

function interceptFetch() {
  const originalFetch = window.fetch

  window.fetch = async (...args) => {
    const url =
      typeof args[0] === "string" ? args[0] : args[0]?.url;

    // ❌ 1. Ignore tracker backend calls (STOP LOOP)
    if (url.includes("localhost:3001")) {
      return originalFetch(...args);
    }

    // ❌ 2. Only track your FAIL API (CONTROL NOISE)
    if (!url.includes("https://blogapp-backend-three.vercel.app")) {
      return originalFetch(...args);
    }

    console.log("📡 Intercepted:", url);

    try {
      const response = await originalFetch(...args);

      if (!response.ok) {
        const type = getType(response.status);

        console.log("🚨 Failure:", response.status);

        if (type) {
          console.log(type, '<=type')
          sendEvent({
            url,
            method: args[1]?.method || "GET",
            statusCode: response.status,
            type,
            timestamp: new Date().toISOString(),
                      apiKey: config.apiKey,
    environment: config.environment
          });
        }
      }

      return response;
    } catch (error) {
      console.log("🚨 Network error:", error.message);

      sendEvent({
        url,
        method: args[1]?.method || "GET",
        type: "NETWORK",
        error: error.message,
        timestamp: new Date().toISOString(),
                  apiKey: config.apiKey,
    environment: config.environment
      });

      throw error;
    }
  };
}


function getType(status) {
  if (status === 401 || status === 403) return "ACCESS";
  if (status >= 500) return "API_ERROR";
  return null;
}