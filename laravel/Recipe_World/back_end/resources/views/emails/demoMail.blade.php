<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Email Token Verification</title>
  <style>
    body {
      background-color: #f5f5f5;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
      background-color: #ffffff;
      border-radius: 4px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    h1 {
      color: #333333;
      font-size: 24px;
      margin-bottom: 20px;
      text-align: center;
    }

    p {
      color: #666666;
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 10px;
    }

    .token {
      background-color: #f9f9f9;
      border: 1px solid #dddddd;
      color: #333333;
      font-size: 36px;
      font-weight: bold;
      padding: 10px;
      text-align: center;
      margin: 20px 0;
    }

    .footer {
      text-align: center;
      margin-top: 30px;
    }

    .footer p {
      margin: 0;
      font-size: 14px;
      color: #999999;
    }
  </style>
</head>

<body>
  <div class="container">
    <h1>Email Token Verification</h1>
    <p>Dear User,</p>
    <p>Please use the following token to verify your email:</p>
    <div class="token">{{ $mailData['E_token'] }}</div>
    <p>Thank you for using our service!</p>
    <div class="footer">
      <p>&copy; 2023 Recipe World</p>
    </div>
  </div>
</body>
  
</html>


