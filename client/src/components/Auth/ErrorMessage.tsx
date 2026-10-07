import { Alert } from '@librechat/client';

export const ErrorMessage = ({ children }: { children: React.ReactNode }) => (
  <Alert
    variant="error"
    icon={false}
    aria-live="assertive"
<<<<<<< HEAD
    className="mt-6 px-6 py-4 shadow-sm transition-all"
=======
    elevation="raised"
    className="mt-6 px-6 py-4 transition-all"
>>>>>>> upstream/main
  >
    {children}
  </Alert>
);
