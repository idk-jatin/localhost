exports.verifyOtpTemplate = (otp)=>{
    return  `
<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&display=swap" rel="stylesheet">
  </head>
  <body style="margin:0;;padding:0px;">
    <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="font-family:'JetBrains Mono',ui-monospace,monospace;color:#cdd6e4;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" role="presentation" style="max-width:600px;">
            
            <!-- Top terminal bar -->
            <tr>
              <td style="padding:18px 18px 0;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                  <tr>
                    <td style="background:#071018;padding:8px 12px;border:1px solid #0f1720;">
                      <span style="float:left;color:#7c8b95;font-size:12px;">LocalHost • verification</span>
                       <span style="float:right;">
                        <span style="display:inline-block;width:10px;height:10px;background:#ff7a00;border-radius:2px;margin:0px 6px;"></span>
                      <span style="display:inline-block;width:10px;height:10px;background:#ffd166;border-radius:2px;margin-right:6px;"></span>
                      <span style="display:inline-block;width:10px;height:10px;background:#68d391;border-radius:2px;"></span>
                       </span>
                     
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Main card -->
            <tr>
              <td style="padding:18px;">
                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background:#021013;border:2px solid #0f9d58;">
                  <tr>
                    <td style="padding:28px 28px 20px;">
                      
                      <div style="font-size:14px;color:#9fb3b0;margin-bottom:12px;">
                        Verification code for your email
                      </div>

                      <!-- OTP BOX -->
                      <div style="display:inline-block;padding:18px 26px;background:#041a12;border:2px solid #12b886;">
                        <div style="font-size:28px;letter-spacing:6px;color:#12b886;font-weight:700;">
                          ${otp}
                        </div>
                      </div>

                      <div style="margin-top:20px;color:#9fb3b0;font-size:13px;line-height:1.45;">
                        Enter this code to register yourself.<br />
                        This code expires in <strong>5 minutes</strong>.
                      </div>

                      <div style="margin-top:18px;font-size:12px;color:#7c8b95;background:#001212;padding:8px;border-left:3px solid #12b886;">
                        If you didn’t request this, you can safely ignore this email.
                      </div>

                    </td>
                  </tr>
                </table>

                <table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="margin-top:12px;">
                  <tr>
                    <td style="font-size:12px;color:#6f7b7a;">
                      Sent by <span style="color:#5fb08a;">LocalHost v1.0.0</span>
                    </td>
                  </tr>
                </table>

              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

