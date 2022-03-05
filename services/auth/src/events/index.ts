import { EventEmitter } from "events";
import AuthListener, { User } from "./listeners/auth_listener";

class Event extends EventEmitter {}

const events = new Event();
const authListeners = new AuthListener({});

// Listen to whenever some one hits LogIn
events.on("user_logins", async (user: User, ip: string, hostname: string) =>
  authListeners.userLogin(user, ip, hostname)
);

// Listen to success forgot password events
events.on("forgot_password", async (username: string, password: string) =>
  authListeners.forgotPassword(username, password)
);

// Listens to newly created user events
events.on("new_user", async (username: string) =>
  authListeners.newUser(username)
);

export default events;
