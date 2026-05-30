import SiteLoading from '@/src/components/SiteLoading';

export default function Loading() {
  return (
    <SiteLoading
      title="Loading secure access"
      description="Preparing authentication and account access."
      mode="quiet"
    />
  );
}