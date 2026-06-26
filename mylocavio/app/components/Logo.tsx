export default function Logo({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
  const sizes = { sm: 'text-lg', md: 'text-2xl', lg: 'text-3xl' };
  return (
    <span className={`font-bold ${sizes[size]} tracking-tight`}>
      <span style={{ color: '#0f1a22' }}>my</span>
      <span style={{ color: '#2A9FD6' }}>locavio</span>
    </span>
  );
}
