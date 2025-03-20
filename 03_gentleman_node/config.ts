export const config = {
  jwtSecret: process.env.JWT_SECRET || "My_Secret_Key",
  port: process.env.PORT as string || 4000,
};

export default config;
