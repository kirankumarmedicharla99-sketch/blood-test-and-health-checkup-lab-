/* ==========================================================================
   SRVICE.JS (Alias / Mirror of service.js)
   Ensures compatibility for both service.js and srvice.js in AARA Clinical Laboratories
   ========================================================================== */
'use strict';

// Load service.js logic
const script = document.createElement('script');
script.src = 'service.js';
document.head.appendChild(script);
