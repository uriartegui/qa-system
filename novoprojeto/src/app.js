import "./assets/styles/style.css";
import { ENV } from "@/config/env.js";
import { initRouter } from "@/core/router.js";

document.title = ENV.appName;

initRouter();
