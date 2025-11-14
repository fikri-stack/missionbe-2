import { Request, Response } from 'express';
import { sendVerificationEmail } from '../services/emailService';
import { comparePassword } from '../utils/passwordHash';
import { generateToken } from '../utils/jwtUtils';
import { RegisterRequest, LoginRequest, ApiResponse } from '../utils/types';
import { 
  createUser, 
  findUserByEmail, 
  findUserByVerificationToken, 
  verifyUserEmail 
} from '../services/userService';

export const register = async (req: Request<{}, ApiResponse, RegisterRequest>, res: Response) => {
  try {
    const { fullname, username, email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: 'Email already exists' 
      });
    }

    const user = await createUser({ fullname, email, password });
    
    // For testing: show verification token in response instead of sending email
    try {
      await sendVerificationEmail(email, user.verificationToken!);
    } catch (emailError) {
      console.log('Email service error, showing token for testing:', user.verificationToken);
    }

    res.status(201).json({
      success: true,
      message: 'User registered successfully. Please check your email for verification.',
      data: {
        id: user.id,
        fullname: user.fullName,
        email: user.email,
        verificationToken: user.verificationToken // For testing only
      }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const login = async (req: Request<{}, ApiResponse, LoginRequest>, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken({
      id: user.id,
      email: user.email,
      fullName: user.fullName
    });

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          fullname: user.fullName,
          email: user.email,
          isVerified: user.isVerified
        }
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.query;

    if (!token) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verification Failed</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              margin: 0;
              padding: 0;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              background: white;
              padding: 40px;
              border-radius: 15px;
              box-shadow: 0 20px 40px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 500px;
              width: 90%;
            }
            .error-icon {
              font-size: 64px;
              color: #e74c3c;
              margin-bottom: 20px;
            }
            h1 {
              color: #2c3e50;
              margin-bottom: 20px;
              font-size: 28px;
            }
            p {
              color: #7f8c8d;
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 30px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="error-icon">❌</div>
            <h1>Verification Failed</h1>
            <p>Verification token is required. Please check your email and click the verification link again.</p>
          </div>
        </body>
        </html>
      `);
    }

    const user = await findUserByVerificationToken(token as string);
    
    if (!user) {
      return res.status(400).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Invalid Token</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              margin: 0;
              padding: 0;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              background: white;
              padding: 40px;
              border-radius: 15px;
              box-shadow: 0 20px 40px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 500px;
              width: 90%;
            }
            .error-icon {
              font-size: 64px;
              color: #e74c3c;
              margin-bottom: 20px;
            }
            h1 {
              color: #2c3e50;
              margin-bottom: 20px;
              font-size: 28px;
            }
            p {
              color: #7f8c8d;
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 30px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="error-icon">🔗</div>
            <h1>Invalid Verification Token</h1>
            <p>The verification link is invalid or has expired. Please request a new verification email.</p>
          </div>
        </body>
        </html>
      `);
    }

    if (user.isVerified) {
      return res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Already Verified</title>
          <style>
            body {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%);
              margin: 0;
              padding: 0;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .container {
              background: white;
              padding: 40px;
              border-radius: 15px;
              box-shadow: 0 20px 40px rgba(0,0,0,0.1);
              text-align: center;
              max-width: 500px;
              width: 90%;
            }
            .success-icon {
              font-size: 64px;
              color: #00b894;
              margin-bottom: 20px;
            }
            h1 {
              color: #2c3e50;
              margin-bottom: 20px;
              font-size: 28px;
            }
            p {
              color: #7f8c8d;
              font-size: 16px;
              line-height: 1.6;
              margin-bottom: 30px;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="success-icon">✅</div>
            <h1>Already Verified!</h1>
            <p>Your email <strong>${user.email}</strong> has already been verified. You can now login to your account.</p>
          </div>
        </body>
        </html>
      `);
    }

    await verifyUserEmail(user.id);

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Email Verified Successfully</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #00b894 0%, #00cec9 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.8s ease-in;
          }
          
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: translateY(0); }
          }
          
          .container {
            background: white;
            padding: 50px;
            border-radius: 20px;
            box-shadow: 0 25px 50px rgba(0,0,0,0.15);
            text-align: center;
            max-width: 600px;
            width: 90%;
            position: relative;
            overflow: hidden;
          }
          
          .container::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 5px;
            background: linear-gradient(90deg, #00b894, #00cec9, #74b9ff);
          }
          
          .success-icon {
            font-size: 80px;
            margin-bottom: 25px;
            animation: bounce 1s ease-in-out;
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
          
          h1 {
            color: #2c3e50;
            margin-bottom: 20px;
            font-size: 32px;
            font-weight: 600;
          }
          
          .welcome-text {
            color: #00b894;
            font-size: 18px;
            font-weight: 500;
            margin-bottom: 15px;
          }
          
          p {
            color: #7f8c8d;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 35px;
          }
          
          .user-info {
            background: #f8f9fa;
            padding: 20px;
            border-radius: 10px;
            margin: 25px 0;
            border-left: 4px solid #00b894;
          }
          
          .user-email {
            color: #2c3e50;
            font-weight: 600;
            font-size: 18px;
          }
          
          .features {
            margin-top: 40px;
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
            gap: 20px;
          }
          
          .feature {
            padding: 20px;
            background: #f8f9fa;
            border-radius: 10px;
            transition: transform 0.3s ease;
          }
          
          .feature:hover {
            transform: translateY(-3px);
          }
          
          .feature-icon {
            font-size: 24px;
            margin-bottom: 10px;
          }
          
          .feature-text {
            color: #2c3e50;
            font-size: 14px;
            font-weight: 500;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="success-icon">🎉</div>
          <h1>Email Verified Successfully!</h1>
          <div class="welcome-text">Welcome to our platform!</div>
          <p>Congratulations! Your email address has been successfully verified and your account is now active.</p>
          
          <div class="user-info">
            <div class="user-email">${user.email}</div>
            <small style="color: #7f8c8d;">Verified on ${new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}</small>
          </div>
          
          <div class="features">
            <div class="feature">
              <div class="feature-icon">🔐</div>
              <div class="feature-text">Secure Access</div>
            </div>
            <div class="feature">
              <div class="feature-icon">📚</div>
              <div class="feature-text">Full Course Access</div>
            </div>
            <div class="feature">
              <div class="feature-icon">🎯</div>
              <div class="feature-text">Track Progress</div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `);
    
  } catch (error) {
    console.error('Verify email error:', error);
    res.status(500).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Server Error</title>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 0;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
          }
          .container {
            background: white;
            padding: 40px;
            border-radius: 15px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            text-align: center;
            max-width: 500px;
            width: 90%;
          }
          .error-icon {
            font-size: 64px;
            color: #e74c3c;
            margin-bottom: 20px;
          }
          h1 {
            color: #2c3e50;
            margin-bottom: 20px;
            font-size: 28px;
          }
          p {
            color: #7f8c8d;
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 30px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="error-icon">⚠️</div>
          <h1>Server Error</h1>
          <p>Something went wrong while verifying your email. Please try again later or contact support.</p>
        </div>
      </body>
      </html>
    `);
  }
};