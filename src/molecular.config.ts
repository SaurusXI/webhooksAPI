const molecularConfig = {
  transporter: `redis://localhost:${process.env.REDIS_PORT}`,
};

export { molecularConfig as default };
