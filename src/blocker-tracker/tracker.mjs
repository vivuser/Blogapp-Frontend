let config = {
  endpoint: "",
};

export function initTracker(userConfig) {
if (typeof window !== "undefined" && !window.__ORIGINAL_FETCH__) {
  window.__ORIGINAL_FETCH__ = window.fetch;
}

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

  const fetchFn = window.__ORIGINAL_FETCH__ || fetch;

  fetchFn(config.endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": config.apiKey,
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
  const originalFetch = window.fetch;

  window.fetch = async (...args) => {
    const url =
      typeof args[0] === "string"
        ? args[0]
        : args[0]?.url || "";

    console.log("🔍 URL:", url);

    if (url.includes("localhost:3001")) {
      return originalFetch(...args);
    }

    if (!url.includes("blogapp-backend-three.vercel.app")) {
      return originalFetch(...args);
    }

    console.log("📡 Intercepted:", url);

    try {
      const response = await originalFetch(...args);

      console.log("📡 Status:", response.status);

      if (!response.ok) {
        const type = getType(response.status);

        if (type) {
          console.log("🚨 Sending event:", type);

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