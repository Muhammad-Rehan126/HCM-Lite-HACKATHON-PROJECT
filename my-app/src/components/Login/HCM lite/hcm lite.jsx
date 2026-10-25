import React from 'react';
import dashboardHtml from './hcm lite.js';

export default function HcmLite() {
  return (
    <iframe
      title="HCM Lite Dashboard"
      srcDoc={dashboardHtml}
      style={{ display: 'block', width: '100%', height: '100vh', border: 0 }}
    />
  );
}
