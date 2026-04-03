import React from 'react';
import { Shield, Eye } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from './ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

export const RoleSwitcher: React.FC = () => {
  const { role, setRole } = useApp();

  return (
    <div className="flex items-center gap-2">
      <Select value={role} onValueChange={(value) => setRole(value as 'admin' | 'viewer')}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="admin">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              <span>Admin</span>
            </div>
          </SelectItem>
          <SelectItem value="viewer">
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              <span>Viewer</span>
            </div>
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
