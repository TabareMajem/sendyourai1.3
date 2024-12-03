```typescript
// Update the severity color function
const getSeverityColor = (severity: ComplianceCheck['severity']) => {
  return [
    'inline-flex',
    'items-center',
    'px-2.5',
    'py-0.5',
    'rounded-full',
    'text-xs',
    'font-medium',
    severity === 'high' ? 'bg-red-100 text-red-800' :
    severity === 'medium' ? 'bg-yellow-100 text-yellow-800' :
    'bg-green-100 text-green-800'
  ].join(' ');
};
```