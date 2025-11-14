import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  // JWT Errors
  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. Token has expired.',
      errorCode: 4014
    });
  }

  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ 
      success: false, 
      message: 'Access denied. Invalid token.',
      errorCode: 4015
    });
  }

  // Validation Errors
  if (err.name === 'ValidationError') {
    return res.status(400).json({ 
      success: false, 
      message: err.message,
      errorCode: 4001
    });
  }

  // File Upload Errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ 
      success: false, 
      message: 'File too large. Maximum size allowed is 5MB.',
      errorCode: 4002
    });
  }

  if (err.message.includes('Invalid file type')) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid file type.',
      errorCode: 4003
    });
  }

  // Database Errors
  if (err.code === 'P2002') {
    return res.status(409).json({ 
      success: false, 
      message: 'Data already exists. Please use different values.',
      errorCode: 4091
    });
  }

  if (err.code === 'P2025') {
    return res.status(404).json({ 
      success: false, 
      message: 'Record not found.',
      errorCode: 4041
    });
  }

  // Default error
  res.status(500).json({ 
    success: false, 
    message: 'Internal server error. Please try again later.',
    errorCode: 5001
  });
};