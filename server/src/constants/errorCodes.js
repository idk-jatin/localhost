const ERROR_CODES = {
  AUTH_REQUIRED: "AUTH_REQUIRED",            // 401
  FORBIDDEN: "FORBIDDEN",                    // 403
  NOT_FOUND: "NOT_FOUND",                    // 404

  VALIDATION_ERROR: "VALIDATION_ERROR",      // 400
  SPAM_DETECTED: "SPAM_DETECTED",            // 400

  RATE_LIMIT: "RATE_LIMIT",                  // 429
  AI_QUOTA_EXCEEDED: "AI_QUOTA_EXCEEDED",    // 429
};

module.exports = ERROR_CODES;
