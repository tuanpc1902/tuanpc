'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/solid';
import { Input } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';

export default function Search({
  disabled,
  placeholder = 'Search by email...',
}: {
  disabled?: boolean;
  placeholder?: string;
}) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  function handleSearch(term: string) {
    const params = new URLSearchParams(window.location.search);
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }

    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  }

  return (
    <div style={{ marginBottom: 50 }}>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div>
        <Input
          type="text"
          name="search"
          id="search"
          disabled={disabled}
          placeholder={placeholder}
          spellCheck={false}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
    </div>
  );
}
