import { createAuthClient } from "better-auth/react"
import { adminClient } from "better-auth/client/plugins"
import type { auth } from "./auth";
import { inferAdditionalFields } from "better-auth/client/plugins";

const authClient = createAuthClient({
    plugins: [
        adminClient(),
        inferAdditionalFields<typeof auth>()
    ],
})

export const {
    signIn,
    signOut,
    getSession,
    useSession,
} = authClient;