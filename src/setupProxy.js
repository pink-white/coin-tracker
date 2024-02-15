import { createProxyMiddleware } from "http-proxy-middleware";
import cors from "cors";

export default function (app) {
  app.use(cors());
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:5000",
      changeOrigin: true,
    })
  );
}
