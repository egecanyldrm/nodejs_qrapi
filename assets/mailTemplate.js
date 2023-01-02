exports.mailTemplate = (url, name) => {
  return (`
    <!DOCTYPE html>
    <html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
    <head>
      <meta charset="utf-8">
      <meta name="x-apple-disable-message-reformatting">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
      <!--[if mso]>
        <xml><o:officedocumentsettings><o:pixelsperinch>96</o:pixelsperinch></o:officedocumentsettings></xml>
      <![endif]-->
        <title>Şifreni Sıfırla</title>
        <link href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700" rel="stylesheet" media="screen">
        <style>
    .hover-underline:hover {
      text-decoration: underline !important;
    }
    @media (max-width: 600px) {
      .sm-w-full {
        width: 100% !important;
      }
      .sm-px-24 {
        padding-left: 24px !important;
        padding-right: 24px !important;
      }
      .sm-py-32 {
        padding-top: 32px !important;
        padding-bottom: 32px !important;
      }
    }
    </style>
    </head>
    <body style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #eceff1;">
    
      <div role="article" aria-roledescription="email" aria-label="Reset your Password" lang="en" style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly;">
        <table style="width: 100%; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td align="center" style="mso-line-height-rule: exactly; background-color: #eceff1; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
              <table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
      <td class="sm-py-32 sm-px-24" style="mso-line-height-rule: exactly; padding: 48px; text-align: center; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
        </a>
      </td>
    </tr>
                  <tr>
                    <td align="center" class="sm-px-24" style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly;">
                      <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                          <td class="sm-px-24" style="mso-line-height-rule: exactly; border-radius: 4px; background-color: #ffffff; padding: 48px; text-align: left; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 16px; line-height: 24px; color: #626262;">
                            <p style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin-bottom: 0; font-size: 20px; font-weight: 600;">Merhaba</p>
                            <p style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin-top: 0; font-size: 24px; font-weight: 700; color: #ff5850;">${name}</p>
                            <p style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 24px;">
                             Sisteme giriş yaparken sorun yaşadığınız için üzgünüz. Şifrenizi unuttuğunuzu bildiren bir talep aldık.
                            </p>
                            <p style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 24px;"> Bu mesajı siz gönderdiyseniz, hemen aşağıda bulunan buton ile şifrenizi yenileyebilirsiniz.</p>
                            <a target="_blank" href=${url}style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin-bottom: 24px; display: block; font-size: 16px; line-height: 100%; color: #7367f0; text-decoration: none;">${url}</a>
                            <table cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                                <td style="mso-line-height-rule: exactly; mso-padding-alt: 16px 24px; border-radius: 4px; background-color: #7367f0; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
                                  <a href=${url} target="_blank" style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; display: block; padding-left: 24px; padding-right: 24px; padding-top: 16px; padding-bottom: 16px; font-size: 16px; font-weight: 600; line-height: 100%; color: #ffffff; text-decoration: none;">Parolayı Sıfırla &rarr;</a>
                                </td>
                              </tr>
                            </table>
                            <p style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-top: 24px; margin-bottom: 24px;">
                              <span style="font-weight: 600;">Not:</span> 
    Bu bağlantı kurulduğu andan itibaren 1 saat süreyle geçerlidir.
                              Size gönderilir ve şifrenizi yalnızca bir kez değiştirmek için kullanılabilir.
                            </p>
                            <p style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0;">
                              Bu işlem size ait değilse  veya yardımımıza ihtiyacınız varsa, lütfen bizimle iletişime geçin
                            </p>
                            <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; padding-top: 32px; padding-bottom: 32px;">
          <div style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; height: 1px; background-color: #eceff1; line-height: 1px;">&zwnj;</div>
        </td>
      </tr>
    </table>
    
                          </td>
                        </tr>
                        <tr>
      <td style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; height: 20px;"></td>
    </tr>
    
    <tr>
      <td style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; height: 16px;"></td>
    </tr>
                      </table>
                    </td>
                  </tr>
              </table>
            </td>
          </tr>
        </table>
      </div>
    </body>
    </html>
    
    
    
    `)
}

exports.welcomeTemplate = (name, email, password, url) => {
  return `
  <!DOCTYPE html>
<html lang="en" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <!--[if mso]>
    <xml><o:officedocumentsettings><o:pixelsperinch>96</o:pixelsperinch></o:officedocumentsettings></xml>
  <![endif]-->
    <title>Hoşgeldin 👋</title>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700" rel="stylesheet" media="screen">
    <style>
.hover-underline:hover {
  text-decoration: underline !important;
}
@media (max-width: 600px) {
  .sm-w-full {
    width: 100% !important;
  }
  .sm-px-24 {
    padding-left: 24px !important;
    padding-right: 24px !important;
  }
  .sm-py-32 {
    padding-top: 32px !important;
    padding-bottom: 32px !important;
  }
  .sm-leading-32 {
    line-height: 32px !important;
  }
}
</style>
</head>
<body style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #eceff1;">
    <div style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; display: none;">Hoşgeldin</div>
  <div role="article" aria-roledescription="email" aria-label=" Hoşgeldin 👋" lang="en" style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly;">
    <table style="width: 100%; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="mso-line-height-rule: exactly; background-color: #eceff1; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
          <table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
 
</tr>
              <tr>
                <td align="center" class="sm-px-24" style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly;">
                  <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td class="sm-px-24" style="mso-line-height-rule: exactly; border-radius: 4px; background-color: #ffffff; padding: 48px; text-align: left; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif; font-size: 16px; line-height: 24px; color: #626262;">
                        <p style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin-bottom: 0; font-size: 20px; font-weight: 600;">Hoşgeldin</p>
                        <p style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin-top: 0; font-size: 24px; font-weight: 700; color: #ff5850;">${name}</p>
                        <p class="sm-leading-32" style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 24px; font-size: 24px; font-weight: 600; color: #263238;">
                        
                        </p>
                      
                        <p style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-top: 24px; margin-bottom: 24px;">
                          <span style="font-weight: 600;">${name}</span>
                          Aramıza Katılmana Çok Sevindik 🤩
                        </p>
                        <p style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; margin-bottom: 0; font-size: 18px; font-weight: 500;"> Haydi Başlayalım !</p>
                        <ul style="margin-bottom: 24px;">
                          
                          <li>
                             Aşağıdaki buton ile yönetici paneline ulaştıktan sonra  sisteme giriş yap 
                          </li>
                          <li>
                          Kategorilerini oluşturduktan  sonra ürünlerini yüklemeye başla.
                          </li>
                          <li>
                            Sistem ayarlarından karekodunu bulduktan sonra  telefonunla qr kodu tara ve siteni gör 💜
                          </li>
                        </ul>
                        <div>
                            Hesap Bilgilerin : 
                          <ul>
                            <li>
                           E-posta : ${email}
                            <br>
                           Şifre :  ${password}
                          </li>
                          </ul>
                        </div>
                        <table cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td style="mso-line-height-rule: exactly; mso-padding-alt: 16px 24px; border-radius: 4px; background-color: #7367f0; font-family: Montserrat, -apple-system, 'Segoe UI', sans-serif;">
                              <a target='_blank' href="${url}" style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; display: block; padding-left: 24px; padding-right: 24px; padding-top: 16px; padding-bottom: 16px; font-size: 16px; font-weight: 600; line-height: 100%; color: #ffffff; text-decoration: none;">Panele Git  &rarr;</a>
                            </td>
                          </tr>
                        </table>
                        <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
  <tr>
    <td style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; padding-top: 32px; padding-bottom: 32px;">
      <div style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; height: 1px; background-color: #eceff1; line-height: 1px;">&zwnj;</div>
    </td>
  </tr>
</table>

                      </td>
                    </tr>
                    <tr>
  <td style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; height: 20px;"></td>
</tr>

  <td style="font-family: 'Montserrat', sans-serif; mso-line-height-rule: exactly; height: 16px;"></td>
</tr>
                  </table>
                </td>
              </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</body>
</html>


  
  `
}