'use client';

import { Suspense } from 'react';
import ChangePasswordContent from './ChangePasswordContent';

export default function ChangePasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChangePasswordContent />
    </Suspense>
  );
}
