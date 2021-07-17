const molecularConfig = {
  transporter: `redis://redis:${process.env.REDIS_PORT}`,
  namespace: '',
  serializer: 'JSON',
  registry: {
    discoverer: `redis://redis:${process.env.REDIS_PORT}`,
  },
};

export { molecularConfig as default };
