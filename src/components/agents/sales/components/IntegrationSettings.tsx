```typescript
// Update the className string formatting
const getTabClassName = (tabId: string) => {
  return [
    'whitespace-nowrap',
    'py-4',
    'px-8',
    'text-sm',
    'font-medium',
    'border-b-2',
    tabId === activeTab 
      ? 'border-indigo-600 text-indigo-600'
      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
  ].join(' ');
};
```