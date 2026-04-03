import React from 'react';
import { Link } from 'react-router';
import { Button } from '../components/ui/button';
import { Home } from 'lucide-react';

export const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-8">
        The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button>
          <Home className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
};
