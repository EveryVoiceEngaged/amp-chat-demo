import { defineStorage } from "@aws-amplify/backend";

export default defineStorage({
  bucketName: "attachments",
  access: (allow) => ({
    "attachments/*": [
      allow.guest.to(["read"]),
      allow.entity("User").to(["read", "create", "update"])
    ]
  })
});