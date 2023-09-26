// config/shield.ts

const cspDirectives = {
  defaultSrc: ["'self'", 'data:', 'blob:'],
  scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
  'style-src': ["'self'", "'unsafe-inline'"],
  'img-src': ["'self'", 'data:', 'blob:'],
  // ... otras directivas
}

export default {
  csp: {
    directives: cspDirectives,
    // ... otras opciones
  },
  // ... otras configuraciones
}
