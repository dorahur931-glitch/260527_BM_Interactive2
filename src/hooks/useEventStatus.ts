import { useCallback, useEffect, useState } from 'react';
import { getStatus } from '../api/mockApi';
import type { UserEventStatus } from '../types';

export function useEventStatus() {
  const [status, setStatus] = useState<UserEventStatus | null>(null);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const data = await getStatus();
    setStatus(data);
    return data;
  }, []);

  useEffect(() => {
    getStatus().then((data) => {
      setStatus(data);
      setLoading(false);
    });
  }, []);

  return { status, loading, setStatus, refresh };
}
