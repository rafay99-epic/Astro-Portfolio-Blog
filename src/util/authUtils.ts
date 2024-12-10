import { secureCompare } from "@util/security";

let AUTH_KEY: string;

function loadAuthKey() {
  if (!AUTH_KEY) {
    AUTH_KEY = import.meta.env.AUTH_KEY;

    if (!AUTH_KEY || AUTH_KEY.trim() === "") {
      console.error(
        "Critical Error: AUTH_KEY environment variable is missing or empty. Ensure it is properly set in your environment."
      );
      throw new Error(
        "Server cannot start: AUTH_KEY environment variable is required for API authentication."
      );
    }
  }
}

export function getAuthKey(): string {
  if (!AUTH_KEY) {
    loadAuthKey();
  }
  return AUTH_KEY;
}

export function checkAuthorization(request: Request): boolean {
  const authHeader = request.headers.get("Authorization");
  if (!authHeader) {
    console.error("Authorization failed: Missing 'Authorization' header");
    return false;
  }

  if (!authHeader.startsWith("Bearer ")) {
    console.error("Authorization failed: Invalid header format");
    return false;
  }

  const authKey = getAuthKey();
  const providedToken = authHeader.slice(7).trim();
  const isValid = secureCompare(providedToken, authKey);

  if (!isValid) {
    console.error("Authorization failed: Header value does not match");
  }
  return isValid;
}
