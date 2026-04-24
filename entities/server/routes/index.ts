import { Router } from 'express';
import { AuthRoutes } from './auth.routes';
import { UserRoutes } from './user.routes';
import { SwaggerRoutes } from './swagger.routes';

export class AppRoutes {
  public router: Router;

  constructor() {
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    const authRoutes = new AuthRoutes();
    const userRoutes = new UserRoutes();
    const swaggerRoutes = new SwaggerRoutes();

    // Swagger документация
    this.router.use('/docs', swaggerRoutes.router);

    // API routes
    this.router.use('/auth', authRoutes.router);
    this.router.use('/users', userRoutes.router);
  }
}
