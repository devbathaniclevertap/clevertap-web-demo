import clevertap from "clevertap-web-sdk";

declare global {
  interface Window {
    clevertap: any;
  }
}

export const clevertapService = {
  getClevertapId: async () => {
    const ctId = clevertap.getCleverTapID();
    if (ctId) {
      await navigator.clipboard.writeText(ctId);
      return `CleverTap ID: ${ctId} (copied to clipboard)`;
    } else {
      throw new Error(
        "CleverTap ID is null and cannot be copied to clipboard."
      );
    }
  },

  onUserLogin: async (userData: {
    name: string;
    email: string;
    identity: string;
    phone: string;
  }) => {
    console.log("User data:", userData);
    clevertap.onUserLogin.push({
      Site: {
        Name: userData.name,
        Identity: userData.identity,
        Email: userData.email,
        Phone: userData.phone,
      },
    });
    return "User login recorded successfully";
  },

  recordEvent: async (eventName: string) => {
    clevertap.event.push(eventName, {
      Timestamp: new Date(),
    });
    return "Event recorded successfully";
  },
};
