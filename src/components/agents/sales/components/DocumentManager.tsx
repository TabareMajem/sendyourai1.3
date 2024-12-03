```typescript
// Update the status className function
const getStatusClassName = (status: Document['status']) => {
  return [
    'inline-flex',
    'items-center',
    'px-2.5',
    'py-0.5',
    'rounded-full',
    'text-xs',
    'font-medium',
    status === 'final' ? 'bg-green-100 text-green-800' :
    status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
    'bg-gray-100 text-gray-800'
  ].join(' ');
};
```