import SiteLoading from '@/src/components/SiteLoading';

export default function Loading() {
  return (
    <SiteLoading
      title="Loading admin console"
      description="Preparing reservation tools and dashboard data."
      mode="quiet"
    />
  );
}