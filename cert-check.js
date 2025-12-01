const https = require('https');

const options = {
  hostname: 'mail.google.com',
  port: 443,
  path: '/',
  method: 'GET',
  rejectUnauthorized: false
};

const req = https.request(options, (res) => {
  const cert = res.socket.getPeerCertificate();
  
  console.log('=== GMAIL CERTIFICATE INFO ===');
  console.log('Subject:', cert.subject.CN);
  console.log('Issuer:', cert.issuer.CN);
  console.log('Valid From:', cert.valid_from);
  console.log('Valid To:', cert.valid_to);
  console.log('Serial Number:', cert.serialNumber);
  console.log('Fingerprint:', cert.fingerprint);
  
  req.end();
});

req.on('error', (e) => {
  console.error('Error:', e.message);
});

req.end();