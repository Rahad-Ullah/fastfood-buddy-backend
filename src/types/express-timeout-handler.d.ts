declare module 'express-timeout-handler' {
  import { RequestHandler } from 'express';

  interface TimeoutOptions {
    timeout?: number;
    onTimeout?: (req: any, res: any, next: any) => void;
    disable?: string[];
  }

  function timeoutHandler(options?: TimeoutOptions): RequestHandler;

  export = timeoutHandler;

  const handler: any;
  export { handler };
  // If it's a direct function export:
  const timeout: any;
  export = timeout;
}
