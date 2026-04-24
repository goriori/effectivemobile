import type { Request, Response, NextFunction } from 'express';
import { BaseController, HttpStatus } from '../controllers/base.controller';

export class ValidationMiddleware extends BaseController {
  public static validateRegister(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    const { fullName, birthDate, email, password } = req.body;
    const errors: string[] = [];

    if (!fullName || fullName.trim().length < 2) {
      errors.push('Full name must be at least 2 characters long');
    }

    if (!birthDate) {
      errors.push('Birth date is required');
    } else {
      const date = new Date(birthDate);
      if (isNaN(date.getTime())) {
        errors.push('Invalid birth date format');
      } else if (date > new Date()) {
        errors.push('Birth date cannot be in the future');
      }
    }

    if (!email) {
      errors.push('Email is required');
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push('Invalid email format');
      }
    }

    if (!password) {
      errors.push('Password is required');
    } else if (password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    if (errors.length > 0) {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: 'Validation failed',
        errors,
      });
      return;
    }

    next();
  }

  public static validateLogin(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    const { email, password } = req.body;
    const errors: string[] = [];

    if (!email) {
      errors.push('Email is required');
    }

    if (!password) {
      errors.push('Password is required');
    }

    if (errors.length > 0) {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: 'Validation failed',
        errors,
      });
      return;
    }

    next();
  }

  public static validateUpdateUser(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    const { fullName, birthDate, email, password } = req.body;
    const errors: string[] = [];

    if (fullName !== undefined && fullName.trim().length < 2) {
      errors.push('Full name must be at least 2 characters long');
    }

    if (birthDate !== undefined) {
      const date = new Date(birthDate);
      if (isNaN(date.getTime())) {
        errors.push('Invalid birth date format');
      }
    }

    if (email !== undefined) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        errors.push('Invalid email format');
      }
    }

    if (password !== undefined && password.length < 6) {
      errors.push('Password must be at least 6 characters long');
    }

    if (errors.length > 0) {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: 'Validation failed',
        errors,
      });
      return;
    }

    next();
  }

  public static validateBlockAction(
    req: Request,
    res: Response,
    next: NextFunction,
  ): void {
    const { action } = req.body;
    const errors: string[] = [];

    if (!action) {
      errors.push('Action is required');
    } else if (!['block', 'unblock'].includes(action)) {
      errors.push('Action must be either "block" or "unblock"');
    }

    if (errors.length > 0) {
      res.status(HttpStatus.BAD_REQUEST).json({
        status: 'error',
        message: 'Validation failed',
        errors,
      });
      return;
    }

    next();
  }
}
